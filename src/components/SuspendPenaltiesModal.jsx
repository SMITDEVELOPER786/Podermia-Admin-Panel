import React, { useState } from 'react';
import { X } from 'lucide-react';

const SuspendPenaltiesModal = ({ isOpen, onClose, loan }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSuspend = () => {
    console.log(`Penalties suspended for Loan ID: ${loan?.id}`, { reason });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Suspend Further Penalties - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="reason">Reason for suspension:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '4px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button
            style={{
              marginLeft: '12px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleSuspend}
          >
            Suspend Penalties
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendPenaltiesModal;
