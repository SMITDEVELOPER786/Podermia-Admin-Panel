import styles from "../css/OverrideLogModal.module.css";

export default function OverrideLogModal({ onClose }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Override Log Details</h2>
            <p>Complete audit trail for KYC override action</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.row}>
            <div>
              <span>Date</span>
              <p>2021-01-16</p>
            </div>
            <div>
              <span>Time</span>
              <p>14:30:25</p>
            </div>
            <button className={styles.statusBtn}>Status Override</button>
          </div>

          <div className={styles.row}>
            <div>
              <span>Affected User</span>
              <p>John Doe</p>
            </div>
            <div>
              <span>Performed By</span>
              <p>Admin John Doe</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Change Summary</h4>

          <div className={styles.summaryBox}>
            <span className={styles.label}>Previous Value</span>
            <p className={styles.pending}>Pending</p>
          </div>

          <div className={styles.summaryBox}>
            <span className={styles.label}>New Value</span>
            <p className={styles.approved}>Approved</p>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Reason For Override</h4>
          <input type="text" value="Manual Review Completed" disabled />
        </div>

        <div className={styles.section}>
          <h4>Detailed Description</h4>
          <textarea
            rows="3"
            disabled
            value="User met all KYC requirements after manual document verification. All submitted documents were authentic and matched the user profile."
          />
        </div>

        <div className={styles.auditBox}>
          <p><strong>Audit Trail ID:</strong> I-674057</p>
          <p><strong>Permission Level:</strong> Senior Admin</p>
          <p><strong>IP Address:</strong> 192.168.1.152</p>
          <p><strong>Session ID:</strong> SES-MJD7409Q</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.exportBtn}>Export Details</button>
          <button className={styles.downloadBtn}>Download audit reports</button>
        </div>
      </div>
    </div>
  );
}
