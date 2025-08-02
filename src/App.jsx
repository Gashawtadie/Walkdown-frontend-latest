import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import PositionSelection from './components/PositionSelection';
import ShiftSelection from './components/ShiftSelection';
import ChecklistScreen from './components/ChecklistScreen';
import authService from './services/authService';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [position, setPosition] = useState(null);
  const [shiftInfo, setShiftInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setCurrentScreen('position');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('position');
  };

  const handleShowRegistration = () => {
    setCurrentScreen('registration');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setPosition(null);
    setShiftInfo(null);
    setUser(null);
    authService.logout();
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentScreen('login');
    setPosition(null);
    setShiftInfo(null);
  };

  const handlePositionSelect = (selectedPosition) => {
    setPosition(selectedPosition);
    setCurrentScreen('shift');
  };

  const handleShiftSelect = (shiftData) => {
    setShiftInfo(shiftData);
    setCurrentScreen('checklist');
  };

  if (isLoading) {
    return (
      <div className="app" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {currentScreen === 'login' && (
        <LoginScreen 
          onLogin={handleLogin} 
          onShowRegistration={handleShowRegistration}
        />
      )}
      {currentScreen === 'registration' && (
        <RegistrationScreen 
          onRegister={() => setCurrentScreen('login')}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {currentScreen === 'position' && (
        <PositionSelection 
          onPositionSelect={handlePositionSelect} 
          onBack={handleLogout}
        />
      )}
      {currentScreen === 'shift' && (
        <ShiftSelection
          position={position}
          onShiftSelect={handleShiftSelect}
          onBack={() => setCurrentScreen('position')}
        />
      )}
      {currentScreen === 'checklist' && (
        <ChecklistScreen
          position={position}
          shiftInfo={shiftInfo}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;