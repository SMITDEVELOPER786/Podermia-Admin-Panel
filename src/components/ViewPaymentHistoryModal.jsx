import React from "react";
import styles from "../css/LoanListModal.module.css";

export default function ViewPaymentHistoryModal({ loan, onClose }) {
  const payments = [
    { date: "2026-01-10", amount: 50000, method: "Bank Transfer" },
    { date: "2026-01-15", amount: 25000, method: "Auto Debit" },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Payment History - {loan.user}</h3>
        <button className={styles.closeModal} onClick={onClose}>×</button>

        <div className={styles.modalBody}>
          <p><strong>Loan ID:</strong> {loan.userId}</p>
          <p><strong>Total Paid:</strong> ₦ {payments.reduce((a,b)=>a+b.amount,0).toLocaleString()}</p>
          <p><strong>Outstanding Balance:</strong> ₦ {loan.balance.toLocaleString()}</p>

          <h4>Payment Transactions</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i}>
                  <td>{p.date}</td>
                  <td>₦ {p.amount.toLocaleString()}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
