import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../css/WaivePenaltiesModal.module.css';

const WaivePenaltiesModal = ({ isOpen, onClose, loan }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleWaive = () => {
    console.log(`Penalties waived for Loan ID: ${loan?.id}`, { reason });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Waive Penalties - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="reason">Reason for waiver:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            className={styles.textAreaInput}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleWaive}>Waive Pealties</button>
        </div>
      </div>
    </div>
  );
};

export default WaivePenaltiesModal;
