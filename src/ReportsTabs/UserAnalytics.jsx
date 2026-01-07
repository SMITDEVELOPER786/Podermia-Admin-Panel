import { useState } from "react";
import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import userIcon from "../assets/userIcon.png";

export default function UserAnalytics() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const datePeriod =
    fromDate && toDate ? `${fromDate} to ${toDate}` : "";

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

    const csvContent = data.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "User_Analytics_Report.csv";
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

      {/* ✅ DATE FILTER (FROM → TO) */}
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
        {[
          ["Total Users", "12,245", "+ 8.2%", "Registered users"],
          ["Active Users", "8,156", "+ 12.1%", "Monthly active"],
          ["New Registrations", "1,456", "+ 23.1%", "This period"],
          ["KYC Completions", "89%", "- 4.5%", "Verification rate"],
          ["User Engagement", "76%", "+ 2.8%", "Daily engagement"],
          ["Retention Rate", "82%", "+ 6.2%", "30 day retention"],
        ].map((item, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.rowBetween}>
              <p>{item[0]}</p>
              <img src={userIcon} alt="" />
            </div>

            <h3>{item[1]}</h3>

            <span
              className={
                item[2].includes("-")
                  ? styles.red
                  : styles.green
              }
            >
              {item[2]} from last period
            </span>

            <small>{datePeriod || item[3]}</small>
          </div>
        ))}
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
