import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function AdjustPostingDateModal({ loan, repayment, onClose, onConfirm }) {
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!repayment || !newDate) {
      setError("Please fill all the fields.");
      return;
    }

    if (onConfirm) {
      onConfirm({
        loanId: loan.userId,
        user: loan.user,
        repaymentId: repayment.id,
        oldDate: repayment.date,
        newDate,
        amount: repayment.amount,
        status: repayment.status,
      });
    }

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
            <>
              <div style={{ marginBottom: "10px" }}>
                <strong>Repayment Details:</strong>
                <table style={{ width: "100%", marginTop: "6px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "2px" }}>Amount</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "2px" }}>Date</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "2px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "4px" }}>₦ {repayment.amount.toLocaleString()}</td>
                      <td style={{ padding: "4px" }}>{repayment.date}</td>
                      <td style={{ padding: "4px" }}>{repayment.status || "Paid"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <label htmlFor="newDate"><strong>New Posting Date:</strong></label>
              <input
                id="newDate"
                type="date"
                value={newDate}
                onChange={(e) => {
                  setNewDate(e.target.value);
                  if (error) setError("");
                }}
                style={{
                  width: "100%",
                  padding: "6px",
                  marginTop: "6px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </>
          ) : (
            <p>Please select a specific repayment to adjust.</p>
          )}

          {error && (
            <p style={{ color: "red", marginTop: "6px", fontWeight: "bold" }}>
              {error}
            </p>
          )}
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
