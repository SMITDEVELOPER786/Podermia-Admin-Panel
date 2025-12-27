import React, { useState } from 'react';
import { X } from 'lucide-react';

const BureauModal = ({ isOpen, onClose, loan }) => {
  const [bureauStatus, setBureauStatus] = useState('');
  const [reportingNote, setReportingNote] = useState('');

  if (!isOpen) return null;

  const handleSubmitBureau = () => {
    // Placeholder for actual bureau status update
    console.log(`Bureau status updated for Loan ID: ${loan?.id}`, { bureauStatus, reportingNote });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBoxLarge}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Update Bureau Status - Loan ID: {loan?.id}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="bureauStatus">Bureau Status:</label>
            <select
              id="bureauStatus"
              value={bureauStatus}
              onChange={(e) => setBureauStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '4px'
              }}
            >
              <option value="">Select Status</option>
              <option value="Reported">Reported</option>
              <option value="Pending">Pending</option>
              <option value="Cleared">Cleared</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>

          <div>
            <label htmlFor="reportingNote">Notes / Comments:</label>
            <textarea
              id="reportingNote"
              value={reportingNote}
              onChange={(e) => setReportingNote(e.target.value)}
              placeholder="Enter any notes or remarks..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                marginTop: '4px'
              }}
            />
          </div>
        </div>

        {/* Footer */}
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
            onClick={handleSubmitBureau}
          >
            Update Bureau
          </button>
        </div>
      </div>
    </div>
  );
};

export default BureauModal;
