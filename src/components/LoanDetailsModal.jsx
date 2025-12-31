import React from "react";
import styles from "../css/loanmodal.module.css";

export default function LoanDetailsModal({ loan, onClose }) {
  if (!loan) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Loan Details</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.detailGrid}>
            <div>
              <label>User Name</label>
              <p>{loan.user}</p>
            </div>

            <div>
              <label>Account ID</label>
              <p>{loan.acc}</p>
            </div>

            <div>
              <label>Outstanding Amount</label>
              <p>₦{loan.outstanding.toLocaleString()}</p>
            </div>

            <div>
              <label>Days Past Due</label>
              <p>{loan.days} days</p>
            </div>

            <div>
              <label>Collateral Type</label>
              <p>{loan.collateral}</p>
            </div>

            <div>
              <label>Loan Status</label>
              <p className={styles.statusBadge}>Defaulted</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.extraInfo}>
            <h4>Loan Summary</h4>
            <p>
              This loan is currently under default management. Recovery actions,
              penalty adjustments, bureau reporting and repayment postings can be
              managed using the actions menu.
            </p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
