import React, { useState } from 'react';
import { X } from 'lucide-react';

const AutoDebitRetryModal = ({ isOpen, onClose, loan }) => {
  const [retryCount, setRetryCount] = useState(1);

  if (!isOpen) return null;

  const handleRetry = () => {
    console.log(`Auto-debit retry triggered for Loan ID: ${loan?.id}`, { retryCount });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Trigger Auto-Debit Retry - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="retryCount">Number of Retry Attempts:</label>
          <input
            type="number"
            id="retryCount"
            min={1}
            max={5}
            value={retryCount}
            onChange={(e) => setRetryCount(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '4px'
            }}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button
            style={{
              marginLeft: '12px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoDebitRetryModal;
