import React, { useState, useMemo } from "react";
import styles from "../css/AdminManagment2.module.css";
import DataTables from "../components/DataTable/DataTables";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import CustomModal from "../components/CustomModal/CustomModal";
import Toast from "../components/Toast/Toast";
import { Users, Shield, Search, Save, Edit2, CheckCircle2, XCircle } from "lucide-react";

const availableRoles = [
  "Global Admin",
  "KYC Admin",
  "Investment Admin",
  "Support Admin",
  "Savings Admin",
  "Wallet Admin",
  "Loan Admin",
  "System Setting Admin"
];

const permissionModules = [
  {
    module: "User Management",
    permissions: ["View User", "Create User", "Edit User", "Delete User", "Suspend User"]
  },
  {
    module: "KYC Management",
    permissions: ["View KYC", "Approve KYC", "Reject KYC", "Manage Documents"]
  },
  {
    module: "Investment Management",
    permissions: ["View Investment", "Create Investment Product", "Edit Investment Product", "Investment Report"]
  },
  {
    module: "Wallet Management",
    permissions: ["View Wallet", "Manage Transaction", "Freeze Wallet", "Wallet Report"]
  },
  {
    module: "Loan Management",
    permissions: ["View Loans", "Approve Loans", "Reject Loans", "Loan Report"]
  },
  {
    module: "Support Management",
    permissions: ["View Support Tickets", "Assign Tickets", "Resolve Tickets", "Support Report"]
  },
  {
    module: "Savings Management",
    permissions: ["View Savings", "Create Savings Product", "Edit Savings Product", "Savings Report"]
  },
  {
    module: "System Settings",
    permissions: ["System Setting", "System Report", "Audit Logs"]
  }
];

