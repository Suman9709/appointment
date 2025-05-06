import { userForm } from "../Models/userformModel.js";
import { Slot } from "../Models/slotModel.js";
import mongoose from "mongoose";

export const appointmentBook = async (req, res) => {
    try {
        const { batch, name, slotId } = req.body
        const userId = req.user._id;

        if (!batch || !name || !slotId) {
            return res.status(400).json({
                message: "All fields are require"
            })
        }
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({
                message: "Slot not found.",
            });
        }
        const { from, to, date } = slot;
        if (!from || !to) {
            return res.status(400).json({
                message: "Slot must include both 'from' and 'to' times.",
            });
        }
        const existing = await userForm.findOne({ user: userId }).populate("slot");
        if (existing && existing.slot?.date.toDateString() === new Date().toDateString()) {
            return res.status(400).json({ message: "You have already booked a slot today." });
        }

        const newForm = new userForm({
            batch,
            name,
            slot: slotId,
            user: userId,
            date: slot.date,
            from: from,
            to: to,
        });

        await newForm.save();

        // Populate the 'slot' field after saving the form
        // const populatedForm = await newForm.populate("slot")
        return res.status(201).json({
            message: "Slot booked successfully. Status: Pending.",
            data: newForm,
        })

    } catch (error) {
        console.error("error in submitting the form", error)
        return res.status(500).json({
            message: "Inter server error"
        })
    }
}

export const updateAppointmentStatus = async (req, res) => {
    try {
        if (req.user.userType !== "Admin") {
            return res.status(403).json({ message: "Only Admin can update status." });
        }

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid appointment ID." });
        }
        const { status } = req.body;

        if (!["Pending", "Confirmed", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status." });
        }

        const appointment = await userForm.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ message: `Status updated to ${status}`, data: appointment });

    } catch (err) {
        console.error("Status update error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const allAppointments = async (req, res) => {
    try {
        let appointments;

        if (req.user.userType === "Admin") {
            appointments = await userForm.find().populate("slot").populate("user", "name, email")
        }
        else {
            appointments = await userForm.find({ user: req.user._id }).populate("slot")
        }
        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        })

    } catch (error) {
        console.error("Error in getting appointments", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
};


export const getUserAppointment = async (req, res) => {
    try {

        const appointments = await userForm.find({ user: req.user._id }).populate("slot")
        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        })
    } catch (error) {
        console.error("Error in fetching the appointments", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


