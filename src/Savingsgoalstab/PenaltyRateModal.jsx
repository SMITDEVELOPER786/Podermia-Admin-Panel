import { useState } from "react";
import styles from "../css/fixedsavingsmodals.module.css";

export default function PenaltyRateModal({ plan, onSave, onClose }) {
  const [penaltyRate, setPenaltyRate] = useState(plan.penaltyRate || "");

  const handleSave = () => {
    if (penaltyRate === "" || penaltyRate < 0) {
      // Optional: replace alert with inline error
      return;
    }

    onSave({
      ...plan,
      penaltyRate,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Early Termination Penalty</h2>

        <p className={styles.infoText}>
          This penalty applies when a user exits the savings plan before maturity.
        </p>

        <label>Penalty Rate (%)</label>
        <input
          type="number"
          value={penaltyRate}
          onChange={(e) => setPenaltyRate(e.target.value)}
          min="0"
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSave}>Update Penalty</button>
        </div>
      </div>
    </div>
  );
}
