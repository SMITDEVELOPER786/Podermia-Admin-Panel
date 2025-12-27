import React, { useState } from 'react';
import { X } from 'lucide-react';

const DisputeModal = ({ isOpen, onClose, loan }) => {
  const [disputeType, setDisputeType] = useState('');
  const [disputeMessage, setDisputeMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmitDispute = () => {
    // Placeholder for actual dispute logging
    console.log(`Dispute logged for Loan ID: ${loan?.id}`, { disputeType, disputeMessage });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Log Dispute - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="disputeType">Dispute Type:</label>
            <select
              id="disputeType"
              value={disputeType}
              onChange={(e) => setDisputeType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '4px'
              }}
            >
              <option value="">Select Dispute Type</option>
              <option value="Payment Error">Payment Error</option>
              <option value="Incorrect Charges">Incorrect Charges</option>
              <option value="Fraud Claim">Fraud Claim</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="disputeMessage">Dispute Details:</label>
            <textarea
              id="disputeMessage"
              value={disputeMessage}
              onChange={(e) => setDisputeMessage(e.target.value)}
              placeholder="Enter dispute details..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                marginTop: '4px'
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button
            style={{
              marginLeft: '12px',
              backgroundColor: '#FF9800',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleSubmitDispute}
          >
            Log Dispute
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeModal;
