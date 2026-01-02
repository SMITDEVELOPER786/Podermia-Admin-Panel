import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function GrantMoratoriumModal({ loan, onClose }) {
  const [moratoriumDays, setMoratoriumDays] = useState(0);
  const [reason, setReason] = useState("");
  const [impact, setImpact] = useState("");

  const calculateImpact = (days) => {
    if (!days) return "";
    // Example calculation: extend maturity by given days
    const maturityDate = new Date(loan.maturity);
    maturityDate.setDate(maturityDate.getDate() + Number(days));
    return `New Maturity Date: ${maturityDate.toISOString().split("T")[0]}`;
  };

  const handleDaysChange = (e) => {
    setMoratoriumDays(e.target.value);
    setImpact(calculateImpact(e.target.value));
  };

  const handleSubmit = () => {
    if (!moratoriumDays || !reason) {
      alert("Please provide moratorium days and reason.");
      return;
    }

    alert(
      `Moratorium granted for ${loan.user}\nDays: ${moratoriumDays}\nReason: ${reason}\n${impact}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Grant Moratorium - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can grant a moratorium to this loan. Enter the number of days and reason for granting.
          </p>

          <div className={styles.formGroup}>
            <label>Moratorium Days</label>
            <input
              type="number"
              value={moratoriumDays}
              onChange={handleDaysChange}
              className={styles.inputField}
              placeholder="Enter number of days"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={styles.textareaField}
              placeholder="Reason for moratorium"
            />
          </div>

          {impact && (
            <div className={styles.impactText}>
              <strong>{impact}</strong>
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Grant Moratorium</button>
        </div>
      </div>
    </div>
  );
}
