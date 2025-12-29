import { useState } from "react";
import styles from "../css/fixedsavingsmodals.module.css";

export default function EditGoalSavingsTermsModal({
  plan,
  onSave = () => {},
  onClose,
}) {
  const [target, setTarget] = useState(plan.target);
  const [interest, setInterest] = useState(plan.interest);
  const [maturity, setMaturity] = useState(plan.maturity);

  const handleSubmit = () => {
    onSave({
      ...plan,
      target: Number(target),
      interest,
      maturity,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Savings Terms</h2>

        <label>Target Amount</label>
        <input value={target} onChange={(e) => setTarget(e.target.value)} />

        <label>Interest</label>
        <input value={interest} onChange={(e) => setInterest(e.target.value)} />

        <label>Maturity</label>
        <input
          type="date"
          value={maturity}
          onChange={(e) => setMaturity(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
