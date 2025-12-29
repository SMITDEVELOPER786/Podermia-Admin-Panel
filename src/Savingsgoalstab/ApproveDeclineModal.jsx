import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function ApproveDeclineModal({ request, onClose, onSave }) {
  const [status, setStatus] = useState(request.status);

  const handleAction = (newStatus) => {
    setStatus(newStatus);
    onSave({ ...request, status: newStatus });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3>Early Withdrawal Request</h3>
            <span className={styles.subText}>Request ID: {request.id}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          {/* Request Details */}
          <div className={styles.section}>
            <h4>User Details</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>User</label>
                <p>{request.user}</p>
              </div>
              <div>
                <label>Amount</label>
                <p>₦{Number(request.amount).toLocaleString()}</p>
              </div>
              <div>
                 
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Actions</h4>
            <div className={styles.actionRow}>
              <button
                className={styles.saveBtn}
                onClick={() => handleAction("Approved")}
              >
                Approve
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => handleAction("Declined")}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
