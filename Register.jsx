import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

const Register = ({ setUserName }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      console.log(response.data); // Log the response data to debug
      setMessage(response.data.message);
  
      // Check if the message is the expected one
      if (response.data.message === 'Registration successful') {
        setUserName(formData.name);
        navigate('/verify-otp');  // Navigate to verify OTP page
      } else {
        // Handle unexpected responses
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };
  

  return (
    <div className="w-screen min-h-screen flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
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
          <div>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-6 text-center text-red-500">{message}</p>}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
