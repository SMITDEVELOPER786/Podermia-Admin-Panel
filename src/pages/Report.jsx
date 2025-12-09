import { useState } from "react";
import styles from "../css/Reports.module.css";

import FinancialReports from "../ReportsTabs/FinancialReports";
import UserAnalytics from "../ReportsTabs/UserAnalytics";
import TransactionReport from "../ReportsTabs/TransactionReport";
import ExportTools from "../ReportsTabs/ExportTools";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("financial");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("financial")}
          className={activeTab === "financial" ? styles.active : ""}
        >
          Financial Reports
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={activeTab === "analytics" ? styles.active : ""}
        >
          User Analytics
        </button>
        <button
          onClick={() => setActiveTab("transaction")}
          className={activeTab === "transaction" ? styles.active : ""}
        >
          Transaction Report
        </button>
        <button
          onClick={() => setActiveTab("export")}
          className={activeTab === "export" ? styles.active : ""}
        >
          Export Tools
        </button>
      </div>

      {activeTab === "financial" && <FinancialReports />}
      {activeTab === "analytics" && <UserAnalytics />}
      {activeTab === "transaction" && <TransactionReport />}
      {activeTab === "export" && <ExportTools />}
    </div>
  );
}
