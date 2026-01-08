import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ExtendLoanTenorModal({ loan, onClose }) {
  const [newDate, setNewDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Loan tenor extended for ${loan.user} until ${newDate}. Additional interest computed automatically.`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Extend Loan Tenor - {loan.user}
        </h3>

        <button
          type="button"
          className={styles.closeModal}
          onClick={onClose}
        >
          ×
        </button>

        <div className={styles.modalBody}>
          <p>
            Extend the repayment period for the borrower. Include specific date; additional interest will be computed automatically.
          </p>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginTop: "6px",
            }}
          />
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
