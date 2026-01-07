import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function AdjustPostingDateModal({ loan, repayment, onClose, onConfirm }) {
  // repayment = the specific repayment object
  const [newDate, setNewDate] = useState("");

  const handleSubmit = () => {
    if (!repayment || !newDate) return;

    // Call parent function with details
    if (onConfirm) {
      onConfirm({
        loanId: loan.userId,
        user: loan.user,
        repaymentId: repayment.id,
        oldDate: repayment.date,
        newDate,
      });
    }

    console.log("Repayment posting date adjusted", {
      user: loan.user,
      repaymentId: repayment.id,
      oldDate: repayment.date,
      newDate,
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Adjust Repayment Posting Date - {loan.user}
        </h3>

        <button className={styles.closeModal} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalBody}>
          {repayment ? (
            <p>
              Change the posting date for repayment of <strong>₦{repayment.amount.toLocaleString()}</strong> originally recorded on <strong>{repayment.date}</strong>.
            </p>
          ) : (
            <p>Please select a repayment to adjust.</p>
          )}

          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginTop: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={onClose}
            disabled={!newDate || !repayment}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
