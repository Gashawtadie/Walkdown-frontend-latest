import React from 'react';
const RemarksSection = ({ remarks, onRemarksChange, onSubmit, onCancel }) => {
  return (
    <div className="remarks-section">
      <div className="remarks-title">Final Remarks</div>
      <p>
        Please note any observations, faults, leaks, safety issues, or
        other comments:
      </p>
      <textarea
        id="remarks-text"
        placeholder="Enter any remarks here..."
        value={remarks}
        onChange={(e) => onRemarksChange(e.target.value)}
      />
      <div className="submit-confirm">
        <p>Do you want to submit the checklist?</p>
        <div className="confirm-buttons">
          <button className="modal-btn" onClick={onSubmit}>
            Submit Checklist
          </button>
          <button className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default RemarksSection;
