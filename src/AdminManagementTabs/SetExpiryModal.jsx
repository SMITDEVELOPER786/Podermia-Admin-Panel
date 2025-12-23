import React, { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';
import styles from '../css/AdminManagment2.module.css';

const SetExpiryModal = ({ isOpen, onClose, onSave, admin }) => {
  const [expiryDate, setExpiryDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      setExpiryDate(admin.accountExpiry || '');
    }
  }, [admin]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setExpiryDate(value);
    
    if (errors.expiryDate) {
      setErrors(prev => ({
        ...prev,
        expiryDate: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const selectedDate = new Date(expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updatedAdmin = {
        ...admin,
        accountExpiry: expiryDate
      };

      await onSave(updatedAdmin);
      onClose();
    } catch (error) {
      console.error('Error updating expiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (admin) {
      setExpiryDate(admin.accountExpiry || '');
    }
    setErrors({});
    onClose();
  };

  if (!admin) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Set / Update Account Expiry"
      width="500px"
    >
      <div className={styles.expiryModalContent}>
        <div className={styles.adminInfoSection}>
          <p className={styles.adminName}>{admin.fullName}</p>
          <p className={styles.adminEmail}>{admin.email}</p>
          {admin.accountExpiry && (
            <p className={styles.currentExpiry}>
              Current Expiry: <strong>{admin.accountExpiry}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Account Expiry Date <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={handleDateChange}
              className={`${styles.formInput} ${errors.expiryDate ? styles.inputError : ''}`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.expiryDate && (
              <span className={styles.errorText}>{errors.expiryDate}</span>
            )}
            <p className={styles.helpText}>
              The account will be automatically suspended after this date.
            </p>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Update Expiry'}
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default SetExpiryModal;

