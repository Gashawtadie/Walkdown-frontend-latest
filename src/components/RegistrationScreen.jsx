import React, { useState } from 'react';
import authService from '../services/authService';

const RegistrationScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validation: must end with @siemens-energy.com
    if (
      !formData.email ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy\.com$/.test(formData.email)
    ) {
      setError('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }

    // Password validation
    if (!formData.password) {
      setError('Please enter your password');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Confirm password validation
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Required fields validation
    if (!formData.username || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      console.log('Registration successful:', response);
      setError('');
      alert('Registration successful! Please login with your new account.');
      onRegister();
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      {/* Logo */}
      <div className="logo-container">
        <img 
          src="/Images/Siemens-Energy-logo-1.png" 
          alt="Siemens Energy Logo" 
          className="logo"
        />
      </div>
      
      <h1>Create New Account</h1>
      <div className="timestamp" id="registration-time">
        Last updated: {new Date().toLocaleString()}
      </div>

      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Siemens Energy email"
            value={formData.email}
            onChange={handleInputChange}
            required
            pattern="^[A-Za-z0-9._%+-]+@siemens-energy\.com$"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength="6"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
        <button type="button" className="secondary" onClick={onBackToLogin} style={{ marginTop: '10px' }} disabled={isLoading}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegistrationScreen;