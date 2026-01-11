import React from "react";
import styles from "../css/LoanListModal.module.css";

export default function SuccessPopupModal({ message, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: "400px", textAlign: "center" }}>
        <h3 className={styles.modalHeader}>Success</h3>
        <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>{message}</p>
        <button
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
