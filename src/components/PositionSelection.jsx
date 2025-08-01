import React from 'react';

const PositionSelection = ({ onPositionSelect, onBack }) => {
  const handleOperatorClick = () => {
    onPositionSelect('operator');
  };

  const handleManagerClick = () => {
    onPositionSelect('manager');
  };

  return (
    <div className="position-selection">
      <h2>Select Your Position</h2>
      <div className="timestamp" id="position-select-time">
        Last updated: {new Date().toLocaleString()}
      </div>
      <div className="position-options">
        <button id="operator-btn" className="position-btn" onClick={handleOperatorClick}>
          Operator Shift
        </button>
        <button id="manager-btn" className="position-btn" onClick={handleManagerClick}>
          Shift Manager
        </button>
      </div>
      <button className="secondary" onClick={onBack}>
        Back to Login
      </button>
    </div>
  );
};

export default PositionSelection;
