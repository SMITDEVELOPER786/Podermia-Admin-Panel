import React, { useState } from 'react'
import styles from '../../css/AdminReferrals.module.css'
import { ChevronDown, X, Check } from 'lucide-react'
import Toast from '../../components/Toast/Toast'

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const Compaigns = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selected, setSelected] = useState("Ongoing");
  const [referralBonus, setReferralBonus] = useState('');
  const [inviteeBonus, setInviteeBonus] = useState('');
  const [minInvestment, setMinInvestment] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isCampaignActive, setIsCampaignActive] = useState(true);
  
  // Product Activation Toggles
  const [productToggles, setProductToggles] = useState({
    savingsVault: true,
    commercialPaper: true,
    treasuryBills: true,
    bonds: true
  });
  
  // New fields
  const [minInvestmentTenor, setMinInvestmentTenor] = useState('');
  const [minReferredUsers, setMinReferredUsers] = useState('');
  const [rewardPayoutType, setRewardPayoutType] = useState('Wallet Credit');
  const [rewardLockInPeriod, setRewardLockInPeriod] = useState('0');
  const [payoutApprovalMode, setPayoutApprovalMode] = useState('Automatic');
  const [payoutTypeDropdown, setPayoutTypeDropdown] = useState(false);
  const [lockInDropdown, setLockInDropdown] = useState(false);
  const [payoutApprovalDropdown, setPayoutApprovalDropdown] = useState(false);

  const options = [
    "Ongoing",
    "30 days",
    "60 days",
    "Custom Date Range"
  ];

  const payoutTypeOptions = [
    "Wallet Credit",
    "Savings Vault Investment"
  ];

  const lockInPeriodOptions = [
    "0",
    "30",
    "90",
    "180",
    "365"
  ];

  const payoutApprovalModeOptions = [
    "Automatic",
    "Admin Review"
  ];

  const handleSelect = (value) => {
    setSelected(value);
    setOpenDropdown(false);
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    if (!/^\d+$/.test(value)) {
      return 'Please enter a valid numeric value';
    }
    if (parseFloat(value) <= 0) {
      return 'Value must be greater than 0';
    }
    return '';
  };

  const handleInputChange = (name, value) => {
    switch(name) {
      case 'referralBonus':
        setReferralBonus(value);
        break;
      case 'inviteeBonus':
        setInviteeBonus(value);
        break;
      case 'minInvestment':
        setMinInvestment(value);
        break;
      case 'minInvestmentTenor':
        setMinInvestmentTenor(value);
        break;
      case 'minReferredUsers':
        setMinReferredUsers(value);
        break;
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProductToggle = (product) => {
    setProductToggles(prev => ({
      ...prev,
      [product]: !prev[product]
    }));
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    const referralError = validateField('referralBonus', referralBonus);
    if (referralError) newErrors.referralBonus = referralError;
    
    const inviteeError = validateField('inviteeBonus', inviteeBonus);
    if (inviteeError) newErrors.inviteeBonus = inviteeError;
    
    const minInvestmentError = validateField('minInvestment', minInvestment);
    if (minInvestmentError) newErrors.minInvestment = minInvestmentError;

    const minTenorError = validateField('minInvestmentTenor', minInvestmentTenor);
    if (minTenorError) newErrors.minInvestmentTenor = minTenorError;

    const minReferredError = validateField('minReferredUsers', minReferredUsers);
    if (minReferredError) newErrors.minReferredUsers = minReferredError;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Clear all input fields
      setReferralBonus('');
      setInviteeBonus('');
      setMinInvestment('');
      setMinInvestmentTenor('');
      setMinReferredUsers('');
      setRewardPayoutType('Wallet Credit');
      setRewardLockInPeriod('0');
      setPayoutApprovalMode('Automatic');
      setSelected('Ongoing');
      
      // Success - save configuration
      setToast({ 
        show: true, 
        message: 'Campaign settings updated successfully!', 
        type: 'success' 
      });
      
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
    } else {
      // Show error toast when validation fails
      setToast({ 
        show: true, 
        message: 'Please fix all errors before updating campaign settings.', 
        type: 'error' 
      });
      
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
    }
  };

  return (
    <div className="content-panel" style={{paddingBottom: '150px'}}>
      
      {/* Header */}
      <Div className="compaigns-head-and-button">
        <h3>Campaign Configuration</h3>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={isCampaignActive}
            onChange={(e) => setIsCampaignActive(e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </Div>

      <span className={styles.compaignsStatus}>Campaign Status</span>

      {/* Status Banner */}
      {!isCampaignActive ? (
        <Div className={`${styles.statusBanner} ${styles.statusBannerPaused}`}>
          <div className={styles.bannerHeader}>
            <X size={20} />
            <h4>Campaign is Paused</h4>
          </div>
          <p>✗ No new referral bonuses will be awarded • ✗ Payout requests are paused • ✓ Existing pending payouts are queued</p>
        </Div>
      ) : (
        <Div className={`${styles.statusBanner} ${styles.statusBannerActive}`}>
          <div className={styles.bannerHeader}>
            <Check size={20} />
            <h4>Campaign is Active</h4>
          </div>
          <p>✓ Users can earn and withdraw referral bonuses • ✓ New referrals are being tracked • ✓ Fraud detection is active</p>
        </Div>
      )}

      <Div className={`compaigns-form-wrapper ${!isCampaignActive ? styles.formDisabled : ''}`}>
        
        {/* Referral + Invitee Bonus */}
        <Div className="form-group-row">
          <Div className="input-block">
            <label>Referral Bonus ₦</label>
            <span className={styles.smallText}>Amount for person who send invite</span>
            <input 
              type="text" 
              placeholder="5000" 
              className={styles.inputField} 
              value={referralBonus}
              onChange={(e) => handleInputChange('referralBonus', e.target.value)}
              onBlur={(e) => handleBlur('referralBonus', e.target.value)}
              disabled={!isCampaignActive}
            />
            {errors.referralBonus && (
              <span className={styles.errorText}>{errors.referralBonus}</span>
            )}
          </Div>

          <Div className="input-block">
            <label>Invitee Bonus</label>
            <span className={styles.smallText}>Amount for new user who signup</span>
            <input 
              type="text" 
              placeholder="5000" 
              className={styles.inputField} 
              value={inviteeBonus}
              onChange={(e) => handleInputChange('inviteeBonus', e.target.value)}
              onBlur={(e) => handleBlur('inviteeBonus', e.target.value)}
              disabled={!isCampaignActive}
            />
            {errors.inviteeBonus && (
              <span className={styles.errorText}>{errors.inviteeBonus}</span>
            )}
          </Div>
        </Div>

        {/* Custom Dropdown */}
        <Div className="input-block full-width">
          <label>Referral Bonus ₦</label>

          <div 
            className={styles.dropdownWrapper}
            onClick={() => isCampaignActive && setOpenDropdown(!openDropdown)}
            style={{ opacity: !isCampaignActive ? 0.5 : 1, pointerEvents: !isCampaignActive ? 'none' : 'auto' }}
          >
            <span>{selected}</span>
            <ChevronDown size={18} />
          </div>

          {openDropdown && (
            <div className={styles.dropdownList}>
              {options.map((opt) => (
                <div 
                  key={opt}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </Div>

        <p className={styles.infoText}>
          Both bonuses will only be paid when the invitee makes their first investment of at least this amount.
        </p>

        <Div className="input-block full-width">
          <label>Minimum Investment ₦</label>
          <input 
            type="text" 
            placeholder="5000" 
            className={styles.inputField} 
            value={minInvestment}
            onChange={(e) => handleInputChange('minInvestment', e.target.value)}
            onBlur={(e) => handleBlur('minInvestment', e.target.value)}
            disabled={!isCampaignActive}
          />
          {errors.minInvestment && (
            <span className={styles.errorText}>{errors.minInvestment}</span>
          )}
        </Div>

        {/* Product Activation Toggles */}
        <Div className="input-block full-width">
          <label>Product Activation</label>
          <span className={styles.smallText}>Enable or disable products for referral campaigns</span>
          <div className={styles.productTogglesContainer}>
            <div className={styles.productToggleItem}>
              <span>Savings Vault</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={productToggles.savingsVault}
                  onChange={() => handleProductToggle('savingsVault')}
                  disabled={!isCampaignActive}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className={styles.productToggleItem}>
              <span>Commercial Paper</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={productToggles.commercialPaper}
                  onChange={() => handleProductToggle('commercialPaper')}
                  disabled={!isCampaignActive}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className={styles.productToggleItem}>
              <span>Treasury Bills</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={productToggles.treasuryBills}
                  onChange={() => handleProductToggle('treasuryBills')}
                  disabled={!isCampaignActive}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className={styles.productToggleItem}>
              <span>Bonds</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={productToggles.bonds}
                  onChange={() => handleProductToggle('bonds')}
                  disabled={!isCampaignActive}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </Div>

        {/* Minimum Investment Tenor */}
        <Div className="input-block full-width">
          <label>Minimum Investment Tenor</label>
          <span className={styles.smallText}>Minimum investment period in days</span>
          <input 
            type="number" 
            placeholder="30" 
            className={styles.inputField} 
            value={minInvestmentTenor}
            onChange={(e) => handleInputChange('minInvestmentTenor', e.target.value)}
            onBlur={(e) => handleBlur('minInvestmentTenor', e.target.value)}
            disabled={!isCampaignActive}
            min="0"
          />
          {errors.minInvestmentTenor && (
            <span className={styles.errorText}>{errors.minInvestmentTenor}</span>
          )}
        </Div>

        {/* Minimum Number of Referred Users */}
        <Div className="input-block full-width">
          <label>Minimum Number of Referred Users</label>
          <span className={styles.smallText}>Minimum number of users that must be referred</span>
          <input 
            type="number" 
            placeholder="1" 
            className={styles.inputField} 
            value={minReferredUsers}
            onChange={(e) => handleInputChange('minReferredUsers', e.target.value)}
            onBlur={(e) => handleBlur('minReferredUsers', e.target.value)}
            disabled={!isCampaignActive}
            min="0"
          />
          {errors.minReferredUsers && (
            <span className={styles.errorText}>{errors.minReferredUsers}</span>
          )}
        </Div>

        {/* Reward Payout Type Dropdown */}
        <Div className="input-block full-width">
          <label>Reward Payout Type</label>
          <div 
            className={styles.dropdownWrapper}
            onClick={() => isCampaignActive && setPayoutTypeDropdown(!payoutTypeDropdown)}
            style={{ opacity: !isCampaignActive ? 0.5 : 1, pointerEvents: !isCampaignActive ? 'none' : 'auto' }}
          >
            <span>{rewardPayoutType}</span>
            <ChevronDown size={18} />
          </div>

          {payoutTypeDropdown && (
            <div className={styles.dropdownList}>
              {payoutTypeOptions.map((opt) => (
                <div 
                  key={opt}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setRewardPayoutType(opt);
                    setPayoutTypeDropdown(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </Div>

        {/* Reward Lock-in Period Dropdown */}
        <Div className="input-block full-width">
          <label>Reward Lock-in Period</label>
          <span className={styles.smallText}>Number of days rewards are locked</span>
          <div 
            className={styles.dropdownWrapper}
            onClick={() => isCampaignActive && setLockInDropdown(!lockInDropdown)}
            style={{ opacity: !isCampaignActive ? 0.5 : 1, pointerEvents: !isCampaignActive ? 'none' : 'auto' }}
          >
            <span>{rewardLockInPeriod} days</span>
            <ChevronDown size={18} />
          </div>

          {lockInDropdown && (
            <div className={styles.dropdownList}>
              {lockInPeriodOptions.map((opt) => (
                <div 
                  key={opt}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setRewardLockInPeriod(opt);
                    setLockInDropdown(false);
                  }}
                >
                  {opt} days
                </div>
              ))}
            </div>
          )}
        </Div>

        {/* Payout Approval Mode Dropdown */}
        <Div className="input-block full-width">
          <label>Payout Approval Mode</label>
          <span className={styles.smallText}>How payout requests are processed</span>
          <div 
            className={styles.dropdownWrapper}
            onClick={() => isCampaignActive && setPayoutApprovalDropdown(!payoutApprovalDropdown)}
            style={{ opacity: !isCampaignActive ? 0.5 : 1, pointerEvents: !isCampaignActive ? 'none' : 'auto' }}
          >
            <span>{payoutApprovalMode}</span>
            <ChevronDown size={18} />
          </div>

          {payoutApprovalDropdown && (
            <div className={styles.dropdownList}>
              {payoutApprovalModeOptions.map((opt) => (
                <div 
                  key={opt}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setPayoutApprovalMode(opt);
                    setPayoutApprovalDropdown(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </Div>

        <button 
          className={styles.updateButton} 
          onClick={handleSubmit}
          disabled={!isCampaignActive}
        >
          Update Campaign Settings
        </button>
      </Div>
      
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default Compaigns;
