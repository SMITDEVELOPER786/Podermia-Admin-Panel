import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function FixedSavingsModal({ plan, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    ...plan,
  });

  const saveChanges = () => {
    onSave(formData);   // 🔥 parent ko update
    setEditMode(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3>Fixed Savings Plan</h3>
            <span className={styles.subText}>Plan ID: {plan.id}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          {/* USER INFO */}
          <div className={styles.section}>
            <h4>User Information</h4>

            <div className={styles.infoGrid}>
              <div>
                <label>User Name</label>
                <p>{plan.user}</p>
              </div>

              <div>
                <label>Status</label>
                {!editMode ? (
                  <span className={styles[`${plan.status.toLowerCase()}Badge`]}>
                    {plan.status}
                  </span>
                ) : (
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className={styles.statusDropdown}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* PLAN DETAILS */}
          <div className={styles.section}>
            <h4>Plan Details</h4>

            {!editMode ? (
              <>
                <div className={styles.infoGrid}>
                  <div>
                    <label>Principal</label>
                    <p>₦{plan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label>Interest</label>
                    <p>{plan.interest}</p>
                  </div>
                  <div>
                    <label>Duration</label>
                    <p>{plan.duration}</p>
                  </div>
                  <div>
                    <label>Maturity</label>
                    <p>{plan.maturity}</p>
                  </div>
                </div>

                <button
                  className={styles.editBtn}
                  onClick={() => setEditMode(true)}
                >
                  Edit Plan
                </button>
              </>
            ) : (
              <>
                <div className={styles.formGrid}>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                  <input
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                  />
                  <input
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={formData.maturity}
                    onChange={(e) =>
                      setFormData({ ...formData, maturity: e.target.value })
                    }
                  />
                </div>

                <div className={styles.actionRow}>
                  <button className={styles.saveBtn} onClick={saveChanges}>
                    Save Changes
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
