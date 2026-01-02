import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function MarkRepaymentModal({ loan, onClose }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Instead of alert, log to console
    console.log(`Marked ₦${amount} as received on ${date} for ${loan.user}`);
    // Close the modal
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Mark Repayment Received - {loan.user}
        </h3>
        <button className={styles.closeModal} onClick={onClose}>
          ×
        </button>

        <form className={styles.modalBody} onSubmit={handleSubmit}>
          <p>Manually confirm repayment received from the borrower.</p>

          <div style={{ marginBottom: "10px" }}>
            <label>Amount Received:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Date Received:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
              required
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
            <button type="submit" className={styles.confirmButton}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
