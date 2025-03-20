import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        setIsLoggedIn(true);
        navigate('/products');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            {/* <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            /> */}
          </div>
          <div>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-6 text-center text-red-500">{message}</p>}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Register
          </button>
          <button
            onClick={() => navigate('/forgot-password')}
            className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
