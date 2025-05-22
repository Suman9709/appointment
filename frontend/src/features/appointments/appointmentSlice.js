import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const bookAppointment = createAsyncThunk(
    'appointments/bookAppointments',
    async (formData, { rejectWithValue }) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        try {
            const response = await axios.post(
                'http://localhost:5000/api/form/book',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const fetchUserAppointments = createAsyncThunk('appointment/fetchappointment', async (_, { rejectWithValue }) => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const token = auth?.token;
    try {
        const response = await axios.get('http://localhost:5000/api/form/getuserappointment', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.appointments;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})

export const fetchAdminAppointments = createAsyncThunk(
    'appointment/fetchAdminappointment',
    async (_, { rejectWithValue }) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;
        try {
            const response = await axios.get('http://localhost:5000/api/form/allappointments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.appointments;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const deleteAppointment = createAsyncThunk('appointment/deleteAppointment', async (id, { rejectWithValue }) => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const token = auth?.token;
    try {
        await axios.delete(`http://localhost:5000/api/form/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})


export const updateAppointmentStatus = createAsyncThunk('appointment/updateAppointment', async ({ id, status }, { rejectWithValue }) => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const token = auth?.token;
    try {
        const response = await axios.patch(
            `http://localhost:5000/api/form/appointment/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})



const initialState = {
    appointmentList: [],
    loading: false,
    error: null,
}
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,

    reducers: {
        // createAppointment: (state, action) => {

        //     const { name, date, time, batch } = action.payload
        //     const alreadyBooked = state.appointmentList.some((appoint) =>
        //         appoint.name === name &&
        //         appoint.date === date &&
        //         appoint.time === time &&
        //         appoint.batch === batch
        //     );

        // if (alreadyBooked) {
        //     alert('You have already booked the appointment of the same day');
        //     return
        // }

        // const newAppointment = {
        // id: Date.now(),
        // name: action.payload.name,
        // batch: action.payload.batch,
        // date: action.payload.date,
        // time: action.payload.time,
        // slotId: action.payload.slotId,
        //     ...action.payload,
        //     status: 'pending',
        // }


        //     state.appointmentList.push(newAppointment)
        // },

        // deleteAppointment: (state, action) => {
        //     state.appointmentList = state.appointmentList.filter((appoint) => appoint.id !== action.payload)
        // },

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

    extraReducers: (builder) => {
        builder
            //book Appointment
            .addCase(bookAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(bookAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.appointmentList.push(action.payload)
            })

            .addCase(bookAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            //fetch appointments

            .addCase(fetchUserAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointmentList = action.payload
            })
            .addCase(fetchUserAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch Admin Appointments

            .addCase(fetchAdminAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointmentList = action.payload
            })
            .addCase(fetchAdminAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update user appointment status
            .addCase(updateAppointmentStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedAppointment = action.payload;
                const index = state.appointmentList.findIndex(a => a._id === updatedAppointment._id)

                if (index !== -1) {
                    if (updatedAppointment.status === "Rejected")
                        state.appointmentList.splice(index, 1);
                }
                else {
                    state.appointmentList[index] = updatedAppointment
                }
            })

            //Delete Appointments

            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.appointmentList = state.appointmentList.filter((appointment) => appointment._id !== action.payload)
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


        //update Appointments

        // .addCase(updateAppointmentStatus.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })

        // .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.error = null;
        //     const index = state.appointmentList.findIndex(app => app._id === action.payload._id);
        //     if (index !== -1) {
        //         state.appointmentList[index] = action.payload;
        //     }
        // })

        // .addCase(updateAppointmentStatus.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })


    }
})

export const { confirmAppointment, rejectAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer;