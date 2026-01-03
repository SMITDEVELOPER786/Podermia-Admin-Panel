import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";

export default function FixedSavingsModal({ plan, onClose, onSave }) {
  if (!plan) return null;

  // safety
  const safeOnSave = typeof onSave === "function" ? onSave : () => {};
  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...plan });

  useEffect(() => {
    setFormData({ ...plan });
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    safeOnSave({
      ...formData,
      amount: Number(formData.amount),
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
            <h3>Fixed Savings Plan</h3>
            <span className={styles.subText}>Plan ID: {plan.id}</span>
          </div>

          <div className={styles.headerActions}>
            {!isEditing ? (
              <button
                className={styles.primaryBtn}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <button
                className={styles.primaryBtn}
                onClick={handleSave}
              >
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

          {/* USER INFO */}
          <div className={styles.section}>
            <h4>User Information</h4>

            <div className={styles.infoGrid}>
              <div>
                <label>User Name</label>
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
                    <option value="Approved">Approved</option>
                    <option value="Matured">Matured</option>
                  </select>
                ) : (
                  <span className={styles[`${plan.status.toLowerCase()}Badge`]}>
                    {plan.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* PLAN DETAILS */}
          <div className={styles.section}>
            <h4>Plan Details</h4>

            <div className={styles.infoGrid}>
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
                <label>Amount</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  <p>₦{Number(plan.amount).toLocaleString()}</p>
                )}
              </div>

              <div>
                <label>Interest</label>
                {isEditing ? (
                  <input
                    name="interest"
                    value={formData.interest || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.interest}</p>
                )}
              </div>

              <div>
                <label>Duration</label>
                {isEditing ? (
                  <input
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.duration}</p>
                )}
              </div>

              <div>
                <label>Maturity</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="maturity"
                    value={formData.maturity || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{plan.maturity}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
