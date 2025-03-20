// Import necessary dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/'; // Replace with your Flask backend URL

// Registration Page
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <Link to="/verify-otp">Verify OTP</Link>
    </div>
  );
};

// OTP Verification Page
const VerifyOtp = () => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="OTP"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
        />
        <button type="submit">Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

// Login Page
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') navigate('/');
    } catch (error) {
      setMessage(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

// Forgot Password Page
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Request OTP</button>
      </form>
      <p>{message}</p>
      <Link to="/reset-password">Reset Password</Link>
    </div>
  );
};

// Reset Password Page
const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '', otp: '', new_password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="OTP"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={formData.new_password}
          onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

// App Component with Router
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> | <Link to="/forgot-password">Forgot Password</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
