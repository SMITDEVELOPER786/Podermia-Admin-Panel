import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function AdjustPostingDateModal({ loan, onClose }) {
  const [newDate, setNewDate] = useState("");

  const handleSubmit = () => {
    alert(`Repayment posting date changed for ${loan.user} to ${newDate}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Adjust Repayment Posting Date - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>Change the date when repayment will be recorded in system.</p>
          <input type="date" value={newDate} onChange={(e)=>setNewDate(e.target.value)} style={{ width:"100%",padding:"6px",marginTop:"6px" }} />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
