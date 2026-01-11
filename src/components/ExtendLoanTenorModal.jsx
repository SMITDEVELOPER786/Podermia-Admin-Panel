import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ExtendLoanTenorModal({ loan, onClose, onConfirm }) {
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!newDate) {
      setError("Please select a new maturity date.");
      return;
    }

    setError("");

    if (onConfirm) {
      onConfirm({
        loanId: loan.userId,
        user: loan.user,
        oldMaturity: loan.maturity,
        newMaturity: newDate,
      });
    }

    // Close modal automatically
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxHeight: "auto", overflow: "visible" }}>
        <h3 className={styles.modalHeader}>
          Extend Loan Tenor - {loan.user}
        </h3>

        <button type="button" className={styles.closeModal} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalBody} style={{ overflow: "visible" }}>
          <p>
            Extend the repayment period for the borrower. Select a new maturity date. <strong style={{color: "blue"}}>Additional interest will be computed automatically.</strong>
          </p>

          <table style={{ width: "100%", margin: "10px 0", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td><strong>Principal:</strong></td>
                <td>₦{loan.principal.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Balance:</strong></td>
                <td>₦{loan.balance.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Current Maturity:</strong></td>
                <td>{loan.maturity}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{loan.status}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "10px 0" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>New Maturity Date:</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{
                width: "200px",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
