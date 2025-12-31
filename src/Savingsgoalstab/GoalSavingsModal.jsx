import styles from "../css/SavingGoals.module.css";

export default function GoalSavingsModal({ plan, onClose }) {
  if (!plan) return null;

  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  return (
    <div className={styles.modalOverlay} onClick={safeOnClose}>
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
          <button className={styles.closeBtn} onClick={safeOnClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* USER INFORMATION */}
          <div className={styles.section}>
            <h4>User Information</h4>

            <div className={styles.infoGrid}>
              <div>
                <label>User</label>
                <p>{plan.user}</p>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={styles[`${plan.status.toLowerCase()}Badge`]}
                >
                  {plan.status}
                </span>
              </div>

              <div>
                <label>Goal Type</label>
                <p>{plan.type || "-"}</p>
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

            <div className={styles.infoGrid}>
              <div>
                <label>Target Amount</label>
                <p>₦{Number(plan.target).toLocaleString()}</p>
              </div>

              <div>
                <label>Current Amount</label>
                <p>₦{Number(plan.current).toLocaleString()}</p>
              </div>

              <div>
                <label>Interest Rate</label>
                <p>{plan.interest || "-"}</p>
              </div>

              <div>
                <label>Maturity Date</label>
                <p>{plan.maturity || "-"}</p>
              </div>

              <div>
                <label>Penalty Rate</label>
                <p>{plan.penaltyRate ? `${plan.penaltyRate}%` : "-"}</p>
              </div>

              <div>
                <label>Auto-Rollover</label>
                <p>{plan.autoRollover ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
