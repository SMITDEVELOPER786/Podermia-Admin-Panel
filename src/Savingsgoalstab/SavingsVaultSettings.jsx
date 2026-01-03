import { useState } from "react";
import styles from "../css/SavingGoals.module.css";
import CriticalActionModal from "../components/CriticalActionModal";

export default function SavingsVaultSettings() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCriticalModal, setShowCriticalModal] = useState(false);

  const [settings, setSettings] = useState({
    fixedMinInvestment: "",
    fixedMinBalance: "",
    fixedLockin: "",
    goalMinInvestment: "",
    goalMinBalance: "",
    goalLockin: "",
    freezeEarlyTermination: false,
    earlyTerminationPenalty: "",
    fixedProductStatus: "",
    goalProductStatus: "",
    referralEligible: false,
    notifyUser: true,
    savingsApprovalMode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(settings).forEach(([key, value]) => {
      if (
        value === "" &&
        key !== "freezeEarlyTermination" &&
        key !== "referralEligible" &&
        key !== "notifyUser"
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
<div className={styles.sectionHeader}>
  <h3 className={styles.mainTitle}>Savings Vault Settings</h3>

    <button
          className={styles.criticalBtn}
          onClick={() => setShowCriticalModal(true)}
        >
          Critical Actions
        </button>
</div>

      <div className={styles.vaultBox}>
        
        {/* LEFT */}
        <div className={styles.vaultCol}>
          <h4 className={styles.sectionTitle}>Fixed Savings Plan</h4>

          <input className={styles.input}
            placeholder="Minimum Investment Size"
            name="fixedMinInvestment"
            onChange={handleChange}
          />
          {errors.fixedMinInvestment && <p className={styles.error}>{errors.fixedMinInvestment}</p>}

          <input className={styles.input}
            placeholder="Minimum Balance"
            name="fixedMinBalance"
            onChange={handleChange}
          />
          {errors.fixedMinBalance && <p className={styles.error}>{errors.fixedMinBalance}</p>}

          <select className={styles.select} name="fixedLockin" onChange={handleChange}>
            <option value="">Select Lock-in</option>
            <option value="0">0 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
          </select>
          {errors.fixedLockin && <p className={styles.error}>{errors.fixedLockin}</p>}

          <h4 className={styles.sectionTitle}>Savings Goal</h4>

          <input className={styles.input}
            placeholder="Minimum Investment Size"
            name="goalMinInvestment"
            onChange={handleChange}
          />
          {errors.goalMinInvestment && <p className={styles.error}>{errors.goalMinInvestment}</p>}

          <input className={styles.input}
            placeholder="Minimum Balance"
            name="goalMinBalance"
            onChange={handleChange}
          />
          {errors.goalMinBalance && <p className={styles.error}>{errors.goalMinBalance}</p>}

          <select className={styles.select} name="goalLockin" onChange={handleChange}>
            <option value="">Select Lock-in</option>
            {[...Array(13)].map((_, i) => (
              <option key={i} value={i}>{i} month</option>
            ))}
          </select>
          {errors.goalLockin && <p className={styles.error}>{errors.goalLockin}</p>}
        </div>

        {/* RIGHT */}
        <div className={styles.vaultCol}>
          <h4 className={styles.sectionTitle}>Admin Controls</h4>

          <div className={styles.toggleRowClean}>
            <span>Freeze Early Termination</span>
            <label className={styles.switch}>
              <input type="checkbox" name="freezeEarlyTermination" onChange={handleChange} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <input className={styles.input}
            type="number"
            placeholder="Early Termination Penalty (%)"
            name="earlyTerminationPenalty"
            onChange={handleChange}
          />
          {errors.earlyTerminationPenalty && <p className={styles.error}>{errors.earlyTerminationPenalty}</p>}

          <select className={styles.select} name="fixedProductStatus" onChange={handleChange}>
            <option value="">Fixed Savings Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className={styles.select} name="goalProductStatus" onChange={handleChange}>
            <option value="">Savings Goal Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className={styles.select} name="savingsApprovalMode" onChange={handleChange}>
            <option value="">Savings Approval Mode</option>
            <option value="Automatic">Automatic</option>
            <option value="Admin Review">Admin Review</option>
          </select>

          <button className={styles.savePrimaryBtn} onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>

      {/* CRITICAL ACTION MODAL */}
      {showCriticalModal && (
        <CriticalActionModal
          isOpen={showCriticalModal}
          onClose={() => setShowCriticalModal(false)}
        />
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupCard}>
            <h3>Settings Saved</h3>
            <p>Savings Vault settings updated successfully</p>
          </div>
        </div>
      )}
    </>
  );
}
