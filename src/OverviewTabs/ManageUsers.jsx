import React, { useState, useMemo } from "react";
import styles from "../css/ManageUsers.module.css";
import KPICards from "../components/KPICards";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import DataTable from "../components/DataTable/DataTables";
import CustomModal from "../components/CustomModal/CustomModal";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import Toast from "../components/Toast/Toast";
import { ArrowLeftIcon, UploadIcon, Loader2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const ManageUsers = () => {
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);

  const handleBack = () => navigate(-1);

  // Generate unique user IDs
  const generateUserId = (index) => {
    return `USR${String(index + 1).padStart(6, '0')}`;
  };

  const [users, setUsers] = useState([
    {
      id: generateUserId(0),
      name: "John Doi",
      email: "john.doi@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-15",
      lastLogin: "2025-01-15",
      wallet: "₦125,000",
    },
    {
      id: generateUserId(1),
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      type: "Business",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-02-20",
      lastLogin: "2024-08-31",
      wallet: "₦50,000",
    },
    {
      id: generateUserId(2),
      name: "Mike Jhon",
      email: "mike.jhon@gmail.com",
      type: "Individual",
      kyc: "Rejected",
      accountStatus: "Suspended",
      riskLevel: "High",
      dateCreated: "2024-03-10",
      lastLogin: "2024-08-30",
      wallet: "₦5,000",
    },
    {
      id: generateUserId(3),
      name: "Alice Brown",
      email: "alice.brown@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-25",
      lastLogin: "2025-02-10",
      wallet: "₦200,000",
    },
    {
      id: generateUserId(4),
      name: "Robert Green",
      email: "robert.green@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Frozen",
      riskLevel: "Medium",
      dateCreated: "2024-04-05",
      lastLogin: "2024-12-15",
      wallet: "₦75,000",
    },
    {
      id: generateUserId(5),
      name: "Emma White",
      email: "emma.white@gmail.com",
      type: "Business",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-05-12",
      lastLogin: "2024-11-20",
      wallet: "₦10,000",
    },
    {
      id: generateUserId(6),
      name: "David Black",
      email: "david.black@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-10",
      lastLogin: "2025-01-28",
      wallet: "₦300,000",
    },
    {
      id: generateUserId(7),
      name: "Sophia Gray",
      email: "sophia.gray@gmail.com",
      type: "Business",
      kyc: "Rejected",
      accountStatus: "Suspended",
      riskLevel: "High",
      dateCreated: "2024-06-18",
      lastLogin: "2024-10-05",
      wallet: "₦25,000",
    },
    {
      id: generateUserId(8),
      name: "James Blue",
      email: "james.blue@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Closed",
      riskLevel: "Medium",
      dateCreated: "2024-02-28",
      lastLogin: "2024-09-18",
      wallet: "₦7,500",
    },
    {
      id: generateUserId(9),
      name: "Olivia King",
      email: "olivia.king@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-05",
      lastLogin: "2025-03-01",
      wallet: "₦150,000",
    },
    {
      id: generateUserId(10),
      name: "Liam Scott",
      email: "liam.scott@gmail.com",
      type: "Individual",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-07-22",
      lastLogin: "2024-12-01",
      wallet: "₦60,000",
    },
    {
      id: generateUserId(11),
      name: "Mia Adams",
      email: "mia.adams@gmail.com",
      type: "Business",
      kyc: "Rejected",
      accountStatus: "Frozen",
      riskLevel: "High",
      dateCreated: "2024-03-15",
      lastLogin: "2024-08-25",
      wallet: "₦8,000",
    },
    {
      id: generateUserId(12),
      name: "Ethan Carter",
      email: "ethan.carter@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-20",
      lastLogin: "2025-02-20",
      wallet: "₦220,000",
    },
    {
      id: generateUserId(13),
      name: "Ava Lewis",
      email: "ava.lewis@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Closed",
      riskLevel: "Medium",
      dateCreated: "2024-04-30",
      lastLogin: "2024-11-11",
      wallet: "₦45,000",
    },
    {
      id: generateUserId(14),
      name: "Noah Hill",
      email: "noah.hill@gmail.com",
      type: "Individual",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-08-10",
      lastLogin: "2024-10-30",
      wallet: "₦12,500",
    },
    {
      id: generateUserId(15),
      name: "Isabella Young",
      email: "isabella.young@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-12",
      lastLogin: "2025-01-05",
      wallet: "₦180,000",
    },
    {
      id: generateUserId(16),
      name: "Lucas Walker",
      email: "lucas.walker@gmail.com",
      type: "Individual",
      kyc: "Rejected",
      accountStatus: "Suspended",
      riskLevel: "High",
      dateCreated: "2024-05-25",
      lastLogin: "2024-09-15",
      wallet: "₦20,000",
    },
    {
      id: generateUserId(17),
      name: "Charlotte Hall",
      email: "charlotte.hall@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Frozen",
      riskLevel: "Medium",
      dateCreated: "2024-06-05",
      lastLogin: "2024-08-20",
      wallet: "₦6,500",
    },
    {
      id: generateUserId(18),
      name: "Mason Allen",
      email: "mason.allen@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-08",
      lastLogin: "2025-03-05",
      wallet: "₦250,000",
    },
    {
      id: generateUserId(19),
      name: "Amelia Wright",
      email: "amelia.wright@gmail.com",
      type: "Business",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-09-15",
      lastLogin: "2024-12-25",
      wallet: "₦55,000",
    },
    {
      id: generateUserId(20),
      name: "Harper Scott",
      email: "harper.scott@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-01-03",
      lastLogin: "2025-03-10",
      wallet: "₦280,000",
    },
    {
      id: generateUserId(21),
      name: "Mia Wilson",
      email: "mia.wilson@gmail.com",
      type: "Business",
      kyc: "Pending",
      accountStatus: "Active",
      riskLevel: "Medium",
      dateCreated: "2024-10-20",
      lastLogin: "2024-11-25",
      wallet: "₦50,000",
    },
    {
      id: generateUserId(22),
      name: "Ethan Martinez",
      email: "ethan.martinez@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Closed",
      riskLevel: "Medium",
      dateCreated: "2024-07-08",
      lastLogin: "2024-09-05",
      wallet: "₦11,000",
    },
    {
      id: generateUserId(23),
      name: "Ava Baker",
      email: "ava.baker@gmail.com",
      type: "Business",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-02-14",
      lastLogin: "2025-02-15",
      wallet: "₦230,000",
    },
    {
      id: generateUserId(24),
      name: "Mason Taylor",
      email: "mason.taylor@gmail.com",
      type: "Individual",
      kyc: "Verified",
      accountStatus: "Active",
      riskLevel: "Low",
      dateCreated: "2024-11-30",
      lastLogin: "2024-12-10",
      wallet: "₦70,000",
    },
  ]);

  const handleSelectUser = (user, isSelected) => {
    if (isSelected) {
      setSelectedUsers(prev => [...prev, user]);
    } else {
      setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const handleSelectAll = (isSelected) => {
    const dataToSelect = filtered.length > 0 ? filtered : users;
    if (isSelected) {
      setSelectedUsers([...dataToSelect]);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const isUserSelected = (user) => {
    return selectedUsers.some(u => u.id === user.id);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAccountAction = (action) => {
    const actionMessages = {
      suspend: {
        title: "Suspend Account",
        message: `Are you sure you want to suspend ${selectedUser.name}'s account? This will prevent them from accessing their account.`,
        confirmText: "Yes, Suspend Account"
      },
      freeze: {
        title: "Freeze Account",
        message: `Are you sure you want to freeze ${selectedUser.name}'s account? This will temporarily restrict account activities.`,
        confirmText: "Yes, Freeze Account"
      },
      close: {
        title: "Close Account",
        message: `Are you sure you want to close ${selectedUser.name}'s account? This action cannot be undone.`,
        confirmText: "Yes, Close Account"
      }
    };

    const actionData = actionMessages[action];
    setConfirmDialog({
      type: "warning",
      title: actionData.title,
      message: actionData.message,
      confirmText: actionData.confirmText,
      cancelText: "Cancel",
      onConfirm: () => {
        // Update account status
        const newStatus = action === 'suspend' ? 'Suspended' : action === 'freeze' ? 'Frozen' : 'Closed';
        
        // Update in users array
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === selectedUser.id ? { ...u, accountStatus: newStatus } : u
          )
        );
        
        // Update filtered if needed
        if (filtered.length > 0) {
          setFiltered(prevFiltered => 
            prevFiltered.map(u => 
              u.id === selectedUser.id ? { ...u, accountStatus: newStatus } : u
            )
          );
        }

        // Update selected user
        setSelectedUser({ ...selectedUser, accountStatus: newStatus });

        // Show toast
        const toastMessages = {
          suspend: {
            type: "warning",
            title: "Account Suspended",
            message: `${selectedUser.name}'s account has been suspended successfully.`
          },
          freeze: {
            type: "warning",
            title: "Account Frozen",
            message: `${selectedUser.name}'s account has been frozen successfully.`
          },
          close: {
            type: "error",
            title: "Account Closed",
            message: `${selectedUser.name}'s account has been closed successfully.`
          }
        };

        setToast(toastMessages[action]);
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const isAllSelected = () => {
    const dataToCheck = filtered.length > 0 ? filtered : users;
    return dataToCheck.length > 0 && selectedUsers.length === dataToCheck.length;
  };

  const columns = [
    {
      header: "Select",
      key: "checkbox",
      render: (row) => (
        <input
          type="checkbox"
          checked={isUserSelected(row)}
          onChange={(e) => {
            e.stopPropagation();
            handleSelectUser(row, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    { header: "User ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    {
      header: "Account Type",
      key: "type",
      styleMap: {
        Individual: styles.accountIndividual,
        Business: styles.accountBusiness,
      },
    },
    {
      header: "KYC Status",
      key: "kyc",
      styleMap: {
        Verified: styles.kycVerified,
        Pending: styles.kycPending,
        Rejected: styles.kycRejected,
      },
    },
    {
      header: "Account Status",
      key: "accountStatus",
      styleMap: {
        Active: styles.statusActive,
        Suspended: styles.statusSuspended,
        Frozen: styles.statusFrozen,
        Closed: styles.statusClosed,
      },
    },
    {
      header: "Risk Level",
      key: "riskLevel",
      styleMap: {
        Low: styles.riskLow,
        Medium: styles.riskMedium,
        High: styles.riskHigh,
      },
    },
    { header: "Date Created", key: "dateCreated" },
    { header: "Last Login", key: "lastLogin" },
    { header: "Wallet Balance", key: "wallet" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewUser(row);
          }}
          className={styles.viewDetailsBtn}
          title="View User Details"
        >
          <Eye size={18} />
        </button>
      )
    },
  ];

  // Filters
  const accountTypes = useMemo(
    () => ["All", ...new Set(users.map((u) => u.type))],
    [users]
  );
  const kycStatuses = useMemo(
    () => ["All", ...new Set(users.map((u) => u.kyc))],
    [users]
  );
  const accountStatuses = useMemo(
    () => ["All", ...new Set(users.map((u) => u.accountStatus))],
    [users]
  );

  const onFilterChange = (filters) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      let temp = [...users];

      if (filters.search) {
        temp = temp.filter(
          (u) =>
            u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            u.email.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.type && filters.type !== "All")
        temp = temp.filter((u) => u.type === filters.type);
      if (filters.kyc && filters.kyc !== "All")
        temp = temp.filter((u) => u.kyc === filters.kyc);
      if (filters.status && filters.status !== "All")
        temp = temp.filter((u) => u.accountStatus === filters.status);
      if (filters.date) temp = temp.filter((u) => u.lastLogin === filters.date);

      setFiltered(temp);
      setLoading(false);
    }, 500);
  };

  // PDF Export
  const hexToRgb = (hexClass) => {
    const colors = {
      [styles.accountIndividual]: [49, 130, 206],
      [styles.accountBusiness]: [56, 161, 105],
      [styles.kycVerified]: [56, 161, 105],
      [styles.kycPending]: [214, 158, 46],
      [styles.kycRejected]: [229, 62, 62],
      [styles.statusActive]: [56, 161, 105],
      [styles.statusSuspended]: [229, 62, 62],
      [styles.statusFrozen]: [214, 158, 46],
      [styles.statusClosed]: [113, 128, 150],
      [styles.riskLow]: [56, 161, 105],
      [styles.riskMedium]: [214, 158, 46],
      [styles.riskHigh]: [229, 62, 62],
    };
    return colors[hexClass] || [0, 0, 0];
  };

  const handleExportPDF = () => {
    setLoadingPDF(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      const exportTitle = selectedUsers.length > 0 ? "Selected Users Data" : "All Users Data";
      doc.text(exportTitle, 14, 15);

      // Filter out checkbox column for export
      const exportColumns = columns.filter(c => c.key !== "checkbox");
      const tableColumn = exportColumns.map((c) => {
        if (typeof c.header === 'function') return '';
        return c.header;
      }).filter(Boolean);

      // Get data to export
      const dataToExport = selectedUsers.length > 0 ? selectedUsers : (filtered.length > 0 ? filtered : users);
      const tableRows = dataToExport.map((u) =>
        exportColumns
          .filter(c => c.key !== "checkbox")
          .map((c) => u[c.key] || '')
      );

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        theme: "grid",
        headStyles: {
          fillColor: [41, 92, 191],
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        didParseCell: (data) => {
          const colKey = columns[data.column.index]?.key;
          const row =
            filtered.length > 0
              ? filtered[data.row.index]
              : users[data.row.index];
          const styleMap = columns[data.column.index]?.styleMap;
        },
      });

      doc.save("users.pdf");
      setLoadingPDF(false);
    }, 1000);
  };

  return (
    <Div className="users-section">
      <Div className="head-and-details flexRow">
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeftIcon size={25} className={styles.backArrow} />
        </button>
        <div>
          <h2>User Management</h2>
          <p>Manage user account, KYC status and permissions</p>
        </div>
      </Div>

      <KPICards suspendedCard={true} displayNone={true} />

      <FilterSearch
        config={{
          showSearch: true,
          searchPlaceholder: "Search by name and email...",
          dropdowns: [
            { key: "type", label: "Account Type", options: accountTypes },
            { key: "kyc", label: "KYC Status", options: kycStatuses },
            { key: "status", label: "Account Status", options: accountStatuses },
          ],
          showDate: false,
        }}
        onFilterChange={onFilterChange}
      />

      <Div className="table-wrapper">
        <Div className="table-header flexRow">
          <h3>User Management</h3>
          <span className={styles.recordCount}>
            {filtered.length > 0 ? filtered.length : users.length} records
          </span>
        </Div>
        
        {/* Selection Info */}
        {selectedUsers.length > 0 && (
          <Div className="selection-info flexRow" style={{ 
            marginTop: '12px', 
            marginBottom: '12px',
            padding: '8px 16px',
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', color: '#295cbf', fontWeight: '500' }}>
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={handleClearSelection}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#295cbf',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'underline',
                padding: '4px 8px'
              }}
            >
              Clear selection
            </button>
          </Div>
        )}

        <DataTable
          columns={columns}
          data={filtered.length > 0 ? filtered : users}
          scrollHeight={500}
          onRowClick={(row) => console.log('User clicked:', row)}
          loading={loading}
        />
      </Div>

      <button
        className={styles.exportBtn}
        onClick={handleExportPDF}
        disabled={loadingPDF}
      >
        {loadingPDF ? (
          <Loader2 className={styles.spin} size={16} />
        ) : (
          <>
            <UploadIcon size={20} color="#fff" /> 
            {selectedUsers.length > 0 ? `Export Selected Users (${selectedUsers.length})` : 'Export All Users'}
          </>
        )}
      </button>

      {/* User Details Modal */}
      {selectedUser && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          width="600px"
          showClose={true}
        >
          <div className={styles.userDetailsModal}>
            <h2 className={styles.userDetailsTitle}>User Details</h2>
            
            <div className={styles.userDetailsContent}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>User ID:</span>
                <span className={styles.detailValue}>{selectedUser.id}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>{selectedUser.name}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email:</span>
                <span className={styles.detailValue}>{selectedUser.email}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Account Type:</span>
                <span className={`${styles.detailValue} ${styles[selectedUser.type === 'Individual' ? 'accountIndividual' : 'accountBusiness']}`}>
                  {selectedUser.type}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>KYC Status:</span>
                <span className={`${styles.detailValue} ${styles[`kyc${selectedUser.kyc}`] || ''}`}>
                  {selectedUser.kyc}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Account Status:</span>
                <span className={`${styles.detailValue} ${styles[`status${selectedUser.accountStatus}`] || ''}`}>
                  {selectedUser.accountStatus}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Risk Level:</span>
                <span className={`${styles.detailValue} ${styles[`risk${selectedUser.riskLevel}`] || ''}`}>
                  {selectedUser.riskLevel}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date Created:</span>
                <span className={styles.detailValue}>{selectedUser.dateCreated}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Last Login:</span>
                <span className={styles.detailValue}>{selectedUser.lastLogin}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Wallet Balance:</span>
                <span className={styles.detailValue}>{selectedUser.wallet}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.userActionButtons}>
              <button
                className={styles.suspendBtn}
                onClick={() => handleAccountAction('suspend')}
                disabled={selectedUser.accountStatus === 'Suspended'}
              >
                Suspend Account
              </button>
              <button
                className={styles.freezeBtn}
                onClick={() => handleAccountAction('freeze')}
                disabled={selectedUser.accountStatus === 'Frozen'}
              >
                Freeze Account
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => handleAccountAction('close')}
                disabled={selectedUser.accountStatus === 'Closed'}
              >
                Close Account
              </button>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={!!confirmDialog}
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </Div>
  );
};

export default ManageUsers;
