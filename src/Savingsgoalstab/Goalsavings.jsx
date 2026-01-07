import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";
import TickIcon from "../assets/tick.png";

// Modals
import GoalSavingsModal from "../Savingsgoalstab/GoalSavingsModal";
import EditGoalSavingsTermsModal from "../Savingsgoalstab/EditGoalSavingsTermsModal";
import FreezeToggleModal from "../Savingsgoalstab/FreezeToggleModal";
import PenaltyRateModal from "../Savingsgoalstab/PenaltyRateModal";

export default function GoalSavings({
  data = [],
  searchTerm = "",
  statusFilter = "All",
  startDate = ""
}) {
  // Initialize plans with unique per-user values
  const initialData = data.map((d, i) => ({
    ...d,
    interest: d.interest ?? `${8 + i}%`, // unique interest per user
    maturity: d.maturity ?? `2026-0${(i + 1)}-15`, // unique maturity per user
    penaltyRate: d.penaltyRate ?? 5 + i, // unique penalty per user
  }));

  const [plans, setPlans] = useState(initialData);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Sync plans whenever parent data changes
  useEffect(() => {
    const updated = data.map((d, i) => ({
      ...d,
      interest: d.interest ?? `${8 + i}%`,
      maturity: d.maturity ?? `2026-0${(i + 1)}-15`,
      penaltyRate: d.penaltyRate ?? 5 + i,
    }));
    setPlans(updated);
  }, [data]);

  // Save edits from modals
  const handleSave = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? { ...p, ...updatedPlan } : p))
    );
    setSelectedPlan(null);
    setModalType("");
  };

  const openModal = (plan, type) => {
    setSelectedPlan(plan);
    setModalType(type);
    setActiveDropdown(null);
  };

  // Filter logic
  const filteredPlans = plans.filter((p) => {
    const matchesSearch =
      p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;

    const matchesDate = !startDate || p.startDate === startDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className={styles.tableBox}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Goal ID</th>
            <th>User ID</th>
            <th>User</th>
            <th>Start Date</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Status</th>
            <th>Interest Rate</th>
            <th>Maturity Date</th>
            <th>Auto-rollover</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.user}</td>
              <td>{item.startDate || "-"}</td>
              <td>₦{Number(item.target ?? 0).toLocaleString()}</td>
              <td>₦{Number(item.current ?? 0).toLocaleString()}</td>
              <td>
                <span className={styles[`${item.status.toLowerCase()}Badge`]}>
                  {item.status}
                </span>
              </td>
              <td>{item.interest}</td>
              <td>{item.maturity}</td>
              <td>
                {item.autoRollover ? (
                  <img src={TickIcon} alt="yes" className={styles.tickIcon} />
                ) : (
                  "No"
                )}
              </td>
             
              <td className={styles.actionDropdownCell}>
                <button
                  className={styles.actionBtn}
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.id ? null : item.id)
                  }
                >
                  ⋮
                </button>
                {activeDropdown === item.id && (
                  <ul className={styles.dropdownList}>
                    <li onClick={() => openModal(item, "view")}>View User Details</li>
                    <li onClick={() => openModal(item, "edit")}>Edit Savings Terms</li>
                    <li onClick={() => openModal(item, "freeze")}>Change Freeze Early Termination</li>
                    <li onClick={() => openModal(item, "penalty")}>Edit Early Termination Penalty Rate</li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {selectedPlan && modalType === "view" && (
        <GoalSavingsModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "edit" && (
        <EditGoalSavingsTermsModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "freeze" && (
        <FreezeToggleModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "penalty" && (
        <PenaltyRateModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
