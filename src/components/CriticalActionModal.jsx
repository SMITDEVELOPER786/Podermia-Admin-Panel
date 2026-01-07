import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "../css/CriticalActionModal.module.css";

export default function CriticalActionModal({ isOpen, onClose }) {
  const [paused, setPaused] = useState(false);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.alertIcon}>⚠</span>
            <div>
              <h3>Critical Actions Control</h3>
              <p>Pause or resume all savings-related operations</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Status Card */}
        <div className={styles.riskCard}>
          <div>
            <h4>System Status</h4>
            <p>
              {paused
                ? "All savings operations are paused. New investments, withdrawals, and system modifications are temporarily disabled."
                : "Savings system is active. Operations are running normally."}
            </p>
          </div>
          <span className={paused ? styles.pausedBadge : styles.activeBadge}>
            {paused ? "PAUSED" : "ACTIVE"}
          </span>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <h5>Affected Operations:</h5>
          <ul>
            <li>New savings deposits</li>
            <li>Withdrawals and early terminations</li>
            <li>Savings approvals</li>
            <li>System configuration changes</li>
          </ul>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={paused ? styles.resumeBtn : styles.pauseBtn}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Restart Operations" : "Pause Operations"}
          </button>

          <button
            className={styles.closeBtnSecondary}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
