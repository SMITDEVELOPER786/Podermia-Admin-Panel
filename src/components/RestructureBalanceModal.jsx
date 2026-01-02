import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function RestructureOutstandingBalanceModal({ loan, onClose }) {
  const [newPrincipal, setNewPrincipal] = useState(loan.principal);
  const [newTenor, setNewTenor] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!newTenor || !reason) {
      alert("Please provide new tenor and reason for restructuring.");
      return;
    }

    alert(
      `Outstanding balance restructured for ${loan.user}\n` +
      `New Principal: ₦${newPrincipal.toLocaleString()}\n` +
      `New Tenor: ${newTenor} months\n` +
      `Reason: ${reason}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Restructure Outstanding Balance - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can restructure the outstanding balance of this loan. Update principal, tenor, and provide reason.
          </p>

          <div className={styles.formGroup}>
            <label>New Principal</label>
            <input
              type="number"
              value={newPrincipal}
              onChange={(e) => setNewPrincipal(Number(e.target.value))}
              className={styles.inputField}
              placeholder="New principal amount"
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Tenor (Months)</label>
            <input
              type="number"
              value={newTenor}
              onChange={(e) => setNewTenor(e.target.value)}
              className={styles.inputField}
              placeholder="Enter new tenor in months"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={styles.textareaField}
              placeholder="Reason for restructuring"
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Restructure</button>
        </div>
      </div>
    </div>
  );
}
