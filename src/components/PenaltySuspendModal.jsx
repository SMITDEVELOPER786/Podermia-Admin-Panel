import React from "react";
import styles from "../css/penaltysuspend.module.css"; // update path if needed

export default function PenaltySuspendModal({ loan, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>Suspend / Waive Penalties</h3>
        <p className={styles.modalText}>
          Choose how penalties should be handled for <strong>{loan?.user}</strong>'s loan account.
        </p>

        <select className={styles.modalSelect}>
          <option value="suspend">Suspend further penalties</option>
          <option value="waive">Waive all accumulated penalties</option>
        </select>

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={onClose}>Apply Action</button>
        </div>
      </div>
    </div>
  );
}
