import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ReverseRepaymentModal({ loan, repayment, onClose, onConfirm }) {
  // repayment = the specific repayment object to reverse
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call parent function with loan, repayment, and reason
    if (onConfirm) {
      onConfirm({
        loanId: loan.userId,
        user: loan.user,
        repaymentId: repayment?.id, // link to the specific repayment
        amount: repayment?.amount,
        reason,
      });
    }

    console.log("Repayment reversed", {
      user: loan.user,
      repaymentId: repayment?.id,
      amount: repayment?.amount,
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
          {repayment ? (
            <p>
              You are about to reverse the repayment of <strong>₦{repayment.amount.toLocaleString()}</strong> made on <strong>{repayment.date}</strong>.
            </p>
          ) : (
            <p>
              Select a specific repayment to reverse.
            </p>
          )}

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for reversal"
            style={{
              width: "100%",
              height: "80px",
              padding: "6px",
              marginTop: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc",
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
            disabled={!reason || !repayment} 
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
