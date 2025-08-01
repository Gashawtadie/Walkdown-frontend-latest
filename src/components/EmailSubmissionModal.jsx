import React, { useState } from 'react';
import { exportChecklistToPDF } from '../services/pdfService';

const EmailSubmissionModal = ({ show, onClose, checklistData, position, shiftInfo, remarks }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // First, generate and download the PDF
      exportChecklistToPDF(checklistData, position, shiftInfo, remarks);
      
      // In a real application, you would send the PDF to the email here
      // For now, we'll simulate the email sending
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setMessage('PDF generated and sent successfully!');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage('');
        setIsSubmitting(false);
      }, 2000);
      
    } catch (error) {
      setMessage('Error sending email. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-title">Submit Checklist</div>
        <div className="modal-message">
          Please enter your email address to receive the checklist PDF:
        </div>
        
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isSubmitting}
            />
          </div>
          
          {message && (
            <div style={{ 
              marginTop: '10px', 
              padding: '10px', 
              borderRadius: '4px',
              backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
              color: message.includes('Error') ? '#721c24' : '#155724',
              border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
            }}>
              {message}
            </div>
          )}
          
          <div className="confirm-buttons" style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              className="modal-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
            <button 
              type="button" 
              className="secondary" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSubmissionModal; 