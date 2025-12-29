import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../css/ManualRepaymentModal.module.css';

const ManualRepaymentModal = ({ isOpen, onClose, loan }) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  if (!isOpen) return null;

  const handleSubmitRepayment = () => {
    console.log(`Manual repayment posted for Loan ID: ${loan?.id}`, { amount, paymentDate });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Post Manual Repayment - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="repaymentAmount">Repayment Amount:</label>
          <input
            type="number"
            id="repaymentAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className={styles.inputField}
          />

          <label htmlFor="paymentDate" style={{ marginTop: '12px' }}>Payment Date:</label>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleSubmitRepayment}>Post Repayment</button>
        </div>
      </div>
    </div>
  );
};

export default ManualRepaymentModal;
