import React, { useState } from 'react'
import styles from '../css/SystemSetting.module.css'
import Toast from '../components/Toast/Toast'
import { RotateCcw, Save, Upload } from 'lucide-react'

const GeneralSetting = () => {
  const [appName, setAppName] = useState('Podermonie')
  const [timezone, setTimezone] = useState('UTC')
  const [companyLogo, setCompanyLogo] = useState(null)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('')
  const [maxLoginAttempt, setMaxLoginAttempt] = useState('')
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [adminAuditLogin, setAdminAuditLogin] = useState(false)
  const [ipWhitelisting, setIpWhitelisting] = useState(false)
  const [criticalActionsDisabled, setCriticalActionsDisabled] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        setToast({
          type: 'error',
          title: 'Invalid File Type',
          message: 'Please upload a valid image file (JPEG, PNG, GIF)'
        })
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          type: 'error',
          title: 'File Too Large',
          message: 'Image size must be less than 5MB'
        })
        return
      }
      setCompanyLogo(file)
      setErrors(prev => ({ ...prev, companyLogo: '' }))
    }
  }

  const handleInputChange = (field, value) => {
    // Clear error when user types
    setErrors(prev => ({ ...prev, [field]: '' }))

    switch(field) {
      case 'appName':
        setAppName(value)
        break
      case 'timezone':
        setTimezone(value)
        break
      case 'sessionTimeout':
        // Only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
          setSessionTimeout(value)
        } else {
          setErrors(prev => ({ ...prev, sessionTimeout: 'Only numbers are allowed' }))
        }
        break
      case 'maxLoginAttempt':
        // Only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
          setMaxLoginAttempt(value)
        } else {
          setErrors(prev => ({ ...prev, maxLoginAttempt: 'Only numbers are allowed' }))
        }
        break
      default:
        break
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // App Name validation
    if (!appName.trim()) {
      newErrors.appName = 'App name is required'
    } else if (appName.trim().length < 3) {
      newErrors.appName = 'App name must be at least 3 characters'
    }

    // Session Timeout validation
    if (!sessionTimeout.trim()) {
      newErrors.sessionTimeout = 'Session timeout is required'
    } else if (parseInt(sessionTimeout) < 1) {
      newErrors.sessionTimeout = 'Session timeout must be at least 1 minute'
    } else if (parseInt(sessionTimeout) > 1440) {
      newErrors.sessionTimeout = 'Session timeout cannot exceed 1440 minutes (24 hours)'
    }

    // Max Login Attempt validation
    if (!maxLoginAttempt.trim()) {
      newErrors.maxLoginAttempt = 'Max login attempt is required'
    } else if (parseInt(maxLoginAttempt) < 1) {
      newErrors.maxLoginAttempt = 'Max login attempt must be at least 1'
    } else if (parseInt(maxLoginAttempt) > 10) {
      newErrors.maxLoginAttempt = 'Max login attempt cannot exceed 10'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleResetToDefault = () => {
    setAppName('Podermonie')
    setTimezone('UTC')
    setCompanyLogo(null)
    setMaintenanceMode(false)
    setSessionTimeout('')
    setMaxLoginAttempt('')
    setTwoFactorAuth(false)
    setAdminAuditLogin(false)
    setIpWhitelisting(false)
    setCriticalActionsDisabled(false)
    setErrors({})
    setToast({
      type: 'success',
      title: 'Reset Successful',
      message: 'All settings have been reset to default'
    })
  }

  const handleSaveChanges = () => {
    if (validateForm()) {
      setToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'All changes have been saved successfully'
      })
    } else {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields correctly'
      })
    }
  }

  const handleExport = (type) => {
    setToast({
      type: 'success',
      title: 'Export Started',
      message: `Exporting ${type}...`
    })
  }

  return (
    <div className={styles.generalSettingContainer}>
      {/* General Setting Section */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>General Setting</h3>
            <p className={styles.sectionSubtitle}>Manage core application settings</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetBtn} onClick={handleResetToDefault}>
              <RotateCcw size={16} /> Reset to Default
            </button>
            <button className={styles.saveBtn} onClick={handleSaveChanges}>
              <Save size={16} /> Save all Changes
            </button>
          </div>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.inputGroup}>
            <label>App Name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => handleInputChange('appName', e.target.value)}
              className={`${styles.inputField} ${errors.appName ? styles.inputError : ''}`}
            />
            {errors.appName && <span className={styles.errorText}>{errors.appName}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Default Timezone</label>
            <select
              value={timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className={styles.selectField}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="GMT">GMT</option>
              <option value="IST">IST</option>
            </select>
          </div>
        </div>

        <div className={`${styles.inputGroup} ${styles.logoUploadGroup}`}>
          <label>Company Logo Upload</label>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
            <div className={styles.fileInputDisplay}>
              <span>{companyLogo ? companyLogo.name : 'No file choosen'}</span>
              <button
                className={styles.fileInputBtn}
                onClick={() => document.getElementById('logoUpload').click()}
                type="button"
              >
                <Upload size={16} />
                Choose
              </button>
            </div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <h4>Maintenance Mode</h4>
            <p className={styles.toggleDesc}>Enable to put The System in Maintenance mode</p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
      </div>

      {/* Security Setting Section */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <h3>Security Setting</h3>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.inputGroup}>
            <label>Session Timeout (minutes)</label>
            <input
              type="text"
              value={sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
              className={`${styles.inputField} ${errors.sessionTimeout ? styles.inputError : ''}`}
              placeholder="e.g., 30"
            />
            {errors.sessionTimeout && <span className={styles.errorText}>{errors.sessionTimeout}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Max Login Attempt</label>
            <input
              type="text"
              value={maxLoginAttempt}
              onChange={(e) => handleInputChange('maxLoginAttempt', e.target.value)}
              className={`${styles.inputField} ${errors.maxLoginAttempt ? styles.inputError : ''}`}
              placeholder="e.g., 3"
            />
            {errors.maxLoginAttempt && <span className={styles.errorText}>{errors.maxLoginAttempt}</span>}
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <h4>Two-Factor Authentication Required</h4>
            <p className={styles.toggleDesc}>Required 2FA for all users logins</p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <h4>Admin Audit Login</h4>
            <p className={styles.toggleDesc}>Log all admin actions for compliance</p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={adminAuditLogin}
              onChange={(e) => setAdminAuditLogin(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <h4>IP whitelisting for Admin Panel</h4>
            <p className={styles.toggleDesc}>Restrict admin access to specific IP addresses</p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={ipWhitelisting}
              onChange={(e) => setIpWhitelisting(e.target.checked)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>

        <div className={styles.warningBox}>
          <div className={styles.toggleRow}>
            <div>
              <h4>Critical Actions Disabled</h4>
              <p className={styles.toggleDesc}>Disable critical system operations for maintenance or security</p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={criticalActionsDisabled}
                onChange={(e) => setCriticalActionsDisabled(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>
      </div>

      {/* Regulatory & Compliance Export Section */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <h3>Regulatory & Compliance Export</h3>
          <p className={styles.sectionSubtitle}>Export system configuration and audit logs for regulatory review and internal compliance</p>
        </div>

        <div className={styles.exportButtons}>
          <button className={styles.exportBtn} onClick={() => handleExport('Audit Logs')}>
            Export Logs
          </button>
          <button className={styles.exportBtn} onClick={() => handleExport('PDF Report')}>
            Export PDF Report
          </button>
          <button className={styles.exportBtn} onClick={() => handleExport('Compliance Setup')}>
            Download compliance setup
          </button>
        </div>
      </div>

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

export default GeneralSetting
