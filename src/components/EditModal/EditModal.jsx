import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../CustomModal/CustomModal";
import styles from "./EditModal.module.css";
import { ChevronDown } from "lucide-react";
import investmentStyles from "../../css/Investment.module.css";

// Custom Dropdown Component for Modal
const CustomDropdown = ({ label, value, options, onChange, name, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
  };

  return (
    <div className={styles.formGroup} style={{ position: 'relative' }}>
      <label>{label}</label>
      <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
        <div 
          className={investmentStyles.dropdownWrapper}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ flex: 1, minWidth: 0 }}>{value ? value : placeholder}</span>
          <ChevronDown size={18} style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
        {isOpen && (
          <div className={investmentStyles.dropdownList} style={{ width: '100%' }}>
            {options.map((option, idx) => (
              <div
                key={idx}
                className={investmentStyles.dropdownItem}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Toggle Switch Component for Modal
const ToggleSwitch = ({ label, name, checked, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <label className={investmentStyles.toggleSwitch}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
        />
        <span className={investmentStyles.toggleSlider}></span>
      </label>
    </div>
  );
};

const EditModal = ({
  isOpen,
  item,
  formData,
  errors,
  onInputChange,
  onUpdate,
  onCancel,
}) => {
  // Dropdown options
  const productCategoryOptions = ['Treasury Bill', 'Bond', 'Commercial Paper'];
  const investmentObjectiveOptions = ['Growth', 'Income', 'Capital Preservation'];
  const interestTypeOptions = ['Simple', 'Compound', 'Discount'];
  const payoutFrequencyOptions = ['Upfront', 'Monthly', 'Quarterly', 'Bi-annually', 'Annually', 'End of Tenor'];
  const processingFeeTypeOptions = ['%', 'Flat'];
  const approvalModeOptions = ['Automatic', 'Admin Review'];
  const statusControlOptions = ['Active', 'Inactive', 'Sold-Out'];
  const earlyRedemptionOptions = ['Yes', 'No'];
  const maturityTypeOptions = ['Fixed', 'Open-ended'];
  const riskLevelOptions = ['Low', 'Moderate', 'High'];
  const kycTierOptions = ['Tier 1', 'Tier 2', 'Tier 3'];

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onCancel}
      title="✏️ Edit Investment Product"
      width="900px"
      showClose={true}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalBody} >
          <div className={styles.formGrid}>
            {/* Section 1: Product Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Product Information</h3>

              <div className={styles.formGroup}>
                <label>Product Name <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Enter Product Name"
                  value={formData.productName || ''}
                  onChange={onInputChange}
                />
              </div>

              <CustomDropdown
                label="Product Category"
                name="productCategory"
                value={formData.productCategory || ''}
                options={productCategoryOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Issuer Name <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="text"
                  name="issuerName"
                  placeholder="Enter Issuer Name"
                  value={formData.issuerName || ''}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={onInputChange}
                  rows="4"
                />
              </div>

              <CustomDropdown
                label="Investment Objective"
                name="investmentObjective"
                value={formData.investmentObjective || ''}
                options={investmentObjectiveOptions}
                onChange={onInputChange}
              />

              <CustomDropdown
                label="Status Control"
                name="statusControl"
                value={formData.statusControl || formData.status || 'Active'}
                options={statusControlOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Product Activation Time - Open</label>
                <input
                  type="time"
                  name="productActivationTimeOpen"
                  value={formData.productActivationTimeOpen || ''}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Product Activation Time - Close</label>
                <input
                  type="time"
                  name="productActivationTimeClose"
                  value={formData.productActivationTimeClose || ''}
                  onChange={onInputChange}
                />
              </div>
            </div>

            {/* Section 2: Investment Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Investment Details</h3>

              <div className={styles.formGroup}>
                <label>Minimum Investment (₦) <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="number"
                  name="minInvestment"
                  placeholder="e.g 1000"
                  value={formData.minInvestment || ''}
                  onChange={onInputChange}
                  className={errors?.minInvestment ? investmentStyles.inputError : ''}
                  min="1000"
                  step="1"
                />
                {errors?.minInvestment && <span className={investmentStyles.errorText} style={{display: 'block', marginTop: '4px', fontSize: '12px', color: '#dc2626'}}>{errors.minInvestment}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Maximum Investment (₦)</label>
                <input
                  type="number"
                  name="maxInvestment"
                  placeholder="Enter Maximum Amount"
                  value={formData.maxInvestment || ''}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Coupon/Interest Rate (%) <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="number"
                  name="couponInterestRate"
                  placeholder="e.g 12.5"
                  value={formData.couponInterestRate || ''}
                  onChange={onInputChange}
                  className={errors?.couponInterestRate ? investmentStyles.inputError : ''}
                  min="1"
                  max="100"
                  step="0.01"
                />
                {errors?.couponInterestRate && <span className={investmentStyles.errorText} style={{display: 'block', marginTop: '4px', fontSize: '12px', color: '#dc2626'}}>{errors.couponInterestRate}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Annual Yield (%) <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="number"
                  name="annualYield"
                  placeholder="e.g 15.5"
                  value={formData.annualYield || ''}
                  onChange={onInputChange}
                  className={errors?.annualYield ? investmentStyles.inputError : ''}
                  min="1"
                  max="100"
                  step="0.01"
                />
                {errors?.annualYield && <span className={investmentStyles.errorText} style={{display: 'block', marginTop: '4px', fontSize: '12px', color: '#dc2626'}}>{errors.annualYield}</span>}
              </div>

              <CustomDropdown
                label="Interest Type"
                name="interestType"
                value={formData.interestType || ''}
                options={interestTypeOptions}
                onChange={onInputChange}
              />

              <CustomDropdown
                label="Payout Frequency"
                name="payoutFrequency"
                value={formData.payoutFrequency || formData.couponFrequency || ''}
                options={payoutFrequencyOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Processing Fee Type <span style={{color: '#dc2626'}}>*</span></label>
                <CustomDropdown
                  name="processingFeeType"
                  value={formData.processingFeeType || '%'}
                  options={processingFeeTypeOptions}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Processing Fees <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="number"
                  name="processingFees"
                  placeholder={formData.processingFeeType === 'Flat' ? "Enter amount (₦)" : "Enter percentage (%)"}
                  value={formData.processingFees || ''}
                  onChange={onInputChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <CustomDropdown
                label="Investment Approval Mode"
                name="investmentApprovalMode"
                value={formData.investmentApprovalMode || 'Automatic'}
                options={approvalModeOptions}
                onChange={onInputChange}
              />

              <CustomDropdown
                label="Coupon Payout Mode"
                name="couponPayoutMode"
                value={formData.couponPayoutMode || 'Automatic'}
                options={approvalModeOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Withholding Tax <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="number"
                  name="withholdingTax"
                  placeholder="Enter withholding tax"
                  value={formData.withholdingTax || ''}
                  onChange={onInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Section 3: Terms & Conditions */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Terms & Conditions</h3>

              <div className={styles.formGroup}>
                <label>Maturity Date</label>
                <input
                  type="date"
                  name="maturityDate"
                  value={formData.maturityDate || ''}
                  onChange={onInputChange}
                  style={{cursor:'pointer'}}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Start Date <span style={{color: '#dc2626'}}>*</span></label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={onInputChange}
                  style={{cursor:'pointer'}}
                />
              </div>

              <div className={styles.formGroup}>
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={onInputChange}
                  style={{cursor:'pointer'}}
                />
              </div>

              <CustomDropdown
                label="Maturity Type"
                name="maturityType"
                value={formData.maturityType || ''}
                options={maturityTypeOptions}
                onChange={onInputChange}
              />

              <ToggleSwitch
                label="Auto-Rollover"
                name="autoRollover"
                checked={formData.autoRollover || false}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Grace Period (days)</label>
                <input
                  type="number"
                  name="gracePeriod"
                  placeholder="Enter grace period in days"
                  value={formData.gracePeriod || ''}
                  onChange={onInputChange}
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Penalty on Early Redemption (%)</label>
                <input
                  type="range"
                  name="penaltyOnEarlyRedemption"
                  min="0"
                  max="100"
                  value={formData.penaltyOnEarlyRedemption || '0'}
                  onChange={onInputChange}
                  className={investmentStyles.slider}
                />
                <span style={{fontSize: '12px', color: '#6b7280'}}>Current: {formData.penaltyOnEarlyRedemption || '0'}%</span>
              </div>

              <CustomDropdown
                label="Early Redemption Option"
                name="earlyRedemptionOption"
                value={formData.earlyRedemptionOption || 'No'}
                options={earlyRedemptionOptions}
                onChange={onInputChange}
              />

              <CustomDropdown
                label="Risk Level"
                name="riskLevel"
                value={formData.riskLevel || formData.riskRating || ''}
                options={riskLevelOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Investment Rating</label>
                <textarea
                  name="investmentRating"
                  placeholder="e.g AAA, AA, A, etc."
                  value={formData.investmentRating || ''}
                  onChange={onInputChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Section 4: Additional Settings & Documents */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Additional Settings & Documents</h3>

              <CustomDropdown
                label="KYC Tier Restriction"
                name="kycTierRestriction"
                value={formData.kycTierRestriction || ''}
                options={kycTierOptions}
                onChange={onInputChange}
              />

              <div className={styles.formGroup}>
                <label>Regulatory Notes</label>
                <textarea
                  name="regulatoryNotes"
                  placeholder="Enter regulatory notes"
                  value={formData.regulatoryNotes || ''}
                  onChange={onInputChange}
                  rows="3"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Order Priority (1-10)</label>
                <input
                  type="number"
                  name="orderPriority"
                  placeholder="Enter order priority"
                  value={formData.orderPriority || ''}
                  onChange={onInputChange}
                  min="1"
                  max="10"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Product Code/ID</label>
                <input
                  type="text"
                  value={formData.productCode || 'AUTO-GENERATED'}
                  disabled
                  style={{background: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed'}}
                />
                <span style={{fontSize: '11px', color: '#6b7280', fontStyle: 'italic'}}>System-generated</span>
              </div>

              <div className={styles.formGroup}>
                <label>Created By / Date</label>
                <input
                  type="text"
                  value={`${formData.createdBy || 'System'} / ${formData.createdDate || new Date().toLocaleDateString()}`}
                  disabled
                  style={{background: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed'}}
                />
                <span style={{fontSize: '11px', color: '#6b7280', fontStyle: 'italic'}}>System-generated</span>
              </div>

              <ToggleSwitch
                label="Additional Documentation Required"
                name="additionalDocumentationRequired"
                checked={formData.additionalDocumentationRequired || false}
                onChange={onInputChange}
              />

              <ToggleSwitch
                label="Suspend Product"
                name="suspendProduct"
                checked={formData.suspendProduct || false}
                onChange={onInputChange}
              />

              <ToggleSwitch
                label="Archive Product"
                name="archiveProduct"
                checked={formData.archiveProduct || false}
                onChange={onInputChange}
              />

              <ToggleSwitch
                label="Referral Eligibility"
                name="referralEligibility"
                checked={formData.referralEligibility || false}
                onChange={onInputChange}
              />

              <ToggleSwitch
                label="Notify User"
                name="notifyUser"
                checked={formData.notifyUser || false}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.updateBtn} onClick={onUpdate}>
            Update Product
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditModal;
