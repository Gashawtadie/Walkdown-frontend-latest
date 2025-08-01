import React, { useState } from 'react';
import CriticalWarningModal from './CriticalWarningModal';

const ChecklistTable = ({ items, onUpdateItem }) => {
  const [lastInteractedIndex, setLastInteractedIndex] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleValueChange = (index, value) => {
    // Check if we need to show a warning
    if (lastInteractedIndex !== null && items[index].requiresWarning) {
      setShowWarning(true);
    }
    setLastInteractedIndex(index);
    onUpdateItem(index, value);
  };

  return (
    <div>
      <CriticalWarningModal show={showWarning} onClose={() => setShowWarning(false)} />
      <table id="checklist-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>KKS</th>
            <th>Check</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.location}</td>
              <td>{item.kks}</td>
              <td>{item.check}</td>
              <td>
                {item.options ? (
                  <select
                    value={item.value || 'Select'}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  >
                    <option value="Select" disabled>Select</option>
                    {item.options.filter(option => option !== 'Select').map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="value-input-container">
                    <input
                      type={item.allowSlash ? 'text' : 'number'}
                      className="value-input"
                      placeholder={item.allowSlash ? 'e.g. -22/-15' : 'Enter value'}
                      value={item.value || ''}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                    />
                    <span className="unit-label">{item.unit || ''}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChecklistTable;
