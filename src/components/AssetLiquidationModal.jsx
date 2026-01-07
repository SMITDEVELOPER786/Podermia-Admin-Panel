import React, { useState } from "react";
import styles from "../css/collateral.module.css";

export default function AssetLiquidationModal({ loan, onClose }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    // yahan baad me API / logic laga sakte ho
    console.log("Enforcement Amount:", amount);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        <h3>Record Enforcement (Set-off)</h3>

        <p>
          <strong>Loan:</strong> {loan.user} <br />
          <strong>Asset:</strong> {loan.asset}
        </p>

        <label>
          Amount to be enforced
          <input
            type="number"
            placeholder="Enter enforcement amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button
          className={styles.primaryBtn}
          onClick={onClose}
          disabled={!amount}
        >
          Record Enforcement
        </button>
      </div>
    </div>
  );
}
