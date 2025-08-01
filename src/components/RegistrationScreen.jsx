import React, { useState } from 'react';

const RegistrationScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email validation: must end with @siemens-energy.com
    if (
      !employeeEmail ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy\.com$/.test(employeeEmail)
    ) {
      alert('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }
    onRegister();
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleInputChange}
            required
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
          />
        </div>

        <button type="submit">Register</button>
        <button type="button" className="secondary" onClick={onBackToLogin} style={{ marginTop: '10px' }}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegistrationScreen;