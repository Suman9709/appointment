import React, { useState } from 'react';
import { FiCalendar, FiClock, FiPlus } from 'react-icons/fi';

const CreateSlot = () => {
    const [date, setDate] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create New Slot</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCalendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                            From
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiClock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="time"
                                id="from"
                                name="from"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                            To
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiClock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="time"
                                id="to"
                                name="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!date || !to || !from}
                    className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500

                        ${(!date || !to || !from) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}
                    `}
                >
                    <FiPlus className="mr-2" />
                    Create Slot
                </button>
            </form>
        </div>
    );
};

export default CreateSlot;