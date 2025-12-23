import React, { useState, useRef, useEffect } from 'react'
import styles from '../css/SystemSetting.module.css'
import DataTable from '../components/DataTable/DataTables'
import Toast from '../components/Toast/Toast'
import { RotateCcw, Save, ChevronDown } from 'lucide-react'
import jsPDF from 'jspdf'

const BackupManagment = () => {
  const [backupFrequency, setBackupFrequency] = useState('Hourly')
  const [backupScope, setBackupScope] = useState('Database Only')
  const [storageDestination, setStorageDestination] = useState('AWS S3')
  const [dateRetention, setDateRetention] = useState('')
  const [toast, setToast] = useState(null)

  // Dropdown states
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false)
  const [showScopeDropdown, setShowScopeDropdown] = useState(false)
  const [showStorageDropdown, setShowStorageDropdown] = useState(false)

  // Refs for click outside detection
  const frequencyRef = useRef(null)
  const scopeRef = useRef(null)
  const storageRef = useRef(null)

  const frequencyOptions = ['Hourly', 'Daily', 'Weekly', 'Monthly']
  const scopeOptions = ['Database Only', 'Database + Files', 'Azure blob Storage']
  const storageOptions = ['AWS S3', 'Google cloud Storage', 'Azure blob Storage', 'Local Storage']

  const [backupData, setBackupData] = useState([
    {
      id: 1,
      type: 'Automatic',
      scope: 'DB + Files',
      size: '2.3GB',
      status: 'Completed',
      timestamp: '1/15/2024, 7:00:00 AM'
    },
    {
      id: 2,
      type: 'Manual',
      scope: 'DB Only',
      size: '1.8GB',
      status: 'Completed',
      timestamp: '1/14/2024, 8:30:00 PM'
    },
    {
      id: 3,
      type: 'Automatic',
      scope: 'DB + Files',
      size: '2.1GB',
      status: 'Failed',
      timestamp: '1/14/2024, 7:00:00 AM'
    }
  ])

  const handleSaveChanges = () => {
    setToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Backup configuration has been updated successfully'
    })
  }

  const handleResetToDefault = () => {
    setBackupFrequency('Hourly')
    setBackupScope('Database Only')
    setStorageDestination('AWS S3')
    setDateRetention('')
    setToast({
      type: 'info',
      title: 'Reset Complete',
      message: 'Settings have been reset to default values'
    })
  }

  const handleDateRetentionChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    
    if (value.length >= 2) {
      let month = value.slice(0, 2)
      let day = value.slice(2, 4)
      
      // Validate month (01-12)
      if (parseInt(month) > 12) {
        month = '12'
      }
      if (parseInt(month) === 0) {
        month = '01'
      }
      
      // Validate day based on month
      if (day) {
        const monthNum = parseInt(month)
        let maxDays = 31
        
        // Months with 30 days
        if ([4, 6, 9, 11].includes(monthNum)) {
          maxDays = 30
        }
        // February
        else if (monthNum === 2) {
          maxDays = 29
        }
        
        if (parseInt(day) > maxDays) {
          day = maxDays.toString().padStart(2, '0')
        }
        if (parseInt(day) === 0) {
          day = '01'
        }
        
        value = month + '/' + day
      } else {
        value = month + '/'
      }
    }
    
    // Limit to MM/DD format
    if (value.length > 5) {
      value = value.slice(0, 5)
    }
    
    setDateRetention(value)
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (frequencyRef.current && !frequencyRef.current.contains(event.target)) {
        setShowFrequencyDropdown(false)
      }
      if (scopeRef.current && !scopeRef.current.contains(event.target)) {
        setShowScopeDropdown(false)
      }
      if (storageRef.current && !storageRef.current.contains(event.target)) {
        setShowStorageDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleManualBackup = () => {
    setToast({
      type: 'success',
      title: 'Backup Started',
      message: 'Manual backup has been initiated'
    })
  }

  const handleTestConnection = () => {
    setToast({
      type: 'success',
      title: 'Connection Successful',
      message: 'Storage connection test passed'
    })
  }

  const handleRestore = (row) => {
    setToast({
      type: 'success',
      title: 'Restore Successful',
      message: `Backup from ${row.timestamp} has been restored successfully`
    })
  }

  const handleDownload = (row) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setFontSize(24)
    doc.setTextColor(255, 255, 255)
    doc.setFont(undefined, 'bold')
    doc.text('Backup Data Report', 105, 25, { align: 'center' })
    
    // Content
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.text('All backup data will be shown here', 105, 100, { align: 'center' })
    
    // Footer
    doc.setFontSize(9)
    doc.setTextColor(120, 120, 120)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 280, { align: 'center' })
    
    doc.save(`backup-${row.id}-report.pdf`)
    
    setToast({
      type: 'success',
      title: 'Download Complete',
      message: 'Backup report has been downloaded'
    })
  }

  const columns = [
    {
      header: 'Type',
      key: 'type',
    },
    {
      header: 'Scope',
      key: 'scope',
    },
    {
      header: 'Size',
      key: 'size',
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <span className={
          row.status === 'Completed' ? styles.statusCompleted :
          row.status === 'Failed' ? styles.statusFailed :
          styles.statusPending
        }>
          {row.status}
        </span>
      )
    },
    {
      header: 'Time Stamp',
      key: 'timestamp',
    },
    {
      header: 'Action',
      key: 'action',
      render: (row) => (
        <div className={styles.actionButtons}>
          <button 
            className={styles.restoreBtn}
            onClick={() => handleRestore(row)}
          >
            Restore
          </button>
          <button 
            className={styles.downloadBtn}
            onClick={() => handleDownload(row)}
          >
            Download
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.backupManagementContainer}>
      {/* Backup Configuration Section */}
      <div className={styles.backupConfigSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Backup Management</h2>
            <p className={styles.sectionSubtitle}>Configure automated backups and restore options</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetBtn} onClick={handleResetToDefault}>
              <RotateCcw size={16} />
              Reset to Default
            </button>
            <button className={styles.saveBtn} onClick={handleSaveChanges}>
              <Save size={16} />
              Save all Changes
            </button>
          </div>
        </div>

        <div className={styles.configGrid}>
          <div className={styles.configItem} ref={frequencyRef}>
            <label>Backup frequency</label>
            <div 
              className={styles.customDropdown}
              onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
            >
              <span>{backupFrequency}</span>
              <ChevronDown 
                size={18} 
                className={showFrequencyDropdown ? styles.chevronRotated : styles.chevron}
              />
            </div>
            {showFrequencyDropdown && (
              <div className={styles.dropdownMenu}>
                {frequencyOptions.map((option) => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${backupFrequency === option ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setBackupFrequency(option)
                      setShowFrequencyDropdown(false)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.configItem} ref={scopeRef}>
            <label>Backup Scope</label>
            <div 
              className={styles.customDropdown}
              onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            >
              <span>{backupScope}</span>
              <ChevronDown 
                size={18} 
                className={showScopeDropdown ? styles.chevronRotated : styles.chevron}
              />
            </div>
            {showScopeDropdown && (
              <div className={styles.dropdownMenu}>
                {scopeOptions.map((option) => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${backupScope === option ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setBackupScope(option)
                      setShowScopeDropdown(false)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.configItem} ref={storageRef}>
            <label>Storage Destination</label>
            <div 
              className={styles.customDropdown}
              onClick={() => setShowStorageDropdown(!showStorageDropdown)}
            >
              <span>{storageDestination}</span>
              <ChevronDown 
                size={18} 
                className={showStorageDropdown ? styles.chevronRotated : styles.chevron}
              />
            </div>
            {showStorageDropdown && (
              <div className={styles.dropdownMenu}>
                {storageOptions.map((option) => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${storageDestination === option ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setStorageDestination(option)
                      setShowStorageDropdown(false)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.configItem}>
            <label>Date retention (Date)</label>
            <input 
              type="text"
              value={dateRetention}
              onChange={handleDateRetentionChange}
              placeholder="mm/dd"
              maxLength="5"
              className={styles.textInput}
            />
          </div>
        </div>

        <div className={styles.actionButtonsRow}>
          {/* <button className={styles.manualBackupBtn} onClick={handleManualBackup}>
            Manual Backup
          </button> */}
          <button className={styles.testConnectionBtn} onClick={handleTestConnection}>
            Test Storage Connection
          </button>
        </div>
      </div>

      {/* Backup History Section */}
      <div className={styles.backupHistorySection}>
        <div className={styles.historyHeader}>
          <h3 className={styles.historyTitle}>Backup History & Restore Options</h3>
          <p className={styles.historySubtitle}>View backup history and restore from previous versions</p>
        </div>

        <DataTable
          columns={columns}
          data={backupData}
        />
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

export default BackupManagment
