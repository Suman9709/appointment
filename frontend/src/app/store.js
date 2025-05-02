import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from '../features/appointments/appointmentSlice'
import slotReducer from '../features/slot/slotSlice'
import authreducer from '../features/auth/authSlice'
const store = configureStore({
    reducer: {
        appointments: appointmentReducer,
        slots: slotReducer,
        auth: authreducer,
    }

})

export default store;

