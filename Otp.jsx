import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Otp = () => {
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Access email from location.state
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000//verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to home page on successful verification
        navigate('/home');
      } else {
        setError(data.message || 'Failed to verify the OTP.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-sm border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">Verify Your Email</h1>
          <p className="text-gray-400 text-sm">We've sent a verification code to {email}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
              Verification Code
            </label>
            <input 
              id="otp"
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter 6-digit code" 
              maxLength="6"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-center text-lg tracking-widest"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            onClick={handleVerify} 
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          <div className="flex justify-between items-center mt-4">
            <div className='w-full text-center'>
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button className="mt-2 text-blue-400 hover:text-blue-300 font-medium">
                Resend
              </button>
            </p>
            </div>
            <div className='w-full text-center'>
            <p className="text-gray-400 text-sm">
              Wrong email?{' '}
              <button 
                onClick={() => navigate(-1)} 
                className="mt-2 text-blue-400 hover:text-blue-300 font-medium">
                Go back
              </button>
            </p>
                  </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-center text-gray-400 text-xs">
            Having trouble? Please{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
