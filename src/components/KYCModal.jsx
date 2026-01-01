import React, { useState, useEffect } from "react";
import styles from "../css/KYCModal.module.css";
import uploadImg from "../assets/upload.png";
import document1Img from "../assets/document1.png";
import document2Img from "../assets/document2.png";
import document3Img from "../assets/document3.png";
import userIconImg from "../assets/userIcon.png";
import AvatarImg from "../assets/avatar.jpeg"

// Mock data defaults
const MOCK_COUNTRY = "United States";
const MOCK_CITIZENSHIP = "US Citizen";
const MOCK_USER_IMAGE = AvatarImg; 

export default function KYCModal({ open, onClose, user, onSave }) {
  if (!open || !user) return null;

  const LOCAL_KEY = "kyc_ui_data";
  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [form, setForm] = useState({
    ...user,
    country: user.country || MOCK_COUNTRY,
    citizenship: user.citizenship || MOCK_CITIZENSHIP,
    userImage: user.userImage || MOCK_USER_IMAGE,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    setForm({
      ...user,
      country: saved[user.userId]?.country || user.country || MOCK_COUNTRY,
      citizenship: saved[user.userId]?.citizenship || user.citizenship || MOCK_CITIZENSHIP,
      userImage: saved[user.userId]?.userImage || user.userImage || MOCK_USER_IMAGE,
      ...saved[user.userId],
    });
  }, [open, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveForm = () => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    saved[form.userId] = form;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(saved));
    setEdit(false);

    if (onSave) onSave(form);
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
    ["Country of Residence", "country"],
    ["Citizenship", "citizenship"],
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>KYC Details — {form.name || "-"}</h3>
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

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "summary" && styles.active}`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={`${styles.tab} ${activeTab === "bvn" && styles.active}`}
            onClick={() => setActiveTab("bvn")}
          >
            BVN/NIN
          </button>
          <button
            className={`${styles.tab} ${activeTab === "docs" && styles.active}`}
            onClick={() => setActiveTab("docs")}
          >
            Documents
          </button>
        </div>

        {activeTab === "summary" && (
          <>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.userImageWrapper}>
                  <img src={form.userImage || MOCK_USER_IMAGE} alt="user" className={styles.userImgLarge} />

                  {edit && (
                    <input
                      type="text"
                      name="userImage"
                      placeholder="Image URL"
                      value={form.userImage || ""}
                      onChange={handleChange}
                      className={styles.userImageInput}
                    />
                  )}
                </div>
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
                        const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
                        setForm({
                          ...user,
                          country: saved[user.userId]?.country || user.country || MOCK_COUNTRY,
                          citizenship: saved[user.userId]?.citizenship || user.citizenship || MOCK_CITIZENSHIP,
                          userImage: saved[user.userId]?.userImage || user.userImage || MOCK_USER_IMAGE,
                          ...saved[user.userId],
                        });
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
                {fields.map(([label, key]) => (
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
                      form.status === "Approved"
                        ? styles.statusApproved
                        : form.status === "Under Review"
                        ? styles.statusReview
                        : styles.statusPending
                    }`}
                  >
                    {form.status}
                  </span>
                ) : (
                  <select
                    name="status"
                    value={form.status || "Pending"}
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

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span style={{ fontWeight: "600" }}>Investment Information</span>
              </div>

              <p className={styles.infoBlock}>
                <span className={styles.infoLabel}>Aggregate Net Worth:</span>
                <br />
                {!edit ? (
                  <span className={styles.infoValue}>{form.netWorth || "$250,000"}</span>
                ) : (
                  <input
                    name="netWorth"
                    value={form.netWorth || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </p>

              <p className={styles.infoBlock}>
                <span className={styles.infoLabel}>Sources of Investment Funds:</span>
                <br />
                {!edit ? (
                  <span className={styles.infoValue}>{form.incomeSources || "Salary, Business Income, Investments"}</span>
                ) : (
                  <input
                    name="incomeSources"
                    value={form.incomeSources || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </p>

              <p className={styles.infoBlock}>
                <span className={styles.infoLabel}>Purpose of Investment:</span>
                <br />
                {!edit ? (
                  <span className={styles.infoValue}>{form.investmentPurpose || "Long term wealth building and retirement planing"}</span>
                ) : (
                  <input
                    name="investmentPurpose"
                    value={form.investmentPurpose || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </p>
            </div>
          </>
        )}

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
            <h4 className={styles.sectionTitle2}>Matched Data</h4>
            <div className={styles.matchRow}>
              <div className={styles.matchBox}>
                <p className={styles.matchLabel}>Name</p>
                <span className={styles.matchBtn}>Match</span>
              </div>
              <div className={styles.matchBox}>
                <p className={styles.matchLabel}>Date of Birth</p>
                <span className={styles.matchBtn}>Match</span>
              </div>
              <div className={styles.matchBox}>
                <p className={styles.matchLabel}>Phone</p>
                <span className={styles.matchBtn}>Match</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className={styles.card}>
            <div className={styles.uploadRow}>
              <img src={uploadImg} className={styles.uploadIconImg} />
              <span className={styles.uploadText}>Upload Documents</span>
            </div>

            <div className={styles.docsGrid}>
              {[ 
                { img: document1Img, name: "National ID" },
                { img: document2Img, name: "Passport Photo" },
                { img: document3Img, name: "Utility Bills" }
              ].map((doc, i) => (
                <div key={i} className={styles.docBox}>
                  <img src={doc.img} className={styles.docImg} />
                  <p className={styles.docName}>{doc.name}</p>
                  <span className={styles.docStatus}>Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
