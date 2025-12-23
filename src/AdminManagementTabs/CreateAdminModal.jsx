import React, { useState } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';
import styles from '../css/AdminManagment2.module.css';

const CreateAdminModal = ({ isOpen, onClose, onSave, availableRoles, departments }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    roles: [],
    accountExpiry: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRoleToggle = (role) => {
    setFormData(prev => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
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

    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role must be assigned';
    }

    if (!formData.accountExpiry) {
      newErrors.accountExpiry = 'Account expiry date is required';
    } else {
      const expiryDate = new Date(formData.accountExpiry);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiryDate <= today) {
        newErrors.accountExpiry = 'Expiry date must be in the future';
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
      // Generate Admin ID
      const adminId = `ADM-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      const newAdmin = {
        id: adminId,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        department: formData.department,
        roles: formData.roles,
        status: 'Active',
        lastLogin: 'Never',
        createdBy: 'Current User', // This should come from auth context
        createdDate: new Date().toISOString().split('T')[0],
        accountExpiry: formData.accountExpiry
      };

      await onSave(newAdmin);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        department: '',
        roles: [],
        accountExpiry: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating admin:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      department: '',
      roles: [],
      accountExpiry: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Admin"
      width="600px"
    >
      <form onSubmit={handleSubmit} className={styles.adminForm}>
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

        {/* Roles */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Assign Role(s) <span className={styles.required}>*</span>
          </label>
          <div className={styles.rolesCheckboxGroup}>
            {availableRoles.map(role => (
              <label key={role} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role)}
                  onChange={() => handleRoleToggle(role)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxText}>{role}</span>
              </label>
            ))}
          </div>
          {errors.roles && <span className={styles.errorText}>{errors.roles}</span>}
        </div>

        {/* Account Expiry */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Account Expiry Date <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            name="accountExpiry"
            value={formData.accountExpiry}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.accountExpiry ? styles.inputError : ''}`}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.accountExpiry && <span className={styles.errorText}>{errors.accountExpiry}</span>}
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
            {isSubmitting ? 'Creating...' : 'Create Admin'}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateAdminModal;

