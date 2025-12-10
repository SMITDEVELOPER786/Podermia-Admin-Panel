import React, { useState } from 'react';
import styles from '../css/SystemSetting.module.css';
import DataTable from '../components/DataTable/DataTables';
import CustomModal from '../components/CustomModal/CustomModal';
import Toast from '../components/Toast/Toast';
import { Bell, Mail, MessageSquare, Shield, CreditCard, RotateCcw, Save } from 'lucide-react';

const Notifications = () => {
  // Notification Settings Toggle States
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  // Event Triggers Toggle States
  const [kycApproved, setKycApproved] = useState(true);
  const [deposit, setDeposit] = useState(true);
  const [withdrawal, setWithdrawal] = useState(false);
  const [newSavings, setNewSavings] = useState(true);
  const [newLoans, setNewLoans] = useState(true);
  const [newInvestment, setNewInvestment] = useState(true);
  const [failedTransaction, setFailedTransaction] = useState(true);
  const [loanRepayment, setLoanRepayment] = useState(false);
  const [generalNotification, setGeneralNotification] = useState(true);
  const [investmentMaturity, setInvestmentMaturity] = useState(true);

  // Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateContent, setTemplateContent] = useState('');
  const [actionButtonText, setActionButtonText] = useState('');
  const [actionButtonLink, setActionButtonLink] = useState('');

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Notification Templates Data
  const [templates, setTemplates] = useState([
    {
      name: 'KYC Approved Template',
      content: 'Hello {user_name}, your KYC has been Approved',
      type: 'KYC Approved'
    },
    {
      name: 'Transaction Alert Template',
      content: 'Transaction of {amount} has been processed for {user_name}',
      type: 'Transaction Alert'
    },
    {
      name: 'Deposits Template',
      content: 'Your deposit of {amount} has been successfully processed. Thank you for choosing PoderMonie.',
      type: 'Deposit'
    },
    {
      name: 'New Investment Template',
      content: 'Congratulations! Your investment of {amount} in {investment_type} has been created successfully.',
      type: 'New Investment'
    },
    {
      name: 'New Loan Template',
      content: 'Your loan application for {amount} has been approved. Loan ID: {loan_id}',
      type: 'New Loans'
    },
    {
      name: 'Failed Transactions Template',
      content: 'Your transaction of {amount} has failed. Please try again or contact support if the issue persists.',
      type: 'Failed Transaction'
    },
    {
      name: 'General Notification Template',
      content: 'Important update from PoderMonie: {message}',
      actionButton: 'Learn More',
      actionLink: 'https://example.com',
      type: 'General Notification'
    },
    {
      name: 'Loan Repayment Template',
      content: 'Reminder: Your loan repayment of {amount} is due on {due_date}. Loan ID: {loan_id}',
      type: 'Loan repayment'
    },
    {
      name: 'Investment Maturity Template',
      content: 'Your investment in {investment_type} has matured. Total amount: {amount} is now available in your account.',
      type: 'Investment Maturity'
    },
    {
      name: 'Fixed Savings Maturity Template',
      content: 'Your fixed savings plan has matured! Amount of {amount} plus interest is now available.',
      type: 'New Savings'
    },
    {
      name: 'Goal Savings Maturity Template',
      content: "Congratulations! You've reached your savings goal of {amount}. Well done on your financial discipline!",
      type: 'New Savings'
    }
  ]);

  // Delivery Logs Data
  const deliveryLogs = [
    {
      channel: 'Email',
      recipient: 'user@example.com',
      type: 'KYC Approved',
      status: 'delivered',
      opened: 'Yes',
      timestamp: '1/15/2024, 3:30:00 PM'
    },
    {
      channel: 'SMS',
      recipient: '+1234567890',
      type: 'Transaction Alert',
      status: 'Failed',
      opened: 'No',
      timestamp: '1/15/2024, 3:25:00 PM'
    },
    {
      channel: 'IN-App',
      recipient: 'user123',
      type: 'New Savings',
      status: 'delivered',
      opened: 'Yes',
      timestamp: '1/15/2024, 3:20:00 PM'
    }
  ];

  // Handle Edit Template
  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateContent(template.content);
    setActionButtonText(template.actionButton || '');
    setActionButtonLink(template.actionLink || '');
    setEditModalOpen(true);
  };

  // Handle Reset to Default
  const handleResetToDefault = () => {
    setEmailAlerts(true);
    setSmsAlerts(true);
    setSecurityAlerts(true);
    setTransactionAlerts(true);
    setKycApproved(true);
    setDeposit(true);
    setWithdrawal(false);
    setNewSavings(true);
    setNewLoans(true);
    setNewInvestment(true);
    setFailedTransaction(true);
    setLoanRepayment(false);
    setGeneralNotification(true);
    setInvestmentMaturity(true);
    setToastMessage('All settings have been reset to default values.');
    setShowToast(true);
  };

  // Handle Save All Changes
  const handleSaveAllChanges = () => {
    console.log('Saving all notification settings:', {
      emailAlerts,
      smsAlerts,
      securityAlerts,
      transactionAlerts,
      kycApproved,
      deposit,
      withdrawal,
      newSavings,
      newLoans,
      newInvestment,
      failedTransaction,
      loanRepayment,
      generalNotification,
      investmentMaturity
    });
    setToastMessage('All notification settings have been saved successfully.');
    setShowToast(true);
  };

  // Handle Save Template
  const handleSaveTemplate = () => {
    const updatedTemplates = templates.map(template => 
      template.name === selectedTemplate.name
        ? {
            ...template,
            content: templateContent,
            actionButton: actionButtonText || template.actionButton,
            actionLink: actionButtonLink || template.actionLink
          }
        : template
    );
    
    setTemplates(updatedTemplates);
    setEditModalOpen(false);
    setToastMessage('Template updated successfully!');
    setShowToast(true);
  };

  // DataTable Columns for Delivery Logs
  const deliveryLogColumns = [
    { header: 'Channel', key: 'channel' },
    { header: 'Recipient', key: 'recipient' },
    { header: 'Type', key: 'type' },
    {
      header: 'Status',
      key: 'status',
      styleMap: {
        delivered: styles.statusSuccess,
        Failed: styles.statusFailed
      }
    },
    {
      header: 'Opened',
      key: 'opened',
      render: (row) => (
        <span className={row.opened === 'Yes' ? styles.openedBadgeYes : styles.openedBadgeNo}>
          {row.opened}
        </span>
      )
    },
    { header: 'Time Stamp', key: 'timestamp' }
  ];

  return (
    <div className={styles.generalSettingContainer}>
      {/* Header */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Notification Settings</h3>
            <p className={styles.sectionSubtitle}>Configure notification channels and event triggers</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetBtn} onClick={handleResetToDefault}>
              <RotateCcw size={16} /> Reset to Default
            </button>
            <button className={styles.saveBtn} onClick={handleSaveAllChanges}>
              <Save size={16} /> Save all Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={styles.notificationSettingsWrapper}>
          <div className={styles.notificationHeader}>
            <Bell size={20} />
            <h3 className={styles.notificationTitle}>Notification Settings</h3>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleIconWrapper}>
              <Mail size={18} />
              <div>
                <h4>Email Alerts</h4>
              </div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleIconWrapper}>
              <MessageSquare size={18} />
              <div>
                <h4>SMS Alerts</h4>
              </div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleIconWrapper}>
              <Shield size={18} />
              <div>
                <h4>Security Alerts</h4>
              </div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={securityAlerts}
                onChange={() => setSecurityAlerts(!securityAlerts)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleIconWrapper}>
              <CreditCard size={18} />
              <div>
                <h4>Transaction Alerts</h4>
              </div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={transactionAlerts}
                onChange={() => setTransactionAlerts(!transactionAlerts)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>

        {/* Event Triggers */}
        <div>
          <h3 className={styles.eventTriggersTitle}>Event Triggers</h3>
          <div className={styles.apiGrid}>
            <div className={styles.apiToggleCard}>
              <div>
                <h4>KYC Approved</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={kycApproved}
                  onChange={() => setKycApproved(!kycApproved)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>Deposit</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={deposit}
                  onChange={() => setDeposit(!deposit)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>Withdrawal</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={withdrawal}
                  onChange={() => setWithdrawal(!withdrawal)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>New Savings</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={newSavings}
                  onChange={() => setNewSavings(!newSavings)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>New Loans</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={newLoans}
                  onChange={() => setNewLoans(!newLoans)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>New Investment</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={newInvestment}
                  onChange={() => setNewInvestment(!newInvestment)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>Failed Transaction</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={failedTransaction}
                  onChange={() => setFailedTransaction(!failedTransaction)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>Loan repayment</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={loanRepayment}
                  onChange={() => setLoanRepayment(!loanRepayment)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>General Notification</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={generalNotification}
                  onChange={() => setGeneralNotification(!generalNotification)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.apiToggleCard}>
              <div>
                <h4>Investment Maturity</h4>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={investmentMaturity}
                  onChange={() => setInvestmentMaturity(!investmentMaturity)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Templates */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Notification Templates</h3>
            <p className={styles.sectionSubtitle}>Manage notification message templates</p>
          </div>
        </div>
        
        <div className={styles.templatesList}>
          {templates.map((template, index) => (
            <div key={index} className={styles.templateCard}>
              <div className={styles.templateContent}>
                <h4 className={styles.templateName}>{template.name}</h4>
                <p className={styles.templateText}>{template.content}</p>
                {template.actionButton && (
                  <p className={styles.templateAction}>
                    Action Button: "{template.actionButton}" -&gt; {template.actionLink}
                  </p>
                )}
              </div>
              <button className={styles.editTemplateBtn} onClick={() => handleEditTemplate(template)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Logs */}
      <div className={styles.settingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Delivery Logs</h3>
            <p className={styles.sectionSubtitle}>Track notification delivery status and user interactions</p>
          </div>
        </div>
        <DataTable
          columns={deliveryLogColumns}
          data={deliveryLogs}
          scrollHeight={400}
        />
      </div>

      {/* Edit Template Modal */}
      <CustomModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Edit Template: ${selectedTemplate?.name || ''}`}
        width="600px"
        showClose={true}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Template Content</label>
            <textarea
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              rows={4}
              className={styles.modalTextarea}
            />
          </div>

          {selectedTemplate?.actionButton && (
            <>
              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Action Button Text</label>
                <input
                  type="text"
                  value={actionButtonText}
                  onChange={(e) => setActionButtonText(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Action Button Link</label>
                <input
                  type="text"
                  value={actionButtonLink}
                  onChange={(e) => setActionButtonLink(e.target.value)}
                  className={styles.modalInput}
                />
              </div>
            </>
          )}

          <div className={styles.modalFooter}>
            <button className={styles.closeBtn} onClick={() => setEditModalOpen(false)}>
              Close
            </button>
            <button className={styles.saveBtn} onClick={handleSaveTemplate}>
              Save Template
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Success Toast */}
      {showToast && (
        <Toast
          type="success"
          title="Success!"
          message={toastMessage}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default Notifications;
