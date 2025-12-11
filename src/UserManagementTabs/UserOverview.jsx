import React, { useState, useMemo } from 'react';
import styles from '../css/UserManagement.module.css';
import DataTables from '../components/DataTable/DataTables';
import { Search } from 'lucide-react';

const UserOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [allUsers] = useState([
    {
      id: 1,
      user: 'John Doe',
      walletBalance: '₦ 500,000',
      kycStatus: 'Verified',
      type: 'Individual',
      accountStatus: 'Active',
      lastLogin: '2025-01-15'
    },
    {
      id: 2,
      user: 'Jahn Smith',
      walletBalance: '₦ 500,000',
      kycStatus: 'Verified',
      type: 'Individual',
      accountStatus: 'Suspended',
      lastLogin: '2025-01-14'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      walletBalance: '₦ 500,000',
      kycStatus: 'Pending',
      type: 'Business',
      accountStatus: 'Inactive',
      lastLogin: '2025-01-10'
    }
  ]);

  const [adminUsers] = useState([
    {
      id: 1,
      admin: 'Sarah Wilson',
      email: 'Sarah @ gmail.com',
      role: 'Global Admin',
      status: 'Active',
      lastLogin: '2025-01-13'
    },
    {
      id: 2,
      admin: 'David brown',
      email: 'David @ gmail.com',
      role: 'KYC Admin',
      status: 'Active',
      lastLogin: '2025-01-12'
    },
    {
      id: 3,
      admin: 'Emma Davis',
      email: 'David @ gmail.com',
      role: 'Loans Admin',
      status: 'Active',
      lastLogin: '2025-01-11'
    },
    {
      id: 4,
      admin: 'Tom Miller',
      email: 'Tom @ gmail.com',
      role: 'Investment Admin',
      status: 'Suspended',
      lastLogin: '2025-01-10'
    }
  ]);

  // Filter users based on search query
  const filteredAllUsers = useMemo(() => {
    if (!searchQuery.trim()) return allUsers;
    
    const query = searchQuery.toLowerCase();
    return allUsers.filter(user => 
      user.user.toLowerCase().includes(query) ||
      user.type.toLowerCase().includes(query) ||
      user.kycStatus.toLowerCase().includes(query) ||
      user.accountStatus.toLowerCase() === query ||
      user.walletBalance.toLowerCase().includes(query)
    );
  }, [allUsers, searchQuery]);

  const filteredAdminUsers = useMemo(() => {
    if (!searchQuery.trim()) return adminUsers;
    
    const query = searchQuery.toLowerCase();
    return adminUsers.filter(admin => 
      admin.admin.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query) ||
      admin.status.toLowerCase() === query
    );
  }, [adminUsers, searchQuery]);

  const renderKYCStatus = (status) => {
    const statusClass = status === 'Verified' 
      ? styles.statusVerified 
      : status === 'Pending' 
      ? styles.statusPending 
      : styles.statusRejected;
    
    return <span className={statusClass}>{status}</span>;
  };

  const renderAccountStatus = (status) => {
    const statusClass = status === 'Active' 
      ? styles.statusActive 
      : status === 'Suspended' 
      ? styles.statusSuspended 
      : styles.statusInactive;
    
    return <span className={statusClass}>{status}</span>;
  };

  const renderAdminStatus = (status) => {
    const statusClass = status === 'Active' 
      ? styles.statusActive 
      : styles.statusSuspended;
    
    return <span className={statusClass}>{status}</span>;
  };

  const renderRole = (role) => {
    return <span className={styles.roleTag}>{role}</span>;
  };

  const allUsersColumns = [
    { header: 'User', key: 'user' },
    { header: 'Wallet Balance', key: 'walletBalance' },
    { 
      header: 'KYC Status', 
      key: 'kycStatus',
      render: (row) => renderKYCStatus(row.kycStatus)
    },
    { header: 'Type', key: 'type' },
    { 
      header: 'Account Status', 
      key: 'accountStatus',
      render: (row) => renderAccountStatus(row.accountStatus)
    },
    { header: 'Last Login', key: 'lastLogin' },
    { 
      header: 'Action', 
      key: 'action',
      render: () => '-'
    }
  ];

  const adminUsersColumns = [
    { 
      header: 'Admin', 
      key: 'admin',
      render: (row) => (
        <div className={styles.adminInfo}>
          <div className={styles.adminName}>{row.admin}</div>
          <div className={styles.adminEmail}>{row.email}</div>
        </div>
      )
    },
    { 
      header: 'Role', 
      key: 'role',
      render: (row) => renderRole(row.role)
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => renderAdminStatus(row.status)
    },
    { header: 'Last Login', key: 'lastLogin' },
    { 
      header: 'Action', 
      key: 'action',
      render: () => '-'
    }
  ];

  return (
    <div className={styles.userOverviewContainer}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name, email, role, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.userSection}>
        <h2>All Users</h2>
        <DataTables 
          columns={allUsersColumns} 
          data={filteredAllUsers} 
          rowsPerPage={10}
        />
      </div>

      <div className={styles.userSection}>
        <h2>Admin Users</h2>
        <DataTables 
          columns={adminUsersColumns} 
          data={filteredAdminUsers} 
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default UserOverview;
