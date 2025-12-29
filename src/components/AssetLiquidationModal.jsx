import React from "react";
import styles from "../css/collateral.module.css";

export default function AssetLiquidationModal({ loan, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h3>Asset Liquidation Enforcement</h3>
        <p>Loan: {loan.user} - {loan.asset}</p>
        <label>
          Select Method:
          <select>
            <option>Full Liquidation</option>
            <option>Partial Liquidation</option>
          </select>
        </label>
        <button className={styles.primaryBtn} onClick={onClose}>Initiate Enforcement</button>
      </div>
    </div>
  );
}
