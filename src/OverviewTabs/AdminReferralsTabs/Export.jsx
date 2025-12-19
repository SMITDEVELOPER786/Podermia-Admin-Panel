import React, { useState } from "react";
import styles from "../../css/AdminReferrals.module.css";
import { Calendar, FileDown, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Div({ className, children, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return (
    <div className={mappedClass} {...props}>
      {children}
    </div>
  );
}

const Export = () => {
  const [reportType, setReportType] = useState("Referral");
  const [exportFormat, setExportFormat] = useState("CSV");
  const [fromDate, setFromDate] = useState("2025-12-01");
  const [toDate, setToDate] = useState("2025-12-30");
  const [fromDateDisplay, setFromDateDisplay] = useState("01/12/2025");
  const [toDateDisplay, setToDateDisplay] = useState("30/12/2025");
  const [recentExports, setRecentExports] = useState([
    {
      fileName: "Referrals_Report_2024-11-01_to_2024-11-30.csv",
      date: "2024-12-01",
      size: "2.3 MB",
      type: "CSV"
    },
    {
      fileName: "Payouts_Report_2024-11-01_to_2024-11-30.pdf",
      date: "2024-12-01",
      size: "1.8 MB",
      type: "PDF"
    },
    {
      fileName: "Analytics_Report_2024-10-01_to_2024-10-31.csv",
      date: "2024-11-01",
      size: "3.1 MB",
      type: "CSV"
    }
  ]);

  const reportTypes = ["Referral", "Payouts", "Fraud Monitor", "Analytics"];

  const getReportDescription = (type) => {
    const descriptions = {
      "Referral": "Export all referral data including user information, referral codes, and conversion status.",
      "Payouts": "Export all payout transactions including amounts, dates, and payment status.",
      "Fraud Monitor": "Export fraud detection cases and flagged user information.",
      "Analytics": "Export analytics data including conversion rates and performance metrics."
    };
    return descriptions[type] || descriptions["Referral"];
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForSummary = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getEstimatedSize = () => {
    // Mock size calculation
    return "~2.5 MB";
  };

  const calculateFileSize = (format) => {
    // Mock size calculation based on format
    const sizes = {
      "CSV": "2.3 MB",
      "PDF": "1.8 MB"
    };
    return sizes[format] || "2.0 MB";
  };

  const handleGenerateReport = () => {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const fileName = `${reportType}_Report_${formatDateForSummary(fromDate)}_to_${formatDateForSummary(toDate)}.${exportFormat.toLowerCase()}`;
    const fileSize = calculateFileSize(exportFormat);

    if (exportFormat === "PDF") {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(18);
      doc.text(`${reportType} Report`, 14, 15);
      
      // Date Range
      doc.setFontSize(12);
      doc.text(`Date Range: ${formatDateForSummary(fromDate)} to ${formatDateForSummary(toDate)}`, 14, 25);
      
      // Note: All data will be shown here after backend integration
      doc.setFontSize(10);
      doc.text("Note: All data will be shown here after backend integration", 14, 35);
      
      // Save PDF
      doc.save(fileName);
    } else {
      // CSV export
      const csvContent = `Report Type: ${reportType}\nDate Range: ${formatDateForSummary(fromDate)} to ${formatDateForSummary(toDate)}\n\nNote: All data will be shown here after backend integration`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Add to recent exports (add at the beginning)
    const newExport = {
      fileName: fileName,
      date: todayFormatted,
      size: fileSize,
      type: exportFormat
    };

    setRecentExports(prev => [newExport, ...prev]);
  };


  return (
    <div className="content-panel">
      <h3 className={styles.exportTitle}>Data Export</h3>
      <p className={styles.exportSubtitle}>Select Report Type</p>

      {/* Report Type Tabs */}
      <div className={styles.reportTypeTabs}>
        {reportTypes.map((type) => (
          <button
            key={type}
            className={`${styles.reportTypeTab} ${
              reportType === type ? styles.reportTypeTabActive : ""
            }`}
            onClick={() => setReportType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <p className={styles.reportDescription}>{getReportDescription(reportType)}</p>

      {/* Date Range */}
      <div className={styles.exportSection}>
        <h4 className={styles.exportSectionTitle}>Date Range</h4>
        <div className={styles.dateRangeContainer}>
          <div className={styles.dateInputWrapper}>
            <label className={styles.dateLabel}>From Date</label>
            <div className={styles.dateInputContainer}>
              <input
                type="date"
                className={styles.dateInput}
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setFromDateDisplay(formatDateForDisplay(e.target.value));
                }}
              />
              <Calendar size={18} className={styles.calendarIcon} />
            </div>
          </div>
          <div className={styles.dateInputWrapper}>
            <label className={styles.dateLabel}>To Date</label>
            <div className={styles.dateInputContainer}>
              <input
                type="date"
                className={styles.dateInput}
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setToDateDisplay(formatDateForDisplay(e.target.value));
                }}
              />
              <Calendar size={18} className={styles.calendarIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Export Format */}
      <div className={styles.exportSection}>
        <div className={styles.exportFormatContainer}>
          <button
            className={`${styles.exportFormatBtn} ${
              exportFormat === "CSV" ? styles.exportFormatBtnActive : ""
            }`}
            onClick={() => setExportFormat("CSV")}
          >
            <FileDown size={20} />
            Export as CSV
          </button>
          <button
            className={`${styles.exportFormatBtn} ${
              exportFormat === "PDF" ? styles.exportFormatBtnActive : ""
            }`}
            onClick={() => setExportFormat("PDF")}
          >
            <FileDown size={20} />
            Export as PDF
          </button>
        </div>
      </div>

      {/* Export Summary */}
      <div className={styles.exportSection}>
        <h4 className={styles.exportSectionTitle}>Export Summary</h4>
        <div className={styles.exportSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Report Type:</span>
            <span className={styles.summaryValue}>{reportType}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Date Range:</span>
            <span className={styles.summaryValue}>
              {formatDateForSummary(fromDate)} to {formatDateForSummary(toDate)}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Format:</span>
            <span className={styles.summaryValue}>{exportFormat}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Estimated Size:</span>
            <span className={styles.summaryValue}>{getEstimatedSize()}</span>
          </div>
        </div>
      </div>

      {/* Recent Exports */}
      <div className={styles.exportSection}>
        <h4 className={styles.exportSectionTitle}>Recent Exports</h4>
        <div className={styles.recentExportsList}>
          {recentExports.map((exportItem, index) => (
            <div key={index} className={styles.recentExportItem}>
              <div className={styles.recentExportIcon}>
                {exportItem.type === "CSV" ? (
                  <FileDown size={20} color="#16A34A" />
                ) : (
                  <FileDown size={20} color="#DC2626" />
                )}
              </div>
              <div className={styles.recentExportInfo}>
                <p className={styles.recentExportFileName}>{exportItem.fileName}</p>
                <p className={styles.recentExportMeta}>
                  {exportItem.date} • {exportItem.size}
                </p>
              </div>
              <button className={styles.recentExportDownload}>
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Button */}
      <button className={styles.generateBtn} onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default Export;
