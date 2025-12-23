import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function GoalSavingsModal({ plan, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    ...plan,
  });

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div>
            <h3>Goal Savings Details</h3>
            <span className={styles.subText}>
              Goal ID: {plan.id}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* USER INFO – TABLE STYLE */}
          <div className={styles.section}>
            <h4>User Information</h4>

            <div className={styles.infoGrid}>
              <div>
                <label>User</label>
                <p>{plan.user}</p>
              </div>

              <div>
                <label>Status</label>
                {editMode ? (
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className={styles.statusDropdown}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span
                    className={
                      styles[`${plan.status.toLowerCase()}Badge`]
                    }
                  >
                    {plan.status}
                  </span>
                )}
              </div>

              <div>
                <label>Goal Type</label>
                <p>{plan.type}</p>
              </div>

              <div>
                <label>Auto Debit</label>
                <p>{plan.autoDebit ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
          </div>

          {/* GOAL DETAILS */}
          <div className={styles.section}>
            <h4>Goal Details</h4>

            {!editMode ? (
              <>
                <div className={styles.infoGrid}>
                  <div>
                    <label>Target Amount</label>
                    <p>
                      ₦{plan.target.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label>Current Amount</label>
                    <p>
                      ₦{plan.current.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label>Progress</label>
                    <p>{plan.progress}</p>
                  </div>
                </div>

                <button
                  className={styles.editBtn}
                  onClick={() => setEditMode(true)}
                >
                  Edit Goal
                </button>
              </>
            ) : (
              <>
                <div className={styles.formGrid}>
                  <input
                    type="number"
                    value={formData.target}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        target: +e.target.value,
                      })
                    }
                    placeholder="Target Amount"
                  />

                  <input
                    type="number"
                    value={formData.current}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        current: +e.target.value,
                      })
                    }
                    placeholder="Current Amount"
                  />
                </div>

                <div className={styles.actionRow}>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSave}
                  >
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
