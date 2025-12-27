import React, { useState } from 'react';
import { X } from 'lucide-react';

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
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="repaymentAmount">Repayment Amount:</label>
            <input
              type="number"
              id="repaymentAmount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '4px'
              }}
            />
          </div>

          <div>
            <label htmlFor="paymentDate">Payment Date:</label>
            <input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '4px'
              }}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button
            style={{
              marginLeft: '12px',
              backgroundColor: '#3f51b5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={handleSubmitRepayment}
          >
            Post Repayment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualRepaymentModal;
