import React, { useEffect, useState } from 'react';
import { fetchSlot } from '../features/slot/slotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment } from '../features/appointments/appointmentSlice';

const BookSlot = () => {
    const [name, setName] = useState('');
    const [batch, setBatch] = useState('');
    const [slot, setSlot] = useState('');

    // const { isAuthenticated, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const slotList = useSelector((state) => state.slots.unbookedSlot || []);

    useEffect(() => {
        dispatch(fetchSlot())
    }, [dispatch]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const selectedSlot = slotList.find(s => s._id === slot);


        if (!selectedSlot) {
            alert("Invalid slot selection")
            return
        }

        const formData = {
            name,
            batch,
            slotId: selectedSlot._id,
            date: selectedSlot.date,
            time: `${selectedSlot.from} - ${selectedSlot.to}`,
        }

        try {
            const resultAction = await dispatch(bookAppointment(formData))
            if (bookAppointment.fulfilled.match(resultAction)) {
                console.log('Booked Slot', resultAction.payload);
                setName("")
                setBatch("")
                setSlot("")
            }
            else {
                throw new Error(resultAction.payload || "Booking failed")
            }
        } catch (error) {
            alert(`Booking Error ${error.message}`)
            console.error(error);

        }
        alert("Appointment Booked")
    }

    useEffect(() => {
        console.log('SlotList:', slotList);
    }, [slotList]);
    return (
        <div className='max-w-md mx-auto mt-16 p-8 rounded-xl shadow-md bg-white border border-gray-100'>
            <div className='text-2xl font-semibold mb-8 text-center text-gray-800'>
                <h1>Book Your Session</h1>
            </div>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        placeholder='Enter your full name'
                    />
                </div>

                <div>
                    <label htmlFor="batch" className='block text-sm font-medium text-gray-700 mb-1'>
                        Program
                    </label>
                    <select
                        id="batch"
                        name="batch"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        required
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]'
                    >
                        <option value="" disabled>Select a program</option>
                        <option value="DSA">Data Structures & Algorithms</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Personal Mentorship">Personal Mentorship</option>
                        <option value="Mock Interview">Mock Interview</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="slot" className='block text-sm font-medium text-gray-700 mb-1'>
                        Available Time Slot
                    </label>
                    <select
                        id="slot"
                        name="slot"
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        required
                        disabled={!batch}
                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url("data:image/svg+xml;base64,...")] bg-no-repeat bg-[center_right_1rem] ${!batch ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-300'}`}
                    >
                        <option value="" disabled>Select a time slot</option>
                        {
                            slotList
                                .filter(s => !s.isBooked)
                                .map(s => (
                                    <option key={s._id} value={s._id}>

                                        {`${s.from} - ${s.to}`}
                                    </option>
                                ))
                        }
                    </select>

                </div>

                <button
                    type="submit"
                    disabled={!name || !batch || !slot}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${(!name || !batch || !slot)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    )
}

export default BookSlot;