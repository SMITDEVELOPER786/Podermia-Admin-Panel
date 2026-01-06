import React from "react";
import styles from "../css/LoanListModal.module.css";

export default function ViewRepaymentScheduleModal({ loan, onClose }) {
  // Simulated repayment schedule
  const schedule = [
    { date: "2026-01-10", amount: 50000, status: "Paid" },
    { date: "2026-02-10", amount: 50000, status: "Pending" },
    { date: "2026-03-10", amount: 50000, status: "Pending" },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Repayment Schedule - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p><strong>Loan ID:</strong> {loan.userId}</p>
          <p><strong>Principal:</strong> ₦ {loan.principal.toLocaleString()}</p>
          <p><strong>Maturity:</strong> {loan.maturity}</p>
          <p><strong>Collateral:</strong> {loan.collateral} (₦ {loan.collateralValue.toLocaleString()})</p>

          <h4>Schedule</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>₦ {s.amount.toLocaleString()}</td>
                  <td>
                    <span className={`${styles.status} ${styles[s.status.toLowerCase()]}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: "10px", color: "#555" }}>
            This table represents the repayment installments for the selected loan.
            Admin can monitor which payments are pending or completed.
          </p>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
