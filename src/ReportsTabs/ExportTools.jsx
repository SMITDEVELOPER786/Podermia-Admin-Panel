import { useState } from "react";
import jsPDF from "jspdf";
import styles from "../css/Reports.module.css";

export default function ExportTools() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");

  // ===== Generate CSV =====
  const generateCSV = (title) => {
    const csvContent = `Report Type,Date Range,Generated On
${title},${dateRange},${new Date().toLocaleDateString()}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===== Generate PDF (jsPDF) =====
  const generatePDF = (title) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange}`, 20, 30);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text("This report is system generated.", 20, 50);

    // Example content table
    const tableContent = [
      ["#","Item","Amount"],
      [1,"Investment","45,450,000"],
      [2,"Loan Disbursement","30,000,000"],
      [3,"Withdrawal","10,500,000"],
    ];

    let startY = 70;
    tableContent.forEach((row, i) => {
      doc.text(row.join(" | "), 20, startY + i * 10);
    });

    doc.save(`${title}.pdf`);
  };

  // ===== Handle Generate =====
  const handleGenerate = () => {
    if (!reportType || !dateRange || !format) {
      setError("Please select Report Type, Date Range and Export Format");
      return;
    }
    setError("");

    format === "PDF" ? generatePDF(reportType) : generateCSV(reportType);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2>Transaction Reports</h2>
        <div className={styles.exportBtns}>
          <button className={styles.pdf} onClick={() => generatePDF("Transaction_Report")}>
            Export PDF
          </button>
          <button className={styles.csv} onClick={() => generateCSV("Transaction_Report")}>
            Export CSV
          </button>
        </div>
      </div>

      <div className={styles.reportGrid}>
        {["Investment","Loan Disbursement","Withdrawal","Deposits","Savings","Loan Repayment"].map((t, i) => (
          <div className={styles.reportCard} key={i}>
            <p>{t}</p>
            <h3>45,450,000</h3>
            <div className={styles.row}>
              <span className={styles.green}>+8.3% Growth</span>
              <span className={styles.tagGreen}>Completed</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Regularly & Compliance Export</h3>

      <div className={styles.exportGrid}>
        {[
          "CBN Regulatory Report",
          "Internal Audit Report",
          "KYC Compliance Report",
          "Financial Summary report",
        ].map((title, i) => (
          <div className={styles.exportCard} key={i}>
            <h4>{title}</h4>
            <p>Report export</p>
            <div className={styles.btnRow}>
              <button className={styles.pdf} onClick={() => generatePDF(title)}>
                Export PDF
              </button>
              <button className={styles.csv} onClick={() => generateCSV(title)}>
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Costume Export Builder</h3>

      <div className={styles.builder}>
        <div className={styles.builderGrid}>
          {/* REPORT TYPE */}
          <div>
            <label>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="">Select Report Type</option>
              <option value="CBN Regulatory Report">CBN Regulatory Report</option>
              <option value="Internal Audit Report">Internal Audit Report</option>
              <option value="KYC Compliance Report">KYC Compliance Report</option>
              <option value="Financial Summary report">Financial Summary report</option>
            </select>
          </div>

          <div>
            <label>Date Range</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="">Select Date Range</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <div>
            <label>Export Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="">Select Format</option>
              <option value="PDF">PDF</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
        </div>

        <button className={styles.generateBtn} onClick={handleGenerate}>
          Generate Export
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
