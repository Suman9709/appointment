import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSlot } from '../features/slot/slotSlice';
import img1 from '../images/deleteIcon1.png'
import { slotDelete } from '../features/slot/slotSlice';

const UserHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userType = user?.userType;
  const slotList = useSelector(state => state.slots.slotList);


  const services = [
    { id: 1, name: 'DSA' },
    { id: 2, name: 'Web Development' },
    { id: 3, name: 'Personal Mentorship' },
    { id: 4, name: 'Mock Interview' }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if ((userType === 'Admin' || userType === "Student") && isAuthenticated) {
      dispatch(fetchSlot());
    }
  }, [dispatch, userType, isAuthenticated]);


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
            <h2 className="font-bold text-lg">Explorin Academy</h2>
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
            onClick={() => {
              isAuthenticated === true ? setActiveTab("availability") : navigate('/login')
            }}
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
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {userType === 'Admin' || userType === 'Student' ? (
                <div>
                  <h3 className="font-bold mb-4">Available Slots</h3>
                  {slotList && slotList.length > 0 ? (
                    slotList
                      .filter(slot => userType === 'Admin' || !slot.booked) 
                      .map((slot) => (
                        <div key={slot._id} className="flex p-3 bg-blue-50 rounded-lg mb-2 items-center justify-between">
                          <div>
                            <p><strong>Date:</strong> {slot.date}</p>
                            <p><strong>From:</strong> {slot.from}</p>
                            <p><strong>To:</strong> {slot.to}</p>
                          </div>
                          {userType === 'Admin' && (
                            <div>
                              <img
                                src={img1}
                                alt="delete"
                                className="w-10 h-10 cursor-pointer"
                                onClick={() => dispatch(slotDelete(slot._id))}
                              />


                            </div>
                          )}
                        </div>
                      ))
                  ) : (
                    <p>No slots available.</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Check availability by contacting support or use services tab.</p>
                </div>
              )}
            </div>

          )}
        </div>
        <div className="p-6">
          <button
            onClick={() => {
              if (isAuthenticated === true) {
                if (userType === "Admin") {
                  navigate("/createslot");
                } else {
                  navigate("/contact");
                }
              } else {
                navigate("/login");
              }
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            {userType === "Admin" ? "Create Slot" : "Contact Us"}
          </button>
        </div>

      </main>
    </div>
  );
};

export default UserHome;