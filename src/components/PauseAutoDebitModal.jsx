import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function PauseAutoDebitModal({ loan, onClose }) {
  const [reason, setReason] = useState("");
  const [pauseDays, setPauseDays] = useState("");

  const handleSubmit = () => {
    if (!reason || !pauseDays) {
      alert("Please provide reason and number of days to pause auto-debit.");
      return;
    }

    alert(
      `Auto-debit paused for ${loan.user}\nDays: ${pauseDays}\nReason: ${reason}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Pause Auto-Debit - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can pause the auto-debit for this loan temporarily. Enter the number of days and reason.
          </p>

          <div className={styles.formGroup}>
            <label>Pause Days</label>
            <input
              type="number"
              value={pauseDays}
              onChange={(e) => setPauseDays(e.target.value)}
              placeholder="Enter number of days"
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for pausing auto-debit"
              className={styles.textareaField}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Pause Auto-Debit</button>
        </div>
      </div>
    </div>
  );
}
