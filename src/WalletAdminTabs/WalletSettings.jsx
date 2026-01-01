import React, { useState } from 'react'
import styles from '../css/WalletAdmin2.module.css'
import Toast from '../components/Toast/Toast'

const WalletSettings = () => {
  const [formData, setFormData] = useState({
    walletCategory: 'BVN-Locked',
    walletSweepCategory: 'Auto-Sweep',
    autoSweepTenor: '1',
    autoSweepFrequency: 'Daily',
    depositFeeType: 'Percentage',
    depositFees: '0.5',
    withdrawalFeeType: 'Percentage',
    withdrawalFees: '1.0',
    emtlFeeType: 'Percentage',
    emtlFee: '',
    transferFeeType: 'Percentage',
    transferFee0to5000: '',
    transferFee5001to50000: '',
    transferFeeAbove50000: '',
    maintenanceFeeType: 'Percentage',
    maintenanceFee: '',
    maintenanceFeeFrequency: 'Monthly',
    flagTransactionAmount: '',
    flagTransactionFrequency: '',
    freezeWithdrawals: false,
    withdrawalMode: 'Automatic',
    maxDailyWithdrawal: '',
    suspiciousActivityEnabled: false,
    transactionPinLimit: '',
    twoFALimit: '',
    notifyUser: true
  })

  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // For percentage fees, only allow numbers and decimal point
    if ((name === 'depositFees' && formData.depositFeeType === 'Percentage') ||
        (name === 'withdrawalFees' && formData.withdrawalFeeType === 'Percentage') ||
        (name === 'emtlFee' && formData.emtlFeeType === 'Percentage') ||
        (name === 'maintenanceFee' && formData.maintenanceFeeType === 'Percentage') ||
        (name === 'transferFee0to5000' && formData.transferFeeType === 'Percentage') ||
        (name === 'transferFee5001to50000' && formData.transferFeeType === 'Percentage') ||
        (name === 'transferFeeAbove50000' && formData.transferFeeType === 'Percentage')) {
      // Allow only numbers and one decimal point
      const numericValue = value.replace(/[^0-9.]/g, '')
      // Ensure only one decimal point
      const parts = numericValue.split('.')
      const filteredValue = parts.length > 2 
        ? parts[0] + '.' + parts.slice(1).join('')
        : numericValue
      
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNumericKeyPress = (e) => {
    // For percentage fees, only allow numbers and decimal point
    const char = String.fromCharCode(e.which)
    if (!/[0-9.]/.test(char)) {
      e.preventDefault()
    }
    // Prevent multiple decimal points
    if (char === '.' && e.target.value.includes('.')) {
      e.preventDefault()
    }
  }

  const handleNumberInputWheel = (e) => {
    // Prevent number input value change on scroll
    e.target.blur()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    
    // Validation
    if (!formData.maxDailyWithdrawal || isNaN(formData.maxDailyWithdrawal) || parseFloat(formData.maxDailyWithdrawal) <= 0) {
      newErrors.maxDailyWithdrawal = 'Please enter a valid maximum daily withdrawal amount'
    }
    
    if (!formData.flagTransactionAmount || isNaN(formData.flagTransactionAmount) || parseFloat(formData.flagTransactionAmount) <= 0) {
      newErrors.flagTransactionAmount = 'Please enter a valid AML threshold amount'
    }
    
    if (!formData.transactionPinLimit || isNaN(formData.transactionPinLimit) || parseFloat(formData.transactionPinLimit) < 0) {
      newErrors.transactionPinLimit = 'Please enter a valid transaction PIN limit'
    }
    
    if (!formData.twoFALimit || isNaN(formData.twoFALimit) || parseFloat(formData.twoFALimit) < 0) {
      newErrors.twoFALimit = 'Please enter a valid 2FA limit'
    }
    
    if (formData.depositFeeType === 'Percentage' && (!formData.depositFees || isNaN(formData.depositFees) || parseFloat(formData.depositFees) < 0 || parseFloat(formData.depositFees) > 100)) {
      newErrors.depositFees = 'Please enter a valid percentage (0-100)'
    }
    
    if (formData.depositFeeType === 'Fixed' && (!formData.depositFees || isNaN(formData.depositFees) || parseFloat(formData.depositFees) < 0)) {
      newErrors.depositFees = 'Please enter a valid fixed amount'
    }
    
    if (formData.withdrawalFeeType === 'Percentage' && (!formData.withdrawalFees || isNaN(formData.withdrawalFees) || parseFloat(formData.withdrawalFees) < 0 || parseFloat(formData.withdrawalFees) > 100)) {
      newErrors.withdrawalFees = 'Please enter a valid percentage (0-100)'
    }
    
    if (formData.withdrawalFeeType === 'Fixed' && (!formData.withdrawalFees || isNaN(formData.withdrawalFees) || parseFloat(formData.withdrawalFees) < 0)) {
      newErrors.withdrawalFees = 'Please enter a valid fixed amount'
    }
    
    if (formData.emtlFeeType === 'Percentage' && (!formData.emtlFee || isNaN(formData.emtlFee) || parseFloat(formData.emtlFee) < 0 || parseFloat(formData.emtlFee) > 100)) {
      newErrors.emtlFee = 'Please enter a valid percentage (0-100)'
    }
    
    if (formData.emtlFeeType === 'Fixed' && (!formData.emtlFee || isNaN(formData.emtlFee) || parseFloat(formData.emtlFee) < 0)) {
      newErrors.emtlFee = 'Please enter a valid fixed amount'
    }
    
    if (formData.transferFeeType === 'Percentage') {
      if (!formData.transferFee0to5000 || isNaN(formData.transferFee0to5000) || parseFloat(formData.transferFee0to5000) < 0 || parseFloat(formData.transferFee0to5000) > 100) {
        newErrors.transferFee0to5000 = 'Please enter a valid percentage (0-100)'
      }
      if (!formData.transferFee5001to50000 || isNaN(formData.transferFee5001to50000) || parseFloat(formData.transferFee5001to50000) < 0 || parseFloat(formData.transferFee5001to50000) > 100) {
        newErrors.transferFee5001to50000 = 'Please enter a valid percentage (0-100)'
      }
      if (!formData.transferFeeAbove50000 || isNaN(formData.transferFeeAbove50000) || parseFloat(formData.transferFeeAbove50000) < 0 || parseFloat(formData.transferFeeAbove50000) > 100) {
        newErrors.transferFeeAbove50000 = 'Please enter a valid percentage (0-100)'
      }
    } else {
      if (!formData.transferFee0to5000 || isNaN(formData.transferFee0to5000) || parseFloat(formData.transferFee0to5000) < 0) {
        newErrors.transferFee0to5000 = 'Please enter a valid fixed amount'
      }
      if (!formData.transferFee5001to50000 || isNaN(formData.transferFee5001to50000) || parseFloat(formData.transferFee5001to50000) < 0) {
        newErrors.transferFee5001to50000 = 'Please enter a valid fixed amount'
      }
      if (!formData.transferFeeAbove50000 || isNaN(formData.transferFeeAbove50000) || parseFloat(formData.transferFeeAbove50000) < 0) {
        newErrors.transferFeeAbove50000 = 'Please enter a valid fixed amount'
      }
    }
    
    if (formData.maintenanceFeeType === 'Percentage' && (!formData.maintenanceFee || isNaN(formData.maintenanceFee) || parseFloat(formData.maintenanceFee) < 0 || parseFloat(formData.maintenanceFee) > 100)) {
      newErrors.maintenanceFee = 'Please enter a valid percentage (0-100)'
    }
    
    if (formData.maintenanceFeeType === 'Fixed' && (!formData.maintenanceFee || isNaN(formData.maintenanceFee) || parseFloat(formData.maintenanceFee) < 0)) {
      newErrors.maintenanceFee = 'Please enter a valid fixed amount'
    }
    
    if (!formData.flagTransactionFrequency || formData.flagTransactionFrequency.trim() === '') {
      newErrors.flagTransactionFrequency = 'Please select a frequency'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Show error toast
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix all errors before saving'
      })
      return
    }

    // Save settings (mock)
    console.log('Settings saved:', formData)
    setToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Wallet settings have been saved successfully!'
    })
    
    // Clear fields after successful save
    setFormData({
      walletCategory: 'BVN-Locked',
      walletSweepCategory: 'Auto-Sweep',
      autoSweepTenor: '1',
      autoSweepFrequency: 'Daily',
      depositFeeType: 'Percentage',
      depositFees: '',
      withdrawalFeeType: 'Percentage',
      withdrawalFees: '',
      emtlFeeType: 'Percentage',
      emtlFee: '',
      transferFeeType: 'Percentage',
      transferFee0to5000: '',
      transferFee5001to50000: '',
      transferFeeAbove50000: '',
      maintenanceFeeType: 'Percentage',
      maintenanceFee: '',
      maintenanceFeeFrequency: 'Monthly',
      flagTransactionAmount: '',
      flagTransactionFrequency: '',
      freezeWithdrawals: false,
      withdrawalMode: 'Automatic',
      maxDailyWithdrawal: '',
      suspiciousActivityEnabled: false,
      transactionPinLimit: '',
      twoFALimit: '',
      notifyUser: true
    })
    setErrors({})
  }

  const handleReset = () => {
    setFormData({
      walletCategory: 'BVN-Locked',
      walletSweepCategory: 'Auto-Sweep',
      autoSweepTenor: '1',
      autoSweepFrequency: 'Daily',
      depositFeeType: 'Percentage',
      depositFees: '0.5',
      withdrawalFeeType: 'Percentage',
      withdrawalFees: '1.0',
      emtlFeeType: 'Percentage',
      emtlFee: '',
      transferFeeType: 'Percentage',
      transferFee0to5000: '',
      transferFee5001to50000: '',
      transferFeeAbove50000: '',
      maintenanceFeeType: 'Percentage',
      maintenanceFee: '',
      maintenanceFeeFrequency: 'Monthly',
      flagTransactionAmount: '',
      flagTransactionFrequency: '',
      freezeWithdrawals: false,
      withdrawalMode: 'Automatic',
      maxDailyWithdrawal: '',
      suspiciousActivityEnabled: false,
      transactionPinLimit: '',
      twoFALimit: '',
      notifyUser: true
    })
    setErrors({})
  }

  return (
    <div className={styles.walletSettingsContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Wallet Settings</h2>
      </div>

      <form className={styles.settingsForm} onSubmit={handleSubmit}>
        {/* Wallet Configuration Section */}
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Wallet Configuration</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Wallet Category</label>
              <select
                name="walletCategory"
                className={styles.formSelect}
                value={formData.walletCategory}
                onChange={handleInputChange}
              >
                <option value="BVN-Locked">BVN-Locked</option>
                <option value="Open Wallet">Open Wallet</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Wallet Sweep Category</label>
              <select
                name="walletSweepCategory"
                className={styles.formSelect}
                value={formData.walletSweepCategory}
                onChange={handleInputChange}
              >
                <option value="Auto-Sweep">Auto-Sweep</option>
                <option value="Manual-Sweep">Manual-Sweep</option>
              </select>
            </div>

            {formData.walletSweepCategory === 'Auto-Sweep' && (
              <>
                <div className={styles.formGroup}>
                  <label>Auto-Sweep Investment Tenor</label>
                  <select
                    name="autoSweepTenor"
                    className={styles.formSelect}
                    value={formData.autoSweepTenor}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <option key={month} value={month.toString()}>
                        {month} {month === 1 ? 'month' : 'months'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Auto-Sweep Frequency</label>
                  <select
                    name="autoSweepFrequency"
                    className={styles.formSelect}
                    value={formData.autoSweepFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Fees Configuration Section */}
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Fees Configuration</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Deposit Fees Type</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="depositFeeType"
                    value="Percentage"
                    checked={formData.depositFeeType === 'Percentage'}
                    onChange={handleInputChange}
                  />
                  <span>Percentage</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="depositFeeType"
                    value="Fixed"
                    checked={formData.depositFeeType === 'Fixed'}
                    onChange={handleInputChange}
                  />
                  <span>Fixed</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Deposit Fees {formData.depositFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.depositFeeType === 'Percentage' ? 'text' : 'number'}
                  name="depositFees"
                  className={`${styles.formInput} ${errors.depositFees ? styles.inputError : ''}`}
                  value={formData.depositFees}
                  onChange={handleInputChange}
                  onKeyPress={formData.depositFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.depositFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.depositFeeType === 'Percentage' ? '0.5' : '100'}
                  step={formData.depositFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.depositFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.depositFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.depositFees && <span className={styles.errorText}>{errors.depositFees}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Withdrawal Fees Type</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="withdrawalFeeType"
                    value="Percentage"
                    checked={formData.withdrawalFeeType === 'Percentage'}
                    onChange={handleInputChange}
                  />
                  <span>Percentage</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="withdrawalFeeType"
                    value="Fixed"
                    checked={formData.withdrawalFeeType === 'Fixed'}
                    onChange={handleInputChange}
                  />
                  <span>Fixed</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Withdrawal Fees {formData.withdrawalFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.withdrawalFeeType === 'Percentage' ? 'text' : 'number'}
                  name="withdrawalFees"
                  className={`${styles.formInput} ${errors.withdrawalFees ? styles.inputError : ''}`}
                  value={formData.withdrawalFees}
                  onChange={handleInputChange}
                  onKeyPress={formData.withdrawalFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.withdrawalFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.withdrawalFeeType === 'Percentage' ? '1.0' : '200'}
                  step={formData.withdrawalFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.withdrawalFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.withdrawalFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.withdrawalFees && <span className={styles.errorText}>{errors.withdrawalFees}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>EMTL Fee Type</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="emtlFeeType"
                    value="Percentage"
                    checked={formData.emtlFeeType === 'Percentage'}
                    onChange={handleInputChange}
                  />
                  <span>Percentage</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="emtlFeeType"
                    value="Fixed"
                    checked={formData.emtlFeeType === 'Fixed'}
                    onChange={handleInputChange}
                  />
                  <span>Fixed</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                EMTL Fee {formData.emtlFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.emtlFeeType === 'Percentage' ? 'text' : 'number'}
                  name="emtlFee"
                  className={`${styles.formInput} ${errors.emtlFee ? styles.inputError : ''}`}
                  value={formData.emtlFee}
                  onChange={handleInputChange}
                  onKeyPress={formData.emtlFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.emtlFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.emtlFeeType === 'Percentage' ? '0.5' : '50'}
                  step={formData.emtlFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.emtlFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.emtlFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.emtlFee && <span className={styles.errorText}>{errors.emtlFee}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Transfer Fee Type</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="transferFeeType"
                    value="Percentage"
                    checked={formData.transferFeeType === 'Percentage'}
                    onChange={handleInputChange}
                  />
                  <span>Percentage</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="transferFeeType"
                    value="Fixed"
                    checked={formData.transferFeeType === 'Fixed'}
                    onChange={handleInputChange}
                  />
                  <span>Fixed</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Transfer Fee (0-5000) {formData.transferFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.transferFeeType === 'Percentage' ? 'text' : 'number'}
                  name="transferFee0to5000"
                  className={`${styles.formInput} ${errors.transferFee0to5000 ? styles.inputError : ''}`}
                  value={formData.transferFee0to5000}
                  onChange={handleInputChange}
                  onKeyPress={formData.transferFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.transferFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.transferFeeType === 'Percentage' ? '0.5' : '10'}
                  step={formData.transferFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.transferFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.transferFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.transferFee0to5000 && <span className={styles.errorText}>{errors.transferFee0to5000}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>
                Transfer Fee (5001-50000) {formData.transferFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.transferFeeType === 'Percentage' ? 'text' : 'number'}
                  name="transferFee5001to50000"
                  className={`${styles.formInput} ${errors.transferFee5001to50000 ? styles.inputError : ''}`}
                  value={formData.transferFee5001to50000}
                  onChange={handleInputChange}
                  onKeyPress={formData.transferFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.transferFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.transferFeeType === 'Percentage' ? '0.3' : '25'}
                  step={formData.transferFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.transferFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.transferFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.transferFee5001to50000 && <span className={styles.errorText}>{errors.transferFee5001to50000}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>
                Transfer Fee (Above 50000) {formData.transferFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.transferFeeType === 'Percentage' ? 'text' : 'number'}
                  name="transferFeeAbove50000"
                  className={`${styles.formInput} ${errors.transferFeeAbove50000 ? styles.inputError : ''}`}
                  value={formData.transferFeeAbove50000}
                  onChange={handleInputChange}
                  onKeyPress={formData.transferFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.transferFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.transferFeeType === 'Percentage' ? '0.2' : '50'}
                  step={formData.transferFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.transferFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.transferFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.transferFeeAbove50000 && <span className={styles.errorText}>{errors.transferFeeAbove50000}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Maintenance Fee Type</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="maintenanceFeeType"
                    value="Percentage"
                    checked={formData.maintenanceFeeType === 'Percentage'}
                    onChange={handleInputChange}
                  />
                  <span>Percentage</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="maintenanceFeeType"
                    value="Fixed"
                    checked={formData.maintenanceFeeType === 'Fixed'}
                    onChange={handleInputChange}
                  />
                  <span>Fixed</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Maintenance Fee {formData.maintenanceFeeType === 'Percentage' ? '(%)' : '(Amount)'}
              </label>
              <div className={styles.inputWithSuffix}>
                <input
                  type={formData.maintenanceFeeType === 'Percentage' ? 'text' : 'number'}
                  name="maintenanceFee"
                  className={`${styles.formInput} ${errors.maintenanceFee ? styles.inputError : ''}`}
                  value={formData.maintenanceFee}
                  onChange={handleInputChange}
                  onKeyPress={formData.maintenanceFeeType === 'Percentage' ? handleNumericKeyPress : undefined}
                  onWheel={formData.maintenanceFeeType === 'Fixed' ? handleNumberInputWheel : undefined}
                  placeholder={formData.maintenanceFeeType === 'Percentage' ? '0.1' : '100'}
                  step={formData.maintenanceFeeType === 'Percentage' ? undefined : '0.01'}
                  min={formData.maintenanceFeeType === 'Percentage' ? undefined : '0'}
                />
                <span className={styles.inputSuffix}>
                  {formData.maintenanceFeeType === 'Percentage' ? '%' : '₦'}
                </span>
              </div>
              {errors.maintenanceFee && <span className={styles.errorText}>{errors.maintenanceFee}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Maintenance Fee Payment Frequency</label>
              <select
                name="maintenanceFeeFrequency"
                className={styles.formSelect}
                value={formData.maintenanceFeeFrequency}
                onChange={handleInputChange}
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-Annually">Bi-Annually</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
          </div>
        </div>

        {/* Withdrawal Settings Section */}
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Withdrawal Settings</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Withdrawal Mode</label>
              <select
                name="withdrawalMode"
                className={styles.formSelect}
                value={formData.withdrawalMode}
                onChange={handleInputChange}
              >
                <option value="Automatic">Automatic</option>
                <option value="Admin Review">Admin Review</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Maximum Daily Withdrawal</label>
              <div className={styles.inputWithSuffix}>
                <input
                  type="number"
                  name="maxDailyWithdrawal"
                  className={`${styles.formInput} ${errors.maxDailyWithdrawal ? styles.inputError : ''}`}
                  value={formData.maxDailyWithdrawal}
                  onChange={handleInputChange}
                  onWheel={handleNumberInputWheel}
                  placeholder="50000"
                />
                <span className={styles.inputSuffix}>₦</span>
              </div>
              {errors.maxDailyWithdrawal && <span className={styles.errorText}>{errors.maxDailyWithdrawal}</span>}
            </div>

            <div className={styles.toggleRow}>
              <div>
                <label className={styles.toggleLabel}>Freeze Withdrawals</label>
                <p className={styles.toggleDescription}>
                  When enabled, all user withdrawals will be frozen
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  name="freezeWithdrawals"
                  checked={formData.freezeWithdrawals}
                  onChange={handleInputChange}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security & Compliance Section */}
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Security & Compliance</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Flag Transaction (AML Threshold Amount)</label>
              <div className={styles.inputWithSuffix}>
                <input
                  type="number"
                  name="flagTransactionAmount"
                  className={`${styles.formInput} ${errors.flagTransactionAmount ? styles.inputError : ''}`}
                  value={formData.flagTransactionAmount}
                  onChange={handleInputChange}
                  onWheel={handleNumberInputWheel}
                  placeholder="1000000"
                />
                <span className={styles.inputSuffix}>₦</span>
              </div>
              {errors.flagTransactionAmount && <span className={styles.errorText}>{errors.flagTransactionAmount}</span>}
              <p className={styles.helpText}>
                Transactions above this amount will be flagged for AML review
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>Flag Transaction (AML Threshold Frequency)</label>
              <select
                name="flagTransactionFrequency"
                className={`${styles.formSelect} ${errors.flagTransactionFrequency ? styles.inputError : ''}`}
                value={formData.flagTransactionFrequency}
                onChange={handleInputChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-Annually">Bi-Annually</option>
                <option value="Annually">Annually</option>
              </select>
              {errors.flagTransactionFrequency && <span className={styles.errorText}>{errors.flagTransactionFrequency}</span>}
              <p className={styles.helpText}>
                Frequency at which transactions will be flagged for AML review
              </p>
            </div>

            <div className={styles.toggleRow}>
              <div>
                <label className={styles.toggleLabel}>Suspicious Activity Alert</label>
                <p className={styles.toggleDescription}>
                  Enable alerts for unusual deposit patterns
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  name="suspiciousActivityEnabled"
                  checked={formData.suspiciousActivityEnabled}
                  onChange={handleInputChange}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>Transaction PIN Required Limit</label>
              <div className={styles.inputWithSuffix}>
                <input
                  type="number"
                  name="transactionPinLimit"
                  className={`${styles.formInput} ${errors.transactionPinLimit ? styles.inputError : ''}`}
                  value={formData.transactionPinLimit}
                  onChange={handleInputChange}
                  onWheel={handleNumberInputWheel}
                  placeholder="5000"
                />
                <span className={styles.inputSuffix}>₦</span>
              </div>
              {errors.transactionPinLimit && <span className={styles.errorText}>{errors.transactionPinLimit}</span>}
              <p className={styles.helpText}>
                Transactions above this amount will require PIN verification
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>2FA Required Limit</label>
              <div className={styles.inputWithSuffix}>
                <input
                  type="number"
                  name="twoFALimit"
                  className={`${styles.formInput} ${errors.twoFALimit ? styles.inputError : ''}`}
                  value={formData.twoFALimit}
                  onChange={handleInputChange}
                  onWheel={handleNumberInputWheel}
                  placeholder="100000"
                />
                <span className={styles.inputSuffix}>₦</span>
              </div>
              {errors.twoFALimit && <span className={styles.errorText}>{errors.twoFALimit}</span>}
              <p className={styles.helpText}>
                Transactions above this amount will require 2FA verification
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className={styles.settingsSection}>
          <h3 className={styles.sectionTitle}>Notification Settings</h3>
          
          <div className={styles.toggleRow}>
            <div>
              <label className={styles.toggleLabel}>Notify User</label>
              <p className={styles.toggleDescription}>
                Send notifications to users about wallet activities and changes
              </p>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                name="notifyUser"
                checked={formData.notifyUser}
                onChange={handleInputChange}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset to Default
          </button>
          <button type="submit" className={styles.saveButton}>
            Save Settings
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  )
}

export default WalletSettings
