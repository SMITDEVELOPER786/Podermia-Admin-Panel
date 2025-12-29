import React from "react";
import styles from "../css/collateral.module.css";

export default function LockCollateralModal({ loan, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h3>Lock Collateral</h3>
        <p>Loan: {loan.user} - {loan.asset}</p>
        <label>
          Amount to Lock:
          <input type="number" placeholder={loan.locked} />
        </label>
        <button className={styles.primaryBtn} onClick={onClose}>Confirm Lock</button>
      </div>
    </div>
  );
}
