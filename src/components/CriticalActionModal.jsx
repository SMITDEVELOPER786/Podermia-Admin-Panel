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
              <p>Manage critical loan operations and system-wide actions</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Status Card */}
        <div className={styles.riskCard}>
          <div>
            <h4>{paused ? "System Status" : "Collateral at Risk"}</h4>

            <p>
              {paused && (
                <span className={styles.blackWarning}>⚠ </span>
              )}
              {paused
                ? "Critical actions are paused. New loan approvals, disbursements, and system modifications are temporarily disabled."
                : "Critical actions are currently active"}
            </p>
          </div>

          <span className={paused ? styles.pausedBadge : styles.activeBadge}>
            {paused ? "PAUSED" : "Active"}
          </span>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <h5>Affected Operations:</h5>
          <ul>
            <li>Loan approvals and rejections</li>
            <li>Fund disbursements</li>
            <li>Collateral modifications</li>
            <li>System configuration changes</li>
          </ul>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={paused ? styles.resumeBtn : styles.pauseBtn}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume Operation" : "Pause Operation"}
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
