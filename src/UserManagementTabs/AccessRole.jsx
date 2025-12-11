import React, { useState, useMemo } from 'react';
import styles from '../css/UserManagement.module.css';
import DataTables from '../components/DataTable/DataTables';
import FilterSearch from '../components/FilterSearch/FilterSearch';

const AccessRole = () => {
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    user: '',
    status: ''
  });

  const [activityLogs] = useState([
    {
      id: 1,
      timestamp: '2025-01-15 14:30:15',
      admin: 'Sarah willson',
      email: 'Sarah.rd@example.com',
      action: 'User Login',
      type: 'Login',
      status: 'Success',
      module: 'Authentication',
      ipAddress: '192.168.1.100',
      detail: 'Successful login with global admin role'
    },
    {
      id: 2,
      timestamp: '2024-09-01 13:15:22',
      admin: 'David Brown',
      email: 'David.rd@example.com',
      action: 'KYC Documents Approved',
      type: 'User Action',
      status: 'Success',
      module: 'KYC Management',
      ipAddress: '192.168.1.106',
      detail: 'Approved KYC for user Jhon Doe (ID: 12345)'
    },
    {
      id: 3,
      timestamp: '2024-09-01 12:45:33',
      admin: 'Emma Davis',
      email: 'Emma.rd@example.com',
      action: 'Role Assignment Check',
      type: 'Role Changed',
      status: 'Success',
      module: 'User Management',
      ipAddress: '192.168.1.115',
      detail: 'Added Investment Admin role to Mom teller'
    },
    {
      id: 4,
      timestamp: '2024-09-01 11:20:44',
      admin: 'Tom Miller',
      email: 'Tom.rd@example.com',
      action: 'Failed Login Attempt',
      type: 'Login',
      status: 'Failed',
      module: 'Authentication',
      ipAddress: '192.168.1.100',
      detail: 'Invalid Credentials Provides'
    },
    {
      id: 5,
      timestamp: '2024-09-01 11:20:44',
      admin: 'Sarah Willson',
      email: 'Sarah.rd@example.com',
      action: 'Permission Modified',
      type: 'Permission changed',
      status: 'Success',
      module: 'RBAC System',
      ipAddress: '192.168.1.180',
      detail: 'Modify wallet permission for wallet admin'
    },
    {
      id: 6,
      timestamp: '2024-09-01 11:20:44',
      admin: 'David Brown',
      email: 'David.rd@example.com',
      action: 'User Account suspend',
      type: 'User action',
      status: 'Warning',
      module: 'User Management',
      ipAddress: '192.168.1.180',
      detail: 'Suspend user account for policy violation'
    },
    {
      id: 7,
      timestamp: '2024-09-01 11:20:44',
      admin: 'System',
      email: 'system.rd@example.com',
      action: 'Automatic role cleanup',
      type: 'System Action',
      status: 'Success',
      module: 'System Maintenance',
      ipAddress: '192.1808.1.180',
      detail: 'Cleanup expired role assignment'
    },
    {
      id: 8,
      timestamp: '2024-09-01 11:20:44',
      admin: 'Emma davis',
      email: 'Emma.rd@example.com',
      action: 'Bulk role assignment',
      type: 'Role Changed',
      status: 'Success',
      module: 'User Management',
      ipAddress: '192.168.1.100',
      detail: 'Assigned support admin role to 5 users'
    }
  ]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return activityLogs.filter(log => {
      const matchesSearch = !filters.search.trim() || 
        log.admin.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.action.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.module.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.ipAddress.includes(filters.search) ||
        log.detail.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesAction = !filters.action || filters.action === 'All Action' || log.type === filters.action;
      const matchesUser = !filters.user || filters.user === 'All Users' || log.admin === filters.user;
      const matchesStatus = !filters.status || filters.status === 'All Status' || log.status === filters.status;
      
      return matchesSearch && matchesAction && matchesUser && matchesStatus;
    });
  }, [activityLogs, filters]);

  const renderType = (type) => {
    const typeClass = type === 'Login' 
      ? styles.typeLogin
      : type === 'User Action' || type === 'User action'
      ? styles.typeUserAction
      : type === 'Role Changed'
      ? styles.typeRoleChanged
      : type === 'Permission changed'
      ? styles.typePermissionChanged
      : styles.typeSystemAction;
    
    return <span className={typeClass}>{type}</span>;
  };

  const renderStatus = (status) => {
    const statusClass = status === 'Success' 
      ? styles.statusSuccess
      : status === 'Failed'
      ? styles.statusFailed
      : styles.statusWarning;
    
    return <span className={statusClass}>{status}</span>;
  };

  const columns = [
    { header: 'Timestamp', key: 'timestamp' },
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
    { header: 'Action', key: 'action' },
    { 
      header: 'Type', 
      key: 'type',
      render: (row) => renderType(row.type)
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => renderStatus(row.status)
    },
    { header: 'Module', key: 'module' },
    { header: 'IP Address', key: 'ipAddress' },
    { header: 'Detail', key: 'detail' }
  ];

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search Users.....',
    dropdowns: [
      {
        key: 'action',
        label: 'All Action',
        options: ['All Action', 'Login', 'User Action', 'Role Changed', 'Permission changed', 'System Action']
      },
      {
        key: 'user',
        label: 'All Users',
        options: ['All Users', 'Sarah willson', 'David Brown', 'Emma Davis', 'Tom Miller', 'Sarah Willson', 'Emma davis', 'System']
      },
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Success', 'Failed', 'Warning']
      }
    ]
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.accessRoleContainer}>
      <FilterSearch 
        config={filterConfig}
        onFilterChange={handleFilterChange}
      />
      
      <div className={styles.tableSection}>
        <DataTables 
          columns={columns} 
          data={filteredData} 
          rowsPerPage={5}
        />
      </div>
    </div>
  );
};

export default AccessRole;
