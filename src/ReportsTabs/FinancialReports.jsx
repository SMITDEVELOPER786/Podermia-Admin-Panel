import { useState } from "react";
import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import clockIcon from "../assets/clock.png";

export default function FinancialReports() {
  const [datePeriod, setDatePeriod] = useState("");
  const [error, setError] = useState("");

  const downloadReport = () => {
    const data = [
      ["Metric", "Value", "Date Period"],
      ["Total Revenue", 12450000, datePeriod],
      ["Interest Income", 8850000, datePeriod],
      ["Fees & Commission Income", 2450000, datePeriod],
      ["Direct Costs", 1350000, datePeriod],
      ["Interest Expense", 11100000, datePeriod],
      ["Operating Expenses", 850000, datePeriod],
    ];

    const csv = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Financial_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (!datePeriod) {
      setError("Please select date period");
      return;
    }
    setError("");
    downloadReport();
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h2>Financial Reports</h2>
        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="" className={styles.icon} />
          Export
        </button>
      </div>

      {/* DATE FILTER */}
      <div className={styles.filters}>
        <select
          value={datePeriod}
          onChange={(e) => setDatePeriod(e.target.value)}
        >
          <option value="">Select Date Period</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>

        <button
          type="button"
          className={styles.generate}
          onClick={handleGenerate}
        >
          Generate Report
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* STATS */}
      <div className={styles.cards}>
        {[
          ["Total Revenue", "12,450,000", "+12.5%"],
          ["Interest Income", "8,850,000", "+8.3%"],
          ["Fees & Commission", "2,450,000", "+15.2%"],
          ["Direct Costs", "1,350,000", "-5.1%"],
          ["Interest Expense", "11,100,000", "+18.7%"],
          ["Operating Expenses", "850,000", "+12.1%"],
        ].map((item, i) => (
          <div className={styles.card} key={i}>
            <p>{item[0]}</p>
            <h3>{item[1]}</h3>
            <span className={item[2].includes("-") ? styles.red : styles.green}>
              {item[2]} from last period
            </span>
            <small>This Month</small>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className={styles.chartBox}>
        <h3 className={styles.sectionTitle}>Revenue Breakdown</h3>
        <img src={clockIcon} alt="" className={styles.chartIcon} />
        <p>Interactive charts would be displayed here</p>
      </div>
    </div>
  );
}
