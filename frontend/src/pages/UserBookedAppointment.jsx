import React, { useEffect } from 'react'
import AppointmentCard from '../components/AppointmentCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAppointment, fetchUserAppointments } from '../features/appointments/appointmentSlice';
const UserBookedAppointment = () => {
    const dispatch = useDispatch();
    const { appointmentList: appointments, loading, error } = useSelector((state) => state.appointments)

    useEffect(() => {
        dispatch(fetchUserAppointments())
    }, [dispatch])

    const handleDelete = (_id) => {
        dispatch(deleteAppointment(_id))
    }
    return (
        <div className='mx-w-5xl mask-auto mt-10 px-4'>
            <h2 className='text-2xl font-bold mb-6 text-center'>My Appointments</h2>
            {loading && <p className='text-blue-500 text-center'>Loading Your Appointment...</p>}
            {error && <p className='text-red-500 text-center'>Error:{error}</p>}

            {!loading && appointments.length === 0 && (
                <p className='text-center text-gray-500' >No Appointment Available</p>
            )}

            {!loading && appointments.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {
                        appointments.map((appt, index) => (
                            <AppointmentCard key={appt._id} appointment={appt} index={index}
                                onDelete={() => { handleDelete(appt._id) }} />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default UserBookedAppointment