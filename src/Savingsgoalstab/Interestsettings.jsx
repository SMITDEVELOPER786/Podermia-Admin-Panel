import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function InterestSettings() {
  const [activeTab, setActiveTab] = useState("fixed");

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

      {activeTab === "fixed" && (
        <>
          <h3 className={styles.heading}>Interest Rate Configuration</h3>

          <div className={styles.box}>
            <div className={styles.leftCol}>
              <h4 className={styles.subHeading}>Fixed Savings Rates</h4>

              <div className={styles.rateItem}>
                <span>1 Months</span>
                <div className={styles.rateValue}>8%</div>
              </div>

              <div className={styles.rateItem}>
                <span>3 Months</span>
                <div className={styles.rateValue}>10%</div>
              </div>

              <div className={styles.rateItem}>
                <span>6 Months</span>
                <div className={styles.rateValue}>12%</div>
              </div>

              <div className={styles.rateItem}>
                <span>12 Months</span>
                <div className={styles.rateValue}>15%</div>
              </div>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.rightHeader}>
                <h4 className={styles.subHeading}>Payout Method Settings</h4>
                <button className={styles.updateBtn}>Update Rates</button>
              </div>

              <div className={styles.toggleItem}>
                <span>Upfront Payment</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <span>Monthly Payment</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleItem}>
                <span>End-of-term Payment</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </>
      )}

     {activeTab === "goal" && (
  <>
    <h3 className={styles.heading}>Interest Rate Configuration</h3>

    <div className={styles.box}>
    <div className={styles.goalWrapper}>
  <div className={styles.headerRow}>
     <h4 className={styles.subHeading}>Savings Goals Monthly Interest Rates …</h4>
     <button className={styles.update}>Update Rates</button>
  </div>
     
        <div className={styles.goalGridClean}>
          {[
            { m: "1 Months", r: "6%" },
            { m: "2 Months", r: "6.5%" },
            { m: "3 Months", r: "7%" },
            { m: "4 Months", r: "7.5%" },
            { m: "5 Months", r: "8%" },
            { m: "6 Months", r: "8.5%" },
            { m: "7 Months", r: "9%" },
            { m: "8 Months", r: "8.5%" },
            { m: "9 Months", r: "9%" },
            { m: "10 Months", r: "9.5%" },
            { m: "11 Months", r: "10%" },
            { m: "12 Months", r: "10.5%" },
          ].map((item, i) => (
            <div key={i} className={styles.goalCard}>
              <span>{item.m}</span>
              <span className={styles.goalRate}>{item.r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}
