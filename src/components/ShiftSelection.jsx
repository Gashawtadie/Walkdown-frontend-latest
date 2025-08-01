import React, { useState, useEffect } from 'react';
const ShiftSelection = ({ position, onShiftSelect, onBack }) => {
  const [shiftType, setShiftType] = useState('');
  const [weekendShiftType, setWeekendShiftType] = useState('morning-12hr');
  const [date, setDate] = useState('');
  useEffect(() => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);
  const handleProceed = () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    onShiftSelect({
      shiftType,
      weekendShiftType,
      date,
    });
  };
  const isWeekend = shiftType === 'weekend';
  return (
    <div className="shift-selection">
      <h2 id="shift-selection-title">
        {position === 'operator' ? 'Operator' : 'Shift Manager'} - Select Your Shift
      </h2>
      <div className="timestamp" id="shift-select-time">
        Last updated: {new Date().toLocaleString()}
      </div>
      <div className="form-group">
        <label>Shift Type:</label>
        <select
          id="shift-type"
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value)}
        >
          {position === 'operator' ? (
            <>
              <option value="">Select Shift</option>
              <option value="morning">Morning Shift @ 9:00</option>
              <option value="evening">Evening Shift @ 16:00</option>
              <option value="night">Night Shift @ 00:00</option>
              <option value="weekend">Weekend Shift</option>
            </>
          ) : (
            <>
              <option value="">Select Shift</option>
              <option value="morning">Morning Shift @ 16:00</option>
              <option value="evening">Evening Shift @ 21:00</option>
              <option value="night">Night Shift @ 4:30</option>
              <option value="weekend">Weekend Shift</option>
            </>
          )}
        </select>
      </div>
      {isWeekend && (
        <div className="form-group weekend-shift">
          <label>Weekend Shift Type:</label>
          <select
            id="weekend-shift-type"
            value={weekendShiftType}
            onChange={(e) => setWeekendShiftType(e.target.value)}
          >
            <option value="morning-12hr">Morning @ 9:00</option>
            <option value="night-12hr">Night @ 21:00</option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="checklist-date">Date:</label>
        <input
          type="date"
          id="checklist-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleProceed}>Proceed to Walkdown</button>
      <button className="secondary" onClick={onBack}>Back to Position Selection</button>
    </div>
  );
};
export default ShiftSelection;
