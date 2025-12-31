import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../css/ReminderModal.module.css';

const ReminderModal = ({ isOpen, onClose, loan }) => {
  const [reminderMessage, setReminderMessage] = useState('');

  if (!isOpen) return null;

  const handleSendReminder = () => {
    console.log(`Reminder sent for Loan ID: ${loan?.id}`, reminderMessage);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Send Reminder - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p>Send automated in-app and email reminders to the borrower regarding this loan.</p>
          <label htmlFor="reminderMessage" style={{ marginTop: '16px' }}>Custom Message (Optional):</label>
          <textarea
            id="reminderMessage"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
            placeholder="Write a custom reminder message..."
            className={styles.textAreaInput}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleSendReminder}>Send Reminder</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
