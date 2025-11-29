import { useState } from "react";
import styles from "../css/KYCManagement.module.css";
import { MdAdminPanelSettings } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import KYCModal from "../components/KYCModal";

export default function KYCManagement() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (userData) => {
    setSelectedUser(userData);
    setOpenModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerBox}>
        <h2 className={styles.headerTitle}>Welcome back</h2>
        <h1 className={styles.headerAdmin}>Admin, John Doe</h1>
        <p className={styles.headerSub}>
          Manage your investments, savings and Loans
        </p>
      </div>

      <div className={styles.kycHeaderControls}>
        <div className={styles.sendReminderToggle}>
          <span>Send Reminder</span>
          <label className={styles.toggleSwitch}>
            <input type="checkbox" />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
      </div>

      <div className={styles.contentPanel}>
        <div className={styles.kycPanelHeader}>
          <h3 className={styles.panelTitle}>KYC Management</h3>
          <div className={styles.kycHeaderActions}>
            <div className={styles.searchBar}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search users..."
              />
            </div>
            <button className={styles.btnOverride}>Override Log</button>
          </div>
        </div>

        <div className={styles.kycTableContainer}>
          <table className={styles.kycTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {/* ---------- John Doe ---------- */}
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>John Doe</div>
                    <div className={styles.userEmail}>John@example.com</div>
                  </div>
                </td>
                <td>Individual</td>
                <td>2025-01-14</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                    Pending
                  </span>
                </td>
                <td>
                  <button
                    className={styles.btnViewDetail}
                    onClick={() =>
                      handleView({
                        name: "John Doe",
                        email: "john@example.com",
                        type: "Individual",
                        phone: "+234-001-234-5678",
                        userId: "USR001",
                        submitted: "2025-01-14",
                        trn: "98764322-0001",
                        address: "4 Victoria Island, Lagos State, Nigeria",
                        status: "Pending",
                        netWorth: "$250,000",
                        incomeSources: "Salary, Business Income, Investments",
                        investmentPurpose: "Long-term wealth building",
                      })
                    }
                  >
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ---------- ABC Holdings ---------- */}
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>ABC Holdings</div>
                    <div className={styles.userEmail}>Admin@abc.com</div>
                  </div>
                </td>
                <td>Business</td>
                <td>2025-01-13</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${styles.statusUnderReview}`}
                  >
                    Under Review
                  </span>
                </td>
                <td>
                  <button
                    className={styles.btnViewDetail}
                    onClick={() =>
                      handleView({
                        name: "ABC Holdings",
                        email: "Admin@abc.com",
                        type: "Business",
                        phone: "+234-111-222-3333",
                        userId: "BUS002",
                        submitted: "2025-01-13",
                        trn: "8822331122-002",
                        address: "Lekki Phase 1, Lagos, Nigeria",
                        status: "Under Review",
                        netWorth: "$5,200,000",
                        incomeSources: "Corporate Revenue, Investments",
                        investmentPurpose: "Business expansion",
                      })
                    }
                  >
                    View Detail
                  </button>
                </td>
              </tr>

              {/* ---------- Jane Smith ---------- */}
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>Jane Smith</div>
                    <div className={styles.userEmail}>Jane@example.com</div>
                  </div>
                </td>
                <td>Individual</td>
                <td>2025-01-15</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${styles.statusApproved}`}
                  >
                    Approved
                  </span>
                </td>
                <td>
                  <button
                    className={styles.btnViewDetail}
                    onClick={() =>
                      handleView({
                        name: "Jane Smith",
                        email: "jane@example.com",
                        type: "Individual",
                        phone: "+234-555-444-3333",
                        userId: "USR003",
                        submitted: "2025-01-15",
                        trn: "11220045-0003",
                        address: "Abuja Central District, Nigeria",
                        status: "Approved",
                        netWorth: "$780,000",
                        incomeSources: "Salary, Real Estate",
                        investmentPurpose: "Retirement planning",
                      })
                    }
                  >
                    View Detail
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.adminBox}>
        <div className={styles.adminIconTitle}>
          <MdAdminPanelSettings className={styles.adminIcon} />
          <h3 className={styles.panelTitle}>
            Admin Restrictions for Incomplete KYC Settings
          </h3>
        </div>

        <div className={styles.restrictionsGrid}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Block Wallet Withdrawals
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Block New Transactions (Investments, Loans,
            Savings)
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Show KYC Reminder on Login
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Redirect all financial operations to KYC
            completion page
          </label>
        </div>
      </div>

      <KYCModal open={openModal} onClose={() => setOpenModal(false)} user={selectedUser} />
    </div>
  );
}
