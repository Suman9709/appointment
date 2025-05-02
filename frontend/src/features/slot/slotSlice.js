import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slotList: [],
}

const slotSlice = createSlice({
    name: 'slots',
    initialState,

    reducers: {
        addSlot: (state, action) => {
            const { date, time, batch } = action.payload
            const alreadyExistSlot = state.slotList.some((slot) =>
                slot.date === date &&
                slot.time === time &&
                slot.batch === batch
            )
            if (alreadyExistSlot) {
                alert("Slot already available for time")
                return
            }

            const newSlot = {
                id: Date.now(),
                ...action.payload,
                isBooked: false,
            }
            state.slotList.push(newSlot)
        },



        markSlotBooked: (state, action) => {
            const slot = state.slotList.find((slot) => slot.id === action.payload)
            if (slot) {
                slot.isBooked = true;
            }
        },

        unmarkSlot: (state, action) => {
            const slot = state.slotList.find((slot) => slot.id === action.payload)
            if (slot) {
                slot.isBooked = false

            }
        },

        deleteSlot: (state, action) => {
            state.slotList = state.slotList.filter((slot) => slot.id !== action.payload);
        },

    },
})

export const { addSlot, markSlotBooked, unmarkSlot, deleteSlot } = slotSlice.actions
export default slotSlice.reducer