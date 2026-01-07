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
              <p>Manage savings actions system-wide</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Status Card */}
        <div className={styles.riskCard}>
          <div>
            <h4>{paused ? "System Paused" : "Active Operations"}</h4>

            <p>
              {paused && (
                <span className={styles.blackWarning}>⚠ </span>
              )}
              {paused
                ? "All savings actions are paused. Deposits, withdrawals, auto-savings, and interest processing are temporarily disabled."
                : "Savings actions are currently active"}
            </p>
          </div>

          <span className={paused ? styles.pausedBadge : styles.activeBadge}>
            {paused ? "PAUSED" : "Active"}
          </span>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <h5>Affected Savings Operations:</h5>
          <ul>
            <li>Deposits</li>
            <li>Withdrawals</li>
            <li>Auto-savings processing</li>
            <li>Interest crediting</li>
          </ul>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={paused ? styles.resumeBtn : styles.pauseBtn}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Restart Actions" : "Pause Actions"}
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
