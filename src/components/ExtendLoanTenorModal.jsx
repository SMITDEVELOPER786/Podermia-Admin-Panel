import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ExtendLoanTenorModal({ loan, onClose }) {
  const [extraDays, setExtraDays] = useState("");

  const handleSubmit = () => {
    alert(`Loan tenor extended by ${extraDays} days for ${loan.user}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Extend Loan Tenor - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>Extend the repayment period for the borrower.</p>
          <input type="number" placeholder="Number of extra days" value={extraDays} onChange={(e)=>setExtraDays(e.target.value)} style={{ width:"100%",padding:"6px",marginTop:"6px" }} />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
