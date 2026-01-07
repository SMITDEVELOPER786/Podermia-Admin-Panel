import { useState } from "react";
import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import clockIcon from "../assets/clock.png";

export default function FinancialReports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const periodLabel = fromDate && toDate ? `${fromDate} to ${toDate}` : "";

  const downloadReport = () => {
    const data = [
      ["Metric", "Value", "Date Period"],
      ["Total Revenue", 12450000, periodLabel],
      ["Interest Income", 8850000, periodLabel],
      ["Fees & Commission Income", 2450000, periodLabel],
      ["Direct Costs", 1350000, periodLabel],
      ["Interest Expense", 11100000, periodLabel],
      ["Operating Expenses", 850000, periodLabel],
    ];

    const csv = data.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Financial_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (!fromDate || !toDate) {
      setError("Please select FROM and TO dates");
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setError("FROM date cannot be greater than TO date");
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

      {/* DATE FILTER (FROM → TO) */}
      <div className={styles.filters}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button className={styles.generate} onClick={handleGenerate}>
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
            <small>{periodLabel || "Select date period"}</small>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className={styles.chartBox}>
        <h3 className={styles.sectionTitle}>Revenue Breakdown</h3>
        <img src={clockIcon} alt="" className={styles.chartIcon} />
        <p>Data from {periodLabel || "—"}</p>
      </div>
    </div>
  );
}
