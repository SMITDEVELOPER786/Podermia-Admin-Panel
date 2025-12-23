import styles from "../css/SavingGoals.module.css";

export default function ReportsPage() {
  return (
    <div className={styles.reportsContainer}>

      <div className={styles.cardBox}>
        <div className={styles.headerRow}>
          <h3>Fixed Savings Rates</h3>
        </div>

        <div className={styles.topStats}>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total Fixed Savings</div>
            <div className={styles.statValue}>₦2.5B</div>
            <button className={styles.exportBtn}>Export</button>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statTitle}>Active Goal Savings</div>
            <div className={styles.statValue}>₦1.8B</div>
            <button className={styles.exportBtn}>Export</button>
          </div>
        </div>

        <div className={styles.reportItem}>
          <div>
            <h4>Monthly Savings Performance</h4>
            <p>Detailed breakdown of all savings activities</p>
          </div>
          <button className={styles.generateBtn}>Generate Report</button>
        </div>

        <div className={styles.reportItem}>
          <div>
            <h4>Interest Obligations Report</h4>
            <p>Current and upcoming interest payments</p>
          </div>
          <button className={styles.generateBtn}>Generate Report</button>
        </div>

        <div className={styles.reportItem}>
          <div>
            <h4>User Activity Trends</h4>
            <p>User engagement and savings</p>
          </div>
          <button className={styles.generateBtn}>Generate Report</button>
        </div>
      </div>
    </div>
  );
}
