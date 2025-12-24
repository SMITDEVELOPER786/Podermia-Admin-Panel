import React, { useState, useMemo } from "react";
import styles from "../css/ManageUsers.module.css";
import KPICards from "../components/KPICards";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import DataTable from "../components/DataTable/DataTables";
import CustomModal from "../components/CustomModal/CustomModal";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import Toast from "../components/Toast/Toast";
import { ArrowLeftIcon, UploadIcon, Loader2, Eye, ExternalLink, Wallet, PiggyBank, TrendingUp, CreditCard, Shield, Users, ArrowRight } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState('overview');
  const [activeOverrideTab, setActiveOverrideTab] = useState('savings');
  
  const [savingsOverrides, setSavingsOverrides] = useState({
    savingsGoalMinInvestment: '',
    savingsGoalMinBalance: '',
    savingsGoalMinLockIn: '',
    fixedSavingsMinInvestment: '',
    fixedSavingsMinBalance: '',
    fixedSavingsMinLockIn: '',
    savingsTermsDate: '',
    savingsTermsPrincipal: '',
    savingsTermsInterest: '',
    savingsTermsMaturityDate: '',
    freezeEarlyTermination: false,
    earlyTerminationPenaltyRate: ''
  });
  
  const [investmentOverrides, setInvestmentOverrides] = useState({
    processingFee: '',
    statusControl: 'Active'
  });
  
  const [loanOverrides, setLoanOverrides] = useState({
    ltvPerCollateral: '',
    interestRatePerProduct: '',
    tenorPerProduct: '',
    amountPerProduct: '',
    penaltyRate: '',
    defaultRate: '',
    earlyRepaymentPenalty: ''
  });
  
  const [kycOverrides, setKycOverrides] = useState({
    kycStatus: 'Pending',
    tier: 'Tier 1',
    temporaryAccess: false,
    conditionalProductAccess: false
  });

  const handleBack = () => navigate(-1);

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


  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const isUserSelected = (user) => {
    return selectedUsers.some(u => u.id === user.id);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setActiveTab('overview');
    setActiveOverrideTab('savings');
    setSavingsOverrides({
      savingsGoalMinInvestment: '',
      savingsGoalMinBalance: '',
      savingsGoalMinLockIn: '',
      fixedSavingsMinInvestment: '',
      fixedSavingsMinBalance: '',
      fixedSavingsMinLockIn: '',
      savingsTermsDate: '',
      savingsTermsPrincipal: '',
      savingsTermsInterest: '',
      savingsTermsMaturityDate: '',
      freezeEarlyTermination: false,
      earlyTerminationPenaltyRate: ''
    });
    setInvestmentOverrides({ processingFee: '', statusControl: 'Active' });
    setLoanOverrides({
      ltvPerCollateral: '',
      interestRatePerProduct: '',
      tenorPerProduct: '',
      amountPerProduct: '',
      penaltyRate: '',
      defaultRate: '',
      earlyRepaymentPenalty: ''
    });
    setKycOverrides({
      kycStatus: selectedUser?.kyc || 'Pending',
      tier: 'Tier 1',
      temporaryAccess: false,
      conditionalProductAccess: false
    });
  };

  const handleModuleNavigation = (module) => {
    const moduleToTabMap = {
      'Wallet': 'Wallet Admin',
      'Wallet Admin': 'Wallet Admin',
      'Savings': 'Saving & Goals',
      'Savings Admin': 'Saving & Goals',
      'Investment': 'Investment',
      'Investment Admin': 'Investment',
      'Loan': 'Loans',
      'Loan Admin': 'Loans',
      'KYC': 'KYC Management',
      'KYC Admin': 'KYC Management',
      'Referral': 'Overview', 
      'Referral Admin': 'Overview'
    };

    const targetTab = moduleToTabMap[module] || 'Overview';
    
    setToast({
      type: 'info',
      title: 'Navigation',
      message: `Navigating to ${targetTab}. User-specific filtering will be available once backend integration is complete.`
    });
  };

  const handleSecurityAction = (action) => {
    const actionMessages = {
      forcePinReset: {
        title: 'Force Transaction PIN Reset',
        message: `Are you sure you want to force ${selectedUser.name} to reset their transaction PIN?`,
        confirmText: 'Yes, Force Reset'
      },
      forceLogout: {
        title: 'Force Logout',
        message: `Are you sure you want to force logout ${selectedUser.name} from all active sessions?`,
        confirmText: 'Yes, Force Logout'
      },
      blockDevice: {
        title: 'Block Device Access',
        message: `Are you sure you want to block/reset device access for ${selectedUser.name}?`,
        confirmText: 'Yes, Block Device'
      },
      enforce2FA: {
        title: 'Enforce Mandatory 2FA',
        message: `Are you sure you want to enforce mandatory 2FA for ${selectedUser.name}?`,
        confirmText: 'Yes, Enforce 2FA'
      },
      flagInvestigation: {
        title: 'Flag User for Investigation',
        message: `Are you sure you want to flag ${selectedUser.name} for investigation?`,
        confirmText: 'Yes, Flag User'
      }
    };

    const actionData = actionMessages[action];
    setConfirmDialog({
      type: 'warning',
      title: actionData.title,
      message: actionData.message,
      confirmText: actionData.confirmText,
      cancelText: 'Cancel',
      onConfirm: () => {
        setToast({
          type: 'success',
          title: 'Action Completed',
          message: `${actionData.title} has been executed for ${selectedUser.name}.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleOverrideSave = (section) => {
    setToast({
      type: 'success',
      title: 'Overrides Saved',
      message: `${section} overrides have been saved for ${selectedUser.name}.`
    });
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
        const newStatus = action === 'suspend' ? 'Suspended' : action === 'freeze' ? 'Frozen' : 'Closed';
        
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === selectedUser.id ? { ...u, accountStatus: newStatus } : u
          )
        );
        
        if (filtered.length > 0) {
          setFiltered(prevFiltered => 
            prevFiltered.map(u => 
              u.id === selectedUser.id ? { ...u, accountStatus: newStatus } : u
            )
          );
        }

        setSelectedUser({ ...selectedUser, accountStatus: newStatus });

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

      const exportColumns = columns.filter(c => c.key !== "checkbox");
      const tableColumn = exportColumns.map((c) => {
        if (typeof c.header === 'function') return '';
        return c.header;
      }).filter(Boolean);

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

      {selectedUser && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
            setActiveTab('overview');
            setActiveOverrideTab('savings');
          }}
          width="900px"
          showClose={true}
          title={<h2 className={styles.userDetailsTitle}>User Details - {selectedUser.name}</h2>}
        >
          <div className={styles.userDetailsModal}>
            
            <div className={styles.modalTabs}>
              <button
                className={`${styles.modalTab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`${styles.modalTab} ${activeTab === 'overrides' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('overrides')}
              >
                Overrides
              </button>
              <button
                className={`${styles.modalTab} ${activeTab === 'security' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
            </div>

            <div className={styles.modalTabContent}>
              {activeTab === 'overview' && (
                <div className={styles.overviewTab}>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>User Information</h3>
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
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>User Overview</h3>
                    <div className={styles.moduleLinksGrid}>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Wallet')}>
                        <Wallet size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>Wallet Balance</div>
                          <div className={styles.moduleLinkValue}>{selectedUser.wallet}</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Savings')}>
                        <PiggyBank size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>Active Savings Plans</div>
                          <div className={styles.moduleLinkValue}>View Details →</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Investment')}>
                        <TrendingUp size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>Active Investments</div>
                          <div className={styles.moduleLinkValue}>View Details →</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Loan')}>
                        <CreditCard size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>Active Loans</div>
                          <div className={styles.moduleLinkValue}>View Details →</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('KYC')}>
                        <Shield size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>KYC Status</div>
                          <div className={styles.moduleLinkValue}>{selectedUser.kyc}</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                      <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Referral')}>
                        <Users size={24} />
                        <div>
                          <div className={styles.moduleLinkTitle}>Referral Performance</div>
                          <div className={styles.moduleLinkValue}>View Details →</div>
                        </div>
                        <ExternalLink size={16} className={styles.moduleLinkIcon} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Quick Actions</h3>
                    <div className={styles.quickActionsGrid}>
                      <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Wallet Admin')}>
                        <Wallet size={20} />
                        Open Wallet Admin
                        <ArrowRight size={16} />
                      </button>
                      <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Savings Admin')}>
                        <PiggyBank size={20} />
                        Open Savings Admin
                        <ArrowRight size={16} />
                      </button>
                      <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Investment Admin')}>
                        <TrendingUp size={20} />
                        Open Investment Admin
                        <ArrowRight size={16} />
                      </button>
                      <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Loan Admin')}>
                        <CreditCard size={20} />
                        Open Loan Admin
                        <ArrowRight size={16} />
                      </button>
                      <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('KYC Admin')}>
                        <Shield size={20} />
                        Open KYC Admin
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Account Actions</h3>
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
                </div>
              )}

              {activeTab === 'overrides' && (
                <div className={styles.overridesTab}>
                  <div className={styles.overrideSubTabs}>
                    <button
                      className={`${styles.overrideSubTab} ${activeOverrideTab === 'savings' ? styles.activeSubTab : ''}`}
                      onClick={() => setActiveOverrideTab('savings')}
                    >
                      Savings Vault
                    </button>
                    <button
                      className={`${styles.overrideSubTab} ${activeOverrideTab === 'investment' ? styles.activeSubTab : ''}`}
                      onClick={() => setActiveOverrideTab('investment')}
                    >
                      Investment
                    </button>
                    <button
                      className={`${styles.overrideSubTab} ${activeOverrideTab === 'loan' ? styles.activeSubTab : ''}`}
                      onClick={() => setActiveOverrideTab('loan')}
                    >
                      Loan
                    </button>
                    <button
                      className={`${styles.overrideSubTab} ${activeOverrideTab === 'kyc' ? styles.activeSubTab : ''}`}
                      onClick={() => setActiveOverrideTab('kyc')}
                    >
                      KYC
                    </button>
                  </div>

                  {activeOverrideTab === 'savings' && (
                    <div className={styles.overrideSection}>
                      <h3 className={styles.sectionTitle}>Savings Vault Overrides</h3>
                      <div className={styles.overrideForm}>
                        <div className={styles.formRow}>
                          <label>Savings Goal Minimum Investment Size</label>
                          <input
                            type="text"
                            value={savingsOverrides.savingsGoalMinInvestment}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinInvestment: e.target.value})}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Goal Minimum Balance</label>
                          <input
                            type="text"
                            value={savingsOverrides.savingsGoalMinBalance}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinBalance: e.target.value})}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Goal Minimum Lock-in Period</label>
                          <input
                            type="text"
                            value={savingsOverrides.savingsGoalMinLockIn}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinLockIn: e.target.value})}
                            placeholder="Enter period"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Fixed Savings Plan Minimum Investment Size</label>
                          <input
                            type="text"
                            value={savingsOverrides.fixedSavingsMinInvestment}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinInvestment: e.target.value})}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Fixed Savings Plan Minimum Balance</label>
                          <input
                            type="text"
                            value={savingsOverrides.fixedSavingsMinBalance}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinBalance: e.target.value})}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Fixed Savings Plan Minimum Lock-in Period</label>
                          <input
                            type="text"
                            value={savingsOverrides.fixedSavingsMinLockIn}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinLockIn: e.target.value})}
                            placeholder="Enter period"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Terms - Date</label>
                          <input
                            type="date"
                            value={savingsOverrides.savingsTermsDate}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsDate: e.target.value})}
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Terms - Principal</label>
                          <input
                            type="text"
                            value={savingsOverrides.savingsTermsPrincipal}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsPrincipal: e.target.value})}
                            placeholder="Enter principal"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Terms - Interest</label>
                          <input
                            type="text"
                            value={savingsOverrides.savingsTermsInterest}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsInterest: e.target.value})}
                            placeholder="Enter interest"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Savings Terms - Maturity Date</label>
                          <input
                            type="date"
                            value={savingsOverrides.savingsTermsMaturityDate}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsMaturityDate: e.target.value})}
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>
                            <input
                              type="checkbox"
                              checked={savingsOverrides.freezeEarlyTermination}
                              onChange={(e) => setSavingsOverrides({...savingsOverrides, freezeEarlyTermination: e.target.checked})}
                            />
                            Freeze Early Termination
                          </label>
                        </div>
                        <div className={styles.formRow}>
                          <label>Early Termination Penalty Rate</label>
                          <input
                            type="text"
                            value={savingsOverrides.earlyTerminationPenaltyRate}
                            onChange={(e) => setSavingsOverrides({...savingsOverrides, earlyTerminationPenaltyRate: e.target.value})}
                            placeholder="Enter penalty rate (%)"
                          />
                        </div>
                        <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Savings Vault')}>
                          Save Savings Overrides
                        </button>
                      </div>
                    </div>
                  )}

                  {activeOverrideTab === 'investment' && (
                    <div className={styles.overrideSection}>
                      <h3 className={styles.sectionTitle}>Investment Overrides</h3>
                      <div className={styles.overrideForm}>
                        <div className={styles.formRow}>
                          <label>Processing Fee</label>
                          <input
                            type="text"
                            value={investmentOverrides.processingFee}
                            onChange={(e) => setInvestmentOverrides({...investmentOverrides, processingFee: e.target.value})}
                            placeholder="Enter processing fee"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Status Control</label>
                          <select
                            value={investmentOverrides.statusControl}
                            onChange={(e) => setInvestmentOverrides({...investmentOverrides, statusControl: e.target.value})}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                        </div>
                        <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Investment')}>
                          Save Investment Overrides
                        </button>
                      </div>
                    </div>
                  )}

                  {activeOverrideTab === 'loan' && (
                    <div className={styles.overrideSection}>
                      <h3 className={styles.sectionTitle}>Loan Overrides</h3>
                      <div className={styles.overrideForm}>
                        <div className={styles.formRow}>
                          <label>LTV per Collateral</label>
                          <input
                            type="text"
                            value={loanOverrides.ltvPerCollateral}
                            onChange={(e) => setLoanOverrides({...loanOverrides, ltvPerCollateral: e.target.value})}
                            placeholder="Enter LTV (%)"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Interest Rate per Loan Product</label>
                          <input
                            type="text"
                            value={loanOverrides.interestRatePerProduct}
                            onChange={(e) => setLoanOverrides({...loanOverrides, interestRatePerProduct: e.target.value})}
                            placeholder="Enter interest rate (%)"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Tenor per Loan Product</label>
                          <input
                            type="text"
                            value={loanOverrides.tenorPerProduct}
                            onChange={(e) => setLoanOverrides({...loanOverrides, tenorPerProduct: e.target.value})}
                            placeholder="Enter tenor"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Amount per Loan Product</label>
                          <input
                            type="text"
                            value={loanOverrides.amountPerProduct}
                            onChange={(e) => setLoanOverrides({...loanOverrides, amountPerProduct: e.target.value})}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Penalty Rate</label>
                          <input
                            type="text"
                            value={loanOverrides.penaltyRate}
                            onChange={(e) => setLoanOverrides({...loanOverrides, penaltyRate: e.target.value})}
                            placeholder="Enter penalty rate (%)"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Default Rate</label>
                          <input
                            type="text"
                            value={loanOverrides.defaultRate}
                            onChange={(e) => setLoanOverrides({...loanOverrides, defaultRate: e.target.value})}
                            placeholder="Enter default rate (%)"
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label>Early Repayment Penalty</label>
                          <input
                            type="text"
                            value={loanOverrides.earlyRepaymentPenalty}
                            onChange={(e) => setLoanOverrides({...loanOverrides, earlyRepaymentPenalty: e.target.value})}
                            placeholder="Enter penalty (%)"
                          />
                        </div>
                        <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Loan')}>
                          Save Loan Overrides
                        </button>
                      </div>
                    </div>
                  )}

                  {activeOverrideTab === 'kyc' && (
                    <div className={styles.overrideSection}>
                      <h3 className={styles.sectionTitle}>KYC Overrides</h3>
                      <div className={styles.overrideForm}>
                        <div className={styles.formRow}>
                          <label>KYC Status</label>
                          <select
                            value={kycOverrides.kycStatus}
                            onChange={(e) => setKycOverrides({...kycOverrides, kycStatus: e.target.value})}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Complete">Complete</option>
                            <option value="Verified">Verified</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <div className={styles.formRow}>
                          <label>Tier</label>
                          <select
                            value={kycOverrides.tier}
                            onChange={(e) => setKycOverrides({...kycOverrides, tier: e.target.value})}
                          >
                            <option value="Tier 1">Tier 1</option>
                            <option value="Tier 2">Tier 2</option>
                            <option value="Tier 3">Tier 3</option>
                          </select>
                        </div>
                        <div className={styles.formRow}>
                          <label>
                            <input
                              type="checkbox"
                              checked={kycOverrides.temporaryAccess}
                              onChange={(e) => setKycOverrides({...kycOverrides, temporaryAccess: e.target.checked})}
                            />
                            Temporary Access Permissions
                          </label>
                        </div>
                        <div className={styles.formRow}>
                          <label>
                            <input
                              type="checkbox"
                              checked={kycOverrides.conditionalProductAccess}
                              onChange={(e) => setKycOverrides({...kycOverrides, conditionalProductAccess: e.target.checked})}
                            />
                            Conditional Product Access
                          </label>
                        </div>
                        <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('KYC')}>
                          Save KYC Overrides
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'security' && (
                <div className={styles.securityTab}>
                  <h3 className={styles.sectionTitle}>User Security Controls</h3>
                  <div className={styles.securityActionsGrid}>
                    <button
                      className={styles.securityActionBtn}
                      onClick={() => handleSecurityAction('forcePinReset')}
                    >
                      <Shield size={20} />
                      Force Transaction PIN Reset
                    </button>
                    <button
                      className={styles.securityActionBtn}
                      onClick={() => handleSecurityAction('forceLogout')}
                    >
                      <Shield size={20} />
                      Force Logout (Invalidate Sessions)
                    </button>
                    <button
                      className={styles.securityActionBtn}
                      onClick={() => handleSecurityAction('blockDevice')}
                    >
                      <Shield size={20} />
                      Block / Reset Device Access
                    </button>
                    <button
                      className={styles.securityActionBtn}
                      onClick={() => handleSecurityAction('enforce2FA')}
                    >
                      <Shield size={20} />
                      Enforce Mandatory 2FA
                    </button>
                    <button
                      className={styles.securityActionBtn}
                      onClick={() => handleSecurityAction('flagInvestigation')}
                    >
                      <Shield size={20} />
                      Flag User for Investigation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomModal>
      )}

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
