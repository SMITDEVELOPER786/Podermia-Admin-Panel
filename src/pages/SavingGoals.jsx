import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../css/SavingGoals.module.css";

import FixedSavings from "../Savingsgoalstab/FixedSavings";
import GoalSavings from "../Savingsgoalstab/Goalsavings";
import InterestSettings from "../Savingsgoalstab/Interestsettings";
import Reports from "../Savingsgoalstab/reports";
import EarlyWithdrawals from "../Savingsgoalstab/EarlyWithdrawls";

export default function SavingGoals() {
  const [activeTab, setActiveTab] = useState("fixed");

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Saving & Goals Administration</h2>
      

      <div className={styles.cards}>
        <div className={styles.card}><p>Active Goals</p><h3>1,234</h3></div>
        <div className={styles.card}><p>Total Saving</p><h3>₦890M</h3></div>
        <div className={styles.card}><p>Maturing This Month</p><h3>₦23M</h3></div>
      </div>
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab("fixed")} className={activeTab === "fixed" ? styles.active : ""}>Fixed Savings</button>
        <button onClick={() => setActiveTab("goal")} className={activeTab === "goal" ? styles.active : ""}>Goal Savings</button>
        <button onClick={() => setActiveTab("interest")} className={activeTab === "interest" ? styles.active : ""}>Interest Settings</button>
        <button onClick={() => setActiveTab("reports")} className={activeTab === "reports" ? styles.active : ""}>Reports</button>
        <button onClick={() => setActiveTab("withdraw")} className={activeTab === "withdraw" ? styles.active : ""}>Early Withdrawals</button>
      </div>
<div className={styles.headerRow}>
  <h3>
    {activeTab === "fixed" && "Fixed Saving Management"}
    {activeTab === "goal" && "Goal Saving Management"}
    {activeTab === "interest" && ""}
    {activeTab === "reports" && "Reports"}
    {activeTab === "withdraw" && "Early Withdrawals"}
  </h3>

  {(activeTab === "fixed" || activeTab === "goal" || activeTab === "withdraw") && (
    <div className={styles.filters}>
      <div className={styles.searchBox}>
        <FiSearch className={styles.searchIcon} />
        <input placeholder="Search by users...." />
      </div>

      <select>
        <option>Filter by status</option>
      </select>
    </div>
  )}
</div>
      {activeTab === "fixed" && <FixedSavings />}
      {activeTab === "goal" && <GoalSavings />}
      {activeTab === "interest" && <InterestSettings />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "withdraw" && <EarlyWithdrawals />}
    </div>
  );
}
