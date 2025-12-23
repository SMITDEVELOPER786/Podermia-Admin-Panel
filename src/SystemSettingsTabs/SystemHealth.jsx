import React, { useState } from 'react';
import styles from '../css/SystemSetting.module.css';
import { Database, Server, Globe, Shield, RotateCcw, Save } from 'lucide-react';
import Toast from '../components/Toast/Toast';

const SystemHealth = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  const [errors, setErrors] = useState({});

  const [healthData] = useState({
    database: { status: 'Online', health: 98 },
    apiServer: { status: 'Healthy', health: 95 },
    externalApis: { status: 'Connected', health: 92 },
    security: { status: 'Secure', health: 100 }
  });

  const [savingsRates, setSavingsRates] = useState({
    days30: '8.5',
    days90: '8.5',
    days180: '12.5',
    days365: '15'
  });

  const [loanConfig, setLoanConfig] = useState({
    savingVaultLTV: '80',
    financialGoalLTV: '90',
    investmentLTV: '50',
    maxLoanTenure: '365',
    gracePeriod: '5',
    penaltyRate: '2'
  });

  const validateNumericInput = (value, fieldName) => {
    if (value === '') return true;
    
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors(prev => ({ ...prev, [fieldName]: 'Only numbers are allowed' }));
      return false;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  };

  const handleSavingsRateChange = (field, value) => {
    if (validateNumericInput(value, field)) {
      setSavingsRates(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleLoanConfigChange = (field, value) => {
    if (validateNumericInput(value, field)) {
      setLoanConfig(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleReset = () => {
    setSavingsRates({
      days30: '8.5',
      days90: '8.5',
      days180: '12.5',
      days365: '15'
    });
    setLoanConfig({
      savingVaultLTV: '80',
      financialGoalLTV: '90',
      investmentLTV: '50',
      maxLoanTenure: '365',
      gracePeriod: '5',
      penaltyRate: '2'
    });
    setErrors({});
    setToast({ show: true, message: 'Settings have been reset to default values', type: 'success', title: 'Reset Complete' });
  };

  const handleSaveAll = () => {
    if (Object.keys(errors).length > 0) {
      setToast({ show: true, message: 'Please fix all errors before saving', type: 'error', title: 'Validation Error' });
      return;
    }

    const allFields = { ...savingsRates, ...loanConfig };
    const hasEmpty = Object.values(allFields).some(val => val === '');
    
    if (hasEmpty) {
      setToast({ show: true, message: 'All fields are required', type: 'error', title: 'Validation Error' });
      return;
    }

    setToast({ show: true, message: 'All changes saved successfully', type: 'success', title: 'Settings Saved' });
  };

  const getHealthColor = () => {
    return '#3b82f6';
  };

  return (
    <div className={styles.systemHealthContainer}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      {/* Header Section */}
      <div className={styles.healthHeader}>
        <div>
          <h2>System Health & Monitoring</h2>
          <p className={styles.subtitle}>Monitor system components and performance</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.resetBtn} onClick={handleReset}>
            <RotateCcw size={16} /> Reset to Default
          </button>
          <button className={styles.saveBtn} onClick={handleSaveAll}>
            <Save size={16} /> Save all Changes
          </button>
        </div>
      </div>

      {/* System Health Cards */}
      <div className={styles.healthCardsGrid}>
        <div className={styles.healthCard}>
          <Database size={48} color="#2563eb" />
          <h3>Database</h3>
          <p className={styles.statusOnline}>{healthData.database.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.database.health}%`,
                backgroundColor: getHealthColor(healthData.database.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.database.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Server size={48} color="#2563eb" />
          <h3>API Server</h3>
          <p className={styles.statusHealthy}>{healthData.apiServer.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.apiServer.health}%`,
                backgroundColor: getHealthColor(healthData.apiServer.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.apiServer.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Globe size={48} color="#2563eb" />
          <h3>External APIs</h3>
          <p className={styles.statusConnected}>{healthData.externalApis.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.externalApis.health}%`,
                backgroundColor: getHealthColor(healthData.externalApis.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.externalApis.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Shield size={48} color="#2563eb" />
          <h3>Security</h3>
          <p className={styles.statusSecure}>{healthData.security.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.security.health}%`,
                backgroundColor: getHealthColor(healthData.security.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.security.health}% Health</span>
        </div>
      </div>

      {/* Financial Product Settings */}
      <div className={styles.settingsSection}>
        <h2>Financial Product Settings</h2>
        <p className={styles.subtitle} style={{marginBottom: 20}}>Configure interest rates and loan parameters</p>

        {/* Savings Interest Rates */}
        <div className={styles.configBox}>
          <h3>Savings Interest Rates (%)</h3>
          <div className={styles.ratesGrid}>
            <div className={styles.inputGroup}>
              <label>30 days</label>
              <input
                type="text"
                value={savingsRates.days30}
                onChange={(e) => handleSavingsRateChange('days30', e.target.value)}
                className={errors.days30 ? styles.inputError : ''}
              />
              {errors.days30 && <span className={styles.errorText}>{errors.days30}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>90 days</label>
              <input
                type="text"
                value={savingsRates.days90}
                onChange={(e) => handleSavingsRateChange('days90', e.target.value)}
                className={errors.days90 ? styles.inputError : ''}
              />
              {errors.days90 && <span className={styles.errorText}>{errors.days90}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>180 days</label>
              <input
                type="text"
                value={savingsRates.days180}
                onChange={(e) => handleSavingsRateChange('days180', e.target.value)}
                className={errors.days180 ? styles.inputError : ''}
              />
              {errors.days180 && <span className={styles.errorText}>{errors.days180}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>365 days</label>
              <input
                type="text"
                value={savingsRates.days365}
                onChange={(e) => handleSavingsRateChange('days365', e.target.value)}
                className={errors.days365 ? styles.inputError : ''}
              />
              {errors.days365 && <span className={styles.errorText}>{errors.days365}</span>}
            </div>
          </div>
        </div>

        {/* Loan Configuration */}
        <div className={styles.configBox}>
          <h3>Loan Configuration</h3>
          <div className={styles.loanGrid}>
            <div className={styles.inputGroup}>
              <label>Saving Vault LTV (%)</label>
              <input
                type="text"
                value={loanConfig.savingVaultLTV}
                onChange={(e) => handleLoanConfigChange('savingVaultLTV', e.target.value)}
                className={errors.savingVaultLTV ? styles.inputError : ''}
              />
              {errors.savingVaultLTV && <span className={styles.errorText}>{errors.savingVaultLTV}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Financial goal LTV (%)</label>
              <input
                type="text"
                value={loanConfig.financialGoalLTV}
                onChange={(e) => handleLoanConfigChange('financialGoalLTV', e.target.value)}
                className={errors.financialGoalLTV ? styles.inputError : ''}
              />
              {errors.financialGoalLTV && <span className={styles.errorText}>{errors.financialGoalLTV}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Investment LTV (%)</label>
              <input
                type="text"
                value={loanConfig.investmentLTV}
                onChange={(e) => handleLoanConfigChange('investmentLTV', e.target.value)}
                className={errors.investmentLTV ? styles.inputError : ''}
              />
              {errors.investmentLTV && <span className={styles.errorText}>{errors.investmentLTV}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Max Loan Tenure (Days)</label>
              <input
                type="text"
                value={loanConfig.maxLoanTenure}
                onChange={(e) => handleLoanConfigChange('maxLoanTenure', e.target.value)}
                className={errors.maxLoanTenure ? styles.inputError : ''}
              />
              {errors.maxLoanTenure && <span className={styles.errorText}>{errors.maxLoanTenure}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Grace Period (Days)</label>
              <input
                type="text"
                value={loanConfig.gracePeriod}
                onChange={(e) => handleLoanConfigChange('gracePeriod', e.target.value)}
                className={errors.gracePeriod ? styles.inputError : ''}
              />
              {errors.gracePeriod && <span className={styles.errorText}>{errors.gracePeriod}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Penalty Rate (% weekly)</label>
              <input
                type="text"
                value={loanConfig.penaltyRate}
                onChange={(e) => handleLoanConfigChange('penaltyRate', e.target.value)}
                className={errors.penaltyRate ? styles.inputError : ''}
              />
              {errors.penaltyRate && <span className={styles.errorText}>{errors.penaltyRate}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
