import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

const Toast = ({ 
  type = 'success', // 'success', 'error', 'warning', 'info'
  title, 
  message, 
  onClose, 
  duration = 3000,
  showIcon = true 
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={60} className={styles.iconSuccess} />;
      case 'error':
        return <XCircle size={60} className={styles.iconError} />;
      case 'warning':
        return <AlertCircle size={60} className={styles.iconWarning} />;
      case 'info':
        return <AlertCircle size={60} className={styles.iconInfo} />;
      default:
        return <CheckCircle size={60} className={styles.iconSuccess} />;
    }
  };

  return (
    <div className={styles.toastOverlay} onClick={onClose}>
      <div className={styles.toastContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>
        
        {showIcon && (
          <div className={styles.iconWrapper}>
            {getIcon()}
          </div>
        )}
        
        <h2 className={styles.title}>{title}</h2>
        
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Toast;
