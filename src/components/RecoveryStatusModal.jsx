import React from 'react';
import styles from '../css/RecoveryStatusModal.module.css';

export default function RecoveryStatusModal({ loan, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3>Assign Recovery Status</h3>
        <select>
          <option>Notice of Loan Default</option>
          <option>Collateral Set-off</option>
          <option>Recovery Agents Assigned</option>
          <option>Legal Action</option>
          <option>Credit Bureau Watchlist</option>
        </select>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
         <button
  className={styles.primary}
  onClick={() => {
    console.log(`Assigned recovery status for Loan ID: ${loan?.id}`);
    onClose();
  }}
>
  Assign Status
</button>

        </div>
      </div>
    </div>
  );
}
