import React, { useState } from "react";
import styles from "../css/WalletAdmin.module.css";
import DataTable from "../components/DataTable/DataTables";
import Toast from "../components/Toast/Toast";
import FailedTransactionReview from "./FailedTransactionReview";
import FailedTransactionManagement from "./FailedTransactionManagement";

const Reconciliation = () => {
  const [toast, setToast] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [activeTab, setActiveTab] = useState("Reconciliation");

  // Mock reconciliation data
  const reconciliationData = [
    {
      id: "REC004",
      date: "9/5/2025",
      source: "Paystack",
      expectedAmount: "$10000.00",
      actualAmount: "$11980.00",
      difference: "$-20.00",
      transaction: "120",
      status: "Discrepancy",
      detail: "Auto-generated reconciliation",
    },
    {
      id: "REC001",
      date: "1/15/2024",
      source: "Paystack",
      expectedAmount: "$15000.00",
      actualAmount: "$14950.00",
      difference: "$-50.00",
      transaction: "150",
      status: "Discrepancy",
      detail: "Missing Transaction fees in report",
    },
    {
      id: "REC002",
      date: "1/13/2024",
      source: "Flutterwave",
      expectedAmount: "$8500.00",
      actualAmount: "$14600.00",
      difference: "$-6500.00",
      transaction: "85",
      status: "Matched",
      detail: "",
    },
    {
      id: "REC003",
      date: "1/13/2024",
      source: "Flutterwave",
      expectedAmount: "$8500.00",
      actualAmount: "$14950.00",
      difference: "$-8500.00",
      transaction: "85",
      status: "Investigating",
      detail: "Extra settlement amount needs verification",
    },
  ];

  const kpiData = [
    {
      label: "Total Reconciled",
      value: "$60500.00",
      subtext: "Across All sources",
      color: "#000",
    },
    {
      label: "Discrepancies",
      value: "2",
      subtext: "Require attention",
      color: "#000",
    },
    {
      label: "Total Variance",
      value: "$ 170.00",
      subtext: "Absolute difference",
      color: "#000",
    },
    {
      label: "Match Rate",
      value: "25.0%",
      subtext: "success full Matches",
      color: "#3b82f6",
    },
  ];

  const filteredData =
    selectedSource === "All Sources"
      ? reconciliationData
      : reconciliationData.filter((item) => item.source === selectedSource);

  const handleRunReconciliation = () => {
    setToast({
      type: "success",
      title: "Reconciliation Started",
      message: "Processing reconciliation reports...",
    });
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "Date", key: "date" },
    {
      header: "Sources",
      key: "source",
      render: (row) => <span className={styles.sourceBadge}>{row.source}</span>,
    },
    { header: "Expected Amount", key: "expectedAmount" },
    { header: "Actual Amount", key: "actualAmount" },
    {
      header: "Difference",
      key: "difference",
      render: (row) => (
        <span style={{ color: "#ef4444", fontWeight: "500" }}>
          {row.difference}
        </span>
      ),
    },
    { header: "Transaction", key: "transaction" },
    {
      header: "Status",
      key: "status",
      styleMap: {
        Discrepancy: styles.statusDiscrepancy,
        Matched: styles.statusMatched,
        Investigating: styles.statusInvestigating,
      },
    },
    { header: "Detail", key: "detail" },
  ];

  if (activeTab === "Failed Transaction Review") {
    return (
      <FailedTransactionReview
        onBack={() => setActiveTab("Reconciliation")}
        handleRetry={() => setActiveTab("Failed Transaction Management")}
      />
    );
  }
  if (activeTab === "Failed Transaction Management") {
    return (
      <FailedTransactionManagement
        onBack={() => setActiveTab("Failed Transaction Review")}
      />
    );
  }

  return (
    <div className={styles.reconciliationContainer}>
      {/* Header */}
      <div className={styles.reconciliationHeader}>
        <h2 className={styles.pageTitle}>Reconciliation Panel</h2>
        <div className={styles.reconciliationActions}>
          <button
            className={styles.runReconciliationBtn}
            onClick={() => setActiveTab("Failed Transaction Review")}
          >
            Failed Transaction Review
          </button>
          <button
            className={styles.runReconciliationBtn}
            onClick={handleRunReconciliation}
          >
            Run Reconciliation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue} style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className={styles.kpiSubtext}>{kpi.subtext}</div>
          </div>
        ))}
      </div>

      {/* Upload Settlement Reports */}
      <div className={styles.uploadSection}>
        <h3 className={styles.uploadTitle}>Upload Settlement Reports</h3>
        <div className={styles.uploadGrid}>
          <div className={styles.uploadItem}>
            <label className={styles.uploadLabel}>Paystack Report</label>
            <button className={styles.uploadBtn}>Upload CSV/Excel</button>
          </div>
          <div className={styles.uploadItem}>
            <label className={styles.uploadLabel}>Filterwave Report</label>
            <button className={styles.uploadBtn}>Upload CSV/Excel</button>
          </div>
          <div className={styles.uploadItem}>
            <label className={styles.uploadLabel}>Filterwave Report</label>
            <button className={styles.uploadBtn}>Upload CSV/Excel</button>
          </div>
        </div>
      </div>

      {/* Source Filter */}
      <div className={styles.sourceFilter}>
        <button
          className={`${styles.sourceBtn} ${
            selectedSource === "All Sources" ? styles.active : ""
          }`}
          onClick={() => setSelectedSource("All Sources")}
        >
          All Sources
        </button>
      </div>

      {/* Reconciliation Table */}
      <div className={styles.tableSection}>
        <DataTable columns={columns} data={filteredData} scrollHeight={400} />
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Reconciliation;
