import React from 'react';
import { AlertTriangle, Info, HelpCircle, X } from 'lucide-react';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog = ({ 
  type = 'warning', // 'warning', 'info', 'question'
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showIcon = true 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={60} className={styles.iconWarning} />;
      case 'info':
        return <Info size={60} className={styles.iconInfo} />;
      case 'question':
        return <HelpCircle size={60} className={styles.iconQuestion} />;
      default:
        return <AlertTriangle size={60} className={styles.iconWarning} />;
    }
  };

  return (
    <div className={styles.dialogOverlay} onClick={onCancel}>
      <div className={styles.dialogContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onCancel}>
          <X size={20} />
        </button>
        
        {showIcon && (
          <div className={styles.iconWrapper}>
            {getIcon()}
          </div>
        )}
        
        <h2 className={styles.title}>{title}</h2>
        
        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
