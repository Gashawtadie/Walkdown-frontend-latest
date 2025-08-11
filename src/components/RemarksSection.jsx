import React, { useEffect, useRef } from 'react';

const RemarksSection = ({
  remarks,
  onRemarksChange,
  onSubmit,
  onCancel,
  visible, // Pass this prop to control visibility
}) => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      textareaRef.current?.focus();
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="remarks-section" ref={containerRef}>
      <div className="remarks-title">Final Remarks</div>
      <p>
        Please note any observations, faults, leaks, safety issues, or other comments:
      </p>
      <textarea
        id="remarks-text"
        ref={textareaRef}
        placeholder="Enter any remarks here..."
        value={remarks}
        onChange={(e) => onRemarksChange(e.target.value)}
        style={{ width: '100%', minHeight: 100, padding: 10, borderRadius: 4, border: '1px solid #ddd', resize: 'vertical' }}
      />
      <div className="submit-confirm">
        <p>Do you want to submit the checklist?</p>
        <div className="confirm-buttons" style={{ display: 'flex', gap: 10 }}>
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
