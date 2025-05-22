import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../pages/Config.js'

export const slotAdd = createAsyncThunk('slot/create',
    async ({ date, to, from }, { rejectWithValue }) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userType = auth?.user?.userType;
        if (userType !== "Admin") {
            return rejectWithValue("Unauthorized: Only admin can create slots");
        }
        try {
            const token = auth?.token;
            console.log("Sending token:", token);
            const response = await axios.post("/api/slot/createslot", {
                date, to, from
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "fail to create slot")
        }
    }
)

export const slotDelete = createAsyncThunk('/slot/delete',
    async (id, { rejectWithValue }) => {
         const auth = JSON.parse(localStorage.getItem("auth"));
        const userType = auth?.user?.userType;
        const token = auth?.token;
        try {
            await axios.delete(`/api/slot/slot/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Deletion fail")
        }
    }
)

export const fetchSlot = createAsyncThunk("allslot",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/slot/slots")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to fetch all slot")
        }
    }

)

const initialState = {
    slotList: [],
    bookedSlot: [],
    unbookedSlot: [],
    loading: false,
    error: null,
}

const slotSlice = createSlice({
    name: 'slots',
    initialState,

    reducers: {
        // addSlot: (state, action) => {
        //     const { date, time, batch } = action.payload
        //     const alreadyExistSlot = state.slotList.some((slot) =>
        //         slot.date === date &&
        //         slot.time === time &&
        //         slot.batch === batch
        //     )
        //     if (alreadyExistSlot) {
        //         alert("Slot already available for time")
        //         return
        //     }

        //     const newSlot = {
        //         id: Date.now(),
        //         ...action.payload,
        //         isBooked: false,
        //     }
        //     state.slotList.push(newSlot)
        // },



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
    },
    extraReducers: (builder) => {
        builder

            //addSlot
            .addCase(slotAdd.pending, (state) => {
                state.loading = true;
            })

            .addCase(slotAdd.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.slotList.push(action.payload)
            })
            .addCase(slotAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //deleteSlot

            .addCase(slotDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(slotDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.slotList = state.slotList.filter((slot) => slot._id !== action.payload)
            })
            .addCase(slotDelete.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //fetchAllSlot

            .addCase(fetchSlot.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSlot.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.bookedSlot || action.payload.unbookedSlot) {
                    //for admin
                    state.bookedSlot = action.payload.bookedSlot || [];
                    state.unbookedSlot = action.payload.unbookedSlot || [];
                    state.slotList = [...action.payload.bookedSlot, ...action.payload.unbookedSlot]
                }
                else {
                    state.slotList = action.payload.slots || []
                }
            })
            .addCase(fetchSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

    // deleteSlot: (state, action) => {
    //     state.slotList = state.slotList.filter((slot) => slot.id !== action.payload);
    // },

},
)

export const { markSlotBooked, unmarkSlot } = slotSlice.actions
export default slotSlice.reducer