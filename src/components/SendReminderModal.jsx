// File: SendRepaymentReminderModal.jsx
import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function SendRepaymentReminderModal({ loan, onClose }) {
  const [daysBefore, setDaysBefore] = useState(""); // Number of days before instalment
  const [message, setMessage] = useState(
    `Dear ${loan.user}, this is a reminder to complete your repayment for the upcoming loan instalment.`
  );

  const handleSubmit = () => {
    if (!daysBefore) {
      alert("Please enter the number of days before each instalment.");
      return;
    }

    alert(
      `Repayment reminder sent for ${loan.user}\n` +
      `Number of days before instalment: ${daysBefore}\n` +
      `Message: ${message}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Send Repayment Reminder - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can send a repayment reminder to the borrower. Specify how many days before each loan instalment the reminder should be sent. Customize the message if needed.
          </p>

          <div className={styles.formGroup}>
            <label>Number of Days Before Instalment</label>
            <input
              type="number"
              min="1"
              value={daysBefore}
              onChange={(e) => setDaysBefore(e.target.value)}
              className={styles.inputField}
              placeholder="Enter number of days"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textareaField}
              placeholder="Reminder message to borrower"
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Send Reminder</button>
        </div>
      </div>
    </div>
  );
}
