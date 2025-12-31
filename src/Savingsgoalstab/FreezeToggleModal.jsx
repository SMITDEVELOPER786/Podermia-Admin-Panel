import styles from "../css/fixedsavingsmodals.module.css";

export default function FreezeToggleModal({ plan, onSave, onClose }) {
  const isFrozen = plan.status === "Frozen";

  const handleToggle = () => {
    onSave({
      ...plan,
      status: isFrozen ? "Active" : "Frozen",
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{isFrozen ? "Unfreeze Savings Plan" : "Freeze Savings Plan"}</h2>

        <div className={styles.statusBox}>
          Current Status:
          <span className={`${styles.status} ${isFrozen ? styles.frozen : styles.active}`}>
            {plan.status}
          </span>
        </div>

        <p className={styles.warning}>
          {isFrozen
            ? "Unfreezing will allow normal transactions to continue."
            : "Freezing will temporarily block withdrawals and early termination."}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button
            className={isFrozen ? styles.save : styles.freezeBtn}
            onClick={handleToggle}
          >
            {isFrozen ? "Unfreeze Plan" : "Freeze Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
