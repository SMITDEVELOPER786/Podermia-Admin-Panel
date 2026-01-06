import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";

export default function GoalSavingsModal({ plan, onClose, onSave }) {
  if (!plan) return null;

  const safeOnSave = typeof onSave === "function" ? onSave : () => {};
  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...plan });

  useEffect(() => {
    setFormData({ ...plan });
  }, [plan]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    safeOnSave({
      ...formData,
      target: Number(formData.target),
      current: Number(formData.current),
    });
    setIsEditing(false);
    safeOnClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={safeOnClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div>
            <h3>Goal Savings Details</h3>
            <span className={styles.subText}>Goal ID: {plan.id}</span>
          </div>

          {/* ACTION BUTTONS */}
          <div className={styles.headerActions}>
            {!isEditing ? (
              <button
                className={styles.primaryBtn}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <button className={styles.primaryBtn} onClick={handleSave}>
                Save
              </button>
            )}

            <button className={styles.closeBtn} onClick={safeOnClose}>
              ×
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className={styles.modalBody}>

          {/* USER INFORMATION */}
          <div className={styles.section}>
            <h4>User Information</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>User</label>
                {isEditing ? (
                  <input
                    name="user"
                    value={formData.user || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.user}</p>
                )}
              </div>

              <div>
                <label>Status</label>
                {isEditing ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Matured">Matured</option>
                    <option value="Approved">Approved</option>
                  </select>
                ) : (
                  <span className={styles[`${plan.status.toLowerCase()}Badge`]}>
                    {plan.status}
                  </span>
                )}
              </div>

<div>
      <label>Start Date</label>
      {isEditing ? (
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ""}
          onChange={handleChange}
        />
      ) : (
        <p>{plan.startDate || "-"}</p>
      )}
    </div>
              <div>
                <label>Goal Type</label>
                {isEditing ? (
                  <input
                    name="type"
                    value={formData.type || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.type || "-"}</p>
                )}
              </div>

              <div>
                <label>Auto Debit</label>
                {isEditing ? (
                  <input
                    type="checkbox"
                    name="autoDebit"
                    checked={formData.autoDebit}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.autoDebit ? "Enabled" : "Disabled"}</p>
                )}
              </div>
            </div>
          </div>

          {/* GOAL DETAILS */}
          <div className={styles.section}>
            <h4>Goal Details</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>Target Amount</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="target"
                    value={formData.target || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>₦{Number(plan.target).toLocaleString()}</p>
                )}
              </div>

              <div>
                <label>Current Amount</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="current"
                    value={formData.current || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>₦{Number(plan.current).toLocaleString()}</p>
                )}
              </div>

              <div>
                <label>Interest Rate</label>
                {isEditing ? (
                  <input
                    name="interest"
                    value={formData.interest || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.interest || "-"}</p>
                )}
              </div>

              <div>
                <label>Maturity Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="maturity"
                    value={formData.maturity || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.maturity || "-"}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
