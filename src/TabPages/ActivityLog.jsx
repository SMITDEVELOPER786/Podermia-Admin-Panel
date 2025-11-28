import React, { useState } from "react";
import styles from "../css/ActivityLog.module.css";
import KPICards from "../components/KPICards";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import { logs as initialLogs } from "../data/logs";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable/DataTables";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const modulesList = [
  "User Management",
  "KYC Management",
  "Investment",
  "Loans",
  "Wallet Admin",
  "Security",
  "System Setting",
];

const severityList = ["Critical", "High", "Medium", "Low"];
const adminList = [...new Set(initialLogs.map((log) => log.admin))];

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const ActivityLog = () => {
  const navigate = useNavigate();
  const [filteredLogs, setFilteredLogs] = useState(initialLogs);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const handleBack = () => navigate(-1);

  const applyFilters = (filters) => {
    let data = [...initialLogs];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      data = data.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          log.target.toLowerCase().includes(term) ||
          log.admin.toLowerCase().includes(term)
      );
    }

    if (filters.module) data = data.filter((log) => log.module === filters.module);
    if (filters.admin) data = data.filter((log) => log.admin === filters.admin);
    if (filters.severity)
      data = data.filter(
        (log) => log.severity.toLowerCase() === filters.severity.toLowerCase()
      );

    if (filters.date) {
      const fDate = new Date(filters.date);
      data = data.filter(
        (log) => new Date(log.timestamp).toDateString() === fDate.toDateString()
      );
    }

    setFilteredLogs(data);
  };

  const columns = [
    { header: "Timestamp", key: "timestamp" },
    { header: "Admin", key: "admin" },
    { header: "Action", key: "action" },
    { header: "Module", key: "module" },
    { header: "Target User", key: "target" },
    { header: "Severity", key: "severity" },
    { header: "IP Address", key: "ip" },
    { header: "Detail", key: "detail" },
  ];

  // Metrics
  const today = new Date().toDateString();
  const actionsToday = filteredLogs.filter(
    (log) => new Date(log.timestamp).toDateString() === today
  ).length;
  const highPriority = filteredLogs.filter(
    (log) => log.severity.toLowerCase() === "high"
  ).length;
  const securityEvents = filteredLogs.filter(
    (log) => log.module.toLowerCase() === "security"
  ).length;

  const metrics = [
    {
      label: "Actions Today",
      value: actionsToday,
      thresholds: [
        { limit: 0, color: styles.green },
        { limit: 5, color: styles.yellow },
        { limit: Infinity, color: styles.red },
      ],
    },
    {
      label: "High Priority Events",
      value: highPriority,
      thresholds: [
        { limit: 0, color: styles.green },
        { limit: Infinity, color: styles.red },
      ],
    },
    {
      label: "Security Events",
      value: securityEvents,
      thresholds: [
        { limit: 0, color: styles.gray },
        { limit: Infinity, color: styles.blue },
      ],
    },
  ];

  const getMetricColor = (metric) =>
    metric.thresholds.find((t) => metric.value <= t.limit).color;

  const hexToRgb = (hexClass) => {
    const colors = {
      [styles.red]: [229, 62, 62],
      [styles.green]: [56, 161, 105],
      [styles.yellow]: [214, 158, 46],
      [styles.blue]: [49, 130, 206],
      [styles.gray]: [113, 128, 150],
    };
    return colors[hexClass] || [0, 0, 0];
  };

  // CSV Export
  const exportCSV = () => {
    setLoadingCSV(true);
    setTimeout(() => {
      const headers = columns.map(c => c.header).join(",");
      const rows = filteredLogs.map(log =>
        columns.map(c => `"${log[c.key]}"`).join(",")
      );
      const csv = [headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `activity-log.csv`);
      link.click();
      setLoadingCSV(false);
    }, 100);
  };

  // Stylish PDF Export
  const exportPDF = () => {
    setLoadingPDF(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Activity Log", 14, 15);

      // Add metrics at top
      let yPos = 22;
      metrics.forEach((m, i) => {
        doc.setFontSize(12);
        doc.setTextColor(...hexToRgb(getMetricColor(m)));
        doc.text(`${m.label}: ${m.value}`, 14 + i * 60, yPos);
      });

      const tableColumn = columns.map(c => c.header);
      const tableRows = filteredLogs.map(log => columns.map(c => log[c.key]));

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: yPos + 10,
        theme: "grid",
        headStyles: { fillColor: [41, 92, 191], textColor: 255, fontStyle: "bold" },
        bodyStyles: { textColor: 50, fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 10, left: 10, right: 10 },
      });

      doc.save("activity-log.pdf");
      setLoadingPDF(false);
    }, 100);
  };

  return (
    <Div className="log-section">
      <Div className="head-and-details flexRow">
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeftIcon size={25} className={styles.backArrow} />
        </button>
        <div>
          <h2>Activity Log</h2>
          <p>Monitor all administrative actions and system events</p>
        </div>
      </Div>

      <KPICards displayNone={true} />

      <Div className="filter-and-data">
        <FilterSearch
          modules={modulesList}
          severities={severityList}
          admins={adminList}
          onFilterChange={applyFilters}
        />

     <Div className="activity-and-btns flexRow">
  <h3>{filteredLogs.length} Activities Found</h3>
  <Div className="buttons flexRow">
    <button className={styles.exportBtn} onClick={exportCSV} disabled={loadingCSV}>
      {loadingCSV ? (
        <Loader2 className={styles.spin} size={16} />
      ) : (
        <>
          <span className={styles.desktopText}>Export to </span>
          <span className={styles.mobileText}>CSV</span>
        </>
      )}
    </button>

    <button className={styles.exportBtn} onClick={exportPDF} disabled={loadingPDF}>
      {loadingPDF ? (
        <Loader2 className={styles.spin} size={16} />
      ) : (
        <>
          <span className={styles.desktopText}>Export to </span>
          <span className={styles.mobileText}>PDF</span>
        </>
      )}
    </button>
  </Div>
</Div>


        <DataTable columns={columns} data={filteredLogs} scrollHeight={400} />
      </Div>

      <Div className="action-details flexRow">
        {metrics.map((m) => (
          <Div key={m.label} className="detail">
            <h3 className={getMetricColor(m)}>{m.value}</h3>
            <p>{m.label}</p>
          </Div>
        ))}
      </Div>
    </Div>
  );
};

export default ActivityLog;
