// File: AdjustRepaymentScheduleModal.jsx
import React, { useState } from "react";
import styles from "../css/LoanListModal.module.css";

export default function AdjustRepaymentScheduleModal({ loan, onClose }) {
  const [schedule, setSchedule] = useState([
    { installment: 1, amount: loan.principal / 3, dueDate: loan.maturity },
    { installment: 2, amount: loan.principal / 3, dueDate: loan.maturity },
    { installment: 3, amount: loan.principal / 3, dueDate: loan.maturity },
  ]);

  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
    setError(""); // Clear error on input change
  };

  const addInstallment = () => {
    setSchedule([
      ...schedule,
      { installment: schedule.length + 1, amount: 0, dueDate: loan.maturity },
    ]);
  };

  const removeInstallment = (index) => {
    const updated = schedule.filter((_, idx) => idx !== index);
    setSchedule(updated);
  };

  const handleSubmit = () => {
    const invalid = schedule.some(
      (row) => row.amount === "" || row.amount <= 0 || !row.dueDate
    );

    if (invalid) {
      setError("All fields must be filled with valid values.");
      return;
    }

    console.log("Updated Repayment Schedule:", {
      user: loan.user,
      loanId: loan.userId,
      schedule,
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>
          Adjust Repayment Schedule – {loan.user}
        </h3>

        <button type="button" className={styles.closeModal} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalBody}>
          <p>
            Admin can modify installment amounts and due dates for this loan. You can also add or remove installment rows.
          </p>

          <table className={styles.scheduleTable}>
            <thead>
              <tr>
                <th>Installment</th>
                <th>Amount (₦)</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx}>
                  <td data-label="Installment">{row.installment}</td>
                  <td data-label="Amount">
                    <input
                      type="number"
                      min="0"
                      value={row.amount}
                      onChange={(e) =>
                        handleChange(idx, "amount", e.target.value)
                      }
                      className={styles.scheduleInput}
                      placeholder="Enter amount"
                    />
                  </td>
                  <td data-label="Due Date">
                    <input
                      type="date"
                      value={row.dueDate}
                      onChange={(e) =>
                        handleChange(idx, "dueDate", e.target.value)
                      }
                      className={styles.scheduleInput}
                    />
                  </td>
                  <td data-label="Action">
                    {schedule.length > 1 && (
                      <button
                        className={styles.removeRowButton}
                        onClick={() => removeInstallment(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className={styles.addRowButton}
            onClick={addInstallment}
            style={{ marginTop: "10px" }}
          >
            + Add Installment Row
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={onClose}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
