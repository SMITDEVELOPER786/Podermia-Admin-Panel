import styles from "../css/CollateralLiquidationNotice.module.css";
import backIcon from "../assets/back.png";
export default function CollateralLiquidationNotice({ onBack }) {
  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
  <img src={backIcon} alt="Back" className={styles.backIcon} />
  <span>Back to Reconciliation</span>
</button>


      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Collateral Liquidation Notice</h2>
          <p className={styles.subTitle}>Account: ACC001 - John Doe</p>
        </div>
        <span className={styles.statusBadge}>Liquidation In Process</span>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <p>Liquidation %</p>
          <h3>80%</h3>
          <span>of collateral value</span>
        </div>

        <div className={styles.metricCard}>
          <p>Liquidated Amount</p>
          <h3>₦500,000</h3>
          <span>from Saving Vault</span>
        </div>

        <div className={styles.metricCard}>
          <p>Recovery Rate</p>
          <h3>142.9%</h3>
          <span>of outstanding debt</span>
        </div>

        <div className={styles.metricCard}>
          <p>Remaining Balance</p>
          <h3>₦125,000</h3>
          <span>still payable</span>
        </div>
      </div>

      <div className={styles.progressGrid}>
        <div className={styles.box}>
          <h4>Liquidation Progress</h4>

          <div className={styles.progressLabel}>
            <span>Collateral Liquidated</span>
            <span>80.0%</span>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "80%" }} />
          </div>

          <ul className={styles.detailsList}>
            <li><span>Original Collateral Value</span><strong>₦625,000</strong></li>
            <li><span>Amount Liquidated</span><strong className={styles.red}>₦500,000</strong></li>
            <li><span>Remaining Collateral</span><strong>₦125,000</strong></li>
            <li><span>Asset Type</span><strong>Saving Vault</strong></li>
          </ul>
        </div>

        <div className={styles.box}>
          <h4>Loan Recovery Status</h4>

          <div className={styles.progressLabel}>
            <span>Debt Recovery</span>
            <span>49.8%</span>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFillBlue} style={{ width: "49.8%" }} />
          </div>

          <ul className={styles.detailsList}>
            <li><span>Original Loan Amount</span><strong>₦400,000</strong></li>
            <li><span>Outstanding Amount</span><strong className={styles.red}>₦350,000</strong></li>
            <li><span>Amount Recovered</span><strong>₦500,000</strong></li>
            <li><span>Remaining Balance Due</span><strong>₦125,000</strong></li>
          </ul>
        </div>
      </div>

      <div className={styles.impactGrid}>
        <div className={`${styles.impactCard} ${styles.danger}`}>
          <h4>Liquidation Impact Summary</h4>
          <ul>
            <li>Loss of 80% collateral value</li>
            <li>Credit score reduction</li>
            <li>Remaining debt ₦125,000</li>
          </ul>
        </div>

        <div className={`${styles.impactCard} ${styles.info}`}>
          <h4>Recovery Efficiency</h4>
          <ul>
            <li>142.9% debt recovered</li>
            <li>Quick liquidation process</li>
            <li>Market-rate conversion</li>
          </ul>
        </div>

        <div className={`${styles.impactCard} ${styles.warning}`}>
          <h4>Next Steps</h4>
          <ul>
            <li>Continue collection efforts</li>
            <li>Update user account status</li>
            <li>Generate compliance report</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBtns}>
        <button className={styles.primary}>Complete Liquidation Process</button>
        <button className={styles.secondary}>Generate Export</button>
        <button className={styles.secondary}>Upload User Status</button>
        <button className={styles.secondary}>Return to dashboard</button>
      </div>
    </div>
  );
}
