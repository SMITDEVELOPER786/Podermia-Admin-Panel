import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import TickIcon from "../assets/tick.png";
import GoalSavingsModal from "../Savingsgoalstab/GoalSavingsModal";

export default function GoalSavings({ data = [] }) {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("goalSavings");
    return saved ? JSON.parse(saved) : data;
  });

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    localStorage.setItem("goalSavings", JSON.stringify(plans));
  }, [plans]);

  const handleSave = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
    setSelectedPlan(null);
  };

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
          {plans.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{Number(item.target || 0).toLocaleString()}</td>
              <td>₦{Number(item.current || 0).toLocaleString()}</td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`${item.status.toLowerCase()}Badge`]
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>{item.progress}</td>
              <td>{item.type}</td>
              <td>
                {item.autoDebit && (
                  <img
                    src={TickIcon}
                    alt="tick"
                    className={styles.tickIcon}
                  />
                )}
              </td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => setSelectedPlan(item)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlan && (
        <GoalSavingsModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
