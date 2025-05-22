import React, { useEffect } from 'react'
import AppointmentCard from '../components/AppointmentCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminAppointments, updateAppointmentStatus, deleteAppointment } from '../features/appointments/appointmentSlice';

const AdminHome = () => {

  const dispatch = useDispatch();
  const { appointmentList: appointments, loading, error } = useSelector((state) => state.appointments)

  useEffect(() => {
    dispatch(fetchAdminAppointments())
  }, [dispatch])

  // Handler for status update
  const handleUpdateStatus = (id, status) => {
    dispatch(updateAppointmentStatus({ id, status }));
  }

  const handleDelete = (_id) => {
    console.log("Trying to delete", _id);
    dispatch(deleteAppointment(_id))
  }

  return (
    <div className='max-w-5xl mx-auto mt-10 px-4'>
      <h2 className='text-2xl font-bold mb-6 text-center'>All Booked Appointments</h2>
      {loading && <p className='text-blue-500 text-center'>Loading Appointments...</p>}
      {error && <p className='text-red-500 text-center'>Error: {error}</p>}

      {!loading && appointments.length === 0 && (
        <p className='text-center text-gray-500'>No Appointments Found</p>
      )}

      {!loading && appointments.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {
            appointments.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appointment={appt}
                onConfirm={() => handleUpdateStatus(appt._id, 'Confirmed')}
                onReject={() => handleUpdateStatus(appt._id, 'Rejected')}
                onDelete={() => handleDelete(appt._id)}
              />
            ))
          }
        </div>
      )}
    </div>
  )
}

export default AdminHome
