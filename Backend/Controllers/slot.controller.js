import mongoose from "mongoose";
import { Slot } from "../Models/slotModel.js";
import { userForm } from "../Models/userformModel.js";

export const createSlot = async (req, res) => {
    try {
        if (req.user.userType !== "Admin") {
            return res.status(403).json({
                message: "Access denied!! only Admin can create slot"
            })
        }

        const { date, from, to } = req.body;

        if (!date || !from || !to) {
            return res.status(400).json({
                message: "All fields are require"
            })
        }



        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return res.status(400).json({
                message: "Cannot create slot in previous date"
            })
        }

        // Check if a slot already exists on the same date and overlapping time
        const overlappingSlot = await Slot.findOne({
            date: selectedDate,
            $or: [
                { from: { $lt: to }, to: { $gt: from } }
            ]
        });

        if (overlappingSlot) {
            return res.status(400).json({
                message: "A slot already exists during the selected time range"
            });
        }

        const newSlot = new Slot({ date: selectedDate, from, to })
        await newSlot.save();

        return res.status(201).json({
            message: "Slot created Successfully",
            slot: newSlot,
        })

    } catch (error) {
        console.error("Error  in creating slot", error)
        return res.status(500).json({ message: "Internal server error" })

    }
}


export const deleteSlot = async (req, res) => {
    try {
        if (req.user.userType !== "Admin") {
            return res.status(403).json({
                message: "Access denied!!. Only admin can delete the slot"
            })
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid slot ID"
            })
        }

        const slot = await Slot.findById(id);
        if (!slot) {
            return res.status(404).json({
                message: "Slot not found"
            })
        }

        await slot.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Slot deleted Successfully"
        })

    } catch (error) {
        console.error("Error in deleting the slot", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getFilteredSlots = async (req, res) => {
    try {
        const userType = req.user.userType;

        const bookedForm = await userForm.find({}, "slot")
        const bookedSlotId = bookedForm.map(form => form.slot.toString());


        if (userType === "Admin") {
            const allSlots = await Slot.find().sort({ date: 1, from: 1 });
            // Admin gets two arrays: bookedSlots and unbookedSlots
            const bookedSlot = allSlots.filter(slots => bookedSlotId.includes(slots._id.toString()))
            const unbookedSlot = allSlots.filter(slot => !bookedSlotId.includes(slot._id.toString()))


            return res.status(200).json({
                success: true,
                bookedSlot,
                unbookedSlot,
                total: allSlots.length,
            })
        }
        else {
            const availableSlot = await Slot.find({
                _id: { $nin: bookedSlotId }
            }).sort({ date: 1, from: 1 });
            return res.status(200).json({
                success: true,
                count: availableSlot.length,
                slots: availableSlot,
            })
        }
    } catch (error) {
        console.error("Error fetching slots:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}