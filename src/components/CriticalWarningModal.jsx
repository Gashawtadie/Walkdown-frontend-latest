import React from 'react';

const CriticalWarningModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  // In a real app, you would play a warning sound here
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-title">!!! WARNING !!!</div>
        <div className="modal-message">
          CO2 MUST BE TURNED OFF BEFORE ENTERING!
        </div>
        <button className="modal-btn" onClick={onClose}>
          I ACKNOWLEDGE
        </button>
      </div>
    </div>
  );
};

export default CriticalWarningModal;
