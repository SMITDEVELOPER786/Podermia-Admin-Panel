import React from "react";
import CustomModal from "../CustomModal/CustomModal";
import styles from "./EditModal.module.css";

const EditModal = ({
  isOpen,
  item,
  formData,
  errors,
  onInputChange,
  onUpdate,
  onCancel,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onCancel}
      title="✏️ Edit Investment Product"
      width="800px"
      showClose={true}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalBody}>
          <div className={styles.formGrid}>
            {/* Basic Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>

              <div className={styles.formGroup}>
                <label>Issuer Name</label>
                <input
                  type="text"
                  name="issuerName"
                  placeholder="Enter Issuer Name"
                  value={formData.issuerName}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Enter Product Name"
                  value={formData.productName}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Product Type</label>
                <input
                  type="text"
                  name="productType"
                  placeholder="Enter Product Type"
                  value={formData.productType}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Sector</label>
                <input
                  type="text"
                  name="sector"
                  placeholder="Enter Sector"
                  value={formData.sector}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={onInputChange}
                  rows="4"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status || 'Active'}
                  onChange={onInputChange}
                  className={styles.selectField}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Error">Error</option>
                </select>
              </div>
            </div>

            {/* Financial Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Financial Details</h3>

              <div className={styles.formGroup}>
                <label>Interest Rate (%)</label>
                <input
                  type="text"
                  name="interestRate"
                  placeholder="e.g 12.5"
                  value={formData.interestRate}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Minimum Investment Amount</label>
                <input
                  type="text"
                  name="minInvestment"
                  placeholder="Enter Minimum amount"
                  value={formData.minInvestment}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Maximum Investment Amount</label>
                <input
                  type="text"
                  name="maxInvestment"
                  placeholder="Enter Maximum Amount"
                  value={formData.maxInvestment}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Total Offering Amount</label>
                <input
                  type="text"
                  name="totalOffering"
                  placeholder="Enter Total Offering Amount"
                  value={formData.totalOffering}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Available Amount</label>
                <input
                  type="text"
                  name="availableAmount"
                  placeholder="Enter Available Amount"
                  value={formData.availableAmount}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Maturity Date</label>
                <input
                  type="text"
                  name="maturityDate"
                  placeholder="mm/dd/yyyy"
                  value={formData.maturityDate}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Lock-In Period</label>
                <input
                  type="text"
                  name="lockInPeriod"
                  placeholder="e.g 90-1 year"
                  value={formData.lockInPeriod}
                  onChange={onInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Risk Rating</label>
                <input
                  type="text"
                  name="riskRating"
                  placeholder="Enter risk rating"
                  value={formData.riskRating}
                  onChange={onInputChange}
                />
              </div>
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
