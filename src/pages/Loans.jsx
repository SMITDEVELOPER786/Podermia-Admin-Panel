import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../css/LoansQueue.module.css";
import CriticalActionModal from "../components/CriticalActionModal";
import CollateralLiquidationNotice from "../components/CollateralLiquidationNotice";
import AutoDebitFailedModal from "../components/AutoDebitFailedModal";
import { LoanBarChart, LoanPieChart, LoanLineChart } from  "../components/ReportCharts";
import eyeIcon from "../assets/eye.png";
import tickIcon from "../assets/tick.png";
import crossIcon from "../assets/cross.png";
import exportIcon from "../assets/export.png";
import { MoreVertical } from "react-feather";

// action modal collateral tab
import LockCollateralModal from "../components/LockCollateralModal";
import UnlockFullModal from "../components/UnlockFullModal";
import UnlockRestructureModal from "../components/UnlockRestructureModal";
import PartialReleaseModal from "../components/PartialReleaseModal";
import AssetLiquidationModal from "../components/AssetLiquidationModal";
import MarkCompletionModal from "../components/MarkCompletionModal";

// ACTION MODALS default tab 
import LoanDetailsModal from "../components/LoanDetailsModal";
import ReminderModal from "../components/ReminderModal";
import RecoveryStatusModal from "../components/RecoveryStatusModal";
import DisputeModal from "../components/DisputeModal";
import BureauModal from "../components/BureauModal";
import CloseLoanModal from "../components/CloseLoanModal";
import ManualRepaymentModal from "../components/ManualRepaymentModal";
import InterestFreezeModal from "../components/InterestFreezeModal";
import CollateralSetoffModal from "../components/collateralsetoff"
import SuspendPenaltyModal from "../components/PenaltySuspendModal"
import AutoDebitRetryModal from "../components/AutoDebitRetryModal";



