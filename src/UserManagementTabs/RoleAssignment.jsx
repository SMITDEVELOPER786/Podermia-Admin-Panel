import React from "react";
import styles from "../css/UserManagement.module.css";
import goalIcon from "../assets/goals.png";

export default function UserManagement() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>User Management</h2>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <img src={goalIcon} alt="" className={styles.icon} />
          <div className={styles.statContent}>
            <div className={styles.statValue}>11,234</div>
            <div className={styles.statLabel}>Active Goals</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <img src={goalIcon} alt="" className={styles.icon} />
          <div className={styles.statContent}>
            <div className={styles.statValue}>12,450</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <img src={goalIcon} alt="" className={styles.icon} />
          <div className={styles.statContent}>
            <div className={styles.statValue}>156</div>
            <div className={styles.statLabel}>Suspended</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <img src={goalIcon} alt="" className={styles.icon} />
          <div className={styles.statContent}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Admin Users</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <img src={goalIcon} alt="" className={styles.icon} />
          <div className={styles.statContent}>
            <div className={styles.statValue}>23</div>
            <div className={styles.statLabel}>New Today</div>
          </div>
        </div>
      </div>

      <h2 className={styles.heading2}>User All Assignment</h2>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div>User</div>
          <div>Email</div>
          <div>Assigned Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {[
          { name: "Sarah Willson", email: "Sarah@example.com", status: "Active" },
          { name: "David Brown", email: "David@example.com", status: "Active" },
          { name: "Emma Davis", email: "Emma@example.com", status: "inactive" }
        ].map((u, i) => (
          <div className={styles.row} key={i}>
            <div className={styles.userName}>{u.name}</div>
            <div className={styles.email}>{u.email}</div>

            <div className={styles.roles}>
              <label><input type="checkbox" /> Global Admin</label>
              <label><input type="checkbox" /> KYC Admin</label>
              <label><input type="checkbox" /> Investment Admin</label>
              <label><input type="checkbox" /> Support Admin</label>
              <label><input type="checkbox" /> Saving & Goal Admin</label>
              <label><input type="checkbox" /> Wallet Admin</label>
              <label><input type="checkbox" /> Loans Admin</label>
            </div>

            <div>
              <span className={`${styles.status} ${u.status === "Active" ? styles.active : styles.inactive}`}>
                {u.status}
              </span>
            </div>

            <div>
              <button className={styles.editBtn}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.permissionCard}>
        <h2 className={styles.title}>Role Permission Matrix</h2>
        <h3 className={styles.subTitle}>User Management</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["View User", "Create User", "Edit User", "Delete User", "Suspend User"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>
       <div className={styles.permissionCard}>
        <h3 className={styles.subTitle}>KYC Management</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["View KYC", "Approved KYC", "Rejected KYC", "Manage Documents"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>

 <div className={styles.permissionCard}>
        <h3 className={styles.subTitle}>Investment Management</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["View Investment", "Create Investment Product", "Edit Investment Product", "Investment Report"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>

 <div className={styles.permissionCard}>
        <h3 className={styles.subTitle}>Wallet Management</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["View Wallet", "Manage Transaction", "Freeze Wallet", "Wallet Report"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>

 <div className={styles.permissionCard}>
        <h3 className={styles.subTitle}>Loan Management</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["View Loans", "ApprovedLoans", "Rejected Loans", "Loan Report"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>

 <div className={styles.permissionCard}>
        <h3 className={styles.subTitle}>System Settings</h3>

        <div className={styles.permissionHeader}>
          <div>Admin</div>
          <div>Global Admin</div>
          <div>KYC Admin</div>
          <div>Investment Admin</div>
          <div>Support Admin</div>
          <div>Wallet Admin</div>
          <div>Loans Admin</div>
          <div>Saving & Goals Admin</div>
        </div>

        {["System Setting", "System Report", "Audit Logs"].map((t, i) => (
          <div className={styles.permissionRow} key={i}>
            <div className={styles.rowTitle}>{t}</div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
            <div className={styles.box}><input type="checkbox" /></div>
          </div>
        ))}
      </div>

    </div>
  );
}
