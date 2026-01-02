import React, { useState, useEffect } from "react";
import styles from "../css/LoanListModal.module.css";

export default function ChangeRepaymentChannelModal({ loan, onClose }) {
  const [channel, setChannel] = useState(loan.channel || "Bank Transfer");
  const [channels, setChannels] = useState([
    "Bank Transfer",
    "Direct Debit",
    "Mobile Money",
    "Cash Payment",
    "POS Payment",
  ]);

  const handleSubmit = () => {
    alert(`Repayment channel for ${loan.user} changed to: ${channel}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Change Repayment Channel - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can change the repayment channel for this loan. Select the preferred channel from the list below.
          </p>

          <div className={styles.formGroup}>
            <label>Select Repayment Channel</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className={styles.inputField}
            >
              {channels.map((ch, idx) => (
                <option key={idx} value={ch}>{ch}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Current Channel</label>
            <input
              type="text"
              value={loan.channel || "Not Set"}
              disabled
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Change Channel</button>
        </div>
      </div>
    </div>
  );
}
