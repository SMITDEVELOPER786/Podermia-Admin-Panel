import { useState } from "react";
import styles from "../css/UpdateGoalRatesModal.module.css";

export default function UpdateGoalRatesModal({ rates, onClose, onSave }) {
  const [editableRates, setEditableRates] = useState([...rates]);

  const handleRateChange = (index, value) => {
    const updated = [...editableRates];
    updated[index].rate = value;
    setEditableRates(updated);
  };

  const handleSave = () => {
    localStorage.setItem("goalRates", JSON.stringify(editableRates));
    onSave(editableRates);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h3 className={styles.heading}>Update Goal Savings Rates</h3>
        <div className={styles.modalContent}>
          {editableRates.map((item, i) => (
            <div key={i} className={styles.modalRateItem}>
              <span>{item.month}</span>
              <input
                type="text"
                value={item.rate}
                onChange={(e) => handleRateChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.updateBtn} onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
