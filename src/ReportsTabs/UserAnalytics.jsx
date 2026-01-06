import { useState } from "react";
import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import userIcon from "../assets/userIcon.png";

export default function UserAnalytics() {
  const [datePeriod, setDatePeriod] = useState("");
  const [error, setError] = useState("");

  // ✅ Download CSV
  const downloadCSV = () => {
    const data = [
      ["Metric", "Value", "Date Period"],
      ["Total Users", 12245, datePeriod],
      ["Active Users", 8156, datePeriod],
      ["New Registrations", 1456, datePeriod],
      ["KYC Completions", "89%", datePeriod],
      ["User Engagement", "76%", datePeriod],
      ["Retention Rate", "82%", datePeriod],
    ];

    const csvContent = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "User_Analytics_Report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (!datePeriod) {
      setError("Please select date period before generating report");
      return;
    }
    setError("");
    downloadCSV();
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h2>User Analytics</h2>
        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="" />
          Export
        </button>
      </div>

      {/* ✅ FILTER + GENERATE BUTTON */}
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

      {/* CARDS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Total Users</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>12,245</h3>
          <span className={styles.green}>+ 8.2% from last period</span>
          <small>Registered users</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Active Users</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>8,156</h3>
          <span className={styles.green}>+ 12.1% from last period</span>
          <small>Monthly active</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>New Registrations</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>1,456</h3>
          <span className={styles.green}>+ 23.1% from last period</span>
          <small>This month</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>KYC Completions</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>89%</h3>
          <span className={styles.red}>- 4.5% from last period</span>
          <small>Verification rate</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>User Engagement</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>76%</h3>
          <span className={styles.green}>+ 2.8% from last period</span>
          <small>Daily engagement</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Retention Rate</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>82%</h3>
          <span className={styles.green}>+ 6.2% from last period</span>
          <small>30 day retention</small>
        </div>
      </div>

      {/* USER SEGMENTS */}
      <div>
        <h3 className={styles.segmentTitle}>User Segments</h3>

        <div className={styles.segmentBox}>
          <div>
            <p>Business Users</p>
            <small>2,845 users (23.2%)</small>
          </div>
          <h4>
            8,450,000 <span>Revenue Generated</span>
          </h4>
        </div>

        <div className={styles.segmentBox}>
          <div>
            <p>Individual Users</p>
            <small>6,789 users (55.4%)</small>
          </div>
          <h4>
            3,200,000 <span>Revenue Generated</span>
          </h4>
        </div>

        <div className={styles.segmentBox}>
          <div>
            <p>New Users</p>
            <small>2,617 users (21.4%)</small>
          </div>
          <h4>
            800,000 <span>Revenue Generated</span>
          </h4>
        </div>
      </div>
    </div>
  );
}
