import { useState } from "react";
import styles from "../css/updaterates.module.css";

export default function UpdateRatesModal({ rates, toggles, onClose, onSave }) {
  const [editableRates, setEditableRates] = useState([...rates]);
  const [editableToggles, setEditableToggles] = useState({ ...toggles });

  const handleRateChange = (index, value) => {
    const updated = [...editableRates];
    updated[index].rate = value;
    setEditableRates(updated);
  };

  const handleToggleChange = (key) => {
    setEditableToggles({ ...editableToggles, [key]: !editableToggles[key] });
  };

  const handleSave = () => {
    localStorage.setItem("fixedRates", JSON.stringify(editableRates));
    localStorage.setItem("fixedToggles", JSON.stringify(editableToggles));
    onSave(editableRates, editableToggles);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h3 className={styles.heading}>Update Fixed Savings Rates</h3>

        <div className={styles.modalContent}>
          <h4 className={styles.subHeading}>Rates</h4>
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

          <h4 className={styles.subHeading}>Payout Methods</h4>
          {Object.keys(editableToggles).map((key) => (
            <div key={key} className={styles.toggleItem}>
              <span>{key}</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={editableToggles[key]}
                  onChange={() => handleToggleChange(key)}
                />
                <span className={styles.slider}></span>
              </label>
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
