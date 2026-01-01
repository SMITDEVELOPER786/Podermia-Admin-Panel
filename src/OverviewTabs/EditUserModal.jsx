import React from "react";
import CustomModal from "../components/CustomModal/CustomModal";
import styles from "../css/ManageUsers.module.css";

const EditUserModal = ({ isOpen, editingUser, onClose, onSave, setEditingUser }) => {
  if (!isOpen || !editingUser) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width="600px"
      showClose={true}
      title={<h2 className={styles.userDetailsTitle}>Edit User Details - {editingUser.name}</h2>}
    >
      <div className={styles.userDetailsModal}>
        <div className={styles.overrideForm}>
          <div className={styles.formRow}>
            <label>User ID</label>
            <input
              type="text"
              value={editingUser.id}
              disabled
              style={{ background: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed' }}
            />
          </div>
          <div className={styles.formRow}>
            <label>Name</label>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>
          <div className={styles.formRow}>
            <label>Email</label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              placeholder="Enter email"
            />
          </div>
          <div className={styles.formRow}>
            <label>Account Type</label>
            <select
              value={editingUser.type}
              onChange={(e) => setEditingUser({...editingUser, type: e.target.value})}
            >
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label>KYC Status</label>
            <select
              value={editingUser.kyc}
              onChange={(e) => setEditingUser({...editingUser, kyc: e.target.value})}
            >
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label>Account Status</label>
            <select
              value={editingUser.accountStatus}
              onChange={(e) => setEditingUser({...editingUser, accountStatus: e.target.value})}
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Frozen">Frozen</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label>Risk Level</label>
            <select
              value={editingUser.riskLevel}
              onChange={(e) => setEditingUser({...editingUser, riskLevel: e.target.value})}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label>Date Created</label>
            <input
              type="date"
              value={editingUser.dateCreated}
              onChange={(e) => setEditingUser({...editingUser, dateCreated: e.target.value})}
            />
          </div>
          <div className={styles.formRow}>
            <label>Last Login</label>
            <input
              type="date"
              value={editingUser.lastLogin}
              onChange={(e) => setEditingUser({...editingUser, lastLogin: e.target.value})}
            />
          </div>
          <div className={styles.formRow}>
            <label>Wallet Balance</label>
            <input
              type="text"
              value={editingUser.wallet}
              onChange={(e) => setEditingUser({...editingUser, wallet: e.target.value})}
              placeholder="Enter wallet balance"
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              className={styles.saveOverrideBtn}
              onClick={onSave}
              style={{ flex: 1 }}
            >
              Save Changes
            </button>
            <button
              className={styles.saveOverrideBtn}
              onClick={onClose}
              style={{ flex: 1, backgroundColor: '#6b7280' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditUserModal;

