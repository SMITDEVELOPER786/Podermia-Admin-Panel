import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/Investment.module.css';
import { Upload, ChevronDown } from 'lucide-react';

// Custom Dropdown Component
const CustomDropdown = ({ label, value, options, onChange, name, error, disabled = false, placeholder = "Select..." }) => {
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
          className={styles.dropdownWrapper}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>{value ? value : placeholder}</span>
          <ChevronDown size={18} style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
        {isOpen && (
          <div className={styles.dropdownList} style={{ width: '100%' }}>
            {options.map((option, idx) => (
              <div
                key={idx}
                className={styles.dropdownItem}
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
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ label, name, checked, onChange, disabled = false }) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
          disabled={disabled}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
};

// Slider Component
const Slider = ({ label, name, value, onChange, min = 0, max = 100, error }) => {
  return (
    <div className={styles.formGroup}>
      <label>{label} ({value}%)</label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className={styles.slider}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

const InvestmentForm = ({
  editingItem,
  formData,
  errors,
  handleInputChange,
  handleFileUpload,
  removeFile,
  handleSaveDraft,
  handleCreateProduct,
  handleCancel,
  handleCancelEdit,
  handleUpdateItem
}) => {
  // Dropdown options
  const productCategoryOptions = ['Treasury Bill', 'Bond', 'Commercial Paper'];
  const investmentObjectiveOptions = ['Growth', 'Income', 'Capital Preservation'];
  const interestTypeOptions = ['Simple', 'Compound', 'Discount'];
  const payoutFrequencyOptions = ['Upfront', 'Monthly', 'Quarterly', 'Bi-annually', 'End of Tenor'];
  const statusControlOptions = ['Active', 'Inactive', 'Sold-Out'];
  const earlyRedemptionOptions = ['Yes', 'No'];
  const maturityTypeOptions = ['Fixed', 'Open-ended'];
  const riskLevelOptions = ['Low', 'Moderate', 'High'];
  const kycTierOptions = ['Tier 1', 'Tier 2', 'Tier 3'];

  // Handle toggle changes
  const handleToggleChange = (e) => {
    handleInputChange(e);
  };

  // Handle slider changes
  const handleSliderChange = (e) => {
    handleInputChange(e);
  };

  return (
    <div className={styles.investmentForm}>
      <h2 className={styles.formTitle}>
        {editingItem ? '✏️ Edit Investment Product' : '+ Add New Investment Product'}
      </h2>

      <div className={styles.formGrid}>
        {/* Section 1: Product Information */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Product Information</h3>
          
          <div className={styles.formGroup}>
            <label>Product Name <span className={styles.required}>*</span></label>
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={formData.productName}
              onChange={handleInputChange}
              className={errors.productName ? styles.inputError : ''}
            />
            {errors.productName && <span className={styles.errorText}>{errors.productName}</span>}
          </div>

          <CustomDropdown
            label="Product Category"
            name="productCategory"
            value={formData.productCategory}
            options={productCategoryOptions}
            onChange={handleInputChange}
            error={errors.productCategory}
          />

          <div className={styles.formGroup}>
            <label>Issuer Name <span className={styles.required}>*</span></label>
            <input
              type="text"
              name="issuerName"
              placeholder="Enter Issuer Name"
              value={formData.issuerName}
              onChange={handleInputChange}
              className={errors.issuerName ? styles.inputError : ''}
            />
            {errors.issuerName && <span className={styles.errorText}>{errors.issuerName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <CustomDropdown
            label="Investment Objective"
            name="investmentObjective"
            value={formData.investmentObjective}
            options={investmentObjectiveOptions}
            onChange={handleInputChange}
            error={errors.investmentObjective}
          />

          <CustomDropdown
            label="Status Control"
            name="statusControl"
            value={formData.statusControl}
            options={statusControlOptions}
            onChange={handleInputChange}
            error={errors.statusControl}
          />

          <div className={styles.formGroup}>
            <label>Product Activation Time</label>
            <input
              type="time"
              name="productActivationTime"
              value={formData.productActivationTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Section 2: Investment Details */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Investment Details</h3>
          
          <div className={styles.formGroup}>
            <label>Minimum Investment (₦) <span className={styles.required}>*</span></label>
            <input
              type="number"
              name="minInvestment"
              placeholder="e.g 1000"
              value={formData.minInvestment}
              onChange={handleInputChange}
              className={errors.minInvestment ? styles.inputError : ''}
              min="1000"
              step="1"
            />
            {errors.minInvestment && <span className={styles.errorText}>{errors.minInvestment}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Maximum Investment (₦)</label>
            <input
              type="number"
              name="maxInvestment"
              placeholder="Enter Maximum Amount"
              value={formData.maxInvestment}
              onChange={handleInputChange}
              className={errors.maxInvestment ? styles.inputError : ''}
            />
            {errors.maxInvestment && <span className={styles.errorText}>{errors.maxInvestment}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Coupon/Interest Rate (%) <span className={styles.required}>*</span></label>
            <input
              type="number"
              name="couponInterestRate"
              placeholder="e.g 12.5"
              value={formData.couponInterestRate}
              onChange={handleInputChange}
              className={errors.couponInterestRate ? styles.inputError : ''}
              min="1"
              max="100"
              step="0.01"
            />
            {errors.couponInterestRate && <span className={styles.errorText}>{errors.couponInterestRate}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Annual Yield (%) <span className={styles.required}>*</span></label>
            <input
              type="number"
              name="annualYield"
              placeholder="e.g 15.5"
              value={formData.annualYield}
              onChange={handleInputChange}
              className={errors.annualYield ? styles.inputError : ''}
              min="1"
              max="100"
              step="0.01"
            />
            {errors.annualYield && <span className={styles.errorText}>{errors.annualYield}</span>}
          </div>

          <CustomDropdown
            label="Interest Type"
            name="interestType"
            value={formData.interestType}
            options={interestTypeOptions}
            onChange={handleInputChange}
            error={errors.interestType}
          />

          <CustomDropdown
            label="Payout Frequency"
            name="payoutFrequency"
            value={formData.payoutFrequency}
            options={payoutFrequencyOptions}
            onChange={handleInputChange}
            error={errors.payoutFrequency}
          />

          <div className={styles.formGroup}>
            <label>Processing Fees <span className={styles.required}>*</span></label>
            <input
              type="number"
              name="processingFees"
              placeholder="Enter processing fees"
              value={formData.processingFees}
              onChange={handleInputChange}
              className={errors.processingFees ? styles.inputError : ''}
              min="0"
              step="0.01"
            />
            {errors.processingFees && <span className={styles.errorText}>{errors.processingFees}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Withholding Tax <span className={styles.required}>*</span></label>
            <input
              type="number"
              name="withholdingTax"
              placeholder="Enter withholding tax"
              value={formData.withholdingTax}
              onChange={handleInputChange}
              className={errors.withholdingTax ? styles.inputError : ''}
              min="0"
              step="0.01"
            />
            {errors.withholdingTax && <span className={styles.errorText}>{errors.withholdingTax}</span>}
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
              value={formData.maturityDate}
              onChange={handleInputChange}
              className={errors.maturityDate ? styles.inputError : ''}
              style={{cursor:'pointer'}}
            />
            {errors.maturityDate && <span className={styles.errorText}>{errors.maturityDate}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Start Date <span className={styles.required}>*</span></label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={errors.startDate ? styles.inputError : ''}
              style={{cursor:'pointer'}}
            />
            {errors.startDate && <span className={styles.errorText}>{errors.startDate}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              style={{cursor:'pointer'}}
            />
            {errors.endDate && <span className={styles.errorText}>{errors.endDate}</span>}
          </div>

          <CustomDropdown
            label="Maturity Type"
            name="maturityType"
            value={formData.maturityType}
            options={maturityTypeOptions}
            onChange={handleInputChange}
            error={errors.maturityType}
          />

          <ToggleSwitch
            label="Auto-Rollover"
            name="autoRollover"
            checked={formData.autoRollover}
            onChange={handleToggleChange}
          />

          <div className={styles.formGroup}>
            <label>Grace Period (days)</label>
            <input
              type="number"
              name="gracePeriod"
              placeholder="Enter grace period in days"
              value={formData.gracePeriod}
              onChange={handleInputChange}
              min="0"
              className={errors.gracePeriod ? styles.inputError : ''}
            />
            {errors.gracePeriod && <span className={styles.errorText}>{errors.gracePeriod}</span>}
          </div>

          <Slider
            label="Penalty on Early Redemption"
            name="penaltyOnEarlyRedemption"
            value={formData.penaltyOnEarlyRedemption || '0'}
            onChange={handleSliderChange}
            min={0}
            max={100}
            error={errors.penaltyOnEarlyRedemption}
          />

          <CustomDropdown
            label="Early Redemption Option"
            name="earlyRedemptionOption"
            value={formData.earlyRedemptionOption}
            options={earlyRedemptionOptions}
            onChange={handleInputChange}
            error={errors.earlyRedemptionOption}
          />

          <CustomDropdown
            label="Risk Level"
            name="riskLevel"
            value={formData.riskLevel}
            options={riskLevelOptions}
            onChange={handleInputChange}
            error={errors.riskLevel}
          />

          <div className={styles.formGroup}>
            <label>Investment Rating</label>
            <textarea
              name="investmentRating"
              placeholder="e.g AAA, AA, A, etc."
              value={formData.investmentRating}
              onChange={handleInputChange}
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
            value={formData.kycTierRestriction}
            options={kycTierOptions}
            onChange={handleInputChange}
            error={errors.kycTierRestriction}
          />

          <div className={styles.formGroup}>
            <label>Regulatory Notes</label>
            <textarea
              name="regulatoryNotes"
              placeholder="Enter regulatory notes"
              value={formData.regulatoryNotes}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Regulatory Notes Upload</label>
            <div className={styles.uploadArea} onClick={() => document.getElementById('regulatoryNotesFile').click()}>
              <input
                type="file"
                id="regulatoryNotesFile"
                name="regulatoryNotesFile"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                multiple
                style={{ display: 'none' }}
              />
              <Upload size={40} className={styles.uploadIcon} />
              <label className={styles.uploadLabel}>
                Click to Upload drag and drop
              </label>
              <span className={styles.uploadHint}>PDF, DOCS, (MAX 108M)</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Order Priority (1-10)</label>
            <input
              type="number"
              name="orderPriority"
              placeholder="Enter order priority"
              value={formData.orderPriority}
              onChange={handleInputChange}
              min="1"
              max="10"
              className={errors.orderPriority ? styles.inputError : ''}
            />
            {errors.orderPriority && <span className={styles.errorText}>{errors.orderPriority}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Product Code/ID</label>
            <input
              type="text"
              name="productCode"
              value={formData.productCode || 'AUTO-GENERATED'}
              disabled
              className={styles.disabledInput}
            />
            <span className={styles.helperText}>System-generated</span>
          </div>

          <div className={styles.formGroup}>
            <label>Created By / Date</label>
            <input
              type="text"
              value={`${formData.createdBy || 'System'} / ${formData.createdDate || new Date().toLocaleDateString()}`}
              disabled
              className={styles.disabledInput}
            />
            <span className={styles.helperText}>System-generated</span>
          </div>

          <ToggleSwitch
            label="Additional Documentation Required"
            name="additionalDocumentationRequired"
            checked={formData.additionalDocumentationRequired}
            onChange={handleToggleChange}
          />

          <ToggleSwitch
            label="Suspend Product"
            name="suspendProduct"
            checked={formData.suspendProduct}
            onChange={handleToggleChange}
          />

          <ToggleSwitch
            label="Archive Product"
            name="archiveProduct"
            checked={formData.archiveProduct}
            onChange={handleToggleChange}
          />

          <ToggleSwitch
            label="Referral Eligibility"
            name="referralEligibility"
            checked={formData.referralEligibility}
            onChange={handleToggleChange}
          />

          <ToggleSwitch
            label="Notify User"
            name="notifyUser"
            checked={formData.notifyUser}
            onChange={handleToggleChange}
          />

          <div className={styles.formGroup}>
            <label>Term Sheet Upload</label>
            <div className={styles.uploadArea} onClick={() => document.getElementById('termSheet').click()}>
              <input
                type="file"
                id="termSheet"
                name="termSheet"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                multiple
                style={{ display: 'none' }}
              />
              <Upload size={40} className={styles.uploadIcon} />
              <label className={styles.uploadLabel}>
                Click to Upload drag and drop
              </label>
              <span className={styles.uploadHint}>PDF, DOCS, (MAX 108M)</span>
            </div>
            
            {formData.termSheet && formData.termSheet.length > 0 && (
              <div className={styles.uploadedFiles}>
                {formData.termSheet.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <span className={styles.fileName}>{file.name}</span>
                    <button 
                      type="button"
                      className={styles.removeFileBtn} 
                      onClick={() => removeFile(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.documentsChecklist}>
              <h4>Required Documents Checklist</h4>
              <ul>
                <li>Team Sheet</li>
                <li>Issuer Financial Statement</li>
                <li>Credit Rating Report</li>
                <li>Regularly Approval</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button className={styles.draftBtn} onClick={handleSaveDraft}>
          Save Draft
        </button>
        <button className={styles.createBtn} onClick={handleCreateProduct}>
          {editingItem ? 'Update Product' : 'Create Product'}
        </button>
      </div>

    </div>
  );
};

export default InvestmentForm;

