import styles from "../css/Reports.module.css";

export default function ExportTools() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2>Transaction Reports</h2>
        <div className={styles.exportBtns}>
          <button className={styles.pdf}>Export PDF</button>
          <button className={styles.csv}>Export CSV</button>
        </div>
      </div>

      <div className={styles.reportGrid}>
        <div className={styles.reportCard}>
          <p>Investment</p>
          <h3>45,450,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+8.3% Growth</span>
            <span className={styles.tagBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Loan Disbursement</p>
          <h3>28,850,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+12.7% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Withdrawal</p>
          <h3>15,220,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+6.8% Growth</span>
            <span className={styles.tagBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Deposits</p>
          <h3>38,750,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+13.5% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Savings</p>
          <h3>22,340,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+22.1% Growth</span>
            <span className={styles.tagYellow}>Active</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Loan Repayment</p>
          <h3>18,560,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+6.9% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Regularly & Compliance Export</h3>

      <div className={styles.exportGrid}>
        <div className={styles.exportCard}>
          <h4>CBN Regulatory Report</h4>
          <p>
            Compliance Report including transactions logs, AML compliance and 
            KYC validation details.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.pdf}>Export PDF</button>
            <button className={styles.csv}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <h4>Internal Audit Report</h4>
          <p>
            Includes system logs, user activities, performance evaluations.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.pdf}>Export PDF</button>
            <button className={styles.csv}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <h4>KYC Compliance Report</h4>
          <p>
            Contains user identity validation, document verification results.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.pdf}>Export PDF</button>
            <button className={styles.csv}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <h4>Financial Summary report</h4>
          <p>
            Breakdown of revenue, investment, loan performance & repayments.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.pdf}>Export PDF</button>
            <button className={styles.csv}>Export CSV</button>
          </div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Costume Export Builder</h3>

      <div className={styles.builder}>
        <div className={styles.builderGrid}>
          <div>
            <label>Report Type</label>
            <select>
              <option>Select Report Type</option>
            </select>
          </div>

          <div>
            <label>Date Range</label>
            <select>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div>
            <label>Export Format</label>
            <select>
              <option>PDF Report</option>
            </select>
          </div>
        </div>

        <button className={styles.generateBtn}>Generate Export</button>
      </div>
    </div>
  );
}
