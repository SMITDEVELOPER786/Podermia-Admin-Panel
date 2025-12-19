import { useState } from "react";
import styles from "../css/Reports.module.css";
import filterIcon from "../assets/filter.png";
import exportIcon from "../assets/export.png";

const DATA = [
  { name: "John Doe", type: "Investment", txn: "TXN001", amount: 500000, status: "Completed", time: "2 hour ago", date: "2025-08-02" },
  { name: "Jane Smith", type: "Withdrawal", txn: "TXN002", amount: 150000, status: "Pending", time: "3 hour ago", date: "2025-08-01" },
  { name: "Mike Johnson", type: "Loan", txn: "TXN003", amount: 1200000, status: "Approved", time: "5 hour ago", date: "2025-08-03" },
  { name: "Sara Wilson", type: "Deposit", txn: "TXN004", amount: 750000, status: "Completed", time: "8 hour ago", date: "2025-08-04" },
];

export default function TransactionReports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");

  const filteredData = DATA.filter((tx) => {
    if (fromDate && tx.date < fromDate) return false;
    if (toDate && tx.date > toDate) return false;
    if (type && tx.type !== type) return false;
    if (status && tx.status !== status) return false;
    if (user && !tx.name.toLowerCase().includes(user.toLowerCase())) return false;
    return true;
  });

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setType("");
    setStatus("");
    setUser("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Transaction Reports</h2>
       <button className={styles.exportBtn}>
                 <img src={exportIcon} alt="" className={styles.icon} />
                 Export
               </button>
      </div>
<div className={styles.reportGrid}>
        <div className={styles.reportCard}>
          <p>Investment</p>
          <h3>45,450,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+8.3% Growth</span>
            <span className={styles.tagBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Loan Disbursement</p>
          <h3>28,850,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+12.7% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Withdrawal</p>
          <h3>15,220,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+6.8% Growth</span>
            <span className={styles.tagBlue}>Processed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Deposits</p>
          <h3>38,750,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+13.5% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Savings</p>
          <h3>22,340,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+22.1% Growth</span>
            <span className={styles.tagYellow}>Active</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <p>Loan Repayment</p>
          <h3>18,560,000</h3>
          <div className={styles.row}>
            <span className={styles.green}>+6.9% Growth</span>
            <span className={styles.tagGreen}>Completed</span>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
  <div className={styles.filterTitle}>
    <img src={filterIcon} alt="Filter" className={styles.filterIcon} />
    <span style={{fontSize: "16px"}}>Filter & Search</span>
  </div>
  <button onClick={clearFilters} className={styles.clearBtn}>
    Clear Filter
  </button>
</div>


        <div className={styles.filterGrid}>
          <div>
            <label>From Date</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div>
            <label>To Date</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div>
            <label>Transaction Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              <option>Investment</option>
              <option>Withdrawal</option>
              <option>Deposit</option>
              <option>Loan</option>
            </select>
          </div>

          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Approved</option>
            </select>
          </div>

          <div>
            <label>User</label>
            <input
              type="text"
              placeholder="Search user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={styles.recentBox}>
        <h3>Recent Transaction</h3>

        {filteredData.map((tx) => (
          <div key={tx.txn} className={styles.txItem}>
            <div>
              <div className={styles.txName}>{tx.name}</div>
              <div className={styles.txMeta}>
                {tx.type} {tx.txn}
              </div>
            </div>

            <div className={styles.txRight}>
              <div className={styles.txAmount}>{tx.amount.toLocaleString()}</div>
              <span
                className={`${styles.txStatus} ${
                  tx.status === "Completed"
                    ? styles.green
                    : tx.status === "Pending"
                    ? styles.yellow
                    : styles.blue
                }`}
              >
                {tx.status}
              </span>
              <div className={styles.txTime}>{tx.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
