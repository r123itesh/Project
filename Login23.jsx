import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000//send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to OTP page, passing email in state
        navigate('/otp', { state: { email } });
      } else {
        // Handle errors from the server
        setError(data.message || 'Failed to send OTP');
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
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Please enter your email to continue</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@company.com" 
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            onClick={handleLogin} 
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}>
            {loading ? 'Sending...' : 'Continue with Email'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-center text-gray-400 text-xs">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
