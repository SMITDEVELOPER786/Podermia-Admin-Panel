import styles from "../css/SavingGoals.module.css";
import TickIcon from "../assets/tick.png";

export default function GoalSavings({ data }) {
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{item.target.toLocaleString()}</td>
              <td>₦{item.current.toLocaleString()}</td>
              <td className={styles[`${item.status.toLowerCase()}Badge`]}>{item.status}</td>
              <td>{item.progress}</td>
              <td>{item.type}</td>
              <td>{item.autoDebit && <img src={TickIcon} alt="tick" className={styles.tickIcon} />}</td>
              <td className={styles.link}>Manage</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
