import React, { useState } from 'react';

import { X } from 'lucide-react';

const ReminderModal = ({ isOpen, onClose, loan }) => {
  const [reminderMessage, setReminderMessage] = useState('');

  if (!isOpen) return null;

  const handleSendReminder = () => {
    // Placeholder for actual sending logic
    console.log(`Reminder sent for Loan ID: ${loan?.id}`, reminderMessage);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Send Reminder - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <p>
            Send automated in-app and email reminders to the borrower regarding this loan.
          </p>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="reminderMessage">Custom Message (Optional):</label>
            <textarea
              id="reminderMessage"
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              placeholder="Write a custom reminder message..."
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
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleSendReminder}
          >
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
