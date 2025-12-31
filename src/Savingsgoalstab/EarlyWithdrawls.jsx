import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";

// Modals
import EarlyWithdrawalsModal from "../Savingsgoalstab/EarlyWithdrawalsModal";
import ApproveDeclineModal from "../Savingsgoalstab/ApproveDeclineModal"; // Modal for approve/decline

export default function EarlyWithdrawals({ data = [] }) {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("earlyWithdrawals");
    return saved ? JSON.parse(saved) : data;
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(""); 
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    localStorage.setItem("earlyWithdrawals", JSON.stringify(requests));
  }, [requests]);
  
useEffect(() => {
  setRequests(data);
}, [data]);

  const handleSave = (updatedRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
    );
    setSelectedRequest(null);
    setModalType("");
  };

  const openModal = (request, type) => {
    setSelectedRequest(request);
    setModalType(type);
    setActiveDropdown(null);
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
                  className={styles[`${item.status.toLowerCase()}Badge`]}
                >
                  {item.status}
                </span>
              </td>
              <td>₦{Number(item.penalty || 0).toLocaleString()}</td>
              <td>{item.date}</td>
              <td className={styles.actionDropdownCell}>
                <button
                  className={styles.actionBtn}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.id ? null : item.id
                    )
                  }
                >
                  ⋮
                </button>

                {activeDropdown === item.id && (
                  <ul className={styles.dropdownList}>
                    <li onClick={() => openModal(item, "view")}>
                      View Details
                    </li>
                    <li onClick={() => openModal(item, "approveDecline")}>
                      Approve / Decline
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {selectedRequest && modalType === "view" && (
        <EarlyWithdrawalsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSave}
        />
      )}

      {selectedRequest && modalType === "approveDecline" && (
        <ApproveDeclineModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
