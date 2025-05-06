import { Slot } from "../Models/slotModel.js";

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

        const existingSlot = async(req,res)=>{}

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return res.status(400).json({
                message: "Cannot create slot in previous date"
            })
        }

        const newSlot = new Slot({ date:selectedDate, from, to })
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