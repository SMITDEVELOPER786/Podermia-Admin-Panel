import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function EarlyWithdrawalsModal({ request, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: request.status,
    amount: request.amount,
    penalty: request.penalty,
  });

  const handleSave = () => {
    const updatedRequest = { ...request, ...formData };
    onSave(updatedRequest);
    setEditMode(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Early Withdrawal Request</h3>
          <span className={styles.subText}>Request ID: {request.id}</span>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.section}>
            <h4>User Information</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>User</label>
                <p>{request.user}</p>
              </div>
              <div>
                <label>Saving Plan</label>
                <p>{request.plan}</p>
              </div>
              <div>
                <label>Request Date</label>
                <p>{request.date}</p>
              </div>
              <div>
                <label>Status</label>
                {!editMode ? (
                  <p>{request.status}</p>
                ) : (
                  <select
                    className={styles.statusDropdown}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Financial Information</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>Amount</label>
                {!editMode ? (
                  <p>₦{Number(request.amount).toLocaleString()}</p>
                ) : (
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                )}
              </div>
              <div>
                <label>Penalty</label>
                {!editMode ? (
                  <p>₦{Number(request.penalty).toLocaleString()}</p>
                ) : (
                  <input
                    type="number"
                    value={formData.penalty}
                    onChange={(e) =>
                      setFormData({ ...formData, penalty: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
            {!editMode && (
              <button
                className={styles.editBtn}
                onClick={() => setEditMode(true)}
              >
                Edit Request
              </button>
            )}
          </div>

          {editMode && (
            <div className={styles.actionRow}>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save Changes
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
