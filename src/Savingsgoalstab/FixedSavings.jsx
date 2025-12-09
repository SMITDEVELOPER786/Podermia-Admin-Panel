import styles from "../css/SavingGoals.module.css";

export default function FixedSavings() {
  return (
    <div className={styles.tableBox}>
      <table>
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Interest Rate</th>
            <th>Maturity Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FS001</td>
            <td>Alice Brown</td>
            <td>₦100,000</td>
            <td>12 months</td>
            <td className={styles.activeBadge}>Active</td>
            <td>15%</td>
            <td>2024-12-15</td>
            <td className={styles.link}>View Detail</td>
          </tr>
          <tr>
            <td>FS002</td>
            <td>Bob Wilson</td>
            <td>₦250,000</td>
            <td>6 months</td>
            <td className={styles.maturedBadge}>Matured</td>
            <td>12%</td>
            <td>2024-01-10</td>
            <td className={styles.link}>View Detail</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
