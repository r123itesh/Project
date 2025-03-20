import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message);
      if (response.data.message === 'Password reset OTP sent to your email.') navigate('/reset-password');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Request OTP
          </button>
        </form>
        {message && <p className="mt-6 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
