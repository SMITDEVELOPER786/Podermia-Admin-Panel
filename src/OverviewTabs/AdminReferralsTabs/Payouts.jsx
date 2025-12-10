import React, { useState } from "react";
import styles from "../../css/AdminReferrals.module.css";
import CustomModal from "../../components/CustomModal/CustomModal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../components/Toast/Toast";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const Payouts = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(45000);
  const [monthlyAmount, setMonthlyAmount] = useState(125000);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [payouts, setPayouts] = useState([
    {
      id: 1,
      transId: "PAY001",
      referrer: "John Doe",
      Code: "PODER2025JOHN",
      amount: "₦50,000",
      amountEach: "₦10,000",
      invitee: "Sarah Ahmad",
      date: "2023-05-01",
      validation: "Approved",
    },
    {
      id: 2,
      transId: "PAY002",
      referrer: "Jane Smith",
      Code: "PODER2025JANE",
      amount: "₦40,000",
      amountEach: "₦8,000",
      invitee: "Michael Brown",
      date: "2023-05-03",
      validation: "Approved",
    },
    {
      id: 3,
      transId: "PAY003",
      referrer: "Alice Johnson",
      Code: "PODER2025ALICE",
      amount: "₦30,000",
      amountEach: "₦6,000",
      invitee: "Emma Davis",
      date: "2023-05-05",
      validation: "Pending",
      flagged: true,
    },
    {
      id: 4,
      transId: "PAY004",
      referrer: "Bob Martin",
      Code: "PODER2025BOB",
      amount: "₦60,000",
      amountEach: "₦12,000",
      invitee: "Olivia Wilson",
      date: "2023-05-07",
      validation: "Approved",
    },
    {
      id: 5,
      transId: "PAY005",
      referrer: "Charlie Lee",
      Code: "PODER2025CHARLIE",
      amount: "₦25,000",
      amountEach: "₦5,000",
      invitee: "Liam Johnson",
      date: "2023-05-09",
      validation: "Rejected",
    },
    {
      id: 6,
      transId: "PAY006",
      referrer: "David Kim",
      Code: "PODER2025DAVID",
      amount: "₦70,000",
      amountEach: "₦14,000",
      invitee: "Sophia Martinez",
      date: "2023-05-11",
      validation: "Approved",
    },
    {
      id: 7,
      transId: "PAY007",
      referrer: "Ella Brown",
      Code: "PODER2025ELLA",
      amount: "₦35,000",
      amountEach: "₦7,000",
      invitee: "Noah Garcia",
      date: "2023-05-13",
      validation: "Pending",
      flagged: true,
    },
    {
      id: 8,
      transId: "PAY008",
      referrer: "Frank Green",
      Code: "PODER2025FRANK",
      amount: "₦45,000",
      amountEach: "₦9,000",
      invitee: "Ava Hernandez",
      date: "2023-05-15",
      validation: "Approved",
    },
    {
      id: 9,
      transId: "PAY009",
      referrer: "Grace White",
      Code: "PODER2025GRACE",
      amount: "₦55,000",
      amountEach: "₦11,000",
      invitee: "Mason Thompson",
      date: "2023-05-17",
      validation: "Rejected",
    },
    {
      id: 10,
      transId: "PAY010",
      referrer: "Henry Black",
      Code: "PODER2025HENRY",
      amount: "₦80,000",
      amountEach: "₦16,000",
      invitee: "Isabella Robinson",
      date: "2023-05-19",
      validation: "Approved",
    },
  ]);

  const openDetails = (item) => {
    setSelected(item);
    setOpen2(true);
  };

  const closeDetails = () => {
    setOpen2(false);
    setSelected(null);
  };

  const handleProcessAll = () => {
    setShowConfirm(true);
  };

  const confirmProcessAll = () => {
    const amountToProcess = pendingAmount;
    setMonthlyAmount(prev => prev + amountToProcess);
    setPendingAmount(0);
    setShowConfirm(false);
    setToast({ 
      show: true, 
      message: `₦${amountToProcess.toLocaleString()} processed successfully!`, 
      type: 'success' 
    });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const filteredPayouts = payouts.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.transId.toLowerCase().includes(query) ||
      item.referrer.toLowerCase().includes(query) ||
      item.Code.toLowerCase().includes(query) ||
      item.invitee.toLowerCase().includes(query) ||
      item.validation.toLowerCase().includes(query)
    );
  });

  const pendingCount = payouts.filter(item => item.validation === 'Pending').length;

  const handleApprove = () => {
    if (selected) {
      setPayouts(prev => 
        prev.map(item => 
          item.id === selected.id 
            ? { ...item, validation: 'Approved' } 
            : item
        )
      );
      setToast({ 
        show: true, 
        message: `Payout ${selected.transId} approved successfully!`, 
        type: 'success' 
      });
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      closeDetails();
    }
  };

  const handleReject = () => {
    if (selected) {
      setPayouts(prev => 
        prev.map(item => 
          item.id === selected.id 
            ? { ...item, validation: 'Rejected' } 
            : item
        )
      );
      setToast({ 
        show: true, 
        message: `Payout ${selected.transId} rejected!`, 
        type: 'error' 
      });
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      closeDetails();
    }
  };
  return (
    <div className="content-panel">
      <h4 className={styles.payoutHead}>Payout Control</h4>
      <Div className="pending-cards">
        <Div className="pending-card">
          <h4>Pending Payouts</h4>
          <h4>₦{pendingAmount.toLocaleString()}</h4>
          <p>9 users eligible</p>
        </Div>
        <Div className="pending-card pending-card2">
          <h4>This Month</h4>
          <h4>₦{monthlyAmount.toLocaleString()}</h4>
          <p>25 payouts</p>
        </Div>
      </Div>

      <Div className="pending-buttons">
        <button 
          className={styles.payoutButton1} 
          onClick={handleProcessAll}
          disabled={pendingAmount === 0}
          style={{ opacity: pendingAmount === 0 ? 0.5 : 1, cursor: pendingAmount === 0 ? 'not-allowed' : 'pointer' }}
        >
          Process All Pending Payouts
        </button>
        <button className={styles.payoutButton2} onClick={() => setOpen(true)}>
          Review Individual Payouts
        </button>
      </Div>

      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Individual Payout Review"
        width="60%"
      >
        <Div className="search-bar-and-pending-count">
          <Div className="search-bar">
            <input
              type="search"
              placeholder="Search User product, or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Div>
          <p>{pendingCount} pending review</p>
        </Div>

        {filteredPayouts.map((item) => (
          <Div key={item.id} className="payout-card">
            <Div className="payout-head flexRow">
              <Div className="transId-flagged flexRow">
                <h4>{item.transId}</h4>
                {item.flagged && <p className={styles.flagged}>Flagged</p>}
              </Div>
              <p
                className={`${styles.status} ${
                  item.validation === "Approved"
                    ? styles.approved
                    : item.validation === "Pending"
                    ? styles.pending
                    : styles.rejected
                }`}
              >
                {item.validation}
              </p>
            </Div>
            <Div className="payout-body flexRow">
              <Div className="payout-right">
                <p>Referrer: {item.referrer}</p>
                <p>Code: {item.Code}</p>
                <p className={styles.payoutAmount} style={{ fontSize: "18px" }}>
                  {item.amount} <span>({item.amountEach}Each)</span>
                </p>
              </Div>
              <Div className="payout-left">
                <p>Invitee: {item.invitee}</p>
                <p>Date: {item.date}</p>
                <button onClick={() => openDetails(item)}>Details</button>{" "}
              </Div>
            </Div>
          </Div>
        ))}
      </CustomModal>

      <CustomModal
        isOpen={open2}
        onClose={closeDetails}
        title={
          selected ? `Payout Details ${selected.transId}` : "Payout Details"
        }
        width="50%"
      >
        {selected ? (
          <div className={styles.detailsContainer}>
            <div className={styles.detailsHeader}>
              <div className={styles.detailsLeft}>
                <h3 className={styles.referrerName}>{selected.referrer}</h3>
                <p className={styles.muted}>Referrer</p>
                <p className={styles.inviteeName}>{selected.invitee}</p>
                <p className={styles.muted}>Invitee</p>
              </div>

              <div className={styles.detailsRight}>
                <p className={styles.amountGreen}>{selected.amount}</p>
                <p className={styles.muted}>Total Payout Amount</p>
              </div>
            </div>

            <div className={styles.detailsList}>
              <p>• Referrer bonus: {selected.amountEach}</p>
              <p>• Invitee bonus: {selected.amountEach}</p>
            </div>

            {/* Flagged box (only render if selected.flagged) */}
            {selected.flagged && (
              <div className={styles.flaggedBox}>
                <div className={styles.flagIcon}>!</div>
                <div className={styles.flaggedContent}>
                  <p className={styles.flaggedTitle}>Flagged for review:</p>
                  <p className={styles.flaggedText}>
                    Same IP address used for signup
                  </p>
                </div>
              </div>
            )}

            {/* Extra details section */}
            <div className={styles.moreDetails}>
              <p>
                <strong>Transaction ID:</strong> {selected.transId}
              </p>
              <p>
                <strong>Code:</strong> {selected.Code}
              </p>
              <p>
                <strong>Status:</strong> {selected.validation}
              </p>
              <p>
                <strong>Date:</strong> {selected.date}
              </p>
            </div>

            {selected.validation === 'Pending' && (
              <div className={styles.actionsRow}>
          
                <button 
                  className={`${styles.btn} ${styles.btnApprove}`}
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button 
                  className={`${styles.btn} ${styles.btnReject}`}
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No payout selected.</p>
        )}
      </CustomModal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmProcessAll}
        title="Process All Pending Payouts"
        message={`Are you sure you want to process all pending payouts (₦${pendingAmount.toLocaleString()})? This action cannot be undone.`}
      />

      {toast.show && toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default Payouts;
