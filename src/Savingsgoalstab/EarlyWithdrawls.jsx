import styles from "../css/SavingGoals.module.css";

export default function EarlyWithdrawalManagement() {
  return (
    <div className={styles.tableBox}>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Saving Plans</th>
            <th>Status</th>
            <th>Penalty</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>WR001</td>
            <td>John Smith</td>
            <td>₦50,000</td>
            <td>Fixed Savings</td>
            <td className={styles.approvedBadge}>Approved</td>
            <td>₦2,500</td>
            <td>2024-12-15</td>
            <td className={styles.link}>View Detail</td>
          </tr>

          <tr>
            <td>WR002</td>
            <td>Sarah Johnson</td>
            <td>₦75,000</td>
            <td>Goal Savings</td>
            <td className={styles.approvedBadge}>Approved</td>
            <td>₦0</td>
            <td>2024-01-10</td>
            <td className={styles.link}>View Detail</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
