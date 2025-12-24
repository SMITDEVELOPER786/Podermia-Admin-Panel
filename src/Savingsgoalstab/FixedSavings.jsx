import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import FixedSavingsModal from "../Savingsgoalstab/FixedSavingsModal";

export default function FixedSavings({ data }) {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("fixedSavings");
    return saved ? JSON.parse(saved) : data;
  });

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    localStorage.setItem("fixedSavings", JSON.stringify(plans));
  }, [plans]);

  const handleSave = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
    setSelectedPlan(updatedPlan);
  };

  return (
    <div className={styles.tableBox}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Interest</th>
            <th>Maturity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>₦{item.amount.toLocaleString()}</td>
              <td>{item.duration}</td>

              {/* ✅ STATUS FIX */}
              <td>
                <span className={styles[`${item.status.toLowerCase()}Badge`]}>
                  {item.status}
                </span>
              </td>

              <td>{item.interest}</td>
              <td>{item.maturity}</td>
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

      {/* ✅ MODAL */}
      {selectedPlan && (
        <FixedSavingsModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
