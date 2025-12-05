import React, { useState, useMemo } from "react";
import styles from "../css/ManageUsers.module.css";
import KPICards from "../components/KPICards";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import DataTable from "../components/DataTable/DataTables";
import { ArrowLeftIcon, UploadIcon, Loader2 } from "lucide-react";
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

  const handleBack = () => navigate(-1);

  const users = [
    {
      name: "John Doi",
      email: "john.doi@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-01-15",
      wallet: "₦125,000",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      type: "Standard",
      kyc: "Pending",
      status: "Active",
      lastLogin: "2024-08-31",
      wallet: "₦50,000",
    },
    {
      name: "Mike Jhon",
      email: "mike.jhon@gmail.com",
      type: "Basic",
      kyc: "Rejected",
      status: "Flagged",
      lastLogin: "2024-08-30",
      wallet: "₦5,000",
    },
    {
      name: "Alice Brown",
      email: "alice.brown@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-02-10",
      wallet: "₦200,000",
    },
    {
      name: "Robert Green",
      email: "robert.green@gmail.com",
      type: "Standard",
      kyc: "Verified",
      status: "Inactive",
      lastLogin: "2024-12-15",
      wallet: "₦75,000",
    },
    {
      name: "Emma White",
      email: "emma.white@gmail.com",
      type: "Basic",
      kyc: "Pending",
      status: "Active",
      lastLogin: "2024-11-20",
      wallet: "₦10,000",
    },
    {
      name: "David Black",
      email: "david.black@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-01-28",
      wallet: "₦300,000",
    },
    {
      name: "Sophia Gray",
      email: "sophia.gray@gmail.com",
      type: "Standard",
      kyc: "Rejected",
      status: "Flagged",
      lastLogin: "2024-10-05",
      wallet: "₦25,000",
    },
    {
      name: "James Blue",
      email: "james.blue@gmail.com",
      type: "Basic",
      kyc: "Verified",
      status: "Inactive",
      lastLogin: "2024-09-18",
      wallet: "₦7,500",
    },
    {
      name: "Olivia King",
      email: "olivia.king@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-03-01",
      wallet: "₦150,000",
    },
    {
      name: "Liam Scott",
      email: "liam.scott@gmail.com",
      type: "Standard",
      kyc: "Pending",
      status: "Active",
      lastLogin: "2024-12-01",
      wallet: "₦60,000",
    },
    {
      name: "Mia Adams",
      email: "mia.adams@gmail.com",
      type: "Basic",
      kyc: "Rejected",
      status: "Flagged",
      lastLogin: "2024-08-25",
      wallet: "₦8,000",
    },
    {
      name: "Ethan Carter",
      email: "ethan.carter@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-02-20",
      wallet: "₦220,000",
    },
    {
      name: "Ava Lewis",
      email: "ava.lewis@gmail.com",
      type: "Standard",
      kyc: "Verified",
      status: "Inactive",
      lastLogin: "2024-11-11",
      wallet: "₦45,000",
    },
    {
      name: "Noah Hill",
      email: "noah.hill@gmail.com",
      type: "Basic",
      kyc: "Pending",
      status: "Active",
      lastLogin: "2024-10-30",
      wallet: "₦12,500",
    },
    {
      name: "Isabella Young",
      email: "isabella.young@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-01-05",
      wallet: "₦180,000",
    },
    {
      name: "Lucas Walker",
      email: "lucas.walker@gmail.com",
      type: "Standard",
      kyc: "Rejected",
      status: "Flagged",
      lastLogin: "2024-09-15",
      wallet: "₦20,000",
    },
    {
      name: "Charlotte Hall",
      email: "charlotte.hall@gmail.com",
      type: "Basic",
      kyc: "Verified",
      status: "Inactive",
      lastLogin: "2024-08-20",
      wallet: "₦6,500",
    },
    {
      name: "Mason Allen",
      email: "mason.allen@gmail.com",
      type: "Premium",
      kyc: "Verified",
      status: "Active",
      lastLogin: "2025-03-05",
      wallet: "₦250,000",
    },
    {
      name: "Amelia Wright",
      email: "amelia.wright@gmail.com",
      type: "Standard",
      kyc: "Pending",
      status: "Active",
      lastLogin: "2024-12-25",
      wallet: "₦55,000",
    },
  ];

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    {
      header: "Account Type",
      key: "type",
      styleMap: {
        Basic: styles.accountBasic,
        Standard: styles.accountStandard,
        Premium: styles.accountPremium,
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
      header: "Status",
      key: "status",
      styleMap: {
        Active: styles.statusActive,
        Flagged: styles.statusFlagged,
        Inactive: styles.statusInactive,
      },
    },
    { header: "Last Login", key: "lastLogin" },
    { header: "Wallet Balance", key: "wallet" },
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
  const statuses = useMemo(
    () => ["All", ...new Set(users.map((u) => u.status))],
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
        temp = temp.filter((u) => u.status === filters.status);
      if (filters.date) temp = temp.filter((u) => u.lastLogin === filters.date);

      setFiltered(temp);
      setLoading(false);
    }, 500);
  };

  // PDF Export
  const hexToRgb = (hexClass) => {
    const colors = {
      [styles.accountBasic]: [214, 158, 46],
      [styles.accountStandard]: [49, 130, 206],
      [styles.accountPremium]: [56, 161, 105],
      [styles.kycVerified]: [56, 161, 105],
      [styles.kycPending]: [214, 158, 46],
      [styles.kycRejected]: [229, 62, 62],
      [styles.statusActive]: [56, 161, 105],
      [styles.statusFlagged]: [229, 62, 62],
      [styles.statusInactive]: [113, 128, 150],
    };
    return colors[hexClass] || [0, 0, 0];
  };

  const handleExportPDF = () => {
    setLoadingPDF(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("User Data", 14, 15);

      const tableColumn = columns.map((c) => c.header);
      const tableRows = (filtered.length > 0 ? filtered : users).map((u) =>
        columns.map((c) => u[c.key])
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
          // Apply colors for KYC/Status/AccountType columns
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
            { key: "status", label: "Status", options: statuses },
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
            <UploadIcon size={20} color="#fff" /> Export All Users
          </>
        )}
      </button>
    </Div>
  );
};

export default ManageUsers;
