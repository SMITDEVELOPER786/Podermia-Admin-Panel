import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function CapitalizePenaltiesModal({ loan, onClose }) {
  const [penaltyAmount, setPenaltyAmount] = useState(loan.penalty || 0);
  const [capitalizedAmount, setCapitalizedAmount] = useState(loan.principal + penaltyAmount);

  const handlePenaltyChange = (value) => {
    const amount = Number(value);
    setPenaltyAmount(amount);
    setCapitalizedAmount(loan.principal + amount);
  };

  const handleSubmit = () => {
    alert(
      `Penalties capitalized for ${loan.user}.\nPenalty Amount: ₦${penaltyAmount}\nNew Principal: ₦${capitalizedAmount}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Capitalize Penalties - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can capitalize outstanding penalties into the principal of this loan.
          </p>

          <div className={styles.formGroup}>
            <label>Current Principal (₦)</label>
            <input
              type="number"
              value={loan.principal}
              disabled
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Penalty Amount (₦)</label>
            <input
              type="number"
              value={penaltyAmount}
              onChange={(e) => handlePenaltyChange(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Principal After Capitalization (₦)</label>
            <input
              type="number"
              value={capitalizedAmount}
              disabled
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Capitalize Penalties</button>
        </div>
      </div>
    </div>
  );
}
