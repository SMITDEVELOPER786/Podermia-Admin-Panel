import React, { useState, useEffect } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ApproveEarlyRepaymentModal({ loan, onClose }) {
  const [repaymentAmount, setRepaymentAmount] = useState(loan.balance);
  const [penalty, setPenalty] = useState(0);
  const [totalPayable, setTotalPayable] = useState(loan.balance);

  // Calculate early repayment penalty dynamically
  useEffect(() => {
    // Example: 2% penalty for early repayment
    const calcPenalty = repaymentAmount < loan.balance ? repaymentAmount * 0.02 : 0;
    setPenalty(calcPenalty);
    setTotalPayable(Number(repaymentAmount) + calcPenalty);
  }, [repaymentAmount, loan.balance]);

  const handleSubmit = () => {
    alert(
      `Early repayment approved for ${loan.user}.\nRepayment Amount: ₦${repaymentAmount}\nPenalty: ₦${penalty}\nTotal Payable: ₦${totalPayable}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Approve Early Repayment - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can approve early repayment for this loan. Adjust repayment amount
            if necessary and the system will calculate applicable penalties.
          </p>

          <div className={styles.formGroup}>
            <label>Outstanding Balance (₦)</label>
            <input
              type="number"
              value={loan.balance}
              disabled
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Repayment Amount (₦)</label>
            <input
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(Number(e.target.value))}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Early Repayment Penalty (₦)</label>
            <input
              type="number"
              value={penalty.toFixed(2)}
              disabled
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Total Payable (₦)</label>
            <input
              type="number"
              value={totalPayable.toFixed(2)}
              disabled
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Approve Repayment</button>
        </div>
      </div>
    </div>
  );
}
