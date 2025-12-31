import React from 'react';
import { X } from 'lucide-react';
import styles from '../css/CloseLoanModal.module.css';

export default function CloseLoanModal({ loan, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Close Loan - {loan?.user}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="closeStatus">Select Closure Type:</label>
          <select
            id="closeStatus"
            className={styles.selectInput}
          >
            <option value="recovered">Recovered</option>
            <option value="collateral">Settled via Collateral</option>
          </select>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={onClose}>Close Loan</button>
        </div>
      </div>
    </div>
  );
}
