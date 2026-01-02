import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ResumeAutoDebitModal({ loan, onClose }) {
  const [resumeDate, setResumeDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!resumeDate) {
      alert("Please select a resume date.");
      return;
    }

    alert(
      `Auto-debit resumed for ${loan.user}\n` +
      `Resume Date: ${resumeDate}\n` +
      `Notes: ${notes}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Resume Auto-Debit - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can resume auto-debit for this loan. Select the date from which auto-debit should resume.
          </p>

          <div className={styles.formGroup}>
            <label>Resume Date</label>
            <input
              type="date"
              value={resumeDate}
              onChange={(e) => setResumeDate(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes related to resuming auto-debit"
              className={styles.textareaField}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Resume Auto-Debit</button>
        </div>
      </div>
    </div>
  );
}
