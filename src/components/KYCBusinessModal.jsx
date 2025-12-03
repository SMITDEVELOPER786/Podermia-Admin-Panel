import React, { useState, useEffect } from "react";
import styles from "../css/KYCBusinessModal.module.css";
import { MdEdit } from "react-icons/md";
import userIcon from "../assets/userIcon.png";

// DOCUMENT IMAGES
import document1 from "../assets/document1.png";
import document2 from "../assets/document2.png";
import document3 from "../assets/document3.png";

export default function KYCBusinessModal({ open, onClose, user, onSave }) {
  if (!open || !user) return null;

  const LOCAL_KEY = "kyc_ui_data";

  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [form, setForm] = useState({ ...user });
  const [selectedStake, setSelectedStake] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    setForm(savedData[user.userId] || { ...user });
  }, [open, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveForm = () => {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    savedData[form.userId] = form;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(savedData));
    setEdit(false);
    if (onSave) onSave(form);
  };

  const fields = [
    ["Full Name", "name"],
    ["Account Type", "type"],
    ["Email", "email"],
    ["Phone Number", "phone"],
    ["User ID", "userId", true],
    ["Registration Date", "registrationDate", true],
    ["TIN Number", "tin"],
    ["Address", "address"],
  ];

  const docs = [
    { title: "CAC Certificate", img: document1 },
    { title: "Memorandum", img: document2 },
    { title: "Tax Certificate", img: document3 },
    { title: "CAC Status Report", img: document1 },
    { title: "CBN/SEC Registration", img: document2 },
    { title: "SCUML Certificate", img: document3 },
    { title: "Board Resolution", img: document1 },
  ];

  // HARD-CODED STAKEHOLDERS
  const stakeholders = {
    directors: [
      { name: "John Doe", role: "Director", bvn: "12345678", badge: "Verified", phone: "+234 801 111 1111", email: "john.doe@company.com", address: "Lagos, Nigeria" },
    ],
    signatories: [
      { name: "Mary Johnson", role: "Signatory", tin: "56789876-0001", badge: "Signature Uploaded", phone: "+234 801 999 9999", email: "mary.sign@company.com", address: "Lekki 2, Lagos" },
    ],
    ubos: [
      { name: "Alice Smith", ownership: "40%", bvn: "98765432", badge: "Verified", phone: "+234 802 222 2222", email: "alice.smith@company.com", address: "Victoria Island, Lagos", type: "UBO" },
    ],
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.title}>KYC Details — {form.name || "-"}</span>
          <button
            className={styles.closeBtn}
            onClick={() => {
              onClose();
              setEdit(false);
              setSelectedStake(null);
            }}
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          {["summary", "BVN/NIN", "documents", "business", "stakeholder"].map(
            (tab) => (
              <div
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            )
          )}
        </div>

        <div className={styles.modalContent}>
          {/* SUMMARY */}
          {activeTab === "summary" && (
            <>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatarRow}>
                    <img src={userIcon} alt="user" className={styles.userIcon} />
                    <span className={styles.cardTitle}>User Summary</span>
                  </div>

                  {!edit ? (
                    <button className={styles.editBtn} onClick={() => setEdit(true)}>
                      <MdEdit size={18} /> Edit
                    </button>
                  ) : (
                    <div className={styles.editBtns}>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => {
                          const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
                          setForm(savedData[user.userId] || user);
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

                <div className={styles.infoGrid}>
                  {fields.map(([label, key, locked]) => (
                    <div key={key}>
                      <strong>{label}</strong>
                      {!edit || locked ? (
                        <p>{form[key] || "-"}</p>
                      ) : key === "address" ? (
                        <textarea
                          name={key}
                          value={form[key] || ""}
                          onChange={handleChange}
                          className={styles.textarea}
                        />
                      ) : (
                        <input
                          name={key}
                          value={form[key] || ""}
                          onChange={handleChange}
                          className={styles.input}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.statusRow}>
                  <strong>KYC Status</strong>
                  {!edit ? (
                    <span
                      className={`${styles.statusBadge} ${
                        form.status === "Approved"
                          ? styles.statusApproved
                          : form.status === "Pending"
                          ? styles.statusPending
                          : styles.statusReview
                      }`}
                    >
                      {form.status || "Under Review"}
                    </span>
                  ) : (
                    <select
                      name="status"
                      value={form.status || "Under Review"}
                      onChange={handleChange}
                      className={styles.dropdown}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  )}
                </div>
              </div>

              <div className={styles.card} style={{ marginTop: "25px" }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Admin Compliance Checklist</span>
                </div>
                <div className={styles.checkGrid}>
                  <span>• Basic Information Complete</span>
                  <span>• TIN Number Provided</span>
                  <span>• Address Verified</span>
                  <span>• Investment Profile Complete</span>
                  <span>• Corporate Documents</span>
                  <span>• Stakeholder Information</span>
                </div>
              </div>
            </>
          )}

          {/* DOCUMENTS */}
          {activeTab === "documents" && (
            <div className={styles.docCard}>
              <h3 className={styles.docTitle}>📁 Upload Documents</h3>
              <div className={styles.docsGrid}>
                {docs.map((d, i) => (
                  <div key={i} className={styles.docBox}>
                    <img src={d.img} alt="" className={styles.docImg} />
                    <p className={styles.docLabel}>{d.title}</p>
                    <span className={styles.uploadedBadge}>Uploaded</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BVN */}
          {activeTab === "bvn" && (
            <div className={styles.cardBVN}>
              <h3 className={styles.bvnTitle}>Business Verification</h3>

              <div className={styles.bvnGrid}>
                <div>
                  <label className={styles.bvnLabel}>RC Number</label>
                  <p className={styles.bvnValue}>{form.rcNumber || "RC123456"}</p>
                  <span className={styles.bvnVerified}>Verified</span>
                </div>

                <div>
                  <label className={styles.bvnLabel}>TIN Number</label>
                  <p className={styles.bvnValue}>{form.tinNumber || "12345678-0001"}</p>
                  <span className={styles.bvnVerified}>Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* BUSINESS */}
          {activeTab === "business" && (
            <>
              {/* Business Details */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Business Details</span>
                  {!edit ? (
                    <button className={styles.editBtn} onClick={() => setEdit(true)}>
                      <MdEdit size={16} /> Edit
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

                <div className={styles.infoGrid}>
                  <div>
                    <strong>RC Number</strong>
                    {!edit ? <p>{form.rcNumber || "RC123456"}</p> : <input name="rcNumber" value={form.rcNumber || ""} onChange={handleChange} className={styles.input} />}
                  </div>
                  <div>
                    <strong>TIN Number</strong>
                    {!edit ? <p>{form.tinNumber || "12345678-0001"}</p> : <input name="tinNumber" value={form.tinNumber || ""} onChange={handleChange} className={styles.input} />}
                  </div>
                  <div>
                    <strong>Business Type</strong>
                    {!edit ? <p>{form.businessType || "Financial Services"}</p> : <input name="businessType" value={form.businessType || ""} onChange={handleChange} className={styles.input} />}
                  </div>
                  <div>
                    <strong>Business Address</strong>
                    {!edit ? <p>{form.businessAddress || "123 Business District, Lagos"}</p> : <textarea name="businessAddress" value={form.businessAddress || ""} onChange={handleChange} className={styles.textarea} />}
                  </div>
                </div>
              </div>

              {/* Investment Info */}
              <div className={styles.card} style={{ marginTop: "25px" }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Investment Information</span>
                </div>

                <div className={styles.infoGridSingle}>
                  <div>
                    <strong>Aggregate Net Worth of Investment Funds</strong>
                    {!edit ? <p>{form.netWorth || "$250,000"}</p> : <input name="netWorth" value={form.netWorth || ""} onChange={handleChange} className={styles.input} />}
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    <strong>Sources of Investment Funds</strong>
                    {!edit ? <p>{form.sources || "Salary, Business Income"}</p> : <textarea name="sources" value={form.sources || ""} onChange={handleChange} className={styles.textarea} />}
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    <strong>Purpose of Investment</strong>
                    {!edit ? <p>{form.purpose || "Long-term wealth building and retirement planning"}</p> : <textarea name="purpose" value={form.purpose || ""} onChange={handleChange} className={styles.textarea} />}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* STAKEHOLDER */}
          {activeTab === "stakeholder" && (
            <>
              {selectedStake ? (
                <div className={styles.uboDetailWrapper}>
                  <button className={styles.backBtn} onClick={() => setSelectedStake(null)}>
                    ← Back
                  </button>

                  <div className={styles.uboCard}>
                    <div className={styles.uboHeaderRow}>
                      <p className={styles.uboName}>{selectedStake.name}</p>
                      <span className={styles.verifiedTag}>{selectedStake.badge}</span>
                    </div>

                    {selectedStake.ownership && (
                      <p className={styles.uboOwnership}>Ownership: <strong>{selectedStake.ownership}</strong></p>
                    )}

                    <div className={styles.uboGrid}>
                      {selectedStake.tin && (<><strong>TIN:</strong><span>{selectedStake.tin}</span></>)}
                      {selectedStake.bvn && (<><strong>BVN:</strong><span>{selectedStake.bvn}</span></>)}
                      <strong>Phone:</strong><span>{selectedStake.phone}</span>
                      <strong>Email:</strong><span>{selectedStake.email}</span>
                      <strong>Address:</strong><span>{selectedStake.address}</span>
                    </div>

                    {selectedStake.type === "UBO" && (
                      <div className={styles.uboDocsBox}>
                        <strong>Required Documents:</strong>
                        <div className={styles.uboDocRow}>
                          <span className={styles.docBadge}>Valid ID: Uploaded</span>
                          <span className={styles.docBadge}>Proof of Address: Uploaded</span>
                          <span className={styles.docBadge}>Selfie: Uploaded</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.stakeWrapper}>
                  {/* Directors */}
                  <div className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>Directors</h3>
                    {stakeholders.directors.map((person, idx) => (
                      <div key={idx} className={styles.personCard} onClick={() => setSelectedStake(person)}>
                        <div>
                          <p className={styles.personName}>{person.name}</p>
                          <p className={styles.personRole}>{person.role}</p>
                          <p className={styles.personBvn}>BVN: {person.bvn}</p>
                        </div>
                        <span className={styles.badgeVerified}>{person.badge}</span>
                      </div>
                    ))}
                  </div>

                  {/* Signatories */}
                  <div className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>Signatories</h3>
                    {stakeholders.signatories.map((person, idx) => (
                      <div key={idx} className={styles.personCard} onClick={() => setSelectedStake(person)}>
                        <div>
                          <p className={styles.personName}>{person.name}</p>
                          <p className={styles.personRole}>{person.role}</p>
                          <p className={styles.personBvn}>TIN: {person.tin}</p>
                        </div>
                        <span className={styles.badgeSignature}>{person.badge}</span>
                      </div>
                    ))}
                  </div>

                  {/* UBOs */}
                  <div className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>UBOs</h3>
                    {stakeholders.ubos.map((person, idx) => (
                      <div key={idx} className={styles.personCard} onClick={() => setSelectedStake(person)}>
                        <div>
                          <p className={styles.personName}>{person.name}</p>
                          <p className={styles.personRole}>Ownership: {person.ownership}</p>
                          {person.bvn && <p className={styles.personBvn}>BVN: {person.bvn}</p>}
                        </div>
                        <span className={styles.badgeVerified}>{person.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
