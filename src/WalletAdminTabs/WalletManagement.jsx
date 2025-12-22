import React, { useState, useMemo, useRef, useEffect } from 'react'
import styles from '../css/WalletAdmin2.module.css'
import DataTable from '../components/DataTable/DataTables'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import CustomModal from '../components/CustomModal/CustomModal'
import { Eye, ChevronDown } from 'lucide-react'

const WalletManagement = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    walletCategory: '',
    sweepCategory: ''
  })

  const [selectedUser, setSelectedUser] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showChangeModal, setShowChangeModal] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)
  const [showOtherActionsDropdown, setShowOtherActionsDropdown] = useState(false)
  const otherActionsRef = useRef(null)

  // Mock data
  const [walletData, setWalletData] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      userType: 'Individual',
      balance: '₦125,000.00',
      status: 'Active',
      walletCategory: 'BVN-Locked',
      sweepCategory: 'Auto-Sweep',
      autoSweepTenor: '30 days',
      autoSweepFrequency: 'Daily',
      depositFees: '0.5%',
      withdrawalFees: '1.0%',
      withdrawalMode: 'Instant',
      maxDailyWithdrawal: '₦50,000',
      withdrawalsFrozen: false
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Sarah Johnson',
      userType: 'Corporate',
      balance: '₦2,500,000.00',
      status: 'Active',
      walletCategory: 'Open Wallet',
      sweepCategory: 'Manual-Sweep',
      autoSweepTenor: 'N/A',
      autoSweepFrequency: 'N/A',
      depositFees: '0.3%',
      withdrawalFees: '0.8%',
      withdrawalMode: 'Standard',
      maxDailyWithdrawal: '₦500,000',
      withdrawalsFrozen: false
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Michael Brown',
      userType: 'Individual',
      balance: '₦45,000.00',
      status: 'Suspended',
      walletCategory: 'BVN-Locked',
      sweepCategory: 'Auto-Sweep',
      autoSweepTenor: '60 days',
      autoSweepFrequency: 'Weekly',
      depositFees: '0.5%',
      withdrawalFees: '1.0%',
      withdrawalMode: 'Instant',
      maxDailyWithdrawal: '₦30,000',
      withdrawalsFrozen: true
    },
    {
      id: 4,
      userId: 'USR004',
      userName: 'Emily Davis',
      userType: 'Individual',
      balance: '₦890,000.00',
      status: 'Active',
      walletCategory: 'Open Wallet',
      sweepCategory: 'Auto-Sweep',
      autoSweepTenor: '90 days',
      autoSweepFrequency: 'Daily',
      depositFees: '0.4%',
      withdrawalFees: '0.9%',
      withdrawalMode: 'Instant',
      maxDailyWithdrawal: '₦200,000',
      withdrawalsFrozen: false
    },
    {
      id: 5,
      userId: 'USR005',
      userName: 'Robert Wilson',
      userType: 'Corporate',
      balance: '₦5,200,000.00',
      status: 'Active',
      walletCategory: 'BVN-Locked',
      sweepCategory: 'Manual-Sweep',
      autoSweepTenor: 'N/A',
      autoSweepFrequency: 'N/A',
      depositFees: '0.2%',
      withdrawalFees: '0.5%',
      withdrawalMode: 'Standard',
      maxDailyWithdrawal: '₦1,000,000',
      withdrawalsFrozen: false
    }
  ])

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by User ID, Name...',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Active', 'Suspended', 'Inactive']
      },
      {
        key: 'walletCategory',
        label: 'All Wallet Categories',
        options: ['All Wallet Categories', 'BVN-Locked', 'Open Wallet']
      },
      {
        key: 'sweepCategory',
        label: 'All Sweep Categories',
        options: ['All Sweep Categories', 'Auto-Sweep', 'Manual-Sweep']
      }
    ]
  }

  // Other Actions options (excluding View user details)
  const otherActionsOptions = [
    'Change Wallet Category',
    'Change Wallet Sweep Category',
    'Change Auto-Sweep Investment Tenor',
    'Change Auto-Sweep Frequency',
    'Change Deposit Fees',
    'Change Withdrawal Fees',
    'Change Withdrawal Mode',
    'Change Maximum Daily Withdrawal',
    'Freeze Withdrawals'
  ]

  // Filtered data
  const filteredData = useMemo(() => {
    return walletData.filter(item => {
      const searchMatch = !filters.search || 
        item.userId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.userName.toLowerCase().includes(filters.search.toLowerCase())
      
      const statusMatch = !filters.status || 
        filters.status === 'All Status' || 
        item.status === filters.status
      
      const walletCategoryMatch = !filters.walletCategory || 
        filters.walletCategory === 'All Wallet Categories' ||
        item.walletCategory === filters.walletCategory
      
      const sweepCategoryMatch = !filters.sweepCategory || 
        filters.sweepCategory === 'All Sweep Categories' ||
        item.sweepCategory === filters.sweepCategory
      
      return searchMatch && statusMatch && walletCategoryMatch && sweepCategoryMatch
    })
  }, [filters, walletData])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showOtherActionsDropdown) return

    const handleClickOutside = (event) => {
      if (otherActionsRef.current && !otherActionsRef.current.contains(event.target)) {
        setShowOtherActionsDropdown(false)
      }
    }

    // Add event listener with a slight delay to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)
    
    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showOtherActionsDropdown])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const handleOtherActionSelect = (action) => {
    setCurrentAction(action)
    setShowOtherActionsDropdown(false)
    setShowViewModal(false) // Close view modal
    setShowChangeModal(true) // Open change modal
  }

  const handleCloseModals = () => {
    setShowViewModal(false)
    setShowChangeModal(false)
    setSelectedUser(null)
    setCurrentAction(null)
    setShowOtherActionsDropdown(false)
  }

  const handleCancelChange = () => {
    // Close change modal and reopen view modal
    setShowChangeModal(false)
    setCurrentAction(null)
    // Small delay to ensure state updates properly
    setTimeout(() => {
      setShowViewModal(true)
    }, 100)
  }

  const handleSaveChanges = (formData) => {
    if (!selectedUser) return

    // Convert form data to display format
    const updatedFormData = { ...formData }
    
    // Convert Auto-Sweep Investment Tenor from "1" to "30 days" format
    if (updatedFormData.autoSweepTenor) {
      const months = parseInt(updatedFormData.autoSweepTenor)
      updatedFormData.autoSweepTenor = `${months * 30} days`
    }

    // Update wallet data
    setWalletData(prevData =>
      prevData.map(item => {
        if (item.id === selectedUser.id) {
          const updatedItem = { ...item, ...updatedFormData }
          // Update selectedUser with new data so view modal shows updated info
          setSelectedUser(updatedItem)
          return updatedItem
        }
        return item
      })
    )

    // Close change modal and reopen view modal with updated data
    setShowChangeModal(false)
    setCurrentAction(null)
    // Small delay to ensure state updates properly
    setTimeout(() => {
      setShowViewModal(true)
    }, 100)
  }

  // Table columns
  const columns = [
    { header: 'User ID', key: 'userId' },
    { header: 'User Name', key: 'userName' },
    { header: 'User Type', key: 'userType' },
    { header: 'Balance', key: 'balance' },
    { 
      header: 'Status', 
      key: 'status',
      styleMap: {
        'Active': styles.statusActive,
        'Suspended': styles.statusSuspended,
        'Inactive': styles.statusInactive
      }
    },
    { header: 'Wallet Category', key: 'walletCategory' },
    { header: 'Wallet Sweep Category', key: 'sweepCategory' },
    {
      header: 'Action',
      key: 'action',
      render: (row) => (
        <div className={styles.actionCell}>
          <button
            className={styles.eyeBtn}
            title="View Details"
            onClick={() => handleViewDetails(row)}
          >
            <Eye size={18} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className={styles.walletManagementContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Wallet Management</h2>
      </div>

      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      <div className={styles.tableSection}>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={500}
        />
      </div>

      {/* View User Details Modal */}
      <CustomModal
        isOpen={showViewModal}
        onClose={handleCloseModals}
        title="User Wallet Details"
        width="700px"
      >
        {selectedUser && (() => {
          // Get latest data from walletData to show updated information
          const currentUser = walletData.find(item => item.id === selectedUser.id) || selectedUser
          return (
          <div className={styles.userDetailsModal}>
            {/* Other Actions Dropdown */}
            <div className={styles.otherActionsSection}>
              <div className={styles.otherActionsDropdown} ref={otherActionsRef}>
                <div 
                  className={styles.otherActionsSelected}
                  onClick={() => setShowOtherActionsDropdown(!showOtherActionsDropdown)}
                >
                  <span>Other Actions</span>
                  <ChevronDown 
                    size={18} 
                    className={`${styles.dropdownIcon} ${showOtherActionsDropdown ? styles.rotate : ''}`} 
                  />
                </div>
                {showOtherActionsDropdown && (
                  <div className={styles.otherActionsMenu}>
                    {otherActionsOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className={styles.otherActionsItem}
                        onClick={() => handleOtherActionSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User ID:</span>
              <span className={styles.detailValue}>{currentUser.userId}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User Name:</span>
              <span className={styles.detailValue}>{currentUser.userName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User Type:</span>
              <span className={styles.detailValue}>{currentUser.userType}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Balance:</span>
              <span className={styles.detailValue}>{currentUser.balance}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={`${styles.detailValue} ${styles.statusBadge} ${
                currentUser.status === 'Active' ? styles.statusActive :
                currentUser.status === 'Suspended' ? styles.statusSuspended :
                styles.statusInactive
              }`}>
                {currentUser.status}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Wallet Category:</span>
              <span className={styles.detailValue}>{currentUser.walletCategory}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Wallet Sweep Category:</span>
              <span className={styles.detailValue}>{currentUser.sweepCategory}</span>
            </div>
            {currentUser.sweepCategory === 'Auto-Sweep' && (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Auto-Sweep Investment Tenor:</span>
                  <span className={styles.detailValue}>{currentUser.autoSweepTenor}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Auto-Sweep Frequency:</span>
                  <span className={styles.detailValue}>{currentUser.autoSweepFrequency}</span>
                </div>
              </>
            )}
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Deposit Fees:</span>
              <span className={styles.detailValue}>{currentUser.depositFees}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Withdrawal Fees:</span>
              <span className={styles.detailValue}>{currentUser.withdrawalFees}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Withdrawal Mode:</span>
              <span className={styles.detailValue}>{currentUser.withdrawalMode}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Maximum Daily Withdrawal:</span>
              <span className={styles.detailValue}>{currentUser.maxDailyWithdrawal}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Withdrawals Frozen:</span>
              <span className={styles.detailValue}>
                {currentUser.withdrawalsFrozen ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          )
        })()}
      </CustomModal>

      {/* Change Settings Modal */}
      <CustomModal
        isOpen={showChangeModal}
        onClose={handleCancelChange}
        title={currentAction || 'Change Settings'}
        width="500px"
      >
        {selectedUser && currentAction && (
          <ChangeSettingsForm
            user={selectedUser}
            action={currentAction}
            onSave={handleSaveChanges}
            onCancel={handleCancelChange}
          />
        )}
      </CustomModal>
    </div>
  )
}

// Change Settings Form Component
const ChangeSettingsForm = ({ user, action, onSave, onCancel }) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Initialize form data based on action
    switch(action) {
      case 'Change Wallet Category':
        setFormData({ walletCategory: user.walletCategory || 'BVN-Locked' })
        break
      case 'Change Wallet Sweep Category':
        setFormData({ sweepCategory: user.sweepCategory || 'Auto-Sweep' })
        break
      case 'Change Auto-Sweep Investment Tenor':
        // Convert from "30 days" format to "1" format (extract number and convert to months)
        let tenorValue = '1'
        if (user.autoSweepTenor && user.autoSweepTenor !== 'N/A') {
          const daysMatch = user.autoSweepTenor.match(/(\d+)/)
          if (daysMatch) {
            const days = parseInt(daysMatch[1])
            const months = Math.round(days / 30)
            tenorValue = Math.max(1, Math.min(12, months)).toString()
          }
        }
        setFormData({ autoSweepTenor: tenorValue })
        break
      case 'Change Auto-Sweep Frequency':
        // Map old values to new values
        let frequencyValue = user.autoSweepFrequency || 'Daily'
        if (frequencyValue === 'N/A') {
          frequencyValue = 'Daily'
        }
        setFormData({ autoSweepFrequency: frequencyValue })
        break
      case 'Change Deposit Fees':
        setFormData({ depositFees: user.depositFees || '' })
        break
      case 'Change Withdrawal Fees':
        setFormData({ withdrawalFees: user.withdrawalFees || '' })
        break
      case 'Change Withdrawal Mode':
        // Map old values to new values
        let modeValue = user.withdrawalMode || 'Automatic'
        if (modeValue === 'Instant' || modeValue === 'Standard') {
          modeValue = 'Automatic'
        }
        setFormData({ withdrawalMode: modeValue })
        break
      case 'Change Maximum Daily Withdrawal':
        setFormData({ maxDailyWithdrawal: user.maxDailyWithdrawal || '' })
        break
      case 'Freeze Withdrawals':
        setFormData({ withdrawalsFrozen: user.withdrawalsFrozen || false })
        break
      default:
        setFormData({})
    }
  }, [action, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors = {}
    if (action === 'Change Deposit Fees' && (!formData.depositFees || !formData.depositFees.includes('%'))) {
      newErrors.depositFees = 'Please enter a valid fee percentage (e.g., 0.5%)'
    }
    if (action === 'Change Withdrawal Fees' && (!formData.withdrawalFees || !formData.withdrawalFees.includes('%'))) {
      newErrors.withdrawalFees = 'Please enter a valid fee percentage (e.g., 1.0%)'
    }
    if (action === 'Change Maximum Daily Withdrawal' && (!formData.maxDailyWithdrawal || !formData.maxDailyWithdrawal.includes('₦'))) {
      newErrors.maxDailyWithdrawal = 'Please enter a valid amount (e.g., ₦50,000)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
  }

  const renderFormField = () => {
    switch(action) {
      case 'Change Wallet Category':
        return (
          <div className={styles.formGroup}>
            <label>Wallet Category</label>
            <select
              className={styles.formSelect}
              value={formData.walletCategory || ''}
              onChange={(e) => setFormData({ ...formData, walletCategory: e.target.value })}
            >
              <option value="BVN-Locked">BVN-Locked</option>
              <option value="Open Wallet">Open Wallet</option>
            </select>
          </div>
        )

      case 'Change Wallet Sweep Category':
        return (
          <div className={styles.formGroup}>
            <label>Wallet Sweep Category</label>
            <select
              className={styles.formSelect}
              value={formData.sweepCategory || ''}
              onChange={(e) => setFormData({ ...formData, sweepCategory: e.target.value })}
            >
              <option value="Auto-Sweep">Auto-Sweep</option>
              <option value="Manual-Sweep">Manual-Sweep</option>
            </select>
          </div>
        )

      case 'Change Auto-Sweep Investment Tenor':
        return (
          <div className={styles.formGroup}>
            <label>Auto-Sweep Investment Tenor</label>
            <select
              className={styles.formSelect}
              value={formData.autoSweepTenor || ''}
              onChange={(e) => setFormData({ ...formData, autoSweepTenor: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                <option key={month} value={month.toString()}>
                  {month} {month === 1 ? 'month' : 'months'}
                </option>
              ))}
            </select>
          </div>
        )

      case 'Change Auto-Sweep Frequency':
        return (
          <div className={styles.formGroup}>
            <label>Auto-Sweep Frequency</label>
            <select
              className={styles.formSelect}
              value={formData.autoSweepFrequency || ''}
              onChange={(e) => setFormData({ ...formData, autoSweepFrequency: e.target.value })}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        )

      case 'Change Deposit Fees':
        return (
          <div className={styles.formGroup}>
            <label>Deposit Fees (%)</label>
            <input
              type="text"
              className={styles.formInput}
              value={formData.depositFees || ''}
              onChange={(e) => setFormData({ ...formData, depositFees: e.target.value })}
              placeholder="e.g., 0.5%"
            />
            {errors.depositFees && <span className={styles.errorText}>{errors.depositFees}</span>}
          </div>
        )

      case 'Change Withdrawal Fees':
        return (
          <div className={styles.formGroup}>
            <label>Withdrawal Fees (%)</label>
            <input
              type="text"
              className={styles.formInput}
              value={formData.withdrawalFees || ''}
              onChange={(e) => setFormData({ ...formData, withdrawalFees: e.target.value })}
              placeholder="e.g., 1.0%"
            />
            {errors.withdrawalFees && <span className={styles.errorText}>{errors.withdrawalFees}</span>}
          </div>
        )

      case 'Change Withdrawal Mode':
        return (
          <div className={styles.formGroup}>
            <label>Withdrawal Mode</label>
            <select
              className={styles.formSelect}
              value={formData.withdrawalMode || ''}
              onChange={(e) => setFormData({ ...formData, withdrawalMode: e.target.value })}
            >
              <option value="Automatic">Automatic</option>
              <option value="Admin Review">Admin Review</option>
            </select>
          </div>
        )

      case 'Change Maximum Daily Withdrawal':
        return (
          <div className={styles.formGroup}>
            <label>Maximum Daily Withdrawal</label>
            <input
              type="text"
              className={styles.formInput}
              value={formData.maxDailyWithdrawal || ''}
              onChange={(e) => setFormData({ ...formData, maxDailyWithdrawal: e.target.value })}
              placeholder="e.g., ₦50,000"
            />
            {errors.maxDailyWithdrawal && <span className={styles.errorText}>{errors.maxDailyWithdrawal}</span>}
          </div>
        )

      case 'Freeze Withdrawals':
        return (
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.withdrawalsFrozen || false}
                onChange={(e) => setFormData({ ...formData, withdrawalsFrozen: e.target.checked })}
                className={styles.checkbox}
              />
              Freeze Withdrawals
            </label>
            <p className={styles.helpText}>
              When enabled, the user will not be able to make withdrawals from their wallet.
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form className={styles.changeForm} onSubmit={handleSubmit}>
      {renderFormField()}
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default WalletManagement
