import React, { useState, useEffect } from "react";
import styles from "../css/LoansQueue.module.css";
import CriticalActionModal from "../components/CriticalActionModal";
import CollateralLiquidationNotice from "../components/CollateralLiquidationNotice";
import AutoDebitFailedModal from "../components/AutoDebitFailedModal";

import { LoanBarChart, LoanPieChart, LoanLineChart } from  "../components/ReportCharts";

import eyeIcon from "../assets/eye.png";
import tickIcon from "../assets/tick.png";
import crossIcon from "../assets/cross.png";
import exportIcon from "../assets/export.png";


function LoansQueueTab() {
  const initialRows = [
    { user: "John Doe", amount: 500000, collateral: "Savings Vault", ltv: "80%", status: "Pending", fullActions: true, date: "2025-12-01", accountId: "JD123" },
    { user: "Jahn Smith", amount: 500000, collateral: "T-Bills", ltv: "60%", status: "Under Review", fullActions: false, date: "2025-12-02", accountId: "JS456" },
    { user: "Mike Johnson", amount: 750000, collateral: "Fixed Savings", ltv: "85%", status: "Approved", fullActions: false, date: "2025-12-03", accountId: "MJ789" },
    { user: "Sarah Wilson", amount: 500000, collateral: "Fixed Savings", ltv: "70%", status: "Approved", fullActions: true, date: "2025-12-04", accountId: "SW101" }
  ];

  const [rows, setRows] = useState(initialRows);
 const [filters, setFilters] = useState({
  user: "",
  minAmount: "",
  collateral: "All Product",
  status: "Status"
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
 const applyFilters = () => {
  let filtered = initialRows;
  if (filters.minAmount !== "") {
    filtered = filtered.filter(
      r => r.amount >= Number(filters.minAmount)
    );
  }
  if (filters.user) {
    filtered = filtered.filter(r =>
      r.user.toLowerCase().includes(filters.user.toLowerCase())
    );
  }
  if (filters.collateral !== "All Product") {
    filtered = filtered.filter(
      r => r.collateral === filters.collateral
    );
  }
  if (filters.status !== "Status") {
    filtered = filtered.filter(
      r => r.status === filters.status
    );
  }
  setRows(filtered);
};

 const clearFilters = () => {
  setFilters({
    user: "",
    minAmount: "",
    collateral: "All Product",
    status: "Status"
  });
  setRows(initialRows);
};
// loan queue tab
  const [showCriticalModal, setShowCriticalModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const openModal = (loan) => {
    setSelectedLoan(loan);
    setShowCriticalModal(true);
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
                    <img src={eyeIcon} alt="view" />
                    {r.fullActions && <img src={tickIcon} alt="approve" />}
                    {r.fullActions && <img src={crossIcon} alt="reject" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCriticalModal && selectedLoan && (
        <CriticalActionModal
          isOpen={showCriticalModal}
          onClose={() => setShowCriticalModal(false)}
          loan={selectedLoan}
        />
      )}
    </>
  );
}
// review tab

 function ReviewTab({ setActiveTab }) {
  return (
    <div className={styles.reviewTab}>
      <div className={styles.topHeader}>
        <button className={styles.backBtn} onClick={() => setActiveTab("Loans Queue")}>
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
          <p><strong>Name:</strong> John Smith</p>
          <p><strong>Account:</strong> ACC001</p>
          <p><strong>Email:</strong> John.doi@gmail.com</p>
          <p><strong>Phone:</strong> +234 801234</p>
        </div>
      </section>
      <section className={styles.box}>
        <h3 className={styles.boxTitle}>Loans Detail</h3>
        <div className={styles.grid2}>
          <p><strong>Loan Amount:</strong> 500,000</p>
          <p><strong>Purpose:</strong> Business Expansion</p>
          <p><strong>Collateral:</strong> Saving Vault</p>
          <p><strong>LTV Ratio:</strong> 80%</p>
        </div>
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
        <div className={styles.card} style={{height: "300px"}}>
          <h4>KYC Verified</h4>
          <span className={styles.verified}>Verified</span>
          <p className={styles.smallText}>
            <strong>Documents Verified:</strong><br />
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
          <button className={styles.btnGreen}>Approve Loan</button>
          <button className={styles.btnRed}>Reject Application</button>
          <button className={styles.btnGrey}>Request Additional Info</button>
        </div>
      </div>
    </div>
  );
}

function LoanListTab() {
  const initialRows = [
    { user: "John Doe", amount: 500000, balance: 350000, status: "Active", rate: "15.5%", maturity: "7/1/2025" },
    { user: "Jahn Smith", amount: 500000, balance: 0, status: "Repaid", rate: "12%", maturity: "8/15/2024" },
    { user: "Mike Johnson", amount: 750000, balance: 800000, status: "Overdue", rate: "85%", maturity: "6/1/2025" },
    { user: "Sarah Wilson", amount: 500000, balance: 180000, status: "Defaulted", rate: "20% 70%", maturity: "6/2/2024" }
  ];

  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({
    user: "",
    minAmount: "",
    date: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
 const applyFilters = () => {
  let filtered = initialRows;

  if (filters.user) {
    filtered = filtered.filter(r =>
      r.user.toLowerCase().includes(filters.user.toLowerCase())
    );
  }
  if (filters.minAmount !== "") {
    filtered = filtered.filter(r => r.amount >= Number(filters.minAmount));
  }
  if (filters.date) {
    filtered = filtered.filter(r => {
      const [month, day, year] = r.maturity.split("/"); // "7/1/2025"
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
  return (
    <>
      <div className={styles.topBar}>
        <h2>All Loans - Master List</h2>
        <button className={styles.exportBtn}>
          <img src={eyeIcon} alt="export" />
          Export Reports
        </button>
      </div>
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
              <th>User</th>
              <th>Amount</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Rate</th>
              <th>Maturity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.user}</td>
                <td>₦ {row.amount.toLocaleString()}</td>
                <td>₦ {row.balance.toLocaleString()}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      row.status === "Active"
                        ? styles.active
                        : row.status === "Repaid"
                        ? styles.repaid
                        : row.status === "Overdue"
                        ? styles.overdue
                        : styles.defaulted
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>{row.rate}</td>
                <td>{row.maturity}</td>
                <td>
                  <div className={styles.actionIcon}>
                    <img src={eyeIcon} alt="view" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SettingTab() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    amountRange: "",
    tenorRange: "",
    interestRate: "",
    maxLTV: "",
    globalInterestRate: { base: "", max: "", min: "" },
    ltvSetting: { conservative: "", standard: "", highest: "" },
    penaltySetting: { penalty: "", defaultCharge: "", overdue: "" },
    tenorSetting: { min: "", max: "", step: "" }
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("loanProducts");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // Save to localStorage
  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("loanProducts", JSON.stringify(updated));
  };

  const openModal = (index = null) => {
    if (index !== null) {
      setNewProduct(products[index]);
      setEditingIndex(index);
    } else {
      setNewProduct({
        name: "",
        amountRange: "",
        tenorRange: "",
        interestRate: "",
        maxLTV: "",
        globalInterestRate: { base: "", max: "", min: "" },
        ltvSetting: { conservative: "", standard: "", highest: "" },
        penaltySetting: { penalty: "", defaultCharge: "", overdue: "" },
        tenorSetting: { min: "", max: "", step: "" }
      });
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
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = newProduct;
      saveProducts(updated);
    } else {
      saveProducts([...products, newProduct]);
    }
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Loan Setting & Configuration</h2>
        <button className={styles.exportBtn}>
          <img src={exportIcon} alt="export" />
          Export Reports
        </button>
      </div>

      <div style={{ border: "1px solid #246DAF", borderRadius: "10px", padding: "6px 10px", paddingBottom: "0%" }}>
        <h3 className={styles.sectionTitle}>Loan Product Configuration</h3>
 <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Personal Loan-Bronze</h4>
          <button className={styles.editBtn}>Edit</button>
        </div>

        <div className={styles.cardGrid}>
          <p><strong>Amount Range:</strong> 50,000 - 500,000</p>
          <p><strong>Tenor Range:</strong> 3 - 12 months</p>
          <p><strong>Interest Rate:</strong> 15.5% per annum</p>
          <p><strong>MAX LTV:</strong> 70%</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Personal Loan-Silver</h4>
          <button className={styles.editBtn}>Edit</button>
        </div>

        <div className={styles.cardGrid}>
          <p><strong>Amount Range:</strong> 100,000 - 1,000,000</p>
          <p><strong>Tenor Range:</strong> 6 - 18 months</p>
          <p><strong>Interest Rate:</strong> 15.5% per annum</p>
          <p><strong>MAX LTV:</strong> 75%</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Personal Loan-Gold</h4>
          <button className={styles.editBtn}>Edit</button>
        </div>

        <div className={styles.cardGrid}>
          <p><strong>Amount Range:</strong> 500,000 - 5,000,000</p>
          <p><strong>Tenor Range:</strong> 12 - 36 months</p>
          <p><strong>Interest Rate:</strong> 12% per annum</p>
          <p><strong>MAX LTV:</strong> 80%</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Personal Loan-Platinum</h4>
          <button className={styles.editBtn}>Edit</button>
        </div>

        <div className={styles.cardGrid}>
          <p><strong>Amount Range:</strong> 1,000,000 - 10,000,000</p>
          <p><strong>Tenor Range:</strong> 12 - 60 months</p>
          <p><strong>Interest Rate:</strong> 9.5% per annum</p>
          <p><strong>MAX LTV:</strong> 85%</p>
        </div>
      </div>

        {products.map((p, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardHeader}>
              <h4>{p.name}</h4>
              <button className={styles.editBtn} onClick={() => openModal(i)}>Edit</button>
            </div>
            <div className={styles.cardGrid}>
              <p><strong>Amount Range:</strong> {p.amountRange}</p>
              <p><strong>Tenor Range:</strong> {p.tenorRange}</p>
              <p><strong>Interest Rate:</strong> {p.interestRate}</p>
              <p><strong>MAX LTV:</strong> {p.maxLTV}</p>
            </div>
          </div>
        ))}

        <button className={styles.addProductBtn} onClick={() => openModal()}>Add New Loan Product</button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{editingIndex !== null ? "Edit Loan Product" : "Add New Loan Product"}</h3>

            <input
              placeholder="Loan Product Name"
              value={newProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              placeholder="Amount Range"
              value={newProduct.amountRange}
              onChange={(e) => handleChange("amountRange", e.target.value)}
            />
            <input
              placeholder="Tenor Range"
              value={newProduct.tenorRange}
              onChange={(e) => handleChange("tenorRange", e.target.value)}
            />
            <input
              placeholder="Interest Rate"
              value={newProduct.interestRate}
              onChange={(e) => handleChange("interestRate", e.target.value)}
            />
            <input
              placeholder="Max LTV"
              value={newProduct.maxLTV}
              onChange={(e) => handleChange("maxLTV", e.target.value)}
            />

            <h4>Global Interest Rate Setting</h4>
            <input
              placeholder="Base Rate (%)"
              value={newProduct.globalInterestRate.base}
              onChange={(e) => handleChange("base", e.target.value, "globalInterestRate")}
            />
            <input
              placeholder="Max Rate (%)"
              value={newProduct.globalInterestRate.max}
              onChange={(e) => handleChange("max", e.target.value, "globalInterestRate")}
            />
            <input
              placeholder="Min Rate (%)"
              value={newProduct.globalInterestRate.min}
              onChange={(e) => handleChange("min", e.target.value, "globalInterestRate")}
            />

            <h4>LTV Ratio Setting</h4>
            <input
              placeholder="Conservative LTV (%)"
              value={newProduct.ltvSetting.conservative}
              onChange={(e) => handleChange("conservative", e.target.value, "ltvSetting")}
            />
            <input
              placeholder="Standard LTV (%)"
              value={newProduct.ltvSetting.standard}
              onChange={(e) => handleChange("standard", e.target.value, "ltvSetting")}
            />
            <input
              placeholder="Highest LTV (%)"
              value={newProduct.ltvSetting.highest}
              onChange={(e) => handleChange("highest", e.target.value, "ltvSetting")}
            />

            <h4>Penalty & Default Setting</h4>
            <input
              placeholder="Penalty Rate (%)"
              value={newProduct.penaltySetting.penalty}
              onChange={(e) => handleChange("penalty", e.target.value, "penaltySetting")}
            />
            <input
              placeholder="Default Charge (%)"
              value={newProduct.penaltySetting.defaultCharge}
              onChange={(e) => handleChange("defaultCharge", e.target.value, "penaltySetting")}
            />
            <input
              placeholder="Overdue Interest (%)"
              value={newProduct.penaltySetting.overdue}
              onChange={(e) => handleChange("overdue", e.target.value, "penaltySetting")}
            />

            <h4>Tenor Setting</h4>
            <input
              placeholder="Min Tenor (Months)"
              value={newProduct.tenorSetting.min}
              onChange={(e) => handleChange("min", e.target.value, "tenorSetting")}
            />
            <input
              placeholder="Max Tenor (Months)"
              value={newProduct.tenorSetting.max}
              onChange={(e) => handleChange("max", e.target.value, "tenorSetting")}
            />
            <input
              placeholder="Interval Step (Months)"
              value={newProduct.tenorSetting.step}
              onChange={(e) => handleChange("step", e.target.value, "tenorSetting")}
            />

            <div className={styles.modalButtons}>
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

  const initialRows = [
    { user: "Emma Devis", acc: "ACC006", outstanding: 180000, days: 45, risk: "High", status: "In Progress", collateral: "Savings Vault", collateralValue: 150000 },
    { user: "Michael Brown", acc: "ACC007", outstanding: 320000, days: 90, risk: "Critical", status: "Legal Action", collateral: "Fixed Saving", collateralValue: 280000 },
    { user: "Lisa Wilson", acc: "ACC008", outstanding: 95000, days: 15, risk: "Medium", status: "Initial", collateral: "Investment Portfolio", collateralValue: 120000 },
    { user: "Robert Johnson", acc: "ACC008", outstanding: 450000, days: 120, risk: "Critical", status: "Write-off", collateral: "Real Estate", collateralValue: 800000 }
  ];

  const [rows, setRows] = useState(initialRows);

  const applyFilters = () => {
    let filtered = initialRows;

    if (risk !== "Risk Level") {
      filtered = filtered.filter(r => r.risk === risk);
    }

    if (recovery !== "Recovery Status") {
      filtered = filtered.filter(r => r.status === recovery);
    }

    setRows(filtered);
  };

  const clearFilters = () => {
    setRisk("Risk Level");
    setRecovery("Recovery Status");
    setRows(initialRows);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Default Management Dashboard</h2>

      <div className={styles.filterRow}>
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
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <strong>{row.user}</strong>
                  <br />
                  <span className={styles.acc}>{row.acc}</span>
                </td>
                <td>₦{row.outstanding.toLocaleString()}</td>
                <td>{row.days} days</td>
                <td>
                  <span className={`${styles.badge} ${styles[row.risk.toLowerCase()]}`}>
                    {row.risk}
                  </span>
                </td>
                <td>
                  <span className={`${styles.badgeStatus} ${styles[row.status.replace(" ", "").toLowerCase()]}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  {row.collateral}
                  <br />
                  <span className={styles.collateralValue}>
                    ₦{row.collateralValue.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// collateral
function CollateralTab() {
  const [filters, setFilters] = useState({
    collateralStatus: "Collateral Status",
    assetType: "Asset Type",
    loanStatus: "Loan Status"
  });

  const initialRows = [
  { user: "Jhon Doi", acc: "ACC001", asset: "Saving Vault", value: 625000, locked: 500000, ltv: "80%", status: "Locked", loanStatus: "Active" },
  { user: "Sarah Wilson", acc: "ACC004", asset: "Investment Portfolio", value: 1200000, locked: 875000, ltv: "70%", status: "Released", loanStatus: "Repaid" },
  { user: "Mike Johnson", acc: "ACC003", asset: "Fixed Savings", value: 400000, locked: 350000, ltv: "85%", status: "Secured", loanStatus: "Defaulted" },
  { user: "Emma Davis", acc: "ACC005", asset: "Real Estate", value: 200000, locked: 225000, ltv: "60%", status: "Partial Release", loanStatus: "Overdue" }
];

const [showLiquidation, setShowLiquidation] = useState(false);
const [rows, setRows] = useState(initialRows);
const [showAutoDebitModal, setShowAutoDebitModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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

  setRows(filtered);
};

const clearFilters = () => {
  setFilters({
    collateralStatus: "Collateral Status",
    assetType: "Asset Type",
    loanStatus: "Loan Status"
  });
  setRows(initialRows);
};

if (showLiquidation) {
  return (
    <CollateralLiquidationNotice
      onBack={() => setShowLiquidation(false)}
    />
  );
}

  return (
    <div className={styles.container}>

      <div className={styles.topBar}>
        <h2>Collateral</h2>

        <div className={styles.rightBtns}>
          <button className={styles.exportBtn}>
            <img src={exportIcon} alt="" /> Export Reports
          </button>
<button
  className={styles.alertBtn}
  onClick={() => setShowAutoDebitModal(true)}
>
  Test Auto-Debit Alert
</button>
    <button
  className={styles.liquidationBtn}
  onClick={() => setShowLiquidation(true)}
>
  Test Liquidation Notice
</button>
        </div>
      </div>
      <div className={styles.filters}>
        <select name="collateralStatus" value={filters.collateralStatus} onChange={handleChange}>
          <option>Collateral Status</option>
          <option>Locked</option>
          <option>Released</option>
          <option>Secured</option>
          <option>Partial Release</option>
        </select>

        <select name="assetType" value={filters.assetType} onChange={handleChange}>
          <option>Asset Type</option>
          <option>Saving Vault</option>
          <option>Investment Portfolio</option>
          <option>Fixed Savings</option>
          <option>Real Estate</option>
        </select>

        <select name="loanStatus" value={filters.loanStatus} onChange={handleChange}>
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
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <strong>{row.user}</strong>
                  <br />
                  <span className={styles.acc}>{row.acc}</span>
                </td>

                <td>{row.asset}</td>
                <td>{row.value}</td>

                <td className={row.status === "Released" ? styles.green : styles.red}>
                  {row.locked}
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

                <td>
                  <button className={styles.actionBtn}>⋮</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
{showAutoDebitModal && (
  <AutoDebitFailedModal
    onClose={() => setShowAutoDebitModal(false)}
  />
)}
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
  "Loan List": <LoanListTab />,
  Setting: <SettingTab />,
  "Default Management": <DefaultManagementTab />,
  Collateral: <CollateralTab />,
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
