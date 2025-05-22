import React, { useState } from 'react';
import { loginUser } from '../features/auth/authSlice';
import{useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const {loading, error} = useSelector((state)=>state.auth)
const dispatch = useDispatch();
const navigate = useNavigate();


const handleLogin  =async(e)=>{
  e.preventDefault();

  const result = await dispatch (loginUser({email,password}))

  if(loginUser.fulfilled.match(result)){
    navigate('/')
  }
}


  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Log In</h2>
      <form className="space-y-5" onSubmit={handleLogin}>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={!email || ! password}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200
            ${(!email || ! password)?'bg-gray-400 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700 shadow-lg '}
            `}>
          Log In
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/signup" className="font-medium text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;