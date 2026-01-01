import { useState, useEffect } from "react";
import styles from "../css/KYCManagement.module.css";
import { MdAdminPanelSettings } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import KYCModal from "../components/KYCModal";
import exportIcon from "../assets/export.png";
import KYCBusinessModal from "../components/KYCBusinessModal";
import OverrideLogModal from "../components/OverrideLogModal";

export default function KYCManagement() {
  const LOCAL_KEY = "kyc_ui_data";

  const statusClassMap = {
    "Pending": "statusPending",
    "Under Review": "statusUnderReview",
    "Approved": "statusApproved",
  };

  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      type: "Individual",
      phone: "+234-001-234-5678",
      userId: "USR001",
      submitted: "2025-01-14",
      trn: "98764322-0001",
      address: "4 Victoria Island, Lagos State, Nigeria",
      status: "Pending",
    },
    {
      name: "ABC Holdings",
      email: "Admin@abc.com",
      type: "Business",
      phone: "+234-111-222-3333",
      userId: "BUS002",
      submitted: "2025-01-13",
      trn: "8822331122-002",
      address: "Lekki Phase 1, Lagos, Nigeria",
      status: "Under Review",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      type: "Individual",
      phone: "+234-555-444-3333",
      userId: "USR003",
      submitted: "2025-01-15",
      trn: "11220045-0003",
      address: "Abuja, Nigeria",
      status: "Approved",
    },
  ]);

  // 🔹 State declarations first
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [openModal, setOpenModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showOverrideLog, setShowOverrideLog] = useState(false);
  const [overrideSearch, setOverrideSearch] = useState("");
  const [selectedOverrideLog, setSelectedOverrideLog] = useState(null);

  const filteredUsers = users.filter((u) => {
    const searchValue = search.toLowerCase();
    const submittedDate = new Date(u.submitted);

    const searchMatch =
      u.name.toLowerCase().includes(searchValue) ||
      u.email.toLowerCase().includes(searchValue) ||
      u.userId.toLowerCase().includes(searchValue);

    const statusMatch = statusFilter === "All" || u.status === statusFilter;
    const typeMatch = typeFilter === "All" || u.type === typeFilter;
    const fromMatch = !dateFrom || submittedDate >= new Date(dateFrom);
    const toMatch = !dateTo || submittedDate <= new Date(dateTo);

    return searchMatch && statusMatch && typeMatch && fromMatch && toMatch;
  });

  const overrideLogs = [
    {
      time: "2025-01-19",
      user: "John Doe",
      admin: "Admin Sarah",
      action: "Status Updated",
      change: "Pending → Approved",
      reason: "Manual review completed",
    },
    {
      time: "2025-01-18",
      user: "ABC Holdings",
      admin: "Admin Mark",
      action: "TRN Correction",
      change: "TRN updated",
      reason: "Corrected mismatch",
    },
    {
      time: "2025-01-17",
      user: "Jane Smith",
      admin: "Admin Sarah",
      action: "Status Updated",
      change: "Under Review → Approved",
      reason: "Verified documentation",
    },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    const upd = users.map((u) => saved[u.userId] || u);
    setUsers(upd);
  }, []);

  const handleView = (user) => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    const realUser = saved[user.userId] || user;
    setSelectedUser(realUser);

    if (user.type === "Business") setOpenModal("business");
    else setOpenModal("individual");
  };

  const handleSave = (updatedUser) => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    saved[updatedUser.userId] = updatedUser;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(saved));

    setUsers((prev) =>
      prev.map((u) => (u.userId === updatedUser.userId ? updatedUser : u))
    );
  };

  const handleExport = () => {
    if (!filteredUsers.length) return;

    const header = ["Name", "User ID", "Type", "Submitted", "Status", "Email"];
    const csvRows = [
      header.join(","),
      ...filteredUsers.map((u) =>
        [u.name, u.userId, u.type, u.submitted, u.status, u.email].join(",")
      ),
    ];

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kyc_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const AdminPanel = () => (
    <div className={styles.adminBox}>
      <div className={styles.adminIconTitle}>
        <MdAdminPanelSettings className={styles.adminIcon} />
        <h3 className={styles.panelTitle}>
          Admin Restrictions for Incomplete KYC Settings
        </h3>
      </div>

      <div className={styles.restrictionsGrid}>
        <label><input type="checkbox" /> Block Wallet Withdrawals</label>
        <label><input type="checkbox" /> Block New Transactions (Investments, Loans, Savings)</label>
        <label><input type="checkbox" /> Show KYC Reminder on login</label>
        <label><input type="checkbox" /> Redirect all Financial operations to KYC completion page</label>
      </div>
    </div>
  );

  const filteredOverrideLogs = overrideLogs.filter((log) =>
    log.user.toLowerCase().includes(overrideSearch.toLowerCase()) ||
    log.admin.toLowerCase().includes(overrideSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(overrideSearch.toLowerCase())
  );

  if (showOverrideLog) {
    return (
      <div className={styles.wrapper}>
        {/* Override Log view */}
        <div className={styles.overrideHeaderTop}>
          <button className={styles.btnBack} onClick={() => setShowOverrideLog(false)}>
            ← Back to Queue
          </button>
        </div>

        <div className={styles.overrideHeader}>
          <h2 className={styles.overrideTitle}>KYC Management Override Log</h2>

          <div className={styles.searchBarOverride}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search users, admin ..."
              value={overrideSearch}
              onChange={(e) => setOverrideSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.overrideTableContainer}>
          <table className={styles.overrideTable}>
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Change</th>
                <th>Reason</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredOverrideLogs.map((log, i) => (
                <tr key={i}>
                  <td>{log.time}</td>
                  <td>{log.user}</td>
                  <td>{log.admin}</td>
                  <td>
                    <button
                      className={styles.btnViewDetailSmall}
                      style={{
                        color: "#264DAF",
                        border: "1px solid #264DAF",
                        backgroundColor: "white",
                        padding: "4px 8px",
                        borderRadius: "6px"
                      }}
                    >
                      {log.action}
                    </button>
                  </td>
                  <td>{log.change}</td>
                  <td>{log.reason}</td>
                  <td>
                    <button
                      className={styles.btnViewDetail}
                      onClick={() => setSelectedOverrideLog(log)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOverrideLog && (
            <OverrideLogModal
              log={selectedOverrideLog}
              onClose={() => setSelectedOverrideLog(null)}
            />
          )}
        </div>

        <AdminPanel />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentPanel}>
        <div className={styles.kycPanelHeader}>
          <div className={styles.reminderRow}>
            <span className={styles.reminderText}>Send Reminder</span>
            <label className={styles.toggleWrapper}>
              <input type="checkbox" className={styles.toggleInput} />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <h3 style={{fontSize: "24px"}}>KYC Management</h3>

          <div className={styles.kycHeaderActions}>
            <div className={styles.searchBar}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.filterRow}>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
              </select>

              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
<button className={styles.exportBtn}>
            <img src={exportIcon} alt="export" /> Export Reports
          </button>

            <button className={styles.btnOverride} onClick={() => setShowOverrideLog(true)}>
              Override Log
            </button>
          </div>
        </div>

        <div className={styles.kycTableContainer}>
          <table className={styles.kycTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>User ID</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </td>
                  <td>{user.userId}</td>
                  <td>{user.type}</td>
                  <td>{user.submitted}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles[statusClassMap[user.status]]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.btnViewDetail} onClick={() => handleView(user)}>
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminPanel />

      {openModal && selectedUser && (
        openModal === "individual" ? (
          <KYCModal open={true} user={selectedUser} onClose={() => setOpenModal(null)} onSave={handleSave} />
        ) : (
          <KYCBusinessModal open={true} user={selectedUser} onClose={() => setOpenModal(null)} onSave={handleSave} />
        )
      )}
    </div>
  );
}
