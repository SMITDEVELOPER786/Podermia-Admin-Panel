import styles from "../css/SavingGoals.module.css";

export default function FixedSavings({ data }) {
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{item.amount.toLocaleString()}</td>
              <td>{item.duration}</td>
              <td className={styles[`${item.status.toLowerCase()}Badge`]}>{item.status}</td>
              <td>{item.interest}</td>
              <td>{item.maturity}</td>
              <td className={styles.link}>View Detail</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
