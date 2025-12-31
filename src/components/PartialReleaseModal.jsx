import React from "react";
import styles from "../css/collateral.module.css";

export default function PartialReleaseModal({ loan, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h3>Partial Release of Collateral</h3>
        <p>Loan: {loan.user} - {loan.asset}</p>
        <label>
          Release Amount:
          <input type="number" placeholder="Enter amount" />
        </label>
        <button className={styles.primaryBtn} onClick={onClose}>Confirm Partial Release</button>
      </div>
    </div>
  );
}
