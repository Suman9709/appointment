import React from 'react'

const AppointmentCard = ({ appointment, onConfirm, onReject, onDelete, userType }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="font-semibold text-lg mb-2">{appointment.name}</h3>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
      <p>
        Status:{" "}
        <span
          className={`font-bold ${
            appointment.status === 'Confirmed'
              ? 'text-green-600'
              : appointment.status === 'Rejected'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {appointment.status}
        </span>
      </p>

      <div className="mt-4 flex space-x-2">
        {userType === "Admin" && (
          <>
            <button
              onClick={onConfirm}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
              disabled={appointment.status === 'Confirmed' || appointment.status === 'Rejected'}
            >
              Confirm
            </button>
            <button
              onClick={onReject}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
              disabled={appointment.status === 'Rejected'}
            >
              Reject
            </button>
          </>
        )}

        <button
          onClick={onDelete}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AppointmentCard
