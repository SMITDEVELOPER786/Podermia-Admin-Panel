import styles from "../css/AutoDebitFailedModal.module.css";

export default function AutoDebitFailedModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.alertIcon}>⚠</span>
            <div>
              <h3 style={{fontWeight: 700}}>Auto-Debit Failed</h3>
              <p style={{color: "#675F5F"}}>Urgent Action Required</p>
            </div>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.criticalBox}>
          <strong>⚠ Critical:</strong>
          <p>
            Auto-debit payment failed. Collateral liquidation will begin in 3
            days if payment is not resolved.
          </p>
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <h4>Account Details</h4>
            <ul>
              <li><span>User:</span><strong>John Doe</strong></li>
              <li><span>Account ID:</span><strong>ACC001</strong></li>
              <li><span>Loan Amount:</span><strong>₦400,000</strong></li>
            </ul>
          </div>

          <div>
            <h4>Failure Details</h4>
            <ul>
              <li><span>Due Date:</span><strong>2025-01-15</strong></li>
              <li><span>Next Attempt:</span><strong>2025-01-16</strong></li>
              <li>
                <span>Reason:</span>
                <strong className={styles.red}>Insufficient funds in linked account</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.warningBox}>
          <h4>Collateral at Risk</h4>
          <div className={styles.table}>
            <div>
              <span>Asset Type: </span>
              <strong>Saving Vault</strong>
            </div>
            <div>
              <span>Value: </span>
              <strong>₦625,000</strong>
            </div>
          </div>
        </div>

        <div className={styles.timelineBox}>
          <h4>Liquidation Timeline</h4>
          <p>
            If payment is not resolved within 3 days, the collateral liquidation
            process will automatically begin according to standard procedures.
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.primaryBlue}>Contact User & resolve</button>
          <button className={styles.secondary}>Mark as reviewed</button>
          <button className={styles.primaryRed}>Initiate Liquidation Process</button>
        </div>

      </div>
    </div>
  );
}
