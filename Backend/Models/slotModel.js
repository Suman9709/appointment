import mongoose from "mongoose";

const slotSchema = mongoose.Schema({

    date: {
        type: Date,
        requires: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },

}, { Timestamps: true })

export const Slot = mongoose.model("Slot", slotSchema)