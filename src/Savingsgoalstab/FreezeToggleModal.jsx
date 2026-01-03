import styles from "../css/fixedsavingsmodals.module.css";

export default function FreezeToggleModal({ plan, onSave, onClose }) {
  if (!plan) return null;

  const isFrozen = plan.status === "Frozen";

  const handleToggle = () => {
    onSave({
      ...plan,
      status: isFrozen ? "Active" : "Frozen",
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isFrozen ? "Unfreeze Savings Plan" : "Freeze Savings Plan"}</h2>

        {/* Toggle UI */}
        <div className={styles.toggleWrapper}>
          <div
            className={`${styles.toggleSwitch} ${
              isFrozen ? styles.frozen : styles.active
            }`}
            onClick={handleToggle}
          >
            <div className={styles.toggleKnob}></div>
          </div>
          <span className={styles.toggleLabel}>
            {isFrozen ? "Frozen" : "Active"}
          </span>
        </div>

        <p className={styles.warning}>
          {isFrozen
            ? "Unfreezing will allow normal transactions to continue."
            : "Freezing will temporarily block withdrawals and early termination."}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
