import { useState, useEffect } from "react";
import styles from "../css/SavingGoals.module.css";

// Import all modals
import FixedSavingsModal from "../Savingsgoalstab/FixedSavingsModal"; // View User
import EditTermsModal from "../Savingsgoalstab/EditTermsModal";
import FreezeToggleModal from "../Savingsgoalstab/FreezeToggleModal";
import PenaltyRateModal from "../Savingsgoalstab/PenaltyRateModal";

export default function FixedSavings({ data }) {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("fixedSavings");
    return saved ? JSON.parse(saved) : data;
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState(""); 
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    localStorage.setItem("fixedSavings", JSON.stringify(plans));
  }, [plans]);
useEffect(() => {
  setPlans(data);
}, [data]);

  const handleSave = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
    setSelectedPlan(null);
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
            <th>Plan ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Interest</th>
            <th>Maturity</th>
            <th>Auto-rollover</th>
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
              <td>
                <span className={styles[`${item.status.toLowerCase()}Badge`]}>
                  {item.status}
                </span>
              </td>
              <td>{item.interest}</td>
              <td>{item.maturity}</td>
              <td>{item.autoRollover ? "Yes" : "No"}</td>
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
                    <li onClick={() => openModal(item, "viewUser")}>
                      View User Details
                    </li>
                    <li onClick={() => openModal(item, "editTerms")}>
                      Edit Savings Terms
                    </li>
                    <li onClick={() => openModal(item, "freezeToggle")}>
                      Change Freeze Early Termination
                    </li>
                    <li onClick={() => openModal(item, "penaltyRate")}>
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
      {selectedPlan && modalType === "viewUser" && (
        <FixedSavingsModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "editTerms" && (
        <EditTermsModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "freezeToggle" && (
        <FreezeToggleModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
      {selectedPlan && modalType === "penaltyRate" && (
        <PenaltyRateModal plan={selectedPlan} onSave={handleSave} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
