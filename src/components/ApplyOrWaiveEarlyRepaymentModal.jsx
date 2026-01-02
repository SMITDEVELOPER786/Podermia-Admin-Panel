// File Name: ApplyOrWaiveEarlyRepaymentModal.jsx

import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ApplyOrWaiveEarlyRepaymentModal({ loan, onClose }) {
  const [penalty, setPenalty] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    // Validation: Reason is required
    if (!reason.trim()) {
      console.log("Error: Reason is required for early repayment approval");
      return; // stops execution if reason is empty
    }

    // Professional handling: log details instead of alert
    console.log("Early Repayment Processed:", {
      user: loan.user,
      loanId: loan.userId,
      penalty: penalty || 0,
      reason,
    });

    // Close the modal
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Apply or Waive Early Repayment – {loan.user}
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
            Admin can apply or waive early repayment penalties for this loan. Enter the penalty if applicable and provide a reason.
          </p>

          <div className={styles.formGroup}>
            <label>Penalty Amount (₦)</label>
            <input
              type="number"
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              className={styles.inputField}
              placeholder="Enter penalty amount or leave blank to waive"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={styles.textareaField}
              placeholder="Enter reason for applying or waiving penalty"
            />
          </div>
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
