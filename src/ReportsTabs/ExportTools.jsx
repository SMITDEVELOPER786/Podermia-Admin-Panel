import { useState } from "react";
import styles from "../css/Reports.module.css";

export default function ExportTools() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");

  // ===== Download helper =====
  const downloadFile = (content, name, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===== Generate PDF =====
  const generatePDF = (title) => {
    const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144]
/Contents 4 0 R /Resources << >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
72 72 Td
(${title} Generated Successfully)
ET
endstream
endobj
xref
0 5
0000000000 65535 f
trailer
<< /Root 1 0 R /Size 5 >>
startxref
%%EOF
`;
    downloadFile(pdfContent, `${title}.pdf`, "application/pdf");
  };

  // ===== Generate CSV =====
  const generateCSV = (title) => {
    const csvContent = `Title,Date Range\n${title},${dateRange}`;
    downloadFile(csvContent, `${title}.csv`, "text/csv");
  };

  // ===== Generate Export button =====
  const handleGenerate = () => {
    if (!reportType || !dateRange || !format) {
      setError("Please select Report Type, Date Range and Export Format");
      return;
    }
    setError("");

    if (format === "PDF") {
      generatePDF(reportType);
    } else {
      generateCSV(reportType);
    }
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
          <div>
            <label>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="">Select Report Type</option>
              <option value="Transaction Report">Transaction Report</option>
              <option value="KYC Report">KYC Report</option>
              <option value="Financial Summary">Financial Summary</option>
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
