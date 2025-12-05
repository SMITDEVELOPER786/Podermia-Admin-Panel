import React from 'react'
import styles from '../css/Investment.module.css'
import { ArrowLeft, UploadIcon } from 'lucide-react'

const FailureCenter = ({ onBack }) => {
  const failuresList = [
    {
      id: 1,
      name: 'Corporate Bond Series B',
      payoutId: 'PO-001',
      amount: 2500000000,
      investors: 50,
      retries: 0,
      reason: 'Insufficient bank liquidity',
      errorCode: 'BANK_001',
      severity: 'high'
    },
    {
      id: 2,
      name: 'T-Bill 91 Days Batch A',
      payoutId: 'PO-002',
      amount: 750000000,
      investors: 15,
      retries: 1,
      reason: 'Network timeout during processing',
      errorCode: 'NET_002',
      severity: 'medium'
    }
  ]

  return (
    <div className={styles.failureCenterContainer}>
      <div className={styles.backAndExport}>
          <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={24} />
        </button>

        <button className={styles.exportButton}><UploadIcon size={20}/>Export</button>
    
      </div>
      <div className={styles.failureCenterHeader}>
        
        <div className={styles.failureCenterTitleSection}>
          <span className={styles.failureCenterIcon}>⚠</span>
          <div>
            <h2 className={styles.failureCenterTitle}>Payout Failure Management</h2>
            <p className={styles.failureCenterSubtitle}>Monitor, manage, and resolve payout failures</p>
          </div>
        </div>
      </div>

      <div className={styles.failuresList}>
        {failuresList.map(failure => (
          <div key={failure.id} className={styles.failureCard}>
            <div className={styles.failureCardHeader}>
              <div className={styles.failureCardTitle}>
                <span className={styles.alertIcon}>⚠</span>
                <h4>{failure.name}</h4>
              </div>
            </div>
            <div className={styles.failureCardMeta}>
              <span>ID: {failure.payoutId}</span>
              <span>Amount: ₦{failure.amount.toLocaleString()}</span>
              <span>Investors: {failure.investors}</span>
              <span>Retries: {failure.retries}</span>
            </div>
            <div className={styles.failureCardBody}>
              <div className={styles.failureDetails}>
                <div className={styles.failureDetailsSection}>
                  <h5>Failure Details</h5>
                  <div className={styles.failureDetailItem}>
                    <span className={styles.detailLabel}>Reason:</span>
                    <span className={styles.detailValue}>{failure.reason}</span>
                  </div>
                  <div className={styles.failureDetailItem}>
                    <span className={styles.detailLabel}>Error Code:</span>
                    <span className={styles.detailValue}>{failure.errorCode}</span>
                  </div>
                  <div className={styles.failureDetailItem}>
                    <span className={styles.detailLabel}>Severity:</span>
                    <span className={`${styles.severityBadge} ${failure.severity === 'high' ? styles.severityHigh : styles.severityMedium}`}>
                      {failure.severity}
                    </span>
                  </div>
                </div>
                <div className={styles.failureActionsSection}>
                  <h5>Quick Actions</h5>
                  <div className={styles.failureActionButtons}>
                    <button className={styles.retryNowBtn}>Retry Now</button>
                    <button className={styles.notifyInvestorBtn}>Notify Investor</button>
                    <button className={styles.viewDetailsBtn}>View details</button>
                    <button className={styles.generateReportBtn}>Generate Report</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FailureCenter
