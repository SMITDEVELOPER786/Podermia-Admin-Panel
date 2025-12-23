import React, { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';
import styles from '../css/AdminManagment2.module.css';

const AssignRolesModal = ({ isOpen, onClose, onSave, admin, availableRoles }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      setSelectedRoles([...admin.roles]);
    }
  }, [admin]);

  const handleRoleToggle = (role) => {
    setSelectedRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedRoles.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updatedAdmin = {
        ...admin,
        roles: selectedRoles
      };

      await onSave(updatedAdmin);
      onClose();
    } catch (error) {
      console.error('Error updating roles:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (admin) {
      setSelectedRoles([...admin.roles]);
    }
    onClose();
  };

  if (!admin) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Assign / Remove Roles"
      width="500px"
    >
      <div className={styles.rolesModalContent}>
        <div className={styles.adminInfoSection}>
          <p className={styles.adminName}>{admin.fullName}</p>
          <p className={styles.adminEmail}>{admin.email}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Select Role(s) <span className={styles.required}>*</span>
            </label>
            <div className={styles.rolesCheckboxGroup}>
              {availableRoles.map(role => (
                <label key={role} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleToggle(role)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>{role}</span>
                </label>
              ))}
            </div>
            {selectedRoles.length === 0 && (
              <span className={styles.errorText}>At least one role must be selected</span>
            )}
          </div>

          {/* Current Roles Display */}
          {selectedRoles.length > 0 && (
            <div className={styles.currentRolesSection}>
              <p className={styles.currentRolesLabel}>Selected Roles:</p>
              <div className={styles.selectedRolesContainer}>
                {selectedRoles.map(role => (
                  <span key={role} className={styles.selectedRoleTag}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

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
              disabled={isSubmitting || selectedRoles.length === 0}
            >
              {isSubmitting ? 'Saving...' : 'Save Roles'}
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default AssignRolesModal;

