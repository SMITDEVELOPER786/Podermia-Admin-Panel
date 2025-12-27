import React, { useState } from 'react';
import { X } from 'lucide-react';

const InterestFreezeModal = ({ isOpen, onClose, loan }) => {
  const [freezeDuration, setFreezeDuration] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleApproveFreeze = () => {
    console.log(`Interest freeze approved for Loan ID: ${loan?.id}`, { freezeDuration, notes });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Approve Interest Freeze - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="freezeDuration">Freeze Duration (days):</label>
            <input
              type="number"
              id="freezeDuration"
              value={freezeDuration}
              onChange={(e) => setFreezeDuration(e.target.value)}
              placeholder="Enter duration in days"
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '4px'
              }}
            />
          </div>

          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
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
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button
            style={{
              marginLeft: '12px',
              backgroundColor: '#3f51b5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleApproveFreeze}
          >
            Approve Freeze
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestFreezeModal;
