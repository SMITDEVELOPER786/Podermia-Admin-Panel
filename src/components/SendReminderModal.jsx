import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function SendRepaymentReminderModal({ loan, onClose }) {
  const [reminderDate, setReminderDate] = useState("");
  const [message, setMessage] = useState(
    `Dear ${loan.user}, this is a reminder to complete your repayment for the loan due on ${loan.maturity}.`
  );

  const handleSubmit = () => {
    if (!reminderDate) {
      alert("Please select a reminder date.");
      return;
    }

    alert(
      `Repayment reminder sent for ${loan.user}\n` +
      `Reminder Date: ${reminderDate}\n` +
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
            Admin can send a repayment reminder to the borrower. Customize the message if needed.
          </p>

          <div className={styles.formGroup}>
            <label>Reminder Date</label>
            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className={styles.inputField}
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
