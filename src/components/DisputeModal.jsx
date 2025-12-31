import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../css/DisputeModal.module.css';

const DisputeModal = ({ isOpen, onClose, loan }) => {
  const [disputeType, setDisputeType] = useState('');
  const [disputeMessage, setDisputeMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmitDispute = () => {
    console.log(`Dispute logged for Loan ID: ${loan?.id}`, { disputeType, disputeMessage });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Log Dispute - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="disputeType">Dispute Type:</label>
          <select
            id="disputeType"
            value={disputeType}
            onChange={(e) => setDisputeType(e.target.value)}
            className={styles.selectInput}
          >
            <option value="">Select Dispute Type</option>
            <option value="Payment Error">Payment Error</option>
            <option value="Incorrect Charges">Incorrect Charges</option>
            <option value="Fraud Claim">Fraud Claim</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="disputeMessage" style={{ marginTop: '12px' }}>Dispute Details:</label>
          <textarea
            id="disputeMessage"
            value={disputeMessage}
            onChange={(e) => setDisputeMessage(e.target.value)}
            placeholder="Enter dispute details..."
            className={styles.textAreaInput}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleSubmitDispute}>Log Dispute</button>
        </div>
      </div>
    </div>
  );
};

export default DisputeModal;
