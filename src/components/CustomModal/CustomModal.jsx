import React, { useEffect } from "react";
import styles from "./CustomModal.module.css";
import { CrossIcon, X } from "lucide-react";

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
        style={{ "--modal-width": width }}
        onClick={stopPropagation}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title} style={{ color: titleColor }}>
              {title}
            </h2>
          </div>
        )}

        {showClose && (
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={25} />
          </button>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
