import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import exportIcon from "../assets/export.png";
import styles from "../css/SavingGoals.module.css";

import SavingsVaultSettings from "../Savingsgoalstab/SavingsVaultSettings";
import FixedSavings from "../Savingsgoalstab/FixedSavings";
import GoalSavings from "../Savingsgoalstab/Goalsavings";
import InterestSettings from "../Savingsgoalstab/Interestsettings";
import Reports from "../Savingsgoalstab/reports";
import EarlyWithdrawals from "../Savingsgoalstab/EarlyWithdrawls";

export default function SavingGoals() {
  const [activeTab, setActiveTab] = useState("vault");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");

  // Mock Data
  const fixedSavingsData = [
    { id: "FS001", userId: "U001", user: "Alice Brown", amount: 100000, duration: "12 months", status: "Active", interest: "15%", maturity: "2024-12-15", startDate: "2024-01-01" },
    { id: "FS002", userId: "U002", user: "Bob Wilson", amount: 250000, duration: "6 months", status: "Matured", interest: "12%", maturity: "2024-01-10", startDate: "2023-07-01" },
    { id: "FS003", userId: "U003", user: "Mike Johnson", amount: 400000, duration: "9 months", status: "Approved", interest: "10%", maturity: "2024-09-05", startDate: "2024-01-01" },
  ];

  const goalSavingsData = [
    { id: "GS001", userId: "U004", user: "Emma Davis", target: 100000, current: 350000, status: "Active", progress: "70%", type: "Personal", autoDebit: true, startDate: "2024-02-01" },
    { id: "GS002", userId: "U005", user: "Michael Chen", target: 250000, current: 800000, status: "Active", progress: "90%", type: "Group", autoDebit: true, startDate: "2024-03-01" },
    { id: "GS003", userId: "U001", user: "Alice Brown", target: 300000, current: 300000, status: "Matured", progress: "100%", type: "Personal", autoDebit: true, startDate: "2023-05-01" },
  ];

  const earlyWithdrawData = [
    { id: "WR001", userId: "U006", user: "John Smith", amount: 50000, plan: "Fixed Savings", status: "Approved", penalty: 2500, date: "2024-12-15" },
    { id: "WR002", userId: "U007", user: "Sarah Johnson", amount: 75000, plan: "Goal Savings", status: "Approved", penalty: 0, date: "2024-01-10" },
    { id: "WR003", userId: "U003", user: "Mike Brown", amount: 30000, plan: "Fixed Savings", status: "Active", penalty: 0, date: "2024-06-05" },
  ];

  // Filter logic
  const filterData = (data) =>
    (data || [])
      .filter(row =>
        row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(row => {
        if (activeTab === "fixed" || activeTab === "goal") {
          if (!startDate) return true;
          return row.startDate === startDate;
        }
        return true;
      })
      .filter(row => {
        if (activeTab === "fixed" || activeTab === "goal" || activeTab === "withdraw") {
          return statusFilter === "All" || row.status === statusFilter;
        }
        return true;
      });

  // Export CSV
  const handleExport = () => {
    let exportData = [];
    if (activeTab === "fixed") exportData = filterData(fixedSavingsData);
    else if (activeTab === "goal") exportData = filterData(goalSavingsData);

    if (exportData.length === 0) return alert("No data to export");

    const csvRows = [
      Object.keys(exportData[0]).join(","),
      ...exportData.map(row => Object.values(row).join(",")),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-export.csv`;
    a.click();
  };

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

      {/* Tabs */}
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab("vault")} className={activeTab === "vault" ? styles.active : ""}>Savings Vault Settings</button>
        <button onClick={() => setActiveTab("fixed")} className={activeTab === "fixed" ? styles.active : ""}>Fixed Savings</button>
        <button onClick={() => setActiveTab("goal")} className={activeTab === "goal" ? styles.active : ""}>Goal Savings</button>
        <button onClick={() => setActiveTab("interest")} className={activeTab === "interest" ? styles.active : ""}>Interest Settings</button>
        <button onClick={() => setActiveTab("reports")} className={activeTab === "reports" ? styles.active : ""}>Reports</button>
        <button onClick={() => setActiveTab("withdraw")} className={activeTab === "withdraw" ? styles.active : ""}>Early Withdrawals</button>
      </div>

      {/* Header + Filters */}
      <div className={styles.headerRow}>
        <h3>
          {activeTab === "fixed" && "Fixed Saving Management"}
          {activeTab === "goal" && "Goal Saving Management"}
          {activeTab === "interest" && "Interest Settings"}
          {activeTab === "reports" && "Reports"}
          {activeTab === "withdraw" && "Early Withdrawals"}
        </h3>

        {/* Filters for Fixed & Goal */}
        {(activeTab === "fixed" || activeTab === "goal") && (
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                placeholder="Search by User or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Matured">Matured</option>
              <option value="Approved">Approved</option>
            </select>

            <div className={styles.dateFilter}>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <button className={styles.export}>
                       <img src={exportIcon} alt="export" /> Export Reports
                     </button>
          </div>
        )}

        {/* Filters for Early Withdrawals */}
        {activeTab === "withdraw" && (
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                placeholder="Search by User or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Matured">Matured</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
        )}
      </div>

      {/* Render Tabs */}
      {activeTab === "vault" && <SavingsVaultSettings />}
      {activeTab === "fixed" && <FixedSavings data={filterData(fixedSavingsData)} />}
      {activeTab === "goal" && <GoalSavings data={filterData(goalSavingsData)} />}
      {activeTab === "interest" && <InterestSettings />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "withdraw" && <EarlyWithdrawals data={filterData(earlyWithdrawData)} />}
    </div>
  );
}
