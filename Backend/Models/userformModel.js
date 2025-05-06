import mongoose from "mongoose";

const userformSchema = mongoose.Schema({
    name: {

        type: String,
        required: true,
    },
    batch: {
        type: String,
        enum: ["DSA", "Web Development", "Personal Mentorship", "Mock Interview"],
        required: true,
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Rejected"],
        default: "Pending",
    },
    date: {
        type: Date,
        required: true,
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },

}, { timestamps: true })

export const userForm = new mongoose.model("userForm", userformSchema)