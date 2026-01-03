import styles from "../css/SavingGoals.module.css";

export default function ReportsPage() {
  const downloadReport = (reportName) => {
  // Example CSV data
  const data = [
    ["User", "Plan", "Amount", "Date"],
    ["Alice Brown", "Fixed Savings", 100000, "2024-01-01"],
    ["Bob Wilson", "Goal Savings", 250000, "2024-02-01"],
  ];

  const csvRows = data.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvRows], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${reportName}.csv`;
  a.click();
};

  return (
    <div className={styles.reportsContainer}>

      <div className={styles.cardBox}>
        <div className={styles.headerRow}>
          <h3>Fixed Savings Rates</h3>
        </div>

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

       <div
  className={styles.reportItem}
  onClick={() => downloadReport("Monthly_Savings_Performance")}
  style={{ cursor: "pointer" }} // shows pointer on hover
>
  <div>
    <h4>Monthly Savings Performance</h4>
    <p>Detailed breakdown of all savings activities</p>
  </div>
  <button
    className={styles.generateBtn}
    onClick={(e) => {
      e.stopPropagation(); // prevent double click
      downloadReport("Monthly_Savings_Performance");
    }}
  >
    Generate Report
  </button>
</div>

{/* Savings Vault Obligations Report */}
<div
  className={styles.reportItem}
  onClick={() => downloadReport("Savings_Vault_Obligations")}
  style={{ cursor: "pointer" }}
>
  <div>
    <h4>Savings Vault Obligations Report</h4>
    <p>
      This report is the analysis of current and upcoming maturity payments.
    </p>
  </div>
  <button
    className={styles.generateBtn}
    onClick={(e) => {
      e.stopPropagation(); // prevent parent div click
      downloadReport("Savings_Vault_Obligations");
    }}
  >
    Generate Report
  </button>
</div>

{/* User Activity Trends */}
<div
  className={styles.reportItem}
  onClick={() => downloadReport("User_Activity_Trends")}
  style={{ cursor: "pointer" }}
>
  <div>
    <h4>User Activity Trends</h4>
    <p>User engagement and savings</p>
  </div>
  <button
    className={styles.generateBtn}
    onClick={(e) => {
      e.stopPropagation();
      downloadReport("User_Activity_Trends");
    }}
  >
    Generate Report
  </button>
</div>
</div>
    </div>
  );
}
