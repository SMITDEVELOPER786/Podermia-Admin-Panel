import styles from "../css/SavingGoals.module.css";

export default function EarlyWithdrawals({ data }) {
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{item.amount.toLocaleString()}</td>
              <td>{item.plan}</td>
              <td className={styles[`${item.status.toLowerCase()}Badge`]}>{item.status}</td>
              <td>₦{item.penalty.toLocaleString()}</td>
              <td>{item.date}</td>
              <td className={styles.link}>View Detail</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
