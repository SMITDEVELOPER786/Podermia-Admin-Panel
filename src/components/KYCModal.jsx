import React, { useState, useEffect } from "react";
import styles from "../css/KYCModal.module.css";

/**
 * Props:
 *  - open: boolean
 *  - onClose: function
 *  - user: object { name, type, email, phone, userId, submitted, trn, address, status, netWorth, incomeSources, investmentPurpose }
 *
 * Usage:
 * <KYCModal open={open} onClose={()=>setOpen(false)} user={userData} />
 */

export default function KYCModal({ open, onClose, user }) {
  if (!open || !user) return null;

  const LOCAL_KEY = "kyc_exact_ui";
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...user });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {
        setForm({ ...user });
      }
    } else {
      setForm({ ...user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const saveForm = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(form));
    setEdit(false);
  };

  const fields = [
    ["Full Name", "name"],
    ["Account Type", "type"],
    ["Email", "email"],
    ["Phone Number", "phone"],
    ["User ID", "userId", true],
    ["Registration Date", "submitted", true],
    ["TIN Number", "trn"],
    ["Address", "address"],
  ];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>KYC Details — {form.name || "-"}</h3>
          <button
            className={styles.closeBtn}
            onClick={() => {
              onClose();
              setEdit(false);
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Summary</button>
          <button className={styles.tab}>BVN/NIN</button>
          <button className={styles.tab}>Documents</button>
        </div>

        {/* SUMMARY CARD */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>User Summary</span>

            {!edit ? (
              <button
                className={styles.editBtn}
                onClick={() => setEdit(true)}
                type="button"
              >
                Edit
              </button>
            ) : (
              <div className={styles.editBtns}>
                <button
                  className={styles.cancelBtn}
                  type="button"
                  onClick={() => {
                    setForm(JSON.parse(localStorage.getItem(LOCAL_KEY)) || user);
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button className={styles.saveBtn} type="button" onClick={saveForm}>
                  Save
                </button>
              </div>
            )}
          </div>

          {/* GRID */}
          <div className={styles.grid}>
            {fields.map(([label, key, locked]) => (
              <div key={key}>
                <strong>{label}</strong>

                {key === "address" ? (
                  <textarea
                    name={key}
                    disabled={!edit || !!locked}
                    value={form[key] || ""}
                    onChange={handleChange}
                    className={!edit || locked ? styles.value : styles.inputArea}
                    placeholder={edit && !locked ? "Enter address..." : ""}
                  />
                ) : (
                  <input
                    name={key}
                    disabled={!edit || !!locked}
                    value={form[key] || ""}
                    onChange={handleChange}
                    className={!edit || locked ? styles.value : styles.input}
                    placeholder={edit && !locked ? `Enter ${label}` : ""}
                  />
                )}
              </div>
            ))}
          </div>

          <p className={styles.kycRow}>
            <strong>KYC Status:</strong>
            <span className={styles.statusTag}>{form.status || "Pending"}</span>
          </p>
        </div>

        {/* INVESTMENT SECTION */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Investment Information</span>
          </div>

          <p className={styles.infoBlock}>
            <span className={styles.infoLabel}>Aggregate Net Worth:</span>
            <span className={styles.infoValue}>{form.netWorth || "-"}</span>
          </p>

          <p className={styles.infoBlock}>
            <span className={styles.infoLabel}>Sources of Investment Funds:</span>
            <span className={styles.infoValue}>{form.incomeSources || "-"}</span>
          </p>

          <p className={styles.infoBlock}>
            <span className={styles.infoLabel}>Purpose of Investment:</span>
            <span className={styles.infoValue}>{form.investmentPurpose || "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}