import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import UpdateRatesModal from "../components/UpdateRatesModal";
import UpdateGoalRatesModal from "../components/UpdateGoalRatesModal";

export default function InterestSettings() {
  const [activeTab, setActiveTab] = useState("fixed");

  const defaultRates = [
    { month: "1 Months", rate: "8%" },
    { month: "3 Months", rate: "10%" },
    { month: "6 Months", rate: "12%" },
    { month: "12 Months", rate: "15%" },
  ];

  const defaultToggles = {
    "Upfront Payment": true,
    "Monthly Payment": false,
    "End-of-term Payment": false,
  };

  const defaultGoalRates = [
    { month: "1 Months", rate: "6%" },
    { month: "2 Months", rate: "6.5%" },
    { month: "3 Months", rate: "7%" },
    { month: "4 Months", rate: "7.5%" },
    { month: "5 Months", rate: "8%" },
    { month: "6 Months", rate: "8.5%" },
    { month: "7 Months", rate: "9%" },
    { month: "8 Months", rate: "8.5%" },
    { month: "9 Months", rate: "9%" },
    { month: "10 Months", rate: "9.5%" },
    { month: "11 Months", rate: "10%" },
    { month: "12 Months", rate: "10.5%" },
  ];

  const [fixedRates, setFixedRates] = useState(() => {
    const saved = localStorage.getItem("fixedRates");
    return saved ? JSON.parse(saved) : defaultRates;
  });

  const [toggleOptions, setToggleOptions] = useState(() => {
    const saved = localStorage.getItem("fixedToggles");
    return saved ? JSON.parse(saved) : defaultToggles;
  });

  const [goalRates, setGoalRates] = useState(() => {
    const saved = localStorage.getItem("goalRates");
    return saved ? JSON.parse(saved) : defaultGoalRates;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.tabRow}>
        <button
          className={activeTab === "fixed" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("fixed")}
        >
          Fixed Savings Rates
        </button>

        <button
          className={activeTab === "goal" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("goal")}
        >
          Goal Savings Rate
        </button>
      </div>

      {/* Fixed Savings Tab */}
      {activeTab === "fixed" && (
        <>
          <h3 className={styles.heading}>Interest Rate Configuration</h3>

          <div className={styles.box}>
            <div className={styles.leftCol}>
              <h4 className={styles.subHeading}>Fixed Savings Rates</h4>

              {fixedRates.map((item, i) => (
                <div key={i} className={styles.rateItem}>
                  <span>{item.month}</span>
                  <div className={styles.rateValue}>{item.rate}</div>
                </div>
              ))}
            </div>

            <div className={styles.rightCol}>
              <div className={styles.rightHeader}>
                <h4 className={styles.subHeading}>Payout Method Settings</h4>
                <button className={styles.updateBtn} onClick={() => setModalOpen(true)}>
                  Update Rates
                </button>
              </div>

              {Object.keys(toggleOptions).map((key) => (
                <div key={key} className={styles.toggleItem}>
                  <span>{key}</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={toggleOptions[key]} readOnly />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Goal Savings Tab */}
      {activeTab === "goal" && (
        <>
          <h3 className={styles.heading}>Interest Rate Configuration</h3>

          <div className={styles.box}>
            <div className={styles.goalWrapper}>
              <div className={styles.headerRow}>
                <h4 className={styles.subHeading}>Savings Goals Monthly Interest Rates …</h4>
                <button className={styles.updateBtn} onClick={() => setGoalModalOpen(true)}>
                  Update Rates
                </button>
              </div>

              <div className={styles.goalGridClean}>
                {goalRates.map((item, i) => (
                  <div key={i} className={styles.goalCard}>
                    <span>{item.month}</span>
                    <span className={styles.goalRate}>{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      {modalOpen && (
        <UpdateRatesModal
          rates={fixedRates}
          toggles={toggleOptions}
          onClose={() => setModalOpen(false)}
          onSave={(newRates, newToggles) => {
            setFixedRates(newRates);
            setToggleOptions(newToggles);
            setModalOpen(false);
          }}
        />
      )}

      {goalModalOpen && (
        <UpdateGoalRatesModal
          rates={goalRates}
          onClose={() => setGoalModalOpen(false)}
          onSave={(newRates) => {
            setGoalRates(newRates);
            setGoalModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
