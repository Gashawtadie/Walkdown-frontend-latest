import React, { useState } from 'react';
import authService from '../services/authService';

const RegistrationScreen = ({ onRegister, onBackToLogin }) => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validation: must end with @siemens-energy.com
    if (
      !email ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy.com$/.test(email)
    ) {
      setError('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }

    // Password validation
    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Required fields validation
    if (!username || !firstname || !lastname) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        username,
        firstname,
        lastname,
        email,
        password,
      });
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
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
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
            value={lastname}
            onChange={e => setLastname(e.target.value)}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            pattern="^[A-Za-z0-9._%+-]+@siemens-energy.com$"
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
            value={password}
            onChange={e => setPassword(e.target.value)}
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