import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointmentList: []
}
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,

    reducers: {
        createAppointment: (state, action) => {

            const { name, date, time, batch } = action.payload
            const alreadyBooked = state.appointmentList.some((appoint) =>
                appoint.name === name &&
                appoint.date === date &&
                appoint.time === time &&
                appoint.batch === batch
            );

            if (alreadyBooked) {
                alert('You have already booked the appointment of the same day');
                return
            }

            const newAppointment = {
                id: Date.now(),
                // name: action.payload.name,
                // batch: action.payload.batch,
                // date: action.payload.date,
                // time: action.payload.time,
                // slotId: action.payload.slotId,
                ...action.payload,
                status: 'pending',
            }


            state.appointmentList.push(newAppointment)
        },

        deleteAppointment: (state, action) => {
            state.appointmentList = state.appointmentList.filter((appoint) => appoint.id !== action.payload)
        },

        confirmAppointment: (state, action) => {
            const appointment = state.appointmentList.find(appoint => appoint.id === action.payload);
            if (appointment) {
                appointment.status = 'confirmed'
            }
        },
        rejectAppointment: (state, action) => {
            const reject = state.appointmentList.find((appoint) => appoint.id === action.payload)
            if (reject) {
                reject.status = 'rejected'
            }
        },
    },
})

export const { } = appointmentSlice.actions
export default appointmentSlice.reducer;