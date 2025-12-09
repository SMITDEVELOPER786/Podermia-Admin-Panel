import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import clockIcon from "../assets/clock.png";

export default function FinancialReports() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2>Financial Reports</h2>

        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="" className={styles.icon} />
          Export
        </button>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <p>Total Revenue</p>
          <h3>12,450,000</h3>
          <span className={styles.green}>+ 12.5% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <p>Investment Income</p>
          <h3>8,850,000</h3>
          <span className={styles.green}>+ 8.3% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <p>Loan Interest</p>
          <h3>2,450,000</h3>
          <span className={styles.green}>+ 15.2% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <p>Operating cost</p>
          <h3>1,350,000</h3>
          <span className={styles.red}>- 5.1% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <p>Net Profit</p>
          <h3>11,100,000</h3>
          <span className={styles.green}>+ 18.7% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <p>Transaction fees</p>
          <h3>850,000</h3>
          <span className={styles.green}>+ 12.1% from last period</span>
          <small>This Month</small>
        </div>
      </div>

      <div className={styles.chartBox}>
              <h3 className={styles.sectionTitle}>Revenue Break down</h3>
        <img src={clockIcon} alt="" className={styles.chartIcon} />
        <p>Revenue Distribution Charts<br />Interactive charts would be display here</p>
      </div>
    </div>
  );
}
