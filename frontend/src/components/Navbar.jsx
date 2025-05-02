import React from 'react';
import { useSelector } from 'react-redux'
const Navbar = () => {
  const { isAuthenticated } = ((state) => state.auth)

  return (
    <div className='w-full bg-cyan-300 shadow-md'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <div className='bg-amber-300 w-24 h-10 flex items-center justify-center rounded'>
              <span className='font-bold text-gray-800'>LOGO</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:block'>
            <ul className='ml-10 flex items-center space-x-8'>
              <li>
                <a href="#" className='text-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                  Home
                </a>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <a href="#" className='text-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                      Book Appointment
                    </a>
                  </li>
                  <li>
                    <a href="#" className='text-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                      Logout
                    </a>
                  </li>
                </>
              ) :
                <>
                  <li>
                    <a href="#" className='text-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                      Login/SignUp
                    </a>
                  </li>
                </>
              }


            </ul>
          </div>

          {/* Mobile menu button (hidden on larger screens) */}
          <div className='md:hidden flex items-center'>
            <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white focus:outline-none'>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;