import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../css/BureauModal.module.css';

const BureauModal = ({ isOpen, onClose, loan }) => {
  const [bureauStatus, setBureauStatus] = useState('');
  const [reportingNote, setReportingNote] = useState('');

  if (!isOpen) return null;

  const handleSubmitBureau = () => {
    console.log(`Bureau status updated for Loan ID: ${loan?.id}`, { bureauStatus, reportingNote });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        <div className={styles.modalHeader}>
          <h3>Update Bureau Status - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="bureauStatus">Bureau Status:</label>
            <select
              id="bureauStatus"
              value={bureauStatus}
              onChange={(e) => setBureauStatus(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">Select Status</option>
              <option value="Reported">Reported</option>
              <option value="Pending">Pending</option>
              <option value="Cleared">Cleared</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reportingNote">Notes / Comments:</label>
            <textarea
              id="reportingNote"
              value={reportingNote}
              onChange={(e) => setReportingNote(e.target.value)}
              placeholder="Enter any notes or remarks..."
              className={styles.textAreaInput}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleSubmitBureau}>Update Bureau</button>
        </div>
      </div>
    </div>
  );
};

export default BureauModal;
