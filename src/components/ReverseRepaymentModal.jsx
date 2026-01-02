import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ReverseRepaymentModal({ loan, onClose }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 

  
    console.log("Repayment reversed", {
      user: loan.user,
      reason,
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Reverse Repayment - {loan.user}
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
            Admin can reverse a repayment that was applied incorrectly.
          </p>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for reversal"
            style={{
              width: "100%",
              height: "80px",
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
