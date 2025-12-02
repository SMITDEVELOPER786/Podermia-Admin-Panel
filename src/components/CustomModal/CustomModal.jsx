import React, { useEffect } from "react";
import styles from "./CustomModal.module.css";

const CustomModal = ({
  isOpen,
  onClose,
  title = "",
  titleColor = "",
  children,
  width = "500px",
  showClose = true,
  overlayClose = true,
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (overlayClose) onClose();
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.modalBox}
        style={{ width }}
        onClick={stopPropagation}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title} style={{ color: titleColor }}>{title}</h2>
            {showClose && (
              <button className={styles.closeBtn} onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
