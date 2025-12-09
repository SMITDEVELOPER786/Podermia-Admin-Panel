import React, { useState } from 'react'
import styles from '../css/SystemSetting.module.css'
import CustomModal from '../components/CustomModal/CustomModal'
import DataTables from '../components/DataTable/DataTables'
import Toast from '../components/Toast/Toast'
import { RotateCcw, Save } from 'lucide-react'

const ApiAndIntegration = () => {
  const [bitpwerAPI, setBitpwerAPI] = useState(false)
  const [smsGatewayAPI, setSmsGatewayAPI] = useState(false)
  const [emailProvideAPI, setEmailProvideAPI] = useState(false)
  const [verifyMeAPI, setVerifyMeAPI] = useState(false)
  const [paystakeIntegration, setPaystakeIntegration] = useState(false)
  const [fullterwaveIntegration, setFullterwaveIntegration] = useState(false)
  const [apiRateLimit, setApiRateLimit] = useState('1000')
  const [showDowntimeModal, setShowDowntimeModal] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})
  const [isAllOperational, setIsAllOperational] = useState(false)
  const [apiStatuses, setApiStatuses] = useState({
    'Bitpwer Payments API': 'Operational',
    'SMS Gateway API': 'Operational',
    'Email Provider API': 'Degraded',
    'VerifyMe API': 'Operational',
    'Paystack Integration': 'Down'
  })

  const [apiLogs, setApiLogs] = useState([
    {
      id: 1,
      endpoint: '/api/kyc/verify',
      status: 'Success',
      responseTime: '245ms',
      timeStamp: '1/15/2024, 3:30:00 PM'
    },
    {
      id: 2,
      endpoint: '/api/payment/process',
      status: 'Failed',
      responseTime: '1.2s',
      timeStamp: '1/15/2024, 3:25:00 PM'
    },
    {
      id: 3,
      endpoint: '/api/user/create',
      status: 'Success',
      responseTime: '156ms',
      timeStamp: '1/15/2024, 3:20:00 PM'
    }
  ])

  const handleRateLimitChange = (value) => {
    setErrors(prev => ({ ...prev, apiRateLimit: '' }))
    
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setApiRateLimit(value)
    } else {
      setErrors(prev => ({ ...prev, apiRateLimit: 'Only numbers are allowed' }))
    }
  }
  const handleResetToDefault = () => {
    setBitpwerAPI(false)
    setSmsGatewayAPI(false)
    setEmailProvideAPI(false)
    setVerifyMeAPI(false)
    setPaystakeIntegration(false)
    setFullterwaveIntegration(false)
    setApiRateLimit('1000')
    setErrors({})
    setToast({
      type: 'success',
      title: 'Reset Successful',
      message: 'All settings have been reset to default'
    })
  }

  const handleSaveChanges = () => {
    setToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'All changes have been saved successfully'
    })
  }

  const handleSimulateDowntime = () => {
    setShowDowntimeModal(true)
  }

  const handleRetry = () => {
    // Randomly decide success or failure
    const isSuccess = Math.random() > 0.5
    
    if (isSuccess) {
      // Success - restore all APIs
      setApiStatuses({
        'Bitpwer Payments API': 'Operational',
        'SMS Gateway API': 'Operational',
        'Email Provider API': 'Operational',
        'VerifyMe API': 'Operational',
        'Paystack Integration': 'Operational'
      })
      setIsAllOperational(true)
      setToast({
        type: 'success',
        title: 'Connection Restored',
        message: 'All API services reconnected successfully'
      })
    } else {
      // Failed - keep errors
      setToast({
        type: 'error',
        title: 'Retry Failed',
        message: 'Failed to reconnect API services'
      })
    }
  }

  const columns = [
    { key: 'endpoint', header: 'End Point' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => (
        <span className={row.status === 'Success' ? styles.statusSuccess : styles.statusFailed}>
          {row.status}
        </span>
      )
    },
    { key: 'responseTime', header: 'Response Time' },
    { key: 'timeStamp', header: 'Time Stamp' }
  ]

  const downtimeColumns = [
    { key: 'endpoint', header: 'End Point' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => (
        <span className={
          row.status === 'Operational' ? styles.statusOperational :
          row.status === 'Degraded' ? styles.statusDegraded :
          styles.statusDown
        }>
          {row.status}
        </span>
      )
    }
  ]

  const downtimeData = [
    { id: 1, endpoint: 'Bitpwer Payments API', status: apiStatuses['Bitpwer Payments API'] },
    { id: 2, endpoint: 'SMS Gateway API', status: apiStatuses['SMS Gateway API'] },
    { id: 3, endpoint: 'Email Provider API', status: apiStatuses['Email Provider API'] },
    { id: 4, endpoint: 'VerifyMe API', status: apiStatuses['VerifyMe API'] },
    { id: 5, endpoint: 'Paystack Integration', status: apiStatuses['Paystack Integration'] }
  ]

  return (
    <div className={styles.apiIntegrationContainer}>
      {/* Header */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>API & Integration Management</h3>
            <p className={styles.sectionSubtitle}>Configure external API integrations and monitoring</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetBtn} onClick={handleResetToDefault}>
              <RotateCcw size={16} /> Reset to Default
            </button>
            <button className={styles.saveBtn} onClick={handleSaveChanges}>
              <Save size={16} /> Save all Changes
            </button>
            <button className={styles.downtimeBtn} onClick={handleSimulateDowntime}>
              Simulate Downtie
            </button>
          </div>
        </div>

        {/* API Toggles Grid */}
        <div className={styles.apiGrid}>
          <div className={styles.apiToggleCard}>
            <div>
              <h4>Bitpwer (Payments) API</h4>
              <p>Enable Bitpwer payment processing</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={bitpwerAPI}
                onChange={(e) => setBitpwerAPI(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.apiToggleCard}>
            <div>
              <h4>SMS Gateway API</h4>
              <p>Enable SMS notifications and alerts</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={smsGatewayAPI}
                onChange={(e) => setSmsGatewayAPI(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.apiToggleCard}>
            <div>
              <h4>Email Provide API</h4>
              <p>Enable email notifications</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={emailProvideAPI}
                onChange={(e) => setEmailProvideAPI(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.apiToggleCard}>
            <div>
              <h4>VerifyMe API</h4>
              <p>Enable KYC verification services</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={verifyMeAPI}
                onChange={(e) => setVerifyMeAPI(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.apiToggleCard}>
            <div>
              <h4>Paystake Integration</h4>
              <p>Enable Paystack payment processing</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={paystakeIntegration}
                onChange={(e) => setPaystakeIntegration(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.apiToggleCard}>
            <div>
              <h4>Fullterwave Integration</h4>
              <p>Enable Flutterwave payment processing</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={fullterwaveIntegration}
                onChange={(e) => setFullterwaveIntegration(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>

        {/* API Rate Limit */}
        <div className={styles.rateLimitSection}>
          <label>API Rate limit (per hour)</label>
          <input
            type="text"
            value={apiRateLimit}
            onChange={(e) => handleRateLimitChange(e.target.value)}
            className={`${styles.inputField} ${errors.apiRateLimit ? styles.inputError : ''}`}
          />
          {errors.apiRateLimit && <span className={styles.errorText}>{errors.apiRateLimit}</span>}
        </div>
      </div>

      {/* API Logs & Monitoring */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>API Logs & Monitoring</h3>
            <p className={styles.sectionSubtitle}>Track API performance and success rates</p>
          </div>
        </div>

        <DataTables
          columns={columns}
          data={apiLogs}
          itemsPerPage={10}
        />
      </div>

      {/* Downtime Modal */}
      {showDowntimeModal && (
        <CustomModal
          isOpen={showDowntimeModal}
          onClose={() => setShowDowntimeModal(false)}
          title="API Services Currently Unavailable"
          headerIcon="⚠️"
        >
          <div className={styles.downtimeModalContent}>
            {!isAllOperational && (
              <div className={styles.noticeBox}>
                <span className={styles.noticeIcon}>⚠</span>
                <div>
                  <strong>Notice:</strong>
                  <p>External API services are temporarily unavailable. The data shown below is from our last successful cache update. Some information may not reflect the most current state.</p>
                </div>
              </div>
            )}

            <h4 className={styles.cachedDataTitle}>Cached API Status Data</h4>
            <p className={styles.lastUpdated}>Last Updated: 1/15/2024, 3:15:00 PM</p>

            <DataTables
              columns={downtimeColumns}
              data={downtimeData}
              itemsPerPage={10}
            />

            <div className={styles.recoveryBox}>
              <h4>Automatic Recovery</h4>
              <p>System will automatically reconnect when API services are restored. Data will be synchronized and updated in real-time once connectivity is re-established.</p>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.closeBtn} onClick={() => setShowDowntimeModal(false)}>
                Close
              </button>
              <button 
                className={styles.retryConnectionBtn} 
                onClick={handleRetry}
                disabled={isAllOperational}
              >
                Retry connection
              </button>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default ApiAndIntegration
