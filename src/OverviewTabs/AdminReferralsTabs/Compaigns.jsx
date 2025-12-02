import React, { useState } from 'react'
import styles from '../../css/AdminReferrals.module.css'
import { ChevronDown } from 'lucide-react'

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
            <input type="text" placeholder="5000" className={styles.inputField} />
          </Div>

          <Div className="input-block">
            <label>Invitee Bonus</label>
            <span className={styles.smallText}>Amount for new user who signup</span>
            <input type="text" placeholder="5000" className={styles.inputField} />
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
          <input type="text" placeholder="5000" className={styles.inputField} />
        </Div>

        <button className={styles.updateButton}>
          Update Campaign Settings
        </button>
      </Div>
    </div>
  );
};

export default Compaigns;
