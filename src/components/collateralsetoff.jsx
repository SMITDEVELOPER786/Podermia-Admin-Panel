// src/components/collateralsetoff.jsx
import React from "react";
import styles from "../css/collateralsetoff.module.css";

export default function CollateralSetoffModal({ loan, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3>Collateral Set-Off</h3>
        <p>Choose how collateral should be set-off for this loan account.</p>

        <select>
          <option>Use collateral to settle balance</option>
          <option>Partial set-off</option>
        </select>

        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button className={styles.primary} onClick={onClose}>Apply Action</button>
        </div>
      </div>
    </div>
  );
}
