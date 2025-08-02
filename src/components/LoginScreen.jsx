import React, { useState } from 'react';
import authService from '../services/authService';

const LoginScreen = ({ onLogin, onShowRegistration }) => {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Email validation: must end with @siemens-energy.com
    if (
      !employeeEmail ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy\.com$/.test(employeeEmail)
    ) {
      setError('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authService.login(employeeEmail, password);
      console.log('Login successful:', response);
      onLogin(response.user);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      {/* Logos side by side */}
      <div
        className="logo-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          marginBottom: '16px'
        }}
      >
        <img
          src="/Images/99Asset-4@2x.png"
          alt="99Asset Logo"
          className="logo"
          style={{ height: '60px', objectFit: 'contain' }}
        />
        <img
          src="/Images/Siemens-Energy-logo-1.png"
          alt="Siemens Energy Logo"
          className="logo"
          style={{ height: '60px', objectFit: 'contain' }}
        />
      </div>

      <h1 className="walkdow_title">WALKDOWN</h1>
      <h2>
        OUR GOAL-ZERO HARM!
      </h2>
      <h2>
        SAFETY FIRST - <span>{new Date().toLocaleDateString()}</span>
      </h2>
      <div className="timestamp" id="login-time">
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
          <label htmlFor="employee-email">Employee Email:</label>
          <input
            type="email"
            id="employee-email"
            placeholder="Enter your Siemens Energy email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Registration link */}
      <div className="registration-link">
        <p>Don't have an account?</p>
        <button type="button" onClick={onShowRegistration} disabled={isLoading}>
          Create a new account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
