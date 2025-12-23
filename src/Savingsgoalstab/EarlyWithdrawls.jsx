import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import EarlyWithdrawalsModal from "../Savingsgoalstab/EarlyWithdrawalsModal";

export default function EarlyWithdrawals({ data = [] }) {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("earlyWithdrawals");
    return saved ? JSON.parse(saved) : data;
  });

  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    localStorage.setItem("earlyWithdrawals", JSON.stringify(requests));
  }, [requests]);

  const handleSave = (updatedRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
    );
    setSelectedRequest(null);
  };

  return (
    <div className={styles.tableBox}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Saving Plan</th>
            <th>Status</th>
            <th>Penalty</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{Number(item.amount || 0).toLocaleString()}</td>
              <td>{item.plan}</td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    item.status === "Approved"
                      ? styles[`${item.status.toLowerCase()}Badge`]
                      : styles[`${item.status.toLowerCase()}Badge`]
                  }`}
                  style={item.status === "Approved" ? { paddingBottom: "20px" } : {}}
                >
                  {item.status}
                </span>
              </td>
              <td>₦{Number(item.penalty || 0).toLocaleString()}</td>
              <td>{item.date}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => setSelectedRequest(item)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <EarlyWithdrawalsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
