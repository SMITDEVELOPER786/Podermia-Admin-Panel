import React, { useState, useEffect } from "react";
import styles from "../css/KYCBusinessModal.module.css";
import userIcon from "../assets/userIcon.png";
import editIcon from "../assets/editicon.png";
import document1Img from "../assets/document1.png";
import document2Img from "../assets/document2.png";
import document3Img from "../assets/document3.png";

export default function KYCBusinessModal({ open, onClose, user }) {
  if (!open || !user) return null;

  const LOCAL_KEY = "kyc_business_data";
  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [form, setForm] = useState({ ...user });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {
        setForm({ ...user });
      }
    } else setForm({ ...user });
  }, [open, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveForm = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(form));
    setEdit(false);
  };

  const fields = [
    ["Full Name", "fullName"],
    ["Account Type", "type"],
    ["Email", "email"],
    ["Phone Number", "phone"],
    ["User ID", "userId", true],
    ["Registration Date", "registrationDate", true],
    ["TIN Number", "tinNumber"],
    ["Address", "address"],
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>KYC Details — {form.fullName || "-"}</h3>
          <button
            className={styles.closeBtn}
            onClick={() => {
              onClose();
              setEdit(false);
            }}
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          {["summary", "bvn", "docs", "business", "stakeholder"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* SUMMARY TAB */}
        {activeTab === "summary" && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={userIcon} alt="user" className={styles.userImg} />
              <span>User Summary</span>
              {!edit ? (
                <button className={styles.editBtn} onClick={() => setEdit(true)}>
                  <svg width="14" height="14" fill="currentColor">
                    <path d="M13.3 2.7l-1-1a1 1 0 00-1.4 0L4 8.6V11h2.4l6.9-6.9a1 1 0 000-1.4z" />
                  </svg>
                  Edit
                </button>
              ) : (
                <div className={styles.editBtns}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setForm(JSON.parse(localStorage.getItem(LOCAL_KEY)) || user);
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles.saveBtn} onClick={saveForm}>
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className={styles.summaryGrid}>
              {fields.map(([label, key, locked]) => (
                <div key={key} className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{label}</span>
                  {!edit ? (
                    <span className={styles.summaryValue}>{form[key] || "-"}</span>
                  ) : key === "address" ? (
                    <textarea
                      name={key}
                      value={form[key] || ""}
                      onChange={handleChange}
                      className={styles.summaryInputArea}
                    />
                  ) : (
                    <input
                      name={key}
                      value={form[key] || ""}
                      onChange={handleChange}
                      className={styles.summaryInput}
                    />
                  )}
                </div>
              ))}
            </div>

            <p className={styles.kycRow}>
              <strong>KYC Status:</strong>
              {!edit ? (
                <span
                  className={`${styles.statusTag} ${
                    form.kycStatus === "Approved"
                      ? styles.statusApproved
                      : form.kycStatus === "Under Review"
                      ? styles.statusReview
                      : styles.statusPending
                  }`}
                >
                  {form.kycStatus}
                </span>
              ) : (
                <select
                  name="kycStatus"
                  value={form.kycStatus || "Pending"}
                  onChange={handleChange}
                  className={styles.dropdown}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Review">Under Review</option>
                </select>
              )}
            </p>
          </div>
        )}

        {/* BVN TAB */}
        {activeTab === "bvn" && (
          <div className={styles.bvnCard}>
            <h4 className={styles.sectionTitle}>BVN/NIN Verification</h4>
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={styles.label}>BVN Number</p>
                <p className={styles.bigValue}>12345678901</p>
                <span className={styles.verifiedTag}>Verified</span>
              </div>
              <div className={styles.column}>
                <p className={styles.label}>NIN Number</p>
                <p className={styles.bigValue}>12345678901234</p>
                <span className={styles.verifiedTag}>Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "docs" && (
          <div className={styles.card}>
            <div className={styles.docsGrid}>
              {[document1Img, document2Img, document3Img].map((doc, i) => (
                <div key={i} className={styles.docBox}>
                  <img src={doc} className={styles.docImg} />
                  <p className={styles.docName}>
                    {i === 0 ? "National ID" : i === 1 ? "Passport Photo" : "Utility Bills"}
                  </p>
                  <span className={styles.docStatus}>Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUSINESS TAB */}
        {activeTab === "business" && (
          <div className={styles.card}>
            <p>Business Information Section</p>
          </div>
        )}

        {/* STAKEHOLDER TAB */}
        {activeTab === "stakeholder" && (
          <div className={styles.card}>
            <p>Stakeholder Information Section</p>
          </div>
        )}

        {/* FOOTER BUTTONS */}
        {!edit && (
          <div className={styles.footerButtons}>
            <button className={styles.btnApprove}>Approve</button>
            <button className={styles.btnReject}>Reject</button>
            <button className={styles.btnPending}>Mark as Pending</button>
          </div>
        )}
      </div>
    </div>
  );
}