export default function RoleAssignment() {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Sarah Willson", 
      email: "sarah.willson@podermonie.com", 
      status: "Active",
      roles: ["Global Admin", "KYC Admin"]
    },
    { 
      id: 2, 
      name: "David Brown", 
      email: "david.brown@podermonie.com", 
      status: "Active",
      roles: ["Investment Admin", "Wallet Admin"]
    },
    { 
      id: 3, 
      name: "Emma Davis", 
      email: "emma.davis@podermonie.com", 
      status: "Suspended",
      roles: ["Support Admin"]
    },
    { 
      id: 4, 
      name: "John Smith", 
      email: "john.smith@podermonie.com", 
      status: "Active",
      roles: ["Loan Admin", "System Setting Admin"]
    }
  ]);

  const [permissions, setPermissions] = useState(() => {
    const initialPermissions = {};
    permissionModules.forEach(({ module, permissions: perms }) => {
      perms.forEach(perm => {
        initialPermissions[`${module}-${perm}`] = {};
        availableRoles.forEach(role => {
          // Set default permissions (Global Admin has all, others have selective)
          if (role === "Global Admin") {
            initialPermissions[`${module}-${perm}`][role] = true;
          } else {
            initialPermissions[`${module}-${perm}`][role] = false;
          }
        });
      });
    });
    return initialPermissions;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [editRoles, setEditRoles] = useState([]);
  const [toast, setToast] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      
      const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, statusFilter, roleFilter]);

  // Handle role toggle for user
  const handleRoleToggle = (userId, role) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const hasRole = user.roles.includes(role);
          return {
            ...user,
            roles: hasRole 
              ? user.roles.filter(r => r !== role)
              : [...user.roles, role]
          };
        }
        return user;
      })
    );
    setHasUnsavedChanges(true);
  };

  // Handle permission toggle
  const handlePermissionToggle = (module, permission, role) => {
    const key = `${module}-${permission}`;
    setPermissions(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [role]: !prev[key][role]
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Handle "All Roles" toggle - toggles a role for all permissions in a module
  const handleAllRolesToggle = (module, role) => {
    const moduleData = permissionModules.find(m => m.module === module);
    if (!moduleData) return;
    
    // Check if this role is checked for all permissions in this module
    const allChecked = moduleData.permissions.every(permission => {
      const key = `${module}-${permission}`;
      return permissions[key]?.[role] === true;
    });
    
    // Toggle this role for all permissions in the module
    const updatedPermissions = { ...permissions };
    moduleData.permissions.forEach(permission => {
      const key = `${module}-${permission}`;
      updatedPermissions[key] = {
        ...updatedPermissions[key],
        [role]: !allChecked
      };
    });
    
    setPermissions(updatedPermissions);
    setHasUnsavedChanges(true);
  };

  // Check if a role is selected for all permissions in a module
  const isRoleSelectedForAllPermissions = (module, role) => {
    const moduleData = permissionModules.find(m => m.module === module);
    if (!moduleData) return false;
    
    return moduleData.permissions.every(permission => {
      const key = `${module}-${permission}`;
      return permissions[key]?.[role] === true;
    });
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditRoles([...user.roles]);
  };

  // Handle save user roles
  const handleSaveUserRoles = () => {
    if (!editingUser) return;
    
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === editingUser.id
          ? { ...user, roles: editRoles }
          : user
      )
    );
    
    setEditingUser(null);
    setEditRoles([]);
    setHasUnsavedChanges(true);
    setToast({
      type: 'success',
      title: 'Roles Updated',
      message: `Roles for ${editingUser.name} have been updated successfully.`
    });
  };

  // Handle save all changes
  const handleSaveAll = () => {
    // Here you would typically send data to backend
    setHasUnsavedChanges(false);
    setToast({
      type: 'success',
      title: 'Changes Saved',
      message: 'All role assignments and permissions have been saved successfully.'
    });
  };

  // Table columns
  const columns = [
    { 
      header: 'Admin', 
      key: 'name',
      render: (row) => (
        <div className={styles.userInfo}>
          <div className={styles.userName}>{row.name}</div>
          <div className={styles.userEmail}>{row.email}</div>
        </div>
      )
    },
    { 
      header: 'Assigned Roles', 
      key: 'roles',
      render: (row) => (
        <div className={styles.rolesContainer}>
          {row.roles.length > 0 ? (
            row.roles.map((role, idx) => (
              <span key={idx} className={styles.roleTag}>
                {role}
              </span>
            ))
          ) : (
            <span className={styles.noRoles}>No roles assigned</span>
          )}
        </div>
      )
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`${styles.statusBadge} ${
          row.status === 'Active' ? styles.statusActive : styles.statusSuspended
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Actions', 
      key: 'actions',
      render: (row) => (
        <button
          className={styles.editButton}
          onClick={() => handleEditUser(row)}
        >
          <Edit2 size={16} />
          Edit Roles
        </button>
      )
    }
  ];

  // Filter config
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by name or email...',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['all', 'Active', 'Suspended']
      },
      {
        key: 'role',
        label: 'All Roles',
        options: ['all', ...availableRoles]
      }
    ]
  };

  const handleFilterChange = (newFilters) => {
    setSearchTerm(newFilters.search || "");
    setStatusFilter(newFilters.status || "all");
    setRoleFilter(newFilters.role || "all");
  };

  return (
    <div className={styles.roleAssignmentContainer}>
      {/* Header */}
      <div className={styles.roleAssignmentHeader}>
        <div>
          <h2 className={styles.pageTitle}>Role Assignment</h2>
          <p className={styles.pageSubtitle}>Manage admin roles and permissions</p>
        </div>
        {hasUnsavedChanges && (
          <button
            className={styles.saveAllButton}
            onClick={handleSaveAll}
          >
            <Save size={18} />
            Save All Changes
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{users.length}</div>
            <div className={styles.statLabel}>Total Admins</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Shield size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{availableRoles.length}</div>
            <div className={styles.statLabel}>Available Roles</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle2 size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {users.filter(u => u.status === 'Active').length}
            </div>
            <div className={styles.statLabel}>Active Admins</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <XCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {users.filter(u => u.status === 'Suspended').length}
            </div>
            <div className={styles.statLabel}>Suspended Admins</div>
          </div>
        </div>
      </div>

      {/* User Assignment Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Admin Role Assignment</h3>
        <FilterSearch
          config={filterConfig}
          onFilterChange={handleFilterChange}
        />
        <div className={styles.tableWrapper}>
          <DataTables
            columns={columns}
            data={filteredUsers}
            itemsPerPage={10}
          />
        </div>
      </div>

      {/* Permission Matrix Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Role Permission Matrix</h3>
        <p className={styles.sectionDescription}>
          Configure permissions for each role across different modules
        </p>

        {permissionModules.map(({ module, permissions: perms }, moduleIdx) => (
          <div key={moduleIdx} className={styles.permissionMatrixCard}>
            <h4 className={styles.matrixModuleTitle}>{module}</h4>
            <div className={styles.matrixTable}>
              <div className={styles.matrixHeader}>
                <div className={styles.matrixPermissionCol}>Permission</div>
                {availableRoles.map(role => (
                  <div key={role} className={styles.matrixRoleCol}>
                    {role}
                  </div>
                ))}
              </div>
              {/* All Roles row */}
              <div className={styles.matrixRow} style={{ backgroundColor: '#f9fafb', fontWeight: '600' }}>
                <div className={styles.matrixPermissionCol}>
                  All Roles
                </div>
                {availableRoles.map(role => {
                  const isSelected = isRoleSelectedForAllPermissions(module, role);
                  return (
                    <div key={role} className={styles.matrixCheckboxCol}>
                      <label className={styles.matrixCheckboxLabel}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleAllRolesToggle(module, role)}
                          className={styles.matrixCheckbox}
                        />
                        <span className={styles.checkboxIndicator}></span>
                      </label>
                    </div>
                  );
                })}
              </div>
              {perms.map((permission, permIdx) => (
                <div key={permIdx} className={styles.matrixRow}>
                  <div className={styles.matrixPermissionCol}>
                    {permission}
                  </div>
                  {availableRoles.map(role => {
                    const key = `${module}-${permission}`;
                    const isChecked = permissions[key]?.[role] || false;
                    return (
                      <div key={role} className={styles.matrixCheckboxCol}>
                        <label className={styles.matrixCheckboxLabel}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handlePermissionToggle(module, permission, role)}
                            className={styles.matrixCheckbox}
                          />
                          <span className={styles.checkboxIndicator}></span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Roles Modal */}
      {editingUser && (
        <CustomModal
          isOpen={!!editingUser}
          onClose={() => {
            setEditingUser(null);
            setEditRoles([]);
          }}
          title={`Edit Roles - ${editingUser.name}`}
          width="600px"
        >
          <div className={styles.editRolesModal}>
            <p className={styles.modalDescription}>
              Select roles to assign to {editingUser.name}
            </p>
            <div className={styles.rolesCheckboxGroup}>
              {availableRoles.map(role => (
                <label key={role} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={editRoles.includes(role)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditRoles([...editRoles, role]);
                      } else {
                        setEditRoles(editRoles.filter(r => r !== role));
                      }
                    }}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>{role}</span>
                </label>
              ))}
            </div>
            <div className={styles.formActions}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setEditingUser(null);
                  setEditRoles([]);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.submitButton}
                onClick={handleSaveUserRoles}
              >
                Save Changes
              </button>
            </div>
          </div>
        </CustomModal>
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
    </div>
  );
}
