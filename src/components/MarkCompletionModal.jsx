import React from "react";
import styles from "../css/collateral.module.css";

export default function MarkCompletionModal({ loan, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h3>Mark Enforcement Completion</h3>
        <p>Loan: {loan.user} - {loan.asset}</p>
        <button className={styles.primaryBtn} onClick={onClose}>Mark Completed</button>
      </div>
    </div>
  );
}
