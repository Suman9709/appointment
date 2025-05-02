import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    { id: 1, name: 'DSA' },
    { id: 2, name: 'Web Development' },
    { id: 3, name: 'Personal Mentorship' },
    { id: 4, name: 'Mock Interview' }
  ];

  const handleBookNow = (serviceId) => {
    navigate(`/book/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <header className="max-w-2xl mx-auto text-center py-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Book With Me</h1>
        <p className="text-indigo-600">Schedule your appointment easily online</p>
      </header>

      <main className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
              AJ
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg">Alex Johnson</h2>
            <p className="text-gray-500">Professional Coach</p>
          </div>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-3 font-medium ${activeTab === 'services' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`flex-1 py-3 font-medium ${activeTab === 'availability' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          >
            Availability
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'services' ? (
            <div className="space-y-4">
              {services.map(service => (
                <div
                  key={service.id}
                  className="p-4 border rounded-lg hover:bg-indigo-50 transition cursor-pointer"
                  onClick={() => handleBookNow(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <div className="text-indigo-600 font-bold">{service.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium">Monday - Friday</p>
                <p className="text-sm text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium">Saturday</p>
                <p className="text-sm text-gray-600">10:00 AM - 2:00 PM</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="font-medium text-gray-500">Sunday</p>
                <p className="text-sm text-gray-500">Not available</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <button
            onClick={() => navigate('/contact')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Contact Me
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserHome;