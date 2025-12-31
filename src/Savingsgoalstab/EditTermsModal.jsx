import { useState } from "react";
import styles from "../css/fixedsavingsmodals.module.css";

export default function EditTermsModal({ plan, onSave, onClose }) {
  const [duration, setDuration] = useState(plan.duration);
  const [interest, setInterest] = useState(plan.interest);
  const [autoRollover, setAutoRollover] = useState(plan.autoRollover);

  const handleSubmit = () => {
    if (!duration || !interest) return alert("All fields are required");

    onSave({
      ...plan,
      duration,
      interest,
      autoRollover,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Savings Terms</h2>
        <p className={styles.infoText}>
          Update the savings duration, interest rate, or rollover settings.
        </p>

        <label>Duration (e.g. 6 Months)</label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label>Interest Rate (%)</label>
        <input
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />


        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
