import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function FlagLoanForManualMonitoringModal({ loan, onClose }) {
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedOfficer, setAssignedOfficer] = useState("");

  const officers = [
    "John Admin",
    "Mary Manager",
    "Ali Supervisor",
    "Fatima Officer"
  ];

  const handleSubmit = () => {
    if (!reason || !assignedOfficer) {
      alert("Please provide reason and assign an officer!");
      return;
    }

    alert(
      `Loan flagged for manual monitoring.\nUser: ${loan.user}\nReason: ${reason}\nPriority: ${priority}\nAssigned Officer: ${assignedOfficer}`
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Flag Loan for Manual Monitoring - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p>
            Admin can flag this loan for manual monitoring. Provide reason, priority, and assign an officer.
          </p>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for manual monitoring"
              className={styles.textareaField}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={styles.inputField}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Assign Officer</label>
            <select
              value={assignedOfficer}
              onChange={(e) => setAssignedOfficer(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Select Officer</option>
              {officers.map((officer, idx) => (
                <option key={idx} value={officer}>{officer}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.confirmButton} onClick={onClose}>Flag Loan</button>
        </div>
      </div>
    </div>
  );
}
