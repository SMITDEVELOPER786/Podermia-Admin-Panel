import React, { useState } from "react";
import styles from "../../css/AdminReferrals.module.css";
import { TriangleAlertIcon, AlertTriangle, X } from "lucide-react";
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

const FraudMonitor = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [reviewNotes, setReviewNotes] = useState("");

  // Mock data for each fraud type
  const getCaseData = (alertType) => {
    const mockData = {
      "Duplicate BVN detected": {
        caseId: "FD-001",
        alertType: "Duplicate BVN detected",
        userId: "12345",
        severity: "HIGH SEVERITY",
        detectedTime: "2 hours ago",
        status: "pending",
        ipMatch: "85% Similar",
        deviceFingerprint: "92% Match",
        signupVelocity: "5 accounts/hour",
        totalReferrals: "12 users",
        conversionRate: "8% (suspiciously low)",
        accountAge: "3 days"
      },
      "Same Device/IP detected": {
        caseId: "FD-002",
        alertType: "Same Device/IP detected",
        userId: "67890",
        severity: "HIGH SEVERITY",
        detectedTime: "5 hours ago",
        status: "pending",
        ipMatch: "95% Similar",
        deviceFingerprint: "98% Match",
        signupVelocity: "8 accounts/hour",
        totalReferrals: "15 users",
        conversionRate: "5% (suspiciously low)",
        accountAge: "2 days"
      },
      "Rapid Signups detected": {
        caseId: "FD-003",
        alertType: "Rapid Signups detected",
        userId: "11111",
        severity: "HIGH SEVERITY",
        detectedTime: "1 hour ago",
        status: "pending",
        ipMatch: "78% Similar",
        deviceFingerprint: "85% Match",
        signupVelocity: "12 accounts/hour",
        totalReferrals: "20 users",
        conversionRate: "3% (suspiciously low)",
        accountAge: "1 day"
      }
    };
    return mockData[alertType] || mockData["Duplicate BVN detected"];
  };

  const [data, setData] = useState([
    {
      id: 1,
      title: "Duplicate BVN detected",
      status: "review"
    },
    {
      id: 2,
      title: "Same Device/IP detected",
      status: "review"
    },
    {
      id: 3,
      title: "Rapid Signups detected",
      status: "review"
    },
  ]);

  const handleReview = (item) => {
    const caseData = getCaseData(item.title);
    setSelectedCase({ ...item, ...caseData });
    setIsModalOpen(true);
    setReviewNotes("");
  };

  const handleAction = (action) => {
    const actionMessages = {
      safe: {
        title: "Mark as Safe",
        message: "Are you sure you want to mark this user as safe? This will clear all fraud flags.",
        confirmText: "Yes, Mark as Safe"
      },
      flag: {
        title: "Flag User",
        message: "Are you sure you want to flag this user? This will suspend referral bonuses pending investigation.",
        confirmText: "Yes, Flag User"
      },
      ban: {
        title: "Ban User",
        message: "Are you sure you want to ban this user? This action cannot be undone.",
        confirmText: "Yes, Ban User"
      }
    };

    const actionData = actionMessages[action];
    setConfirmDialog({
      type: "warning",
      title: actionData.title,
      message: actionData.message,
      confirmText: actionData.confirmText,
      cancelText: "Cancel",
      onConfirm: () => {
        // Update status in data
        setData(prevData =>
          prevData.map(item =>
            item.id === selectedCase.id
              ? { ...item, status: action }
              : item
          )
        );

        // Show toast
        const toastMessages = {
          safe: {
            type: "success",
            title: "User Marked as Safe",
            message: "User has been marked as safe. All fraud flags have been cleared."
          },
          flag: {
            type: "warning",
            title: "User Flagged",
            message: "User has been flagged. Referral bonuses have been suspended."
          },
          ban: {
            type: "error",
            title: "User Banned",
            message: "User has been banned successfully."
          }
        };

        setToast(toastMessages[action]);
        setConfirmDialog(null);

        // Close modal after toast
        setTimeout(() => {
          setIsModalOpen(false);
          setSelectedCase(null);
          setReviewNotes("");
        }, 3000);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const getStatusBadge = (status) => {
    if (status === "safe") {
      return <span className={styles.statusBadgeSafe}>Safe</span>;
    } else if (status === "flag") {
      return <span className={styles.statusBadgeFlag}>Flagged</span>;
    } else if (status === "ban") {
      return <span className={styles.statusBadgeBanned}>Banned</span>;
    }
    return null; // No badge before reviewing
  };

  if (!selectedCase && isModalOpen) return null;

  return (
    <div className="content-panel">
      <h4 className={styles.fraudDetection}>Fraud Detection</h4>
      <Div className="fraud-cards">
        {data.map((item) => (
          <Div key={item.id} className="fraud-card flexRow">
            <Div className="icon flexRow">
              <TriangleAlertIcon size={25} color="#295cbf" />
            </Div>

            <Div className="cases-review-title flexRow">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h4>{item.title}</h4>
                {item.status !== "review" && getStatusBadge(item.status)}
              </div>
              <Div className="cases-review flexRow">
                <button onClick={() => handleReview(item)}>Review</button>
              </Div>
            </Div>
          </Div>
        ))}
      </Div>

      {/* Fraud Review Modal */}
      {selectedCase && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCase(null);
            setReviewNotes("");
          }}
          width="900px"
          showClose={true}
        >
          <div className={styles.fraudReviewModal}>
            {/* Header */}
            <div className={styles.fraudReviewHeader}>
              <div className={styles.fraudReviewHeaderLeft}>
                <AlertTriangle size={24} color="#9ca3af" />
                <div>
                  <h2 className={styles.fraudReviewTitle}>Fraud Review</h2>
                  <p className={styles.fraudReviewCaseId}>Case ID: {selectedCase.caseId}</p>
                </div>
              </div>
            </div>

            <div className={styles.fraudReviewDivider}></div>

            {/* Case Overview */}
            <div className={styles.fraudReviewSection}>
              <h3 className={styles.fraudReviewSectionTitle}>Case Overview</h3>
              <div className={styles.fraudReviewCard}>
                <div className={styles.fraudReviewCardHeader}>
                  <div>
                    <div className={styles.fraudReviewLabel}>Alert Type</div>
                    <div className={styles.fraudReviewValue}>{selectedCase.alertType}</div>
                  </div>
                  <span className={styles.severityBadge}>{selectedCase.severity}</span>
                </div>
                <div className={styles.fraudReviewRow}>
                  <div>
                    <div className={styles.fraudReviewLabel}>User Information</div>
                    <div className={styles.fraudReviewValue}>User ID: {selectedCase.userId}</div>
                  </div>
                </div>
                <div className={styles.fraudReviewRowRight}>
                  <div>
                    <div className={styles.fraudReviewLabel}>Detected</div>
                    <div className={styles.fraudReviewValue}>{selectedCase.detectedTime}</div>
                  </div>
                  <div>
                    <div className={styles.fraudReviewLabel}>Status</div>
                    <div className={styles.fraudReviewValue}>{selectedCase.status}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Details */}
            <div className={styles.fraudReviewSection}>
              <h3 className={styles.fraudReviewSectionTitle}>Detection Details</h3>
              <div className={styles.fraudReviewCard}>
                <p className={styles.fraudReviewSubtitle}>Same Device/IP detected</p>
                <div className={styles.patternAnalysis}>
                  <h4 className={styles.patternAnalysisTitle}>Pattern Analysis</h4>
                  <div className={styles.fraudReviewRowRight}>
                    <div>
                      <div className={styles.fraudReviewLabel}>IP Address Match</div>
                      <div className={styles.fraudReviewValueRed}>{selectedCase.ipMatch}</div>
                    </div>
                    <div>
                      <div className={styles.fraudReviewLabel}>Device Fingerprint</div>
                      <div className={styles.fraudReviewValueRed}>{selectedCase.deviceFingerprint}</div>
                    </div>
                    <div>
                      <div className={styles.fraudReviewLabel}>Signup Velocity</div>
                      <div className={styles.fraudReviewValueOrange}>{selectedCase.signupVelocity}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Activity */}
            <div className={styles.fraudReviewSection}>
              <h3 className={styles.fraudReviewSectionTitle}>User Activity</h3>
              <div className={styles.fraudReviewCard}>
                <div className={styles.userActivityRow}>
                  <span className={styles.userActivityLabel}>Total Referrals:</span>
                  <span className={styles.userActivityValue}>{selectedCase.totalReferrals}</span>
                </div>
                <div className={styles.userActivityRow}>
                  <span className={styles.userActivityLabel}>Conversion Rate:</span>
                  <span className={styles.userActivityValue}>{selectedCase.conversionRate}</span>
                </div>
                <div className={styles.userActivityRow}>
                  <span className={styles.userActivityLabel}>Account Age:</span>
                  <span className={styles.userActivityValue}>{selectedCase.accountAge}</span>
                </div>
              </div>
            </div>

            {/* System Recommendation */}
            <div className={styles.systemRecommendation}>
              <div className={styles.systemRecommendationHeader}>
                <AlertTriangle size={20} color="#D4183D" />
                <h4 className={styles.systemRecommendationTitle}>System Recommendation</h4>
              </div>
              <p className={styles.systemRecommendationText}>
                Based on the detected patterns, we recommend flagging this user and suspending referral bonuses pending further investigation.
              </p>
            </div>

            {/* Review Notes */}
            <div className={styles.fraudReviewSection}>
              <h3 className={styles.fraudReviewSectionTitle}>Review Notes (Optional)</h3>
              <textarea
                className={styles.reviewNotesTextarea}
                placeholder="Add any notes about this review decision..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className={styles.fraudReviewActions}>
              <button
                className={styles.actionButtonSafe}
                onClick={() => handleAction("safe")}
              >
                Mark as Safe
              </button>
              <button
                className={styles.actionButtonFlag}
                onClick={() => handleAction("flag")}
              >
                Flag User
              </button>
              <button
                className={styles.actionButtonBan}
                onClick={() => handleAction("ban")}
              >
                Ban User
              </button>
            </div>
          </div>
        </CustomModal>
      )}

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
};

export default FraudMonitor;
