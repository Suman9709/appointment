import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UserHome from './pages/UserHome'
import AdminHome from './pages/AdminHome'
import BookSlot from './pages/BookSlot'
import CreateSlot from './pages/CreateSlot'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<UserHome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/contact' element={<BookSlot />} />
        <Route path='/createslot' element={<CreateSlot />} />
      </Routes>

    </div>
  )
}

export default App