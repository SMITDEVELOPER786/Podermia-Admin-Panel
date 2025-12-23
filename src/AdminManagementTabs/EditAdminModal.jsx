import React, { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';
import styles from '../css/AdminManagment2.module.css';

const EditAdminModal = ({ isOpen, onClose, onSave, admin, departments }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({
        fullName: admin.fullName || '',
        email: admin.email || '',
        department: admin.department || ''
      });
    }
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!formData.email.endsWith('@podermonie.com')) {
      newErrors.email = 'Email must be a corporate email (@podermonie.com)';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
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
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        department: formData.department
      };

      await onSave(updatedAdmin);
      onClose();
    } catch (error) {
      console.error('Error updating admin:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (admin) {
      setFormData({
        fullName: admin.fullName || '',
        email: admin.email || '',
        department: admin.department || ''
      });
    }
    setErrors({});
    onClose();
  };

  if (!admin) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Admin Profile"
      width="600px"
    >
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        {/* Admin ID (Read-only) */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Admin ID</label>
          <input
            type="text"
            value={admin.id}
            className={`${styles.formInput} ${styles.readOnlyInput}`}
            readOnly
            disabled
          />
        </div>

        {/* Full Name */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
            placeholder="Enter full name"
          />
          {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Corporate Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
            placeholder="name@podermonie.com"
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {/* Department */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Department / Team <span className={styles.required}>*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className={`${styles.formInput} ${styles.formSelect} ${errors.department ? styles.inputError : ''}`}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <span className={styles.errorText}>{errors.department}</span>}
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default EditAdminModal;

