import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import TickIcon from "../assets/tick.png";

// Modals
import GoalSavingsModal from "../Savingsgoalstab/GoalSavingsModal";
import EditGoalSavingsTermsModal from "../Savingsgoalstab/EditGoalSavingsTermsModal";
import FreezeToggleModal from "../Savingsgoalstab/FreezeToggleModal";
import PenaltyRateModal from "../Savingsgoalstab/PenaltyRateModal";


  export default function GoalSavings({ data = [] }) {

  // MOCK DATA
  const initialData = [
    {
      id: "GS-101",
      user: "Ayesha Khan",
      target: 500000,
      current: 180000,
      status: "Active",
      interest: "10%",
      maturity: "2026-03-15",
      autoRollover: true,
      penaltyRate: 5,
    },
    {
      id: "GS-102",
      user: "Ali Raza",
      target: 300000,
      current: 90000,
      status: "Frozen",
      interest: "12%",
      maturity: "2025-12-01",
      autoRollover: true,
      penaltyRate: 8,
    },
    {
      id: "GS-103",
      user: "Sara Ahmed",
      target: 1000000,
      current: 450000,
      status: "Active",
      interest: "9%",
      maturity: "2026-08-20",
      autoRollover: true,
      penaltyRate: 6,
    },
  ];

  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("goalSavings");
    return saved ? JSON.parse(saved) : data;

  });
useEffect(() => {
  setPlans(data);
}, [data]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    localStorage.setItem("goalSavings", JSON.stringify(plans));
  }, [plans]);

  const handleSave = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
    setSelectedPlan(null);
    setModalType("");
  };

  const openModal = (plan, type) => {
    setSelectedPlan(plan);
    setModalType(type);
    setActiveDropdown(null);
  };

  return (
    <div className={styles.tableBox}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Goal ID</th>
            <th>User</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Status</th>
            <th>Interest Rate</th>
            <th>Maturity Date</th>
            <th>Auto-rollover</th>
            <th>Penalty Rate (%)</th>
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
                <span className={styles[`${item.status.toLowerCase()}Badge`]}>
                  {item.status}
                </span>
              </td>
              <td>{item.interest || "-"}</td>
              <td>{item.maturity || "-"}</td>
              <td>
                {item.autoRollover ? (
                  <img src={TickIcon} alt="yes" className={styles.tickIcon} />
                ) : (
                  "No"
                )}
              </td>
              <td>{item.penaltyRate || "-"}</td>
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
                      View User Details
                    </li>
                    <li onClick={() => openModal(item, "edit")}>
                      Edit Savings Terms
                    </li>
                    <li onClick={() => openModal(item, "freeze")}>
                      Change Freeze Early Termination
                    </li>
                    <li onClick={() => openModal(item, "penalty")}>
                      Edit Early Termination Penalty Rate
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {selectedPlan && modalType === "view" && (
        <GoalSavingsModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
      {selectedPlan && modalType === "edit" && (
        <EditGoalSavingsTermsModal
          plan={selectedPlan}
          onSave={handleSave}
          onClose={() => setSelectedPlan(null)}
        />
      )}
      {selectedPlan && modalType === "freeze" && (
        <FreezeToggleModal
          plan={selectedPlan}
          onSave={handleSave}
          onClose={() => setSelectedPlan(null)}
        />
      )}
      {selectedPlan && modalType === "penalty" && (
        <PenaltyRateModal
          plan={selectedPlan}
          onSave={handleSave}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
