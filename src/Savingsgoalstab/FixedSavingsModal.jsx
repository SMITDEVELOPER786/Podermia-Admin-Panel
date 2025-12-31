import styles from "../css/SavingGoals.module.css";

export default function FixedSavingsModal({ plan, onClose }) {
  if (!plan) return null;

  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  return (
    <div className={styles.modalOverlay} onClick={safeOnClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div>
            <h3>Fixed Savings Plan</h3>
            <span className={styles.subText}>Plan ID: {plan.id}</span>
          </div>
          <button className={styles.closeBtn} onClick={safeOnClose}>
            ×
          </button>
        </div>

        {/* MODAL BODY */}
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
                <span className={styles[`${plan.status.toLowerCase()}Badge`]}>
                  {plan.status}
                </span>
              </div>
            </div>
          </div>

          {/* PLAN DETAILS */}
          <div className={styles.section}>
            <h4>Plan Details</h4>
            <div className={styles.infoGrid}>
              <div>
                <label>Principal</label>
                <p>₦{Number(plan.amount).toLocaleString()}</p>
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
              <div>
                <label>Auto-Rollover</label>
                <p>{plan.autoRollover ? "Yes" : "No"}</p>
              </div>
              <div>
                <label>Penalty Rate</label>
                <p>{plan.penaltyRate ? `${plan.penaltyRate}%` : "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
