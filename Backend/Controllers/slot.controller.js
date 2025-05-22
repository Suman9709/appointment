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

        // const now = new Date();
        // const selectedFromDateTime = new Date(`${date}T${from}`)

        // if (selectedFromDateTime < now) {
        //     return res.status(400).json({
        //         message: "Cannot create slot in previous date"
        //     })
        // }

        const fromDateTime = new Date(`${date}T${from}`)
        const toDateTime = new Date(`${date}T${to}`)
        const now = new Date();

        if (fromDateTime > toDateTime) {
            return res.status(400).json({
                message: "From time must be earlier than to to"
            })
        };

        if (fromDateTime < now) {
            return res.status(400).json({
                message: "cannot create slot in previous date and time"
            })
        }


        // Check if a slot already exists on the same date and overlapping time
        const overlappingSlot = await Slot.findOne({
            date: fromDateTime,
            $or: [
                { from: { $lt: to }, to: { $gt: from } }
            ]
        });

        if (overlappingSlot) {
            return res.status(400).json({
                message: "A slot already exists during the selected time range"
            });
        }

        const newSlot = new Slot({ date: fromDateTime, from, to })
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

        await Slot.findByIdAndDelete(id);

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
       

        const bookedForm = await userForm.find({}, "slot");
        const bookedSlotId = bookedForm.map(form => form.slot.toString());

        const allSlots = await Slot.find().sort({ date: 1, from: 1 });

        const now = new Date();
        const todayDate = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'

        // Filter booked slots: Only today's date
        const bookedSlot = allSlots.filter(slot => {
            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            return bookedSlotId.includes(slot._id.toString()) && slotDate === todayDate;
        });

        // Filter unbooked slots: Only today's date and future `from` time
        const unbookedSlot = allSlots.filter(slot => {
            if (bookedSlotId.includes(slot._id.toString())) return false;

            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            if (slotDate !== todayDate) return false;

            const [hours, minutes] = slot.from.split(":").map(Number);
            const slotDateTime = new Date(slot.date);
            slotDateTime.setHours(hours, minutes, 0, 0);

            return slotDateTime > now;
        });

        return res.status(200).json({
            success: true,
            bookedSlot,
            unbookedSlot,
            total: bookedSlot.length + unbookedSlot.length,
        });

    } catch (error) {
        console.error("Error filtering slots:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};



