import React, { useMemo } from 'react';
import styles from '../css/AdminManagment2.module.css';
import { Users, Clock, Activity, AlertTriangle } from 'lucide-react';

const AdminOverview = () => {
  const [admins] = React.useState([
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
      roles: ['KYC Admin', 'Wallet Admin', 'Investment Admin'],
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

  const [activities] = React.useState([
    { id: 1, date: '2025-01-15', type: 'User Created', admin: 'Sarah Wilson' },
    { id: 2, date: '2025-01-14', type: 'Role Assigned', admin: 'David Brown' },
    { id: 3, date: '2025-01-13', type: 'Admin Suspended', admin: 'Emma Davis' },
    { id: 4, date: '2025-01-12', type: 'Password Reset', admin: 'Lisa Anderson' },
    { id: 5, date: '2025-01-11', type: 'Role Removed', admin: 'Sarah Wilson' },
    { id: 6, date: '2025-01-10', type: 'Admin Activated', admin: 'David Brown' },
    { id: 7, date: '2025-01-09', type: 'Account Expiry Updated', admin: 'Emma Davis' },
    { id: 8, date: '2025-01-08', type: '2FA Reset', admin: 'Sarah Wilson' }
  ]);

  const [failedLogins] = React.useState([
    { id: 1, date: '2025-01-15', email: 'unknown@podermonie.com', ip: '192.168.1.100' },
    { id: 2, date: '2025-01-14', email: 'test@podermonie.com', ip: '192.168.1.105' },
    { id: 3, date: '2025-01-13', email: 'admin@podermonie.com', ip: '192.168.1.110' },
    { id: 4, date: '2025-01-12', email: 'unknown@podermonie.com', ip: '192.168.1.115' }
  ]);

  const [pendingApprovals] = React.useState([
    { id: 1, type: 'New Admin Request', requestedBy: 'John Doe', date: '2025-01-14' },
    { id: 2, type: 'Role Assignment', requestedBy: 'Jane Smith', date: '2025-01-13' },
    { id: 3, type: 'Account Reactivation', requestedBy: 'Mike Johnson', date: '2025-01-12' }
  ]);

  const stats = useMemo(() => {
    const activeAdmins = admins.filter(admin => admin.status === 'Active').length;
    
    const roleCounts = {};
    admins.forEach(admin => {
      admin.roles.forEach(role => {
        roleCounts[role] = (roleCounts[role] || 0) + 1;
      });
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentActivities = activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate >= thirtyDaysAgo;
    });

    return {
      totalActiveAdmins: activeAdmins,
      adminsByRole: roleCounts,
      pendingApprovals: pendingApprovals.length,
      actionsLast30Days: recentActivities.length,
      failedLoginAttempts: failedLogins.length
    };
  }, [admins, activities, pendingApprovals, failedLogins]);

  return (
    <div className={styles.adminOverviewContainer}>
      <h2 className={styles.overviewTitle}>Admin Overview</h2>
      
      <div className={styles.snapshotCardsGrid}>
        <div className={styles.snapshotCard}>
          <div className={styles.snapshotCardIcon}>
            <Users size={24} />
          </div>
          <div className={styles.snapshotCardContent}>
            <div className={styles.snapshotCardValue}>{stats.totalActiveAdmins}</div>
            <div className={styles.snapshotCardLabel}>Total Active Admins</div>
          </div>
        </div>

        <div className={styles.snapshotCard}>
          <div className={styles.snapshotCardIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.snapshotCardContent}>
            <div className={styles.snapshotCardValue}>{stats.pendingApprovals}</div>
            <div className={styles.snapshotCardLabel}>Pending Approvals</div>
          </div>
        </div>

        <div className={styles.snapshotCard}>
          <div className={styles.snapshotCardIcon}>
            <Activity size={24} />
          </div>
          <div className={styles.snapshotCardContent}>
            <div className={styles.snapshotCardValue}>{stats.actionsLast30Days}</div>
            <div className={styles.snapshotCardLabel}>Actions (Last 30 Days)</div>
          </div>
        </div>

        <div className={styles.snapshotCard}>
          <div className={styles.snapshotCardIcon}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.snapshotCardContent}>
            <div className={styles.snapshotCardValue}>{stats.failedLoginAttempts}</div>
            <div className={styles.snapshotCardLabel}>Failed Login Attempts</div>
          </div>
        </div>
      </div>

      <div className={styles.roleBreakdownSection}>
        <h3 className={styles.sectionTitle}>Admins by Role Breakdown</h3>
        <div className={styles.roleBreakdownGrid}>
          {Object.entries(stats.adminsByRole).map(([role, count]) => (
            <div key={role} className={styles.roleBreakdownCard}>
              <div className={styles.roleBreakdownRole}>{role}</div>
              <div className={styles.roleBreakdownCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.activitiesSection}>
        <h3 className={styles.sectionTitle}>Recent Activities (Last 30 Days)</h3>
        <div className={styles.activitiesList}>
          {activities.slice(0, 5).map(activity => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityType}>{activity.type}</div>
              <div className={styles.activityDetails}>
                <span className={styles.activityAdmin}>{activity.admin}</span>
                <span className={styles.activityDate}>{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.failedLoginsSection}>
        <h3 className={styles.sectionTitle}>Failed Login Attempts (Last 30 Days)</h3>
        <div className={styles.failedLoginsList}>
          {failedLogins.map(attempt => (
            <div key={attempt.id} className={styles.failedLoginItem}>
              <div className={styles.failedLoginEmail}>{attempt.email}</div>
              <div className={styles.failedLoginDetails}>
                <span className={styles.failedLoginIP}>IP: {attempt.ip}</span>
                <span className={styles.failedLoginDate}>{attempt.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
