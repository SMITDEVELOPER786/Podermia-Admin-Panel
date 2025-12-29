import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../css/SavingGoals.module.css";
import SavingsVaultSettings from "../Savingsgoalstab/SavingsVaultSettings";
import FixedSavings from "../Savingsgoalstab/FixedSavings";
import GoalSavings from "../Savingsgoalstab/Goalsavings";
import InterestSettings from "../Savingsgoalstab/Interestsettings";
import Reports from "../Savingsgoalstab/reports";
import EarlyWithdrawals from "../Savingsgoalstab/EarlyWithdrawls";

export default function SavingGoals() {
  const [activeTab, setActiveTab] = useState("fixed");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock Data
  const fixedSavingsData = [
    { id: "FS001", user: "Alice Brown", amount: 100000, duration: "12 months", status: "Active", interest: "15%", maturity: "2024-12-15" },
    { id: "FS002", user: "Bob Wilson", amount: 250000, duration: "6 months", status: "Matured", interest: "12%", maturity: "2024-01-10" },
    { id: "FS003", user: "Mike Johnson", amount: 400000, duration: "9 months", status: "Approved", interest: "10%", maturity: "2024-09-05" },
  ];

  const goalSavingsData = [
    { id: "GS001", user: "Emma Davis", target: 100000, current: 350000, status: "Active", progress: "70%", type: "Personal", autoDebit: true },
    { id: "GS002", user: "Michael Chen", target: 250000, current: 800000, status: "Active", progress: "90%", type: "Group", autoDebit: true },
    { id: "GS003", user: "Alice Brown", target: 300000, current: 300000, status: "Matured", progress: "100%", type: "Personal", autoDebit: true },
  ];

  const earlyWithdrawData = [
    { id: "WR001", user: "John Smith", amount: 50000, plan: "Fixed Savings", status: "Approved", penalty: 2500, date: "2024-12-15" },
    { id: "WR002", user: "Sarah Johnson", amount: 75000, plan: "Goal Savings", status: "Approved", penalty: 0, date: "2024-01-10" },
    { id: "WR003", user: "Mike Brown", amount: 30000, plan: "Fixed Savings", status: "Active", penalty: 0, date: "2024-06-05" },
  ];

  const filterData = (data) =>
    data
      .filter((row) => statusFilter === "All" || row.status === statusFilter)
      .filter((row) => row.user.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Saving & Goals Administration</h2>

      <div className={styles.cards}>
        <div className={styles.card}>
          <p>Active Goals</p>
          <h3>1,234</h3>
        </div>
        <div className={styles.card}>
          <p>Total Saving</p>
          <h3>₦890M</h3>
        </div>
        <div className={styles.card}>
          <p>Maturing This Month</p>
          <h3>₦23M</h3>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
  onClick={() => setActiveTab("vault")}
  className={activeTab === "vault" ? styles.active : ""}
>
  Savings Vault Settings
</button>
        <button
          onClick={() => setActiveTab("fixed")}
          className={activeTab === "fixed" ? styles.active : ""}
        >
          Fixed Savings
        </button>
        <button
          onClick={() => setActiveTab("goal")}
          className={activeTab === "goal" ? styles.active : ""}
        >
          Goal Savings
        </button>
        <button
          onClick={() => setActiveTab("interest")}
          className={activeTab === "interest" ? styles.active : ""}
        >
          Interest Settings
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={activeTab === "reports" ? styles.active : ""}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab("withdraw")}
          className={activeTab === "withdraw" ? styles.active : ""}
        >
          Early Withdrawals
        </button>
      </div>

      <div className={styles.headerRow}>
        <h3>
          {activeTab === "vault" && "Savings Vault Settings"}
          {activeTab === "fixed" && "Fixed Saving Management"}
          {activeTab === "goal" && "Goal Saving Management"}
          {activeTab === "interest" && "Interest Settings"}
          {activeTab === "reports" && "Reports"}
          {activeTab === "withdraw" && "Early Withdrawals"}
        </h3>

        {(activeTab === "fixed" || activeTab === "goal" || activeTab === "withdraw") && (
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                placeholder="Search by users...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Matured">Matured</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
        )}
      </div>
      {activeTab === "vault" && <SavingsVaultSettings />}
      {activeTab === "fixed" && <FixedSavings data={filterData(fixedSavingsData)} />}
      {activeTab === "goal" && <GoalSavings data={filterData(goalSavingsData)} />}
      {activeTab === "interest" && <InterestSettings />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "withdraw" && <EarlyWithdrawals data={filterData(earlyWithdrawData)} />}
    </div>
  );
}
