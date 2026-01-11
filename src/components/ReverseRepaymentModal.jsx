import React, { useState, useEffect } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ReverseRepaymentModal({ loan, onClose, onConfirm }) {
  const [repayments, setRepayments] = useState([]);
  const [selectedRepaymentId, setSelectedRepaymentId] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Simulate fetching repayments for this specific loan
  useEffect(() => {
    const loanRepayments = [
      { id: "R-101", name: "Instalment 1", amount: 50000, date: "2025-07-01", status: "Active" },
      { id: "R-102", name: "Instalment 2", amount: 50000, date: "	2024-08-15", status: "Repaid" },
      { id: "R-103", name: "Instalment 3", amount: 750000, date: "2025-06-01", status: "Overdue" },
    ];
    setRepayments(loanRepayments);
  }, [loan]);

  const selectedRepayment = repayments.find(r => r.id === selectedRepaymentId);

  const handleSubmit = () => {
    if (!selectedRepaymentId || !reason.trim()) {
      setError("Please fill all fields before confirming.");
      return;
    }

    const payload = {
      loanId: loan.userId,
      user: loan.user,
      repaymentId: selectedRepayment.id,
      amount: selectedRepayment.amount,
      date: selectedRepayment.date,
      status: selectedRepayment.status,
      reason,
    };

    console.log("Repayment reversed", payload);
    if (onConfirm) onConfirm(payload);

    // Show inline success message in modal
    setSuccessMessage(`Repayment for ${selectedRepayment.name} successfully linked to ${loan.user}`);

    // Clear inputs after short delay
    setTimeout(() => {
      setSelectedRepaymentId("");
      setReason("");
      setError("");
      setSuccessMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: "550px" }}>
        <h3 className={styles.modalHeader}>
          Reverse Repayment – {loan.user}
        </h3>

        <button className={styles.closeModal} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalBody}>
          <label>Select Repayment to Reverse:</label>
          <select
            value={selectedRepaymentId}
            onChange={(e) => {
              setSelectedRepaymentId(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "6px",
              marginTop: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select Repayment --</option>
            {repayments.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {selectedRepayment && (
            <div style={{ marginTop: "10px", padding: "8px", backgroundColor: "#f0f4f8", borderRadius: "4px" }}>
              <p><strong>Amount:</strong> ₦{selectedRepayment.amount.toLocaleString()}</p>
              <p><strong>Date:</strong> {selectedRepayment.date}</p>
              <p><strong>Status:</strong> {selectedRepayment.status}</p>
            </div>
          )}

          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
            placeholder="Enter reason for reversal"
            style={{
              width: "100%",
              height: "80px",
              padding: "6px",
              marginTop: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          {error && (
            <p style={{ color: "red", marginTop: "8px", fontWeight: "bold" }}>
              {error}
            </p>
          )}

          {successMessage && (
            <p style={{ color: "green", marginTop: "8px", fontWeight: "bold" }}>
              {successMessage}
            </p>
          )}
        </div>

        <div className={styles.modalActions} style={{ marginTop: "12px" }}>
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
