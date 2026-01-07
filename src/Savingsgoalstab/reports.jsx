import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function ReportsPage() {
  // ===== Filter States =====
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userType, setUserType] = useState("");
  const [userClass, setUserClass] = useState("");
  const [error, setError] = useState("");

  // ===== CSV Download Function =====
  const downloadReport = (reportName, useFilters = false) => {
    if (useFilters && (!fromDate || !toDate || !userType || !userClass)) {
      setError("Please select FROM & TO Date, User Type, and User Classification");
      return;
    }
    setError("");

    // ===== Report Data per report =====
    let data = [];
    if (reportName === "Monthly_Savings_Performance") {
      data = [
        ["User", "Plan", "Amount", "Date"],
        ["Alice Brown", "Fixed Savings", 100000, "2024-01-01"],
        ["Bob Wilson", "Goal Savings", 250000, "2024-02-01"],
      ];
    } else if (reportName === "Savings_Vault_Obligations") {
      data = [
        ["Plan", "Maturity Date", "Amount Due"],
        ["Fixed Savings", "2024-12-15", 100000],
        ["Goal Savings", "2024-03-10", 250000],
      ];
    } else if (reportName === "User_Activity_Trends") {
      data = [
        ["User", "Login Count", "Deposits", "Withdrawals"],
        ["Alice Brown", 12, 150000, 50000],
        ["Bob Wilson", 9, 250000, 100000],
      ];
    } else {
      // Default sample if filters used
      data = [
        ["User", "Plan", "Amount", "Date", "From Date", "To Date", "User Type", "User Classification"],
        ["Alice Brown", "Fixed Savings", 100000, "2024-01-01", useFilters ? fromDate : "", useFilters ? toDate : "", useFilters ? userType : "", useFilters ? userClass : ""],
        ["Bob Wilson", "Goal Savings", 250000, "2024-02-01", useFilters ? fromDate : "", useFilters ? toDate : "", useFilters ? userType : "", useFilters ? userClass : ""],
      ];
    }

    const csvRows = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportName}.csv`;
    a.click();
  };

  // ===== Generate All Reports Button (uses filters) =====
  const handleGenerateAllReports = () => {
    downloadReport("Monthly_Savings_Performance", true);
    downloadReport("Savings_Vault_Obligations", true);
    downloadReport("User_Activity_Trends", true);
  };

  return (
    <div className={styles.reportsContainer}>
      <div className={styles.cardBox}>
        <div className={styles.headerRow}>
          <h3>Fixed Savings Rates</h3>
        </div>

        {/* ===== Filters + Generate Button ===== */}
        <div className={styles.filters}>
          <div className={styles.dateFilter}>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="From" />
            <span>to</span>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder="To" />
          </div>

          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="">Select User Type</option>
            <option>Business</option>
            <option>Individual</option>
          </select>

          <select value={userClass} onChange={(e) => setUserClass(e.target.value)}>
            <option value="">Select User Classification</option>
            <option>Retail</option>
            <option>HNI</option>
            <option>Institutional</option>
          </select>

          <button className={styles.generateBtn} onClick={handleGenerateAllReports}>
            Generate Report
          </button>
        </div>

        {/* ===== Error Message ===== */}
        {error && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>{error}</p>
        )}

        {/* ===== Stats (Export buttons download CSV immediately) ===== */}
        <div className={styles.topStats}>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total Fixed Savings</div>
            <div className={styles.statValue}>₦2.5B</div>
            <button className={styles.exportBtn} onClick={() => downloadReport("Total_Fixed_Savings")}>Export</button>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTitle}>Active Goal Savings</div>
            <div className={styles.statValue}>₦1.8B</div>
            <button className={styles.exportBtn} onClick={() => downloadReport("Active_Goal_Savings")}>Export</button>
          </div>
        </div>

        {/* ===== Individual Reports (clickable, independent of filters) ===== */}
        <div className={styles.reportItem} style={{ cursor: "pointer" }} onClick={() => downloadReport("Monthly_Savings_Performance")}>
          <div>
            <h4>Monthly Savings Performance</h4>
            <p>Detailed breakdown of all savings activities</p>
          </div>
        </div>

        <div className={styles.reportItem} style={{ cursor: "pointer" }} onClick={() => downloadReport("Savings_Vault_Obligations")}>
          <div>
            <h4>Savings Vault Obligations Report</h4>
            <p>This report is the analysis of current and upcoming maturity payments.</p>
          </div>
        </div>

        <div className={styles.reportItem} style={{ cursor: "pointer" }} onClick={() => downloadReport("User_Activity_Trends")}>
          <div>
            <h4>User Activity Trends</h4>
            <p>User engagement and savings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
