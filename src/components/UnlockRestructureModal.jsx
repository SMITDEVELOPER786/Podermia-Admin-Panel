import React from "react";
import styles from "../css/collateral.module.css";

export default function UnlockRestructureModal({ loan, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h3>Unlock Collateral - Approved Restructuring</h3>
        <p>Loan: {loan.user} - {loan.asset}</p>
        <button className={styles.primaryBtn} onClick={onClose}>Unlock Collateral</button>
      </div>
    </div>
  );
}
