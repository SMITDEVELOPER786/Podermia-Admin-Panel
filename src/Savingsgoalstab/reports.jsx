import { useState } from "react";
import styles from "../css/SavingGoals.module.css";

export default function ReportsPage() {
  // ===== Filter States =====
  const [datePeriod, setDatePeriod] = useState("");
  const [userType, setUserType] = useState("");
  const [userClass, setUserClass] = useState("");
  const [error, setError] = useState("");

  // ===== CSV Download Function =====
  const downloadReport = (reportName) => {
    // Check filters
    if (!datePeriod || !userType || !userClass) {
      setError("Please select Date Period, User Type, and User Classification");
      return;
    }

    setError(""); // clear error

    // Example CSV data with filters included
    const data = [
      [
        "User",
        "Plan",
        "Amount",
        "Date",
        "Date Period",
        "User Type",
        "User Classification",
      ],
      ["Alice Brown", "Fixed Savings", 100000, "2024-01-01", datePeriod, userType, userClass],
      ["Bob Wilson", "Goal Savings", 250000, "2024-02-01", datePeriod, userType, userClass],
    ];

    const csvRows = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportName}.csv`;
    a.click();
  };

  // ===== Single Generate Report Button =====
  const handleGenerateAllReports = () => {
    // Generate all reports at once
    downloadReport("Monthly_Savings_Performance");
    downloadReport("Savings_Vault_Obligations");
    downloadReport("User_Activity_Trends");
  };

  return (
    <div className={styles.reportsContainer}>
      {/* ===== Header ===== */}
      <div className={styles.cardBox}>
        <div className={styles.headerRow}>
          <h3>Fixed Savings Rates</h3>
        </div>

        {/* ===== Filters + Generate Button ===== */}
        <div className={styles.filters}>
          <select value={datePeriod} onChange={(e) => setDatePeriod(e.target.value)}>
            <option value="">Select Date Period</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>

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

          {/* Single Generate Report Button */}
          <button className={styles.generateBtn} onClick={handleGenerateAllReports}>
            Generate Report
          </button>
        </div>

        {/* ===== Error Message ===== */}
        {error && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>{error}</p>
        )}

        {/* ===== Stats ===== */}
        <div className={styles.topStats}>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total Fixed Savings</div>
            <div className={styles.statValue}>₦2.5B</div>
            <button className={styles.exportBtn}>Export</button>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTitle}>Active Goal Savings</div>
            <div className={styles.statValue}>₦1.8B</div>
            <button className={styles.exportBtn}>Export</button>
          </div>
        </div>

        {/* ===== Individual Reports (optional clickable items) ===== */}
        <div
          className={styles.reportItem}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h4>Monthly Savings Performance</h4>
            <p>Detailed breakdown of all savings activities</p>
          </div>
        </div>

        <div
          className={styles.reportItem}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h4>Savings Vault Obligations Report</h4>
            <p>This report is the analysis of current and upcoming maturity payments.</p>
          </div>
        </div>

        <div
          className={styles.reportItem}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h4>User Activity Trends</h4>
            <p>User engagement and savings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
