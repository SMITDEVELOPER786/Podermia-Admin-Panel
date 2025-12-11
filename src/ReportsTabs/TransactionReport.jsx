import styles from "../css/Reports.module.css";

export default function TransactionExport() {
  return (
    <div className={styles.container}>
     

      <div className={styles.sectionTitle}>
        Transaction Reports
      </div>

      <div className={styles.reportGrid}>
        <div className={styles.reportCard}>
          <div className={styles.label}>Investment</div>
          <div className={styles.amount}>45,450,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+8.3% Growth</span>
            <span className={styles.badgeBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.label}>Loan Disbursement</div>
          <div className={styles.amount}>28,850,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+12.7% Growth</span>
            <span className={styles.badgeGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.label}>Withdrawal</div>
          <div className={styles.amount}>15,220,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+6.8% Growth</span>
            <span className={styles.badgeBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.label}>Deposits</div>
          <div className={styles.amount}>38,750,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+13.5% Growth</span>
            <span className={styles.badgeGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.label}>Savings</div>
          <div className={styles.amount}>22,340,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+22.1% Growth</span>
            <span className={styles.badgeYellow}>Active</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.label}>Loan Repayment</div>
          <div className={styles.amount}>18,560,000</div>
          <div className={styles.bottomRow}>
            <span className={styles.growth}>+6.9% Growth</span>
            <span className={styles.badgeGreen}>Completed</span>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>
        Regularly & Compliance Export
      </div>

      <div className={styles.exportGrid}>
        <div className={styles.exportCard}>
          <div className={styles.heading}>CBN Regulatory Report</div>
          <p className={styles.desc}>
            Compliance report including transaction logs, AML compliance and KYC validation details.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>Export PDF</button>
            <button className={styles.btnOutline}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <div className={styles.heading}>Internal Audit Report</div>
          <p className={styles.desc}>
            Includes system logs, user activity tracking and performance insights.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>Export PDF</button>
            <button className={styles.btnOutline}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <div className={styles.heading}>KYC Compliance Report</div>
          <p className={styles.desc}>
            Contains user identity validation, document verification results and screening checks.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>Export PDF</button>
            <button className={styles.btnOutline}>Export CSV</button>
          </div>
        </div>

        <div className={styles.exportCard}>
          <div className={styles.heading}>Financial Summary Report</div>
          <p className={styles.desc}>
            Breakdown of revenue, investment, loan performance and repayments summary.
          </p>
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>Export PDF</button>
            <button className={styles.btnOutline}>Export CSV</button>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>
        Custom Export Builder
      </div>

      <div className={styles.builder}>
        <div className={styles.builderGrid}>
          <div className={styles.box}>
            <label>Report Type</label>
            <select>
              <option>Select Report Type</option>
            </select>
          </div>

          <div className={styles.box}>
            <label>Date Range</label>
            <select>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className={styles.box}>
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
