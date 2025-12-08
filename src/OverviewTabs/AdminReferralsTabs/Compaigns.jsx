import React, { useState } from 'react'
import styles from '../../css/AdminReferrals.module.css'
import { ChevronDown } from 'lucide-react'
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

  const options = [
    "Ongoing",
    "30 days",
    "60 days",
    "Custom Date Range"
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
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Success - save configuration
      setToast({ 
        show: true, 
        message: 'Campaign settings updated successfully!', 
        type: 'success' 
      });
      
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
    }
  };

  return (
    <div className="content-panel">
      
      {/* Header */}
      <Div className="compaigns-head-and-button">
        <h3>Campaign Configuration</h3>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="toggle-slider"></span>
        </label>
      </Div>

      <span className={styles.compaignsStatus}>Campaign Status</span>

      <Div className="compaigns-form-wrapper">
        
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
            onClick={() => setOpenDropdown(!openDropdown)}
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
          />
          {errors.minInvestment && (
            <span className={styles.errorText}>{errors.minInvestment}</span>
          )}
        </Div>

        <button className={styles.updateButton} onClick={handleSubmit}>
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