function LoansQueueTab({ setActiveTab }) {
  const initialRows = [
    { user: "John Doe", amount: 500000, collateral: "Savings Vault", ltv: "80%", status: "Pending", fullActions: true, date: "2025-12-01", accountId: "JD123" },
    { user: "Jahn Smith", amount: 500000, collateral: "T-Bills", ltv: "60%", status: "Under Review", fullActions: false, date: "2025-12-02", accountId: "JS456" },
    { user: "Mike Johnson", amount: 750000, collateral: "Fixed Savings", ltv: "85%", status: "Approved", fullActions: false, date: "2025-12-03", accountId: "MJ789" },
    { user: "Sarah Wilson", amount: 500000, collateral: "Fixed Savings", ltv: "70%", status: "Approved", fullActions: true, date: "2025-12-04", accountId: "SW101" }
  ];

  const [allRows, setAllRows] = useState(() => {
    const stored = localStorage.getItem("loanQueue");
    return stored ? JSON.parse(stored) : initialRows;
  });

  const [rows, setRows] = useState(allRows);
  const [filters, setFilters] = useState({ user: "", minAmount: "", collateral: "All Product", status: "Status" });

  const [showCriticalModal, setShowCriticalModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, loan: null, type: "" });

  useEffect(() => {
    localStorage.setItem("loanQueue", JSON.stringify(allRows));
    applyFilters(); 
  }, [allRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const applyFilters = () => {
    let filtered = [...allRows];
    if (filters.minAmount !== "") filtered = filtered.filter(r => r.amount >= Number(filters.minAmount));
    if (filters.user) filtered = filtered.filter(r => r.user.toLowerCase().includes(filters.user.toLowerCase()));
    if (filters.collateral !== "All Product") filtered = filtered.filter(r => r.collateral === filters.collateral);
    if (filters.status !== "Status") filtered = filtered.filter(r => r.status === filters.status);
    setRows(filtered);
  };

  const clearFilters = () => {
    setFilters({ user: "", minAmount: "", collateral: "All Product", status: "Status" });
    setRows(allRows);
  };

  const handleConfirmAction = () => {
    const updatedRows = allRows.map(r =>
      r.accountId === confirmModal.loan.accountId
        ? { ...r, status: confirmModal.type === "approve" ? "Approved" : "Rejected" }
        : r
    );
    setAllRows(updatedRows); 
    setConfirmModal({ open: false, loan: null, type: "" });
  };
  return (
    <>
      <div className={styles.topBar}>
        <h2>Loan Applications Queue</h2>
        <div className={styles.rightBtns}>
          <button
            className={styles.criticalBtn}
            onClick={() => {
              setSelectedLoan(rows[0]);
              setShowCriticalModal(true);
            }}
          >
            Critical Action
          </button>
          <button className={styles.exportBtn}>
            <img src={exportIcon} alt="export" /> Export Reports
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        <input type="number" name="minAmount" value={filters.minAmount} onChange={handleInputChange} placeholder="Min Amount" />
        <input type="text" name="user" value={filters.user} onChange={handleInputChange} placeholder="User Name" />
        <select name="collateral" value={filters.collateral} onChange={handleInputChange}>
          <option>All Product</option>
          <option>Savings Vault</option>
          <option>T-Bills</option>
          <option>Fixed Savings</option>
        </select>
        <select name="status" value={filters.status} onChange={handleInputChange}>
          <option>Status</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <button className={styles.applyBtn} onClick={applyFilters}>Apply Filters</button>
        <button className={styles.clearBtn} onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Collateral</th>
              <th>LTV</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.user}</td>
                <td>₦ {r.amount.toLocaleString()}</td>
                <td>{r.collateral}</td>
                <td>{r.ltv}</td>
                <td><span className={`${styles.status} ${styles[r.status.replace(" ", "").toLowerCase()]}`}>{r.status}</span></td>
                <td>
                  <div className={styles.actionBtns}>
                    <img src={eyeIcon} alt="view" style={{ cursor: "pointer" }} onClick={() => { setSelectedLoan(r); setActiveTab("Review"); }} />
                    {r.fullActions && (
                      <>
                        <img src={tickIcon} alt="approve" style={{ cursor: "pointer" }} onClick={() => setConfirmModal({ open: true, loan: r, type: "approve" })} />
                        <img src={crossIcon} alt="reject" style={{ cursor: "pointer" }} onClick={() => setConfirmModal({ open: true, loan: r, type: "reject" })} />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCriticalModal && selectedLoan && (
        <CriticalActionModal isOpen={showCriticalModal} onClose={() => setShowCriticalModal(false)} loan={selectedLoan} />
      )}

      {confirmModal.open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{confirmModal.type === "approve" ? "Approve Loan?" : "Reject Loan?"}</h3>
            <p>Are you sure you want to {confirmModal.type} the loan for <strong>{confirmModal.loan.user}</strong>?</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setConfirmModal({ open: false, loan: null, type: "" })}>Cancel</button>
              <button onClick={handleConfirmAction}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function ReviewTab({ setActiveTab }) {
  const [status, setStatus] = useState(() => {
    return localStorage.getItem("loanStatus") || "";
  });

  const [toast, setToast] = useState("");
  useEffect(() => {
    if (status) localStorage.setItem("loanStatus", status);
  }, [status]);

  const handleAction = (action) => {
    setStatus(action);
    setToast(`${action} applied!`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className={styles.reviewTab}>
      <div className={styles.topHeader}>
        <button
          className={styles.backBtn}
          onClick={() => setActiveTab("Loans Queue")}
        >
          Back To Queue
        </button>
        <h2 className={styles.pageTitle}>Loan Application Review</h2>
        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="" />
          Export Report
        </button>
      </div>

      <section className={styles.box}>
        <h3 className={styles.boxTitle}>Application User</h3>
        <div className={styles.grid2}>
          <p>
            <strong>Name:</strong> John Smith
          </p>
          <p>
            <strong>Account:</strong> ACC001
          </p>
          <p>
            <strong>Email:</strong> John.doi@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +234 801234
          </p>
        </div>
      </section>

      <section className={styles.box} style={{ position: "relative" }}>
        <h3 className={styles.boxTitle}>Loans Detail</h3>
        <div className={styles.grid2}>
          <p>
            <strong>Loan Amount:</strong> 500,000
          </p>
          <p>
            <strong>Purpose:</strong> Business Expansion
          </p>
          <p>
            <strong>Collateral:</strong> Saving Vault
          </p>
          <p>
            <strong>LTV Ratio:</strong> 80%
          </p>
        </div>

        {status && (
          <span
            className={`${styles.statusBadgeTopRight} ${styles[
              status.toLowerCase().replace(/\s/g, "")
            ]}`}
          >
            {status}
          </span>
        )}
      </section>

      <section className={styles.box}>
        <h3 className={styles.boxTitle}>AI Recommendation</h3>
        <p className={styles.aiText}>
          Based on credit score, collateral value and payment history,
          application meets approval criteria, recommended rate: 15.4%,
          with standard terms.
        </p>
      </section>

      <div className={styles.grid4}>
        <div className={styles.card} style={{ height: "300px" }}>
          <h4>KYC Verified</h4>
          <span className={styles.verified}>Verified</span>
          <p className={styles.smallText}>
            <strong>Documents Verified:</strong>
            <br />
            • National ID <br />
            • Utility Bill <br />
            • Bank Statement
          </p>
        </div>

        <div className={styles.cardCenter}>
          <h4>Credit Score</h4>
          <h2 className={styles.bigNumber}>720</h2>
          <p className={styles.scoreBadge}>Good</p>
        </div>

        <div className={styles.cardCenter}>
          <h4>Risk Level</h4>
          <h2 className={styles.bigNumber}>85/100</h2>
          <p className={styles.riskBadge}>Low</p>
        </div>

        <div className={styles.cardCenter}>
          <h4>Action</h4>
          <button
            className={styles.btnGreen}
            onClick={() => handleAction("Approved")}
          >
            Approve Loan
          </button>
          <button
            className={styles.btnRed}
            onClick={() => handleAction("Rejected")}
          >
            Reject Application
          </button>
          <button
            className={styles.btnGrey}
            onClick={() => handleAction("Info Needed")}
          >
            Request Additional Info
          </button>
        </div>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
function LoanListTab() {
  const initialRows = [
    { user: "John Doe", amount: 500000, balance: 350000, status: "Active", rate: "15.5%", maturity: "7/1/2025", principal: 500000, days: 45, collateral: "Savings Vault", collateralValue: 625000, ltv: "80%" },
    { user: "Jahn Smith", amount: 500000, balance: 0, status: "Repaid", rate: "12%", maturity: "8/15/2024", principal: 500000, days: 0, collateral: "T-Bills", collateralValue: 300000, ltv: "60%" },
    { user: "Mike Johnson", amount: 750000, balance: 800000, status: "Overdue", rate: "85%", maturity: "6/1/2025", principal: 750000, days: 90, collateral: "Fixed Savings", collateralValue: 880000, ltv: "85%" },
    { user: "Sarah Wilson", amount: 500000, balance: 180000, status: "Defaulted", rate: "20% 70%", maturity: "6/2/2024", principal: 500000, days: 15, collateral: "Fixed Savings", collateralValue: 700000, ltv: "70%" },
  ];

  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({ user: "", minAmount: "", date: "" });
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showOtherActions, setShowOtherActions] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const otherActionsRef = useRef(null);

  const loanActions = [
    "View repayment schedule",
    "View payment history",
    "Mark repayment as received",
    "Reverse a repayment",
    "Re-apply repayment after correction",
    "Adjust repayment posting date",
    "Extend loan tenor",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = initialRows;
    if (filters.user) filtered = filtered.filter(r => r.user.toLowerCase().includes(filters.user.toLowerCase()));
    if (filters.minAmount !== "") filtered = filtered.filter(r => r.amount >= Number(filters.minAmount));
    if (filters.date) {
      filtered = filtered.filter(r => {
        const [month, day, year] = r.maturity.split("/");
        const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        return formattedDate === filters.date;
      });
    }
    setRows(filtered);
  };

  const clearFilters = () => {
    setFilters({ user: "", minAmount: "", date: "" });
    setRows(initialRows);
  };

  useEffect(() => {
    if (!showOtherActions) return;
    const handleClickOutside = (e) => {
      if (otherActionsRef.current && !otherActionsRef.current.contains(e.target)) setShowOtherActions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOtherActions]);

  const handleActionClick = (action) => {
    setCurrentAction(action);
    setShowOtherActions(false);
    setShowLoanModal(false); // close detail modal
    setShowConfirmModal(true); // open confirm modal
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowLoanModal(true); // reopen detail modal after confirm
  };

  return (
    <>
      <div className={styles.topBar}><h2>All Loans - Master List</h2></div>

      <div className={styles.filtersRow}>
        <input type="date" name="date" value={filters.date} onChange={handleInputChange} />
        <input type="number" name="minAmount" value={filters.minAmount} onChange={handleInputChange} placeholder="Min Amount" />
        <input type="text" name="user" value={filters.user} onChange={handleInputChange} placeholder="User Name" />
        <div className={styles.filterButtons}>
          <button className={styles.clearBtn} onClick={clearFilters}>Clear Filters</button>
          <button className={styles.apply} onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th><th>Principal</th><th>Balance</th><th>Rate</th><th>Maturity</th><th>Days</th><th>Collateral</th><th>Collateral Value</th><th>LTV</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.user}</td>
                <td>₦ {row.principal.toLocaleString()}</td>
                <td>₦ {row.balance.toLocaleString()}</td>
                <td>{row.rate}</td>
                <td>{row.maturity}</td>
                <td>{row.days} days</td>
                <td>{row.collateral}</td>
                <td>₦ {row.collateralValue.toLocaleString()}</td>
                <td>{row.ltv}</td>
                <td><span className={`${styles.status} ${styles[row.status.toLowerCase()]}`}>{row.status}</span></td>
                <td>
                  <div className={styles.actionIcon}>
                    <img src={eyeIcon} alt="view" onClick={() => { setSelectedLoan(row); setShowLoanModal(true); setCurrentAction(null); }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loan Details Modal */}
      {showLoanModal && selectedLoan && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{selectedLoan.user} - Loan Details</h3>
            <button className={styles.closeModal} onClick={() => setShowLoanModal(false)}>×</button>

            {/* Other Actions */}
            <div className={styles.otherActions} ref={otherActionsRef}>
              <div className={styles.otherActionsSelected} onClick={() => setShowOtherActions(!showOtherActions)}>
                Other Actions <span className={`${styles.dropdownIcon} ${showOtherActions ? styles.rotate : ""}`}>▼</span>
              </div>
              {showOtherActions && (
                <div className={styles.otherActionsMenu}>
                  {loanActions.map((action, idx) => (
                    <div key={idx} className={styles.otherActionsItem} onClick={() => handleActionClick(action)}>
                      {action}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.detailRow}><strong>Principal:</strong> ₦ {selectedLoan.principal.toLocaleString()}</div>
            <div className={styles.detailRow}><strong>Balance:</strong> ₦ {selectedLoan.balance.toLocaleString()}</div>
            <div className={styles.detailRow}><strong>Rate:</strong> {selectedLoan.rate}</div>
            <div className={styles.detailRow}><strong>Maturity:</strong> {selectedLoan.maturity}</div>
            <div className={styles.detailRow}><strong>Days:</strong> {selectedLoan.days}</div>
            <div className={styles.detailRow}><strong>Collateral:</strong> {selectedLoan.collateral}</div>
            <div className={styles.detailRow}><strong>Collateral Value:</strong> ₦ {selectedLoan.collateralValue.toLocaleString()}</div>
            <div className={styles.detailRow}><strong>LTV:</strong> {selectedLoan.ltv}</div>
            <div className={styles.detailRow}><strong>Status:</strong> {selectedLoan.status}</div>

            <div className={styles.formActions}>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && selectedLoan && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Action: {currentAction}</h3>
              <p className={styles.confirmText}>
    Are you sure you want to proceed? This action cannot be reversed.
  </p>

            <button className={styles.closeModal} onClick={() => setShowConfirmModal(false)}>×</button>
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const EMPTY_PRODUCT = {
  name: "",
  code: "",
  category: "Secured Loan",
  amountRange: "",
  tenorRange: "",
  interestRate: "",
  maxLTV: "",

  controls: {
    active: true,
    minAge: "",
    maxAge: "",
    employmentType: "Salaried",
    minIncome: "",
    minAccountAge: "",
    creditScore: "",
    riskTier: "",
    blacklistExclusions: "",
    geography: "",
    minAmount: "",
    maxAmount: "",
  },

  admin: {
    maxActiveLoans: "",
    minTenor: "",
    maxTenor: "",
    allowedTenorOptions: "",
    repaymentFrequency: "Daily",
    repaymentMethod: "Wallet debit",
    interestType: "Flat",
    interestRate: "",
    effectiveAPR: "",
    processingFee: "",
    insuranceFee: "",
    managementFee: "",
    documentationFee: "",
    vatHandling: "",
    feeDeductionMethod: "Upfront",
    gracePeriod: "",
    lateFeeFlat: "",
    lateFeeDaily: "",
    recoveryFeeFlat: "",
    recoveryFeeDaily: "",
    defaultTrigger: "",
    defaultInterestRate: "",
    earlyRepaymentPenalty: "",
    collateralRequired: false,
    collateralTypes: [],
    ltvRatio: "",
    guarantorRequired: false,
    numGuarantors: "",
    minRiskScore: "",
    disbursementMethod: "Wallet",
    autoDebitRetries: "",
    retryFrequency: "",
    recoveryEscalation: "",
    creditBureauReporting: false,
  },

  globalInterestRate: {
    base: "",
    max: "",
    min: ""
  },

  ltvSetting: {
    conservative: "",
    standard: "",
    highest: ""
  },

  penaltySetting: {
    penalty: "",
    defaultCharge: "",
    overdue: ""
  },

  tenorSetting: {
    min: "",
    max: "",
    step: ""
  }
};

 function SettingTab() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("loanProducts");
    if (stored) {
      const parsed = JSON.parse(stored);
      const safeData = parsed.map(p => ({
        ...EMPTY_PRODUCT,
        ...p,
        globalInterestRate: { ...EMPTY_PRODUCT.globalInterestRate, ...p.globalInterestRate },
        ltvSetting: { ...EMPTY_PRODUCT.ltvSetting, ...p.ltvSetting },
        penaltySetting: { ...EMPTY_PRODUCT.penaltySetting, ...p.penaltySetting },
        tenorSetting: { ...EMPTY_PRODUCT.tenorSetting, ...p.tenorSetting }
      }));
      setProducts(safeData);
      localStorage.setItem("loanProducts", JSON.stringify(safeData));
    }
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("loanProducts", JSON.stringify(updated));
  };

  const openModal = (index = null) => {
    if (index !== null && products[index]) {
      setNewProduct({ ...EMPTY_PRODUCT, ...products[index] });
      setEditingIndex(index);
    } else {
      setNewProduct(EMPTY_PRODUCT);
      setEditingIndex(null);
    }
    setModalOpen(true);
  };

  const handleChange = (field, value, section = null) => {
    if (section) {
      setNewProduct((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setNewProduct((prev) => ({ ...prev, [field]: value }));
    }
  };
const handleSave = () => {
  const missingFields = [];
  if (!newProduct.name) missingFields.push("Product Name");
  if (!newProduct.code) missingFields.push("Product Code");
  if (!newProduct.category) missingFields.push("Category");
  if (missingFields.length > 0) {
    setError(`Please fill: ${missingFields.join(", ")}`);
    return;
  }

  setError("");

  if (editingIndex !== null) {
    const updated = [...products];
    updated[editingIndex] = newProduct;
    saveProducts(updated);
  } else {
    saveProducts([...products, newProduct]);
  }

  setModalOpen(false);
  setEditingIndex(null);
  setNewProduct(EMPTY_PRODUCT);
};



  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Loan Setting & Configuration</h2>
<button className={styles.settingAddBtn} onClick={() => openModal()}>
  Add New Loan Product
</button>
      </div>

      <div className={styles.productSection}>
    {products.map((p, i) => (
  <div className={styles.card} key={i}>
    <div className={styles.cardHeader}>
      <h4>{p.name || "Unnamed Product"}</h4>

      <div className={styles.cardActions}>
      <button className={styles.settingEditBtn} onClick={() => openModal(i)}>Edit</button>
<button className={styles.settingViewBtn} onClick={() => navigate(`/loan-product-view/${i}`)}>View</button>
      </div>
    </div>

    <div className={styles.cardGrid}>
      <p>
        <strong>Product Code:</strong> {p.code || "—"}
      </p>
      <p>
        <strong>Category:</strong> {p.category || "—"}
      </p>
      <p>
        <strong>Status:</strong> {p.controls?.active ? "Active" : "Deactive"}
      </p>
    </div>
  </div>
))}

      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingIndex !== null ? "Edit Loan Product" : "Add New Loan Product"}</h3>
              <span className={styles.closeIcon} onClick={() => setModalOpen(false)}>×</span>
            </div>

            <input placeholder="Loan Product Name" value={newProduct.name} onChange={(e) => handleChange("name", e.target.value)} />
<input
  placeholder="Product Code *"
  value={newProduct.code}
  onChange={(e) => handleChange("code", e.target.value)}
/>

             <p>Product Category</p>
            <select value={newProduct.category} onChange={(e) => handleChange("category", e.target.value)} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Secured Loan</option>
              <option>Un-secured Loan</option>
            </select>
            <h4>Controls</h4>
            <label>
              Active
              <input type="checkbox" checked={newProduct.controls.active} onChange={(e) => handleChange("active", e.target.checked, "controls")} />
            </label>
            <input placeholder="Minimum Age" value={newProduct.controls.minAge} onChange={(e) => handleChange("minAge", e.target.value, "controls")} />
            <input placeholder="Maximum Age" value={newProduct.controls.maxAge} onChange={(e) => handleChange("maxAge", e.target.value, "controls")} />
            <p>Employment Type</p>
            <select value={newProduct.controls.employmentType} onChange={(e) => handleChange("employmentType", e.target.value, "controls")} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Salaried</option>
              <option>Self-employed</option>
              <option>Other</option>
            </select>
            <input placeholder="Minimum Income" value={newProduct.controls.minIncome} onChange={(e) => handleChange("minIncome", e.target.value, "controls")} />
            <input placeholder="Minimum Account Age" value={newProduct.controls.minAccountAge} onChange={(e) => handleChange("minAccountAge", e.target.value, "controls")} />
            <input placeholder="Credit Score Threshold" value={newProduct.controls.creditScore} onChange={(e) => handleChange("creditScore", e.target.value, "controls")} />
            <input placeholder="Risk Tier Allowed" value={newProduct.controls.riskTier} onChange={(e) => handleChange("riskTier", e.target.value, "controls")} />
            <input placeholder="Blacklist Exclusions" value={newProduct.controls.blacklistExclusions} onChange={(e) => handleChange("blacklistExclusions", e.target.value, "controls")} />
            <input placeholder="Geographic Restrictions" value={newProduct.controls.geography} onChange={(e) => handleChange("geography", e.target.value, "controls")} />
            <input placeholder="Minimum Loan Amount" value={newProduct.controls.minAmount} onChange={(e) => handleChange("minAmount", e.target.value, "controls")} />
            {/* Admin Settings */}
            <h4>Admin Updates</h4>
                        <input placeholder="Maximum Loan Amount" value={newProduct.controls.maxAmount} onChange={(e) => handleChange("maxAmount", e.target.value, "controls")} />
            <input placeholder="Max Active Loans per User" value={newProduct.admin.maxActiveLoans} onChange={(e) => handleChange("maxActiveLoans", e.target.value, "admin")} />
            <input placeholder="Min Tenor" value={newProduct.admin.minTenor} onChange={(e) => handleChange("minTenor", e.target.value, "admin")} />
            <input placeholder="Max Tenor" value={newProduct.admin.maxTenor} onChange={(e) => handleChange("maxTenor", e.target.value, "admin")} />
            <input placeholder="Allowed Tenor Options (comma-separated)" value={newProduct.admin.allowedTenorOptions} onChange={(e) => handleChange("allowedTenorOptions", e.target.value, "admin")} />
            <p>Repayment Frequency</p>
            <select value={newProduct.admin.repaymentFrequency} onChange={(e) => handleChange("repaymentFrequency", e.target.value, "admin")} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Back-end</option>
              <option>Upfront</option>
            </select>
            <p>Repayment Method</p>
            <select value={newProduct.admin.repaymentMethod} onChange={(e) => handleChange("repaymentMethod", e.target.value, "admin")}  style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Wallet debit</option>
              <option>Bank auto-debit</option>
              <option>Manual</option>
            </select>
            <p>Interest Type</p>
            <select value={newProduct.admin.interestType} onChange={(e) => handleChange("interestType", e.target.value, "admin")} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Flat</option>
              <option>Reducing balance</option>
            </select>
            <input placeholder="Interest Rate (% p.a.)" value={newProduct.admin.interestRate} onChange={(e) => handleChange("interestRate", e.target.value, "admin")} />
            <input placeholder="Effective APR" value={newProduct.admin.effectiveAPR} onChange={(e) => handleChange("effectiveAPR", e.target.value, "admin")} />
            <input placeholder="Processing Fee" value={newProduct.admin.processingFee} onChange={(e) => handleChange("processingFee", e.target.value, "admin")} />
            <input placeholder="Insurance Fee" value={newProduct.admin.insuranceFee} onChange={(e) => handleChange("insuranceFee", e.target.value, "admin")} />
            <input placeholder="Management Fee" value={newProduct.admin.managementFee} onChange={(e) => handleChange("managementFee", e.target.value, "admin")} />
            <input placeholder="Documentation Fee" value={newProduct.admin.documentationFee} onChange={(e) => handleChange("documentationFee", e.target.value, "admin")} />
            <input placeholder="VAT Handling" value={newProduct.admin.vatHandling} onChange={(e) => handleChange("vatHandling", e.target.value, "admin")} />
            <p>Fee Deduction Method</p>
            <select value={newProduct.admin.feeDeductionMethod} onChange={(e) => handleChange("feeDeductionMethod", e.target.value, "admin")} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Upfront</option>
              <option>Capitalized</option>
            </select>
            <input placeholder="Grace Period (days)" value={newProduct.admin.gracePeriod} onChange={(e) => handleChange("gracePeriod", e.target.value, "admin")} />
            <input placeholder="Late Fee (Flat %)" value={newProduct.admin.lateFeeFlat} onChange={(e) => handleChange("lateFeeFlat", e.target.value, "admin")} />
            <input placeholder="Late Fee (Daily %)" value={newProduct.admin.lateFeeDaily} onChange={(e) => handleChange("lateFeeDaily", e.target.value, "admin")} />
            <input placeholder="Recovery Fee (Flat)" value={newProduct.admin.recoveryFeeFlat} onChange={(e) => handleChange("recoveryFeeFlat", e.target.value, "admin")} />
            <input placeholder="Recovery Fee (Daily %)" value={newProduct.admin.recoveryFeeDaily} onChange={(e) => handleChange("recoveryFeeDaily", e.target.value, "admin")} />
            <input placeholder="Default Trigger (days overdue)" value={newProduct.admin.defaultTrigger} onChange={(e) => handleChange("defaultTrigger", e.target.value, "admin")} />
            <input placeholder="Default Interest Rate" value={newProduct.admin.defaultInterestRate} onChange={(e) => handleChange("defaultInterestRate", e.target.value, "admin")} />
            <input placeholder="Early Repayment Penalty" value={newProduct.admin.earlyRepaymentPenalty} onChange={(e) => handleChange("earlyRepaymentPenalty", e.target.value, "admin")} />
            <label>
              Collateral Required
              <input type="checkbox" checked={newProduct.admin.collateralRequired} onChange={(e) => handleChange("collateralRequired", e.target.checked, "admin")} />
            </label>
            <input placeholder="Collateral Types (comma-separated)" value={newProduct.admin.collateralTypes.join(", ")} onChange={(e) => handleChange("collateralTypes", e.target.value.split(","), "admin")} />
            <input placeholder="LTV Ratio" value={newProduct.admin.ltvRatio} onChange={(e) => handleChange("ltvRatio", e.target.value, "admin")} />
            <label>
              Guarantor Required
              <input type="checkbox" checked={newProduct.admin.guarantorRequired} onChange={(e) => handleChange("guarantorRequired", e.target.checked, "admin")} />
            </label>
            <input placeholder="Number of Guarantors" value={newProduct.admin.numGuarantors} onChange={(e) => handleChange("numGuarantors", e.target.value, "admin")} />
            <input placeholder="Minimum Risk Score" value={newProduct.admin.minRiskScore} onChange={(e) => handleChange("minRiskScore", e.target.value, "admin")} />
            <p> Disbursement Method</p>
            <select value={newProduct.admin.disbursementMethod} onChange={(e) => handleChange("disbursementMethod", e.target.value, "admin")} style={{padding: "10px", backgroundColor: "#fff", borderRadius: "6px"}}>
              <option>Wallet</option>
              <option>Bank transfer</option>
            </select>
            <input placeholder="Auto-Debit Retries" value={newProduct.admin.autoDebitRetries} onChange={(e) => handleChange("autoDebitRetries", e.target.value, "admin")} />
            <input placeholder="Retry Frequency" value={newProduct.admin.retryFrequency} onChange={(e) => handleChange("retryFrequency", e.target.value, "admin")} />
            <input placeholder="Recovery Escalation Timeline" value={newProduct.admin.recoveryEscalation} onChange={(e) => handleChange("recoveryEscalation", e.target.value, "admin")} />
            <label>
              Credit Bureau Reporting
              <input type="checkbox" checked={newProduct.admin.creditBureauReporting} onChange={(e) => handleChange("creditBureauReporting", e.target.checked, "admin")} />
            </label>

           {/* Modal Buttons */}
{error && <p className={styles.errorText}>{error}</p>}
<div className={styles.settingModalButtons}>
  <button onClick={() => setModalOpen(false)}>Cancel</button>
  <button onClick={handleSave}>Save</button>
</div>

          </div>
        </div>
      )}
    </div>
  );
}

function DefaultManagementTab() {
  const [risk, setRisk] = useState("Risk Level");
  const [recovery, setRecovery] = useState("Recovery Status");
const [search, setSearch] = useState("");

  const initialRows = [
    { id: 1, user: "Emma Devis", acc: "ACC006", outstanding: 180000, days: 45, risk: "High", status: "In Progress", collateral: "Savings Vault", collateralValue: 150000 },
    { id: 2, user: "Michael Brown", acc: "ACC007", outstanding: 320000, days: 90, risk: "Critical", status: "Legal Action", collateral: "Fixed Saving", collateralValue: 280000 },
    { id: 3, user: "Lisa Wilson", acc: "ACC008", outstanding: 95000, days: 15, risk: "Medium", status: "Initial", collateral: "Investment Portfolio", collateralValue: 120000 },
    { id: 4, user: "Robert Johnson", acc: "ACC009", outstanding: 450000, days: 120, risk: "Critical", status: "Write-off", collateral: "Real Estate", collateralValue: 800000 }
  ];

  const [rows, setRows] = useState(initialRows);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [loanDetailsModalOpen, setLoanDetailsModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [recoveryStatusModalOpen, setRecoveryStatusModalOpen] = useState(false);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [bureauModalOpen, setBureauModalOpen] = useState(false);
  const [closeLoanModalOpen, setCloseLoanModalOpen] = useState(false);
  const [manualRepaymentModalOpen, setManualRepaymentModalOpen] = useState(false);
  const [collateralSetoffModalOpen, setCollateralSetoffModalOpen] = useState(false);
  const [interestFreezeModalOpen, setInterestFreezeModalOpen] = useState(false);
  const [suspendPenaltyModalOpen, setSuspendPenaltyModalOpen] = useState(false);
  const [waivePenaltyModalOpen, setWaivePenaltyModalOpen] = useState(false);
  const [autoDebitRetryModalOpen, setAutoDebitRetryModalOpen] = useState(false);

const applyFilters = () => {
  let filtered = initialRows;

  if (risk !== "Risk Level") {
    filtered = filtered.filter(r => r.risk === risk);
  }

  if (recovery !== "Recovery Status") {
    filtered = filtered.filter(r => r.status === recovery);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(r =>
      r.user.toLowerCase().includes(q) ||
      r.acc.toLowerCase().includes(q)
    );
  }

  setRows(filtered);
};

const clearFilters = () => {
  setRisk("Risk Level");
  setRecovery("Recovery Status");
  setSearch("");
  setRows(initialRows);
};

  const handleActionClick = (index, e) => {
    e.stopPropagation();
    setActionMenuOpen(actionMenuOpen === index ? null : index);
    setSelectedLoan(rows[index]);
  };

  useEffect(() => {
    const handleClickOutside = () => setActionMenuOpen(null);
    if (actionMenuOpen !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [actionMenuOpen]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Default Management Dashboard</h2>
      <div className={styles.filterRow}>
   <input
  className={styles.searchInput}
  type="text"
  placeholder="Search by user name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


        <select value={risk} onChange={(e) => setRisk(e.target.value)}>
          <option>Risk Level</option>
          <option>High</option>
          <option>Critical</option>
          <option>Medium</option>
        </select>
        <select value={recovery} onChange={(e) => setRecovery(e.target.value)}>
          <option>Recovery Status</option>
          <option>In Progress</option>
          <option>Legal Action</option>
          <option>Initial</option>
          <option>Write-off</option>
        </select>
        <button className={styles.applyBtn} onClick={applyFilters}>Apply Filters</button>
        <button className={styles.clearBtn} onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Outstanding</th>
              <th>Days</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Collateral</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}>
                <td><strong>{row.user}</strong><br /><span className={styles.acc}>{row.acc}</span></td>
                <td>₦{row.outstanding.toLocaleString()}</td>
                <td>{row.days} days</td>
                <td><span className={`${styles.badge} ${styles[row.risk.toLowerCase()]}`}>{row.risk}</span></td>
                <td><span className={`${styles.badgeStatus} ${styles[row.status.replace(" ","").toLowerCase()]}`}>{row.status}</span></td>
                <td>{row.collateral}<br /><span className={styles.collateralValue}>₦{row.collateralValue.toLocaleString()}</span></td>
                <td className={styles.tableCellRelative}>
                  <button
                    onClick={(e) => handleActionClick(i, e)}
                    className={styles.actionButton}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {actionMenuOpen === i && (
                    <div className={styles.fixedActionMenu}>
                      <button onClick={() => setLoanDetailsModalOpen(true)} className={styles.actionMenuItem}>View Loan Details</button>
                      <button onClick={() => setReminderModalOpen(true)} className={styles.actionMenuItem}>Trigger Automated Reminders</button>
                      <button onClick={() => setRecoveryStatusModalOpen(true)} className={styles.actionMenuItem}>Assign Recovery Status</button>
                      <button onClick={() => setDisputeModalOpen(true)} className={styles.actionMenuItem}>Log Dispute</button>
                      <button onClick={() => setBureauModalOpen(true)} className={styles.actionMenuItem}>Update Bureau Status</button>
                      <button onClick={() => setCloseLoanModalOpen(true)} className={styles.actionMenuItem}>Close Loan</button>
                      <button onClick={() => setManualRepaymentModalOpen(true)} className={styles.actionMenuItem}>Manual Repayment</button>
                      <button onClick={() => setCollateralSetoffModalOpen(true)} className={styles.actionMenuItem}>Manual Collateral Set-off</button>
                      <button onClick={() => setInterestFreezeModalOpen(true)} className={styles.actionMenuItem}>Approve Interest Freeze</button>
                      <button onClick={() => setSuspendPenaltyModalOpen(true)} className={styles.actionMenuItem}>Suspend Further Penalties</button>
                      <button onClick={() => setAutoDebitRetryModalOpen(true)} className={styles.actionMenuItem}>Trigger Auto-Debit Retry</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loanDetailsModalOpen && <LoanDetailsModal isOpen={loanDetailsModalOpen} onClose={() => setLoanDetailsModalOpen(false)} loan={selectedLoan} />}
      {reminderModalOpen && <ReminderModal isOpen={reminderModalOpen} onClose={() => setReminderModalOpen(false)} loan={selectedLoan} />}
      {recoveryStatusModalOpen && <RecoveryStatusModal isOpen={recoveryStatusModalOpen} onClose={() => setRecoveryStatusModalOpen(false)} loan={selectedLoan} />}
      {disputeModalOpen && <DisputeModal isOpen={disputeModalOpen} onClose={() => setDisputeModalOpen(false)} loan={selectedLoan} />}
      {bureauModalOpen && <BureauModal isOpen={bureauModalOpen} onClose={() => setBureauModalOpen(false)} loan={selectedLoan} />}
      {closeLoanModalOpen && <CloseLoanModal isOpen={closeLoanModalOpen} onClose={() => setCloseLoanModalOpen(false)} loan={selectedLoan} />}
      {manualRepaymentModalOpen && <ManualRepaymentModal isOpen={manualRepaymentModalOpen} onClose={() => setManualRepaymentModalOpen(false)} loan={selectedLoan} />}
      {collateralSetoffModalOpen && <CollateralSetoffModal isOpen={collateralSetoffModalOpen} onClose={() => setCollateralSetoffModalOpen(false)} loan={selectedLoan} />}
      {interestFreezeModalOpen && <InterestFreezeModal isOpen={interestFreezeModalOpen} onClose={() => setInterestFreezeModalOpen(false)} loan={selectedLoan} />}
      {suspendPenaltyModalOpen && <SuspendPenaltyModal isOpen={suspendPenaltyModalOpen} onClose={() => setSuspendPenaltyModalOpen(false)} loan={selectedLoan} />}
      {autoDebitRetryModalOpen && <AutoDebitRetryModal isOpen={autoDebitRetryModalOpen} onClose={() => setAutoDebitRetryModalOpen(false)} loan={selectedLoan} />}
    </div>
  );
}
 function CollateralTab({ setActiveTab }) {
  const initialRows = [
    { user: "Jhon Doi", acc: "ACC001", asset: "Saving Vault", value: 625000, locked: 500000, ltv: "80%", status: "Locked", loanStatus: "Active" },
    { user: "Sarah Wilson", acc: "ACC004", asset: "Investment Portfolio", value: 1200000, locked: 875000, ltv: "70%", status: "Released", loanStatus: "Repaid" },
    { user: "Mike Johnson", acc: "ACC003", asset: "Fixed Savings", value: 400000, locked: 350000, ltv: "85%", status: "Secured", loanStatus: "Defaulted" },
    { user: "Emma Davis", acc: "ACC005", asset: "Real Estate", value: 200000, locked: 225000, ltv: "60%", status: "Partial Release", loanStatus: "Overdue" }
  ];
const [search, setSearch] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({
    collateralStatus: "Collateral Status",
    assetType: "Asset Type",
    loanStatus: "Loan Status"
  });
const [openSub, setOpenSub] = useState(null);

const toggleSub = (key) => {
  setOpenSub(openSub === key ? null : key);
};

  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const [showLiquidation, setShowLiquidation] = useState(false);
  const [showAutoDebitModal, setShowAutoDebitModal] = useState(false);

  const modals = {
    LockCollateralModal,
    UnlockFullModal,
    UnlockRestructureModal,
    PartialReleaseModal,
    AssetLiquidationModal,
    MarkCompletionModal
  };

  useEffect(() => {
    const closeMenu = () => setActionMenuOpen(null);
    if (actionMenuOpen !== null) {
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [actionMenuOpen]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

const applyFilters = () => {
  let filtered = initialRows;

  if (filters.collateralStatus !== "Collateral Status") {
    filtered = filtered.filter(r => r.status === filters.collateralStatus);
  }

  if (filters.assetType !== "Asset Type") {
    filtered = filtered.filter(r => r.asset === filters.assetType);
  }

  if (filters.loanStatus !== "Loan Status") {
    filtered = filtered.filter(r => r.loanStatus === filters.loanStatus);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(r =>
      r.user.toLowerCase().includes(q) ||
      r.acc.toLowerCase().includes(q)
    );
  }

  setRows(filtered);
};

 const clearFilters = () => {
  setFilters({
    collateralStatus: "Collateral Status",
    assetType: "Asset Type",
    loanStatus: "Loan Status"
  });
  setSearch("");
  setRows(initialRows);
};

  if (showLiquidation) {
    return <CollateralLiquidationNotice onBack={() => setShowLiquidation(false)} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Collateral</h2>
        <div className={styles.rightBtns}>
          <button className={styles.exportBtn}>
            <img src={exportIcon} alt="" /> Export Reports
          </button>
          <button className={styles.alertBtn} onClick={() => setShowAutoDebitModal(true)}>
            Test Auto-Debit Alert
          </button>
          <button className={styles.liquidationBtn} onClick={() => setShowLiquidation(true)}>
            Test Liquidation Notice
          </button>
        </div>
      </div>
      <div className={styles.filters}>
        <input
  type="text"
  placeholder="Search by user name or ID"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <select name="collateralStatus" value={filters.collateralStatus} onChange={handleFilterChange}>
          <option>Collateral Status</option>
          <option>Locked</option>
          <option>Released</option>
          <option>Secured</option>
          <option>Partial Release</option>
        </select>
        <select name="assetType" value={filters.assetType} onChange={handleFilterChange}>
          <option>Asset Type</option>
          <option>Saving Vault</option>
          <option>Investment Portfolio</option>
          <option>Fixed Savings</option>
          <option>Real Estate</option>
        </select>
        <select name="loanStatus" value={filters.loanStatus} onChange={handleFilterChange}>
          <option>Loan Status</option>
          <option>Active</option>
          <option>Repaid</option>
          <option>Defaulted</option>
          <option>Overdue</option>
        </select>
        <button className={styles.applyBtn} onClick={applyFilters}>Apply Filters</button>
        <button className={styles.clearBtn} onClick={clearFilters}>Clear Filters</button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Asset Type</th>
              <th>Value</th>
              <th>Locked</th>
              <th>LTV</th>
              <th>Status</th>
              <th>Loan Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <strong>{row.user}</strong><br />
                  <span className={styles.acc}>{row.acc}</span>
                </td>
                <td>{row.asset}</td>
                <td>₦{row.value.toLocaleString()}</td>
                <td className={row.status === "Released" ? styles.green : styles.red}>
                  ₦{row.locked.toLocaleString()}
                </td>
                <td>{row.ltv}</td>
                <td>
                  <span className={`${styles.badge} ${styles[row.status.replace(" ", "").toLowerCase()]}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <span className={`${styles.badgeStatus} ${styles[row.loanStatus.replace(" ", "").toLowerCase()]}`}>
                    {row.loanStatus}
                  </span>
                </td>
                <td className={styles.tableCellRelative}>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionMenuOpen(actionMenuOpen === i ? null : i);
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                 {actionMenuOpen === i && (
  <div className={styles.fixedActionMenu}>
    <button onClick={() => setSelectedAction({ loan: row, modal: "LockCollateralModal" })}>
      Lock collateral on loan disbursement
    </button>
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownRow}>
        <span>Unlock collateral after</span>
      <span
  className={styles.arrow}
  onClick={(e) => {
    e.stopPropagation();
    toggleSub("unlock");
  }}
>
  ▾
</span>

      </div>
   {openSub === "unlock" && (
  <div className={styles.subMenu}>

        <button onClick={() => setSelectedAction({ loan: row, modal: "UnlockFullModal" })}>
          <span className={styles.circle}></span>
          Full repayment
        </button>
        <button onClick={() => setSelectedAction({ loan: row, modal: "UnlockRestructureModal" })}>
          <span className={styles.circle}></span>
          Restructuring
        </button>
      </div>
  )}
    </div>

    <button onClick={() => setSelectedAction({ loan: row, modal: "PartialReleaseModal" })}>
      Partial release of collateral
    </button>

    <button onClick={() => setSelectedAction({ loan: row, modal: "AssetLiquidationModal" })}>
      Initiate collateral enforcement (set off)
    </button>

    <button onClick={() => setSelectedAction({ loan: row, modal: "AssetLiquidationModal" })}>
      Record enforcement (set off) amount
    </button>

    {/* Completion dropdown */}
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownRow}>
        <span>Mark enforcement (set off) completion</span>
<span
  className={styles.arrow}
  onClick={(e) => {
    e.stopPropagation();
    toggleSub("unlock");
  }}
>
  ▾
</span>
      </div>
{openSub === "unlock" && (
  <div className={styles.subMenu}>

        <button onClick={() => setSelectedAction({ loan: row, modal: "MarkCompletionModal" })}>
          <span className={styles.circle}></span>
          Confirm completion
        </button>
      </div>
)}
    </div>

  </div>
)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAutoDebitModal && <AutoDebitFailedModal onClose={() => setShowAutoDebitModal(false)} />}

      {selectedAction && (() => {
        const Modal = modals[selectedAction.modal];
        return <Modal loan={selectedAction.loan} onClose={() => setSelectedAction(null)} />;
      })()}
    </div>
  );
}
// reports tab
function ReportsTab() {
  return (
    <div className={styles.reportsContainer}>

      <div className={styles.reportsHeader}>
        <h2>Loan Reports & Analytics</h2>

        <div className={styles.reportsActions}>
          <select className={styles.reportSelect}>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>

          <button className={styles.exportBtn}>
            <img src={exportIcon} alt="export" />
            Export PDF
          </button>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <p>Total Disbursed</p>
          <h3>283 M</h3>
          <span className={styles.blueText}>+12.5% from last month</span>
        </div>

        <div className={styles.metricCard}>
          <p>Total Repaid</p>
          <h3>215 M</h3>
          <span className={styles.greenText}>+12.3% from last month</span>
        </div>

        <div className={styles.metricCard}>
          <p>Portfolio at Risk</p>
          <h3>8.5%</h3>
          <span className={styles.redText}>0.83% from last month</span>
        </div>

        <div className={styles.metricCard}>
          <p>Total Customers</p>
          <h3>1,247</h3>
          <span className={styles.blueText}>+156 this month</span>
        </div>
      </div>

      <div className={styles.chartsGrid}>

        <div className={styles.chartBox}>
          <h4>Loan Performance Trends</h4>
            <LoanBarChart />
        </div>

        <div className={styles.chartBox}>
          <h4>Portfolio Composition</h4>
            <LoanPieChart />
        </div>

        <div className={styles.chartBox}>
          <h4>Repayment Rate Trend</h4>
          <div style={{ height: "180px" }}>
  <LoanLineChart />
</div>

        </div>

        <div className={styles.chartBox}>
          <h4>Risk Distribution</h4>

          <div className={styles.riskRow}>
            <p>Low Risk</p>
            <span>55%</span>
          </div>

          <div className={styles.riskRow}>
            <p>Medium Risk</p>
            <span>40%</span>
          </div>

          <div className={styles.riskRow}>
            <p>High Risk</p>
            <span>5%</span>
          </div>
        </div>

      </div>

      <div className={styles.bottomGrid}>

        <div className={styles.bottomCard}>
          <h4>Key Financial Metrics</h4>
          <p>Default Rate <span>3.2%</span></p>
          <p>Average Loan Size <span>450,000</span></p>
          <p>Interest Income <span>28.4M</span></p>
          <p>Outstanding Balance <span>68M</span></p>
        </div>

        <div className={styles.bottomCard}>
          <h4>This Month Summary</h4>
          <p>New Loans <span>89</span></p>
          <p>Completed Repayment <span>156</span></p>
          <p>New Default <span>7</span></p>
        </div>

        <div className={styles.bottomCard}>
          <h4>Portfolio Health</h4>
          <p>Healthy Loans <span>92.1%</span></p>
          <p>At Risk Loans <span>5.4%</span></p>
          <p>Defaulted Loans <span>2.5%</span></p>
        </div>

        <div className={styles.bottomCard}>
          <h4>Revenue Performance</h4>
          <p>Interest Revenue <span>2.4%</span></p>
          <p>Fee Income <span>480k</span></p>
          <p>Total Revenue <span>2.68M</span></p>
        </div>

      </div>

    </div>
  );
}


export default function LoansPage() {

  const [activeTab, setActiveTab] = useState("Loans Queue");

 
const tabs = {
  "Loans Queue": <LoansQueueTab setActiveTab={setActiveTab} />,
  Review: <ReviewTab setActiveTab={setActiveTab} />,
"Loan List": <LoanListTab setActiveTab={setActiveTab} />,
  Setting: <SettingTab />,
  "Default Management": <DefaultManagementTab />,
  Collateral: <CollateralTab  setActiveTab={setActiveTab} />,
  Reports: <ReportsTab />
};


  return (
    <div className={styles.container}>

      <div className={styles.subNav}>
        {Object.keys(tabs).map((tab) => (
          <div
            key={tab}
            className={activeTab === tab ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
}
