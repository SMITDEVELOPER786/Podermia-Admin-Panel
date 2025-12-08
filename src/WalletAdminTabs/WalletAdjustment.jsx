import React, { useState } from "react";
import styles from "../css/WalletAdmin.module.css";
import { Search, AlertCircle, AlertTriangle } from "lucide-react";
import Toast from "../components/Toast/Toast";
import DataTable from "../components/DataTable/DataTables";
import CustomModal from "../components/CustomModal/CustomModal";

const WalletAdjustment = () => {
  const [toast, setToast] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState("Credit (Add Money)");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningData, setWarningData] = useState(null);

  // Mock existing users database
  const existingUsers = [
    { id: "ADJ001", name: "Max Martin", balance: 627.11 },
    { id: "ADJ002", name: "Alicia Keys", balance: 450.5 },
    { id: "ADJ003", name: "Ed Sheeran", balance: 1250.75 },
    { id: "AD3001", name: "John Smith", balance: 850.0 },
    { id: "AD3002", name: "Sarah Johnson", balance: 320.4 },
  ];

  // Mock adjustment history data
  const [adjustmentHistory, setAdjustmentHistory] = useState([
    {
      id: "AD3001",
      user: "John Smith",
      userId: "USER001",
      type: "Credit",
      amount: "$500.00",
      reason: "Compensation for system downtime",
      admin: "Admin John",
      status: "Approved",
      created: "01/15/2024",
    },
    {
      id: "AD3002",
      user: "Sarah Johnson",
      userId: "USER002",
      type: "Debit",
      amount: "$150.00",
      reason: "Correction for duplicate payment",
      admin: "Admin John",
      status: "Pending",
      created: "01/14/2024",
    },
  ]);

  // Counter for generating sequential user IDs
  const [userIdCounter, setUserIdCounter] = useState(3);

  const handleSearch = () => {
    const user = existingUsers.find(
      (u) => u.id.toUpperCase() === searchId.toUpperCase()
    );
    if (user) {
      setSelectedUser(user);
      setUserNotFound(false);
    } else {
      setSelectedUser(null);
      setUserNotFound(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedUser || !amount || !reason) {
      setToast({
        type: "error",
        title: "Validation Error",
        message: "Please fill all required fields",
      });

      return;
    }

    const amountValue = parseFloat(amount);
    const isDebit = adjustmentType.includes("Debit");
    
    // Check if debit amount exceeds current balance
    if (isDebit && amountValue > selectedUser.balance) {
      const resultingBalance = selectedUser.balance - amountValue;
      const deficit = Math.abs(resultingBalance);
      
      setWarningData({
        user: selectedUser.name,
        userId: selectedUser.id,
        currentBalance: selectedUser.balance.toFixed(2),
        requestedDebit: amountValue.toFixed(2),
        resultingBalance: resultingBalance.toFixed(2),
        deficit: deficit.toFixed(2)
      });
      
      setShowWarningModal(true);
      return;
    }

    // If amount is within balance, proceed directly
    processAdjustment();
  };

  const processAdjustment = () => {
    const newUserId = `USER${String(userIdCounter).padStart(3, "0")}`;

    // Add to adjustment history with pending status
    const newAdjustment = {
      id: selectedUser.id,
      user: selectedUser.name,
      userId: newUserId,
      type: adjustmentType.includes("Credit") ? "Credit" : "Debit",
      amount: `$${amount}`,
      reason: reason,
      admin: "Admin John",
      status: "Pending",
      created: new Date().toLocaleDateString("en-US"),
    };

    setAdjustmentHistory([newAdjustment, ...adjustmentHistory]);

    setToast({
      type: "success",
      title: "Submitted for Approval",
      message: "Adjustment request has been submitted successfully",
    });

    // Reset form
    setSearchId("");
    setSelectedUser(null);
    setAmount("");
    setReason("");
    setUserNotFound(false);
    setUserIdCounter((prev) => prev + 1);
    setShowWarningModal(false);
  };

  const handleApprove = (id) => {
    setAdjustmentHistory(
      adjustmentHistory.map((adj) =>
        adj.id === id ? { ...adj, status: "Approved" } : adj
      )
    );
    setToast({
      type: "success",
      title: "Approved",
      message: "Adjustment has been approved",
    });
  };

  const handleReject = (id) => {
    const filtered = adjustmentHistory.filter((adj) => adj.id !== id);

    const reIndexed = filtered.map((item, index) => ({
      ...item,
      userId: `USER${String(index + 1).padStart(3, "0")}`,
    }));

    setAdjustmentHistory(reIndexed);
    setUserIdCounter(reIndexed.length + 1);

    setToast({
      type: "error",
      title: "Rejected",
      message: "Adjustment has been rejected and removed",
    });
  };

  return (
    <div className={styles.adjustmentContainer}>
      {/* Manual Adjustment Box */}
      <div className={styles.adjustmentBox}>
        <h2 className={styles.boxTitle}>Manual Wallet Adjustment</h2>

        <div className={styles.infoBanner}>
          Manual wallet Adjustment require approval and create an audit trail.
          Use only for corrections, refunds, or compensation.
        </div>

        <div className={styles.formGrid}>
          {/* Left Column */}
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>User ID/Email</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="ADJ001"
                  value={searchId}
                  onChange={(e) => {
                    setSearchId(e.target.value);
                    setUserNotFound(false);
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search
                  size={18}
                  className={styles.searchIcon}
                  onClick={handleSearch}
                />
              </div>
              {userNotFound && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} />
                  User not found. Please check the ID.
                </div>
              )}
            </div>

            {selectedUser && (
              <div className={styles.userInfoBox}>
                <p>
                  <strong>Selected User</strong>
                </p>
                <p>
                  <strong>ID:</strong> {selectedUser.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Current Balance:</strong> $
                  {selectedUser.balance.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Adjustment Type</label>
              <select
                className={styles.selectInput}
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value)}
              >
                <option>Credit (Add Money)</option>
                <option>Debit (Deduct Money)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Amount ($)</label>
              <input
                type="number"
                className={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Reason for Adjustment</label>
              <textarea
                className={styles.textArea}
                placeholder="Provide detailed reason for this adjustment"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!selectedUser}
            >
              Submit for Approval
            </button>
          </div>
        </div>
      </div>

      {/* Adjustment History & Approvals */}
      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>Adjustment History & Approvals</h2>
        
        <DataTable 
          columns={[
            { header: 'ID', key: 'id' },
            { 
              header: 'User', 
              key: 'user',
              render: (row) => (
                <div className={styles.userCell}>
                  <span className={styles.userName}>{row.user}</span>
                  <span className={styles.userId}>{row.userId}</span>
                </div>
              )
            },
            { 
              header: 'Type', 
              key: 'type',
              styleMap: {
                'Credit': styles.typeCredit,
                'Debit': styles.typeDebit
              }
            },
            { header: 'Amount', key: 'amount' },
            { header: 'Reason', key: 'reason' },
            { header: 'Admin', key: 'admin' },
            { 
              header: 'Status', 
              key: 'status',
              styleMap: {
                'Approved': styles.statusApproved,
                'Pending': styles.statusPending
              }
            },
            { header: 'Created', key: 'created' },
            { 
              header: 'Actions', 
              key: 'actions',
              render: (row) => (
                row.status === 'Pending' ? (
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApprove(row.id)}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleReject(row.id)}
                    >
                      Reject
                    </button>
                  </div>
                ) : null
              )
            }
          ]}
          data={adjustmentHistory}
          scrollHeight={500}
        />
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Insufficient Balance Warning Modal */}
      {showWarningModal && warningData && (
        <CustomModal
          isOpen={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          showClose={true}
          width="550px"
        >
          <div className={styles.warningModalContent}>
            <div className={styles.warningHeader}>
              <AlertTriangle size={24} color="#dc2626" />
              <h2 className={styles.warningTitle}>Insufficient Balance Warning</h2>
            </div>

            <div className={styles.userInfoSection}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>User:</span>
                <span className={styles.infoValue}>{warningData.user}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>User ID:</span>
                <span className={styles.infoValue}>{warningData.userId}</span>
              </div>
            </div>

            <div className={styles.balanceDetails}>
              <div className={styles.balanceRow}>
                <span className={styles.balanceLabel}>Current Balance:</span>
                <span className={styles.balanceValue}>{warningData.currentBalance}</span>
              </div>
              <div className={styles.balanceRow}>
                <span className={styles.balanceLabel}>Requested Debit:</span>
                <span className={styles.balanceValue} style={{ color: '#dc2626' }}>
                  {warningData.requestedDebit}
                </span>
              </div>
              <div className={styles.balanceDivider}></div>
              <div className={styles.balanceRow}>
                <span className={styles.balanceLabel}>Resulting Balance:</span>
                <span className={styles.balanceValue} style={{ color: '#dc2626', fontWeight: '700' }}>
                  {warningData.resultingBalance}
                </span>
              </div>
            </div>

            <div className={styles.warningAlert}>
              <AlertTriangle size={24} color="#dc2626" />
              <div>
                <strong>This adjustment will result in a negative balance</strong>
                <p>
                  Proceeding with this adjustment will create a deficit of ${warningData.deficit} in the user's
                  wallet. This action requires special approval and will be flagged for regulatory
                  review.
                </p>
              </div>
            </div>

            <div className={styles.warningActions}>
              <button 
                className={styles.cancelWarningBtn}
                onClick={() => setShowWarningModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.proceedWarningBtn}
                onClick={processAdjustment}
              >
                Procees with adjustment
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default WalletAdjustment;
