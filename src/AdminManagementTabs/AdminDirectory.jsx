import React, { useState, useMemo, useEffect } from 'react';
import styles from '../css/AdminManagment2.module.css';
import DataTables from '../components/DataTable/DataTables';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import Toast from '../components/Toast/Toast';
import CreateAdminModal from './CreateAdminModal';
import EditAdminModal from './EditAdminModal';
import AssignRolesModal from './AssignRolesModal';
import SetExpiryModal from './SetExpiryModal';
import { Search, Plus, MoreVertical, Edit, UserCheck, UserX, ShieldOff, LogOut, Key, Shield, Calendar, X, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    department: ''
  });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [expiryModalOpen, setExpiryModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  // Sample admin data - using state so we can update it
  const [admins, setAdmins] = useState([
    {
      id: 'ADM-001',
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@podermonie.com',
      department: 'IT Operations',
      roles: ['Global Admin'],
      status: 'Active',
      lastLogin: '2025-01-15 14:30:15',
      createdBy: 'System',
      createdDate: '2024-01-10',
      accountExpiry: '2025-12-31'
    },
    {
      id: 'ADM-002',
      fullName: 'David Brown',
      email: 'david.brown@podermonie.com',
      department: 'Customer Service',
      roles: ['KYC Admin', 'Wallet Admin'],
      status: 'Active',
      lastLogin: '2025-01-14 10:22:45',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-03-15',
      accountExpiry: '2025-12-31'
    },
    {
      id: 'ADM-003',
      fullName: 'Emma Davis',
      email: 'emma.davis@podermonie.com',
      department: 'Finance',
      roles: ['Loan Admin', 'Support Admin'],
      status: 'Active',
      lastLogin: '2025-01-13 16:45:30',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-05-20',
      accountExpiry: '2025-12-31'
    },
    {
      id: 'ADM-004',
      fullName: 'Tom Miller',
      email: 'tom.miller@podermonie.com',
      department: 'Operations',
      roles: ['Savings Admin'],
      status: 'Suspended',
      lastLogin: '2025-01-10 09:15:20',
      createdBy: 'David Brown',
      createdDate: '2024-07-12',
      accountExpiry: '2025-06-30'
    },
    {
      id: 'ADM-005',
      fullName: 'Lisa Anderson',
      email: 'lisa.anderson@podermonie.com',
      department: 'IT Operations',
      roles: ['System Setting Admin'],
      status: 'Active',
      lastLogin: '2025-01-12 11:30:00',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-08-05',
      accountExpiry: '2025-12-31'
    },
    {
      id: 'ADM-006',
      fullName: 'Michael Chen',
      email: 'michael.chen@podermonie.com',
      department: 'Risk Management',
      roles: ['KYC Admin'],
      status: 'Revoked',
      lastLogin: '2024-12-20 14:20:10',
      createdBy: 'Emma Davis',
      createdDate: '2024-09-18',
      accountExpiry: '2024-12-31'
    }
  ]);

  // Available roles
  const availableRoles = [
    'Global Admin',
    'Investment Admin',
    'Savings Admin',
    'Loan Admin',
    'System Setting Admin',
    'KYC Admin',
    'Wallet Admin',
    'Support Admin'
  ];

  // Available departments
  const departments = [
    'IT Operations',
    'Customer Service',
    'Finance',
    'Operations',
    'Risk Management'
  ];

  // Filter data based on search and filters
  const filteredAdmins = useMemo(() => {
    return admins.filter(admin => {
      const matchesSearch = !filters.search.trim() || 
        admin.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.department.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.roles.some(role => role.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesStatus = !filters.status || filters.status === 'All Status' || admin.status === filters.status;
      const matchesRole = !filters.role || filters.role === 'All Roles' || admin.roles.includes(filters.role);
      const matchesDepartment = !filters.department || filters.department === 'All Departments' || admin.department === filters.department;
      
      return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
    });
  }, [admins, filters]);

  // Render status badge
  const renderStatus = (status) => {
    const statusClass = status === 'Active' 
      ? styles.statusActive 
      : status === 'Suspended'
      ? styles.statusSuspended
      : styles.statusRevoked;
    
    return <span className={statusClass}>{status}</span>;
  };

  // Render roles
  const renderRoles = (roles) => {
    return (
      <div className={styles.rolesContainer}>
        {roles.map((role, index) => (
          <span key={index} className={styles.roleTag}>
            {role}
          </span>
        ))}
      </div>
    );
  };

  // Handle action menu
  const handleActionClick = (adminId, e) => {
    e.stopPropagation();
    setActionMenuOpen(actionMenuOpen === adminId ? null : adminId);
    setSelectedAdmin(admins.find(a => a.id === adminId));
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActionMenuOpen(null);
    };
    if (actionMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [actionMenuOpen]);

  // Action handlers
  const handleEdit = () => {
    setActionMenuOpen(null);
    setEditModalOpen(true);
  };

  const handleOpenAssignRoles = () => {
    setActionMenuOpen(null);
    setRoleModalOpen(true);
  };

  const handleActivate = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'info',
      title: 'Activate Admin',
      message: `Are you sure you want to activate ${selectedAdmin?.fullName}?`,
      confirmText: 'Activate',
      cancelText: 'Cancel',
      onConfirm: () => {
        setAdmins(prev => prev.map(admin => 
          admin.id === selectedAdmin?.id 
            ? { ...admin, status: 'Active' }
            : admin
        ));
        setToast({
          type: 'success',
          title: 'Admin Activated',
          message: `${selectedAdmin?.fullName} has been activated successfully.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleSuspend = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'warning',
      title: 'Suspend Admin',
      message: `Are you sure you want to suspend ${selectedAdmin?.fullName}?`,
      confirmText: 'Suspend',
      cancelText: 'Cancel',
      onConfirm: () => {
        setAdmins(prev => prev.map(admin => 
          admin.id === selectedAdmin?.id 
            ? { ...admin, status: 'Suspended' }
            : admin
        ));
        setToast({
          type: 'success',
          title: 'Admin Suspended',
          message: `${selectedAdmin?.fullName} has been suspended.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleRevoke = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'warning',
      title: 'Revoke Admin Access',
      message: `Are you sure you want to revoke access for ${selectedAdmin?.fullName}? This action cannot be undone.`,
      confirmText: 'Revoke',
      cancelText: 'Cancel',
      onConfirm: () => {
        setAdmins(prev => prev.map(admin => 
          admin.id === selectedAdmin?.id 
            ? { ...admin, status: 'Revoked' }
            : admin
        ));
        setToast({
          type: 'success',
          title: 'Access Revoked',
          message: `Access for ${selectedAdmin?.fullName} has been revoked.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleForceLogout = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'info',
      title: 'Force Logout',
      message: `Are you sure you want to force logout ${selectedAdmin?.fullName}? All active sessions will be invalidated.`,
      confirmText: 'Force Logout',
      cancelText: 'Cancel',
      onConfirm: () => {
        setAdmins(prev => prev.map(admin => 
          admin.id === selectedAdmin?.id 
            ? { ...admin, lastLogin: 'Never' }
            : admin
        ));
        setToast({
          type: 'success',
          title: 'Force Logout Successful',
          message: `All sessions for ${selectedAdmin?.fullName} have been invalidated.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleResetPassword = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'info',
      title: 'Reset Password',
      message: `Are you sure you want to reset password for ${selectedAdmin?.fullName}? A temporary password will be sent to their email.`,
      confirmText: 'Reset Password',
      cancelText: 'Cancel',
      onConfirm: () => {
        setToast({
          type: 'success',
          title: 'Password Reset',
          message: `Password reset email has been sent to ${selectedAdmin?.email}.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleReset2FA = () => {
    setActionMenuOpen(null);
    setConfirmDialog({
      type: 'info',
      title: 'Reset 2FA',
      message: `Are you sure you want to reset/enforce 2FA for ${selectedAdmin?.fullName}? They will need to set up 2FA on next login.`,
      confirmText: 'Reset 2FA',
      cancelText: 'Cancel',
      onConfirm: () => {
        setToast({
          type: 'success',
          title: '2FA Reset',
          message: `2FA has been reset for ${selectedAdmin?.fullName}. They will need to set it up on next login.`
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleOpenSetExpiry = () => {
    setActionMenuOpen(null);
    setExpiryModalOpen(true);
  };

  // Modal save handlers
  const handleCreateAdmin = async (newAdmin) => {
    setAdmins(prev => [...prev, newAdmin]);
    setToast({
      type: 'success',
      title: 'Admin Created',
      message: `${newAdmin.fullName} has been created successfully.`
    });
  };

  const handleEditAdmin = async (updatedAdmin) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
    setToast({
      type: 'success',
      title: 'Profile Updated',
      message: `${updatedAdmin.fullName}'s profile has been updated successfully.`
    });
  };

  const handleSaveRoles = async (updatedAdmin) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
    setToast({
      type: 'success',
      title: 'Roles Updated',
      message: `Roles for ${updatedAdmin.fullName} have been updated successfully.`
    });
  };

  const handleSaveExpiry = async (updatedAdmin) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
    setToast({
      type: 'success',
      title: 'Expiry Updated',
      message: `Account expiry for ${updatedAdmin.fullName} has been updated.`
    });
  };

  // Table columns
  const columns = [
    { header: 'Admin ID', key: 'id' },
    { header: 'Full Name', key: 'fullName' },
    { header: 'Corporate Email', key: 'email' },
    { header: 'Department / Team', key: 'department' },
    { 
      header: 'Assigned Role(s)', 
      key: 'roles',
      render: (row) => renderRoles(row.roles)
    },
    { 
      header: 'Account Status', 
      key: 'status',
      render: (row) => renderStatus(row.status)
    },
    { header: 'Last Login', key: 'lastLogin' },
    { header: 'Created By', key: 'createdBy' },
    { header: 'Created Date', key: 'createdDate' },
    { 
      header: 'Actions', 
      key: 'actions',
      render: (row) => (
        <div className={styles.actionCell}>
          <button 
            className={styles.actionButton}
            onClick={(e) => handleActionClick(row.id, e)}
          >
            <MoreVertical size={18} />
          </button>
          {actionMenuOpen === row.id && (
            <div className={styles.actionMenu}>
              <button onClick={handleEdit} className={styles.actionMenuItem}>
                <Edit size={16} />
                Edit Admin Profile
              </button>
              <button onClick={handleOpenAssignRoles} className={styles.actionMenuItem}>
                <Shield size={16} />
                Assign / Remove Role(s)
              </button>
              {row.status !== 'Active' && (
                <button onClick={handleActivate} className={styles.actionMenuItem}>
                  <UserCheck size={16} />
                  Activate Admin
                </button>
              )}
              {row.status === 'Active' && (
                <button onClick={handleSuspend} className={styles.actionMenuItem}>
                  <UserX size={16} />
                  Suspend Admin
                </button>
              )}
              <button onClick={handleRevoke} className={styles.actionMenuItem}>
                <ShieldOff size={16} />
                Revoke Admin Access
              </button>
              <button onClick={handleForceLogout} className={styles.actionMenuItem}>
                <LogOut size={16} />
                Force Logout
              </button>
              <button onClick={handleResetPassword} className={styles.actionMenuItem}>
                <Key size={16} />
                Reset Admin Password
              </button>
              <button onClick={handleReset2FA} className={styles.actionMenuItem}>
                <Shield size={16} />
                Reset / Enforce Admin 2FA
              </button>
              <button onClick={handleOpenSetExpiry} className={styles.actionMenuItem}>
                <Calendar size={16} />
                Set / Update Account Expiry
              </button>
            </div>
          )}
        </div>
      )
    }
  ];

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by ID, name, email, department, or role...',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Active', 'Suspended', 'Revoked']
      },
      {
        key: 'role',
        label: 'All Roles',
        options: ['All Roles', ...availableRoles]
      },
      {
        key: 'department',
        label: 'All Departments',
        options: ['All Departments', 'IT Operations', 'Customer Service', 'Finance', 'Operations', 'Risk Management']
      }
    ]
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredAdmins.length === 0) {
      setToast({
        type: 'warning',
        title: 'No Data',
        message: 'No admin data available to export'
      });
      return;
    }

    setLoadingCSV(true);
    setTimeout(() => {
      try {
        const headers = ['Admin ID', 'Full Name', 'Corporate Email', 'Department / Team', 'Assigned Role(s)', 'Account Status', 'Last Login', 'Created By', 'Created Date', 'Account Expiry'];
        const csvContent = [
          headers.join(','),
          ...filteredAdmins.map(admin => [
            admin.id,
            `"${admin.fullName}"`,
            admin.email,
            `"${admin.department}"`,
            `"${admin.roles.join('; ')}"`,
            admin.status,
            admin.lastLogin,
            admin.createdBy,
            admin.createdDate,
            admin.accountExpiry
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `admin-directory-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setToast({
          type: 'success',
          title: 'Export Successful',
          message: `CSV file downloaded successfully (${filteredAdmins.length} admins)`
        });
        setLoadingCSV(false);
      } catch (error) {
        console.error('CSV Export Error:', error);
        setLoadingCSV(false);
        setToast({
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export CSV file. Please try again.'
        });
      }
    }, 500);
  };

  // Export to PDF
  const handleExportPDF = () => {
    if (filteredAdmins.length === 0) {
      setToast({
        type: 'warning',
        title: 'No Data',
        message: 'No admin data available to export'
      });
      return;
    }

    setLoadingPDF(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Admin Directory Report', 14, 15);
        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);
        doc.text(`Total Admins: ${filteredAdmins.length}`, 14, 30);

        const tableColumn = ['Admin ID', 'Full Name', 'Email', 'Department', 'Roles', 'Status', 'Last Login', 'Created By', 'Created Date', 'Expiry'];
        const tableRows = filteredAdmins.map(admin => [
          admin.id,
          admin.fullName.length > 20 ? admin.fullName.substring(0, 17) + '...' : admin.fullName,
          admin.email.length > 25 ? admin.email.substring(0, 22) + '...' : admin.email,
          admin.department.length > 20 ? admin.department.substring(0, 17) + '...' : admin.department,
          admin.roles.join('; ').length > 25 ? admin.roles.join('; ').substring(0, 22) + '...' : admin.roles.join('; '),
          admin.status,
          admin.lastLogin.length > 15 ? admin.lastLogin.substring(0, 12) + '...' : admin.lastLogin,
          admin.createdBy.length > 15 ? admin.createdBy.substring(0, 12) + '...' : admin.createdBy,
          admin.createdDate,
          admin.accountExpiry
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 37,
          theme: 'grid',
          headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 8
          },
          bodyStyles: {
            fontSize: 7,
            cellPadding: 2
          },
          alternateRowStyles: {
            fillColor: [245, 247, 250]
          },
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 30 },
            2: { cellWidth: 40 },
            3: { cellWidth: 30 },
            4: { cellWidth: 35 },
            5: { cellWidth: 20 },
            6: { cellWidth: 30 },
            7: { cellWidth: 25 },
            8: { cellWidth: 25 },
            9: { cellWidth: 25 }
          }
        });

        doc.save(`admin-directory-${new Date().toISOString().split('T')[0]}.pdf`);

        setToast({
          type: 'success',
          title: 'Export Successful',
          message: `PDF file downloaded successfully (${filteredAdmins.length} admins)`
        });
        setLoadingPDF(false);
      } catch (error) {
        console.error('PDF Export Error:', error);
        setLoadingPDF(false);
        setToast({
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export PDF file. Please try again.'
        });
      }
    }, 500);
  };

  return (
    <div className={styles.adminDirectoryContainer}>
      {/* Header with Create Button and Export Buttons */}
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Admin Directory</h2>
        <div className={styles.exportButtons}>
          <button
            className={styles.exportButton}
            onClick={handleExportCSV}
            disabled={loadingCSV || filteredAdmins.length === 0}
          >
            {loadingCSV ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            <span>Export CSV</span>
          </button>
          <button
            className={styles.exportButton}
            onClick={handleExportPDF}
            disabled={loadingPDF || filteredAdmins.length === 0}
          >
            {loadingPDF ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : (
              <FileText size={16} />
            )}
            <span>Export PDF</span>
          </button>
          <button 
            className={styles.createButton}
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus size={18} />
            Create Admin
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <FilterSearch 
        config={filterConfig}
        onFilterChange={handleFilterChange}
      />

      {/* Data Table */}
      <div className={styles.tableSection}>
        <DataTables 
          columns={columns} 
          data={filteredAdmins} 
          rowsPerPage={5}
        />
      </div>

      {/* Create Admin Modal */}
      <CreateAdminModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateAdmin}
        availableRoles={availableRoles}
        departments={departments}
      />

      {/* Edit Admin Modal */}
      <EditAdminModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedAdmin(null);
        }}
        onSave={handleEditAdmin}
        admin={selectedAdmin}
        departments={departments}
      />

      {/* Assign Roles Modal */}
      <AssignRolesModal
        isOpen={roleModalOpen}
        onClose={() => {
          setRoleModalOpen(false);
          setSelectedAdmin(null);
        }}
        onSave={handleSaveRoles}
        admin={selectedAdmin}
        availableRoles={availableRoles}
      />

      {/* Set Expiry Modal */}
      <SetExpiryModal
        isOpen={expiryModalOpen}
        onClose={() => {
          setExpiryModalOpen(false);
          setSelectedAdmin(null);
        }}
        onSave={handleSaveExpiry}
        admin={selectedAdmin}
      />

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

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminDirectory;
