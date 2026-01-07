// File: RestructureOutstandingBalanceModal.jsx
import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function RestructureOutstandingBalanceModal({ loan, onClose }) {
  const [newPrincipal, setNewPrincipal] = useState(loan.principal);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [maturityDate, setMaturityDate] = useState(loan.maturity);
  const [newRate, setNewRate] = useState(loan.rate.replace("%", ""));
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!effectiveDate || !maturityDate || !newRate || !reason) {
      alert("Please fill all fields before submitting.");
      return;
    }

    alert(
      `Outstanding balance restructured for ${loan.user}\n` +
      `New Principal: ₦${Number(newPrincipal).toLocaleString()}\n` +
      `Effective Date: ${effectiveDate}\n` +
      `New Maturity Date: ${maturityDate}\n` +
      `Interest Rate: ${newRate}%\n` +
      `Reason: ${reason}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Restructure Outstanding Balance - {loan.user}
        </h3>

        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can restructure the outstanding balance of this loan. Update principal, interest rate, effective date, maturity date, and provide reason.
          </p>

          <div className={styles.formGroup}>
            <label>New Principal</label>
            <input
              type="number"
              value={newPrincipal}
              onChange={(e) => setNewPrincipal(Number(e.target.value))}
              className={styles.inputField}
              placeholder="Enter new principal"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Effective Date</label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Maturity Date</label>
            <input
              type="date"
              value={maturityDate}
              onChange={(e) => setMaturityDate(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Interest Rate (%)</label>
            <input
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              className={styles.inputField}
              placeholder="Enter new interest rate"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={styles.textareaField}
              placeholder="Enter reason for restructuring"
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onClose}>
            Restructure
          </button>
        </div>
      </div>
    </div>
  );
}
