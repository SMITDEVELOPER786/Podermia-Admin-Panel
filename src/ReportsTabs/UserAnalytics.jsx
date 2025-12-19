import styles from "../css/Reports.module.css";
import exportIcon from "../assets/export.png";
import userIcon from "../assets/usericon.png";

export default function FinancialReports() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2>Financial Reports</h2>
        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="" />
          Export
        </button>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Total User</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>12,245</h3>
          <span className={styles.green}>+ 8.2% from last period</span>
          <small>registered user</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Active user</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>8,156</h3>
          <span className={styles.green}>+ 12.1% from last period</span>
          <small>Monthly Active user</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>New registration</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>1,456</h3>
          <span className={styles.green}>+ 23.1% from last period</span>
          <small>This Month</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>KYC Completions</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>89%</h3>
          <span className={styles.red}>- 4.5% from last period</span>
          <small>verification rate</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>User Engagement</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>76%</h3>
          <span className={styles.green}>+ 2.8% from last period</span>
          <small>Daily Engagement</small>
        </div>

        <div className={styles.card}>
          <div className={styles.rowBetween}>
            <p>Retention Rate</p>
            <img src={userIcon} alt="" />
          </div>
          <h3>82%</h3>
          <span className={styles.green}>+ 6.2% from last period</span>
          <small>30 day retention</small>
        </div>
      </div>
<div className="segment">
      <h3 className={styles.segmentTitle}>User Segments</h3>

      <div className={styles.segmentBox}>
        <div>
          <p>Premium User</p>
          <small>2,845 users (23.2%)</small>
        </div>
        <h4>
          8,450,000
        <span>Revenue Generated</span></h4>
      </div>

      <div className={styles.segmentBox}>
        <div>
          <p>Standard User</p>
          <small>6,789 users (55.4%)</small>
        </div>
        <h4>
          3,200,000
           <span>Revenue Generated</span>
        </h4>
      </div>

      <div className={styles.segmentBox}>
        <div>
          <p>New User</p>
          <small>2,617 users (55.4%)</small>
        </div>
        <h4>
          800,000
           <span>Revenue Generated</span>
        </h4>
      </div>
      </div>
    </div>
  );
}
