import styles from "../css/SavingGoals.module.css";
import TickIcon from "../assets/tick.png";

export default function GoalSavingManagement() {
  return (
    <div className={styles.tableBox}>

      <table>
        <thead>
          <tr>
            <th>Goal ID</th>
            <th>User</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Goal Type</th>
            <th>Auto-Debit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>GS001</td>
            <td>Emma Davis</td>
            <td>₦100,000</td>
            <td>₦350,000</td>
            <td className={styles.activeBadge}>Active</td>
            <td>70%</td>
            <td>Personal</td>
            <td>
              <img src={TickIcon} alt="tick" className={styles.tickIcon} />
            </td>
            <td className={styles.link}>Manage</td>
          </tr>

          <tr>
            <td>GS002</td>
            <td>Michael Chen</td>
            <td>₦250,000</td>
            <td>₦800,000</td>
            <td className={styles.activeBadge}>Active</td>
            <td>90%</td>
            <td>Group</td>
            <td>
              <img src={TickIcon} alt="tick" className={styles.tickIcon} />
            </td>
            <td className={styles.link}>Manage</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
