import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ReapplyRepaymentModal({ loan, onClose }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    alert(`Re-applied ₦${amount} repayment for ${loan.user} on ${date}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Re-apply Repayment - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>Re-apply repayment after correcting errors in previous payment.</p>
          <div style={{ marginBottom: "10px" }}>
            <label>Amount:</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width:"100%",padding:"6px",marginTop:"4px"}} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{width:"100%",padding:"6px",marginTop:"4px"}} />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
