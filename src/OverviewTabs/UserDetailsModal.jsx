import React, { useState } from "react";
import CustomModal from "../components/CustomModal/CustomModal";
import styles from "../css/ManageUsers.module.css";
import { ExternalLink, Wallet, PiggyBank, TrendingUp, CreditCard, Shield, Users, ArrowRight } from "lucide-react";

const UserDetailsModal = ({
  isOpen,
  selectedUser,
  onClose,
  activeTab: externalActiveTab,
  setActiveTab: setExternalActiveTab,
  activeOverrideTab: externalActiveOverrideTab,
  setActiveOverrideTab: setExternalActiveOverrideTab,
  savingsOverrides,
  setSavingsOverrides,
  investmentOverrides,
  setInvestmentOverrides,
  loanOverrides,
  setLoanOverrides,
  kycOverrides,
  setKycOverrides,
  investmentProducts,
  loanProducts,
  collateralTypes,
  handleModuleNavigation,
  handleAccountAction,
  handleSecurityAction,
  handleOverrideSave
}) => {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'overview');
  const [activeOverrideTab, setActiveOverrideTab] = useState(externalActiveOverrideTab || 'savings');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (setExternalActiveTab) setExternalActiveTab(tab);
  };

  const handleOverrideTabChange = (tab) => {
    setActiveOverrideTab(tab);
    if (setExternalActiveOverrideTab) setExternalActiveOverrideTab(tab);
  };

  if (!isOpen || !selectedUser) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width="900px"
      showClose={true}
      title={<h2 className={styles.userDetailsTitle}>User Details - {selectedUser.name}</h2>}
    >
      <div className={styles.userDetailsModal}>
        <div className={styles.modalTabs}>
          <button
            className={`${styles.modalTab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === 'overrides' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('overrides')}
          >
            Overrides
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === 'security' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('security')}
          >
            Security
          </button>
        </div>

        <div className={styles.modalTabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>User Information</h3>
                <div className={styles.userDetailsContent}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>User ID:</span>
                    <span className={styles.detailValue}>{selectedUser.id}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Name:</span>
                    <span className={styles.detailValue}>{selectedUser.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>{selectedUser.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Account Type:</span>
                    <span className={`${styles.detailValue} ${styles[selectedUser.type === 'Individual' ? 'accountIndividual' : 'accountBusiness']}`}>
                      {selectedUser.type}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>KYC Status:</span>
                    <span className={`${styles.detailValue} ${styles[`kyc${selectedUser.kyc}`] || ''}`}>
                      {selectedUser.kyc}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Account Status:</span>
                    <span className={`${styles.detailValue} ${styles[`status${selectedUser.accountStatus}`] || ''}`}>
                      {selectedUser.accountStatus}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Risk Level:</span>
                    <span className={`${styles.detailValue} ${styles[`risk${selectedUser.riskLevel}`] || ''}`}>
                      {selectedUser.riskLevel}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Date Created:</span>
                    <span className={styles.detailValue}>{selectedUser.dateCreated}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Last Login:</span>
                    <span className={styles.detailValue}>{selectedUser.lastLogin}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>User Overview</h3>
                <div className={styles.moduleLinksGrid}>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Wallet')}>
                    <Wallet size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>Wallet Balance</div>
                      <div className={styles.moduleLinkValue}>{selectedUser.wallet}</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Savings')}>
                    <PiggyBank size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>Active Savings Plans</div>
                      <div className={styles.moduleLinkValue}>View Details →</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Investment')}>
                    <TrendingUp size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>Active Investments</div>
                      <div className={styles.moduleLinkValue}>View Details →</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Loan')}>
                    <CreditCard size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>Active Loans</div>
                      <div className={styles.moduleLinkValue}>View Details →</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('KYC')}>
                    <Shield size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>KYC Status</div>
                      <div className={styles.moduleLinkValue}>{selectedUser.kyc}</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                  <div className={styles.moduleLinkCard} onClick={() => handleModuleNavigation('Referral')}>
                    <Users size={24} />
                    <div>
                      <div className={styles.moduleLinkTitle}>Referral Performance</div>
                      <div className={styles.moduleLinkValue}>View Details →</div>
                    </div>
                    <ExternalLink size={16} className={styles.moduleLinkIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Quick Actions</h3>
                <div className={styles.quickActionsGrid}>
                  <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Wallet Admin')}>
                    <Wallet size={20} />
                    Open Wallet Admin
                    <ArrowRight size={16} />
                  </button>
                  <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Savings Admin')}>
                    <PiggyBank size={20} />
                    Open Savings Admin
                    <ArrowRight size={16} />
                  </button>
                  <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Investment Admin')}>
                    <TrendingUp size={20} />
                    Open Investment Admin
                    <ArrowRight size={16} />
                  </button>
                  <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('Loan Admin')}>
                    <CreditCard size={20} />
                    Open Loan Admin
                    <ArrowRight size={16} />
                  </button>
                  <button className={styles.quickActionBtn} onClick={() => handleModuleNavigation('KYC Admin')}>
                    <Shield size={20} />
                    Open KYC Admin
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Account Actions</h3>
                <div className={styles.userActionButtons}>
                  <button
                    className={styles.suspendBtn}
                    onClick={() => handleAccountAction('suspend')}
                    disabled={selectedUser.accountStatus === 'Suspended'}
                  >
                    Suspend Account
                  </button>
                  <button
                    className={styles.freezeBtn}
                    onClick={() => handleAccountAction('freeze')}
                    disabled={selectedUser.accountStatus === 'Frozen'}
                  >
                    Freeze Account
                  </button>
                  <button
                    className={styles.closeBtn}
                    onClick={() => handleAccountAction('close')}
                    disabled={selectedUser.accountStatus === 'Closed'}
                  >
                    Close Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overrides' && (
            <div className={styles.overridesTab}>
              <div className={styles.overrideSubTabs}>
                <button
                  className={`${styles.overrideSubTab} ${activeOverrideTab === 'savings' ? styles.activeSubTab : ''}`}
                  onClick={() => handleOverrideTabChange('savings')}
                >
                  Savings Vault
                </button>
                <button
                  className={`${styles.overrideSubTab} ${activeOverrideTab === 'investment' ? styles.activeSubTab : ''}`}
                  onClick={() => handleOverrideTabChange('investment')}
                >
                  Investment
                </button>
                <button
                  className={`${styles.overrideSubTab} ${activeOverrideTab === 'loan' ? styles.activeSubTab : ''}`}
                  onClick={() => handleOverrideTabChange('loan')}
                >
                  Loan
                </button>
                <button
                  className={`${styles.overrideSubTab} ${activeOverrideTab === 'kyc' ? styles.activeSubTab : ''}`}
                  onClick={() => handleOverrideTabChange('kyc')}
                >
                  KYC
                </button>
              </div>

              {activeOverrideTab === 'savings' && (
                <div className={styles.overrideSection}>
                  <h3 className={styles.sectionTitle}>Savings Vault Overrides</h3>
                  <div className={styles.overrideForm}>
                    <div className={styles.formRow}>
                      <label>Savings Goal Minimum Investment Size</label>
                      <input
                        type="text"
                        value={savingsOverrides.savingsGoalMinInvestment}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinInvestment: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Goal Minimum Balance</label>
                      <input
                        type="text"
                        value={savingsOverrides.savingsGoalMinBalance}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinBalance: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Goal Minimum Lock-in Period</label>
                      <input
                        type="text"
                        value={savingsOverrides.savingsGoalMinLockIn}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsGoalMinLockIn: e.target.value})}
                        placeholder="Enter period"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Fixed Savings Plan Minimum Investment Size</label>
                      <input
                        type="text"
                        value={savingsOverrides.fixedSavingsMinInvestment}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinInvestment: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Fixed Savings Plan Minimum Balance</label>
                      <input
                        type="text"
                        value={savingsOverrides.fixedSavingsMinBalance}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinBalance: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Fixed Savings Plan Minimum Lock-in Period</label>
                      <input
                        type="text"
                        value={savingsOverrides.fixedSavingsMinLockIn}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, fixedSavingsMinLockIn: e.target.value})}
                        placeholder="Enter period"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Terms - Date</label>
                      <input
                        type="date"
                        value={savingsOverrides.savingsTermsDate}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsDate: e.target.value})}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Terms - Principal</label>
                      <input
                        type="text"
                        value={savingsOverrides.savingsTermsPrincipal}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsPrincipal: e.target.value})}
                        placeholder="Enter principal"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Terms - Interest</label>
                      <input
                        type="text"
                        value={savingsOverrides.savingsTermsInterest}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsInterest: e.target.value})}
                        placeholder="Enter interest"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Savings Terms - Maturity Date</label>
                      <input
                        type="date"
                        value={savingsOverrides.savingsTermsMaturityDate}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, savingsTermsMaturityDate: e.target.value})}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>
                        <input
                          type="checkbox"
                          checked={savingsOverrides.freezeEarlyTermination}
                          onChange={(e) => setSavingsOverrides({...savingsOverrides, freezeEarlyTermination: e.target.checked})}
                        />
                        Freeze Early Termination
                      </label>
                    </div>
                    <div className={styles.formRow}>
                      <label>Early Termination Penalty Rate</label>
                      <input
                        type="text"
                        value={savingsOverrides.earlyTerminationPenaltyRate}
                        onChange={(e) => setSavingsOverrides({...savingsOverrides, earlyTerminationPenaltyRate: e.target.value})}
                        placeholder="Enter penalty rate (%)"
                      />
                    </div>
                    <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Savings Vault')}>
                      Save Savings Overrides
                    </button>
                  </div>
                </div>
              )}

              {activeOverrideTab === 'investment' && (
                <div className={styles.overrideSection}>
                  <h3 className={styles.sectionTitle}>Investment Overrides</h3>
                  <div className={styles.overrideForm}>
                    <div className={styles.formRow}>
                      <label>Processing Fee</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={investmentOverrides.processingFee}
                          onChange={(e) => setInvestmentOverrides({...investmentOverrides, processingFee: e.target.value})}
                          placeholder="Enter processing fee"
                          style={{ flex: 1 }}
                        />
                        <select
                          value={investmentOverrides.processingFeeType}
                          onChange={(e) => setInvestmentOverrides({...investmentOverrides, processingFeeType: e.target.value})}
                          style={{ width: '100px' }}
                        >
                          <option value="%">%</option>
                          <option value="Flat">Flat</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Investment Product (for Processing Fee)</label>
                      <select
                        value={investmentOverrides.processingFeeProduct}
                        onChange={(e) => setInvestmentOverrides({...investmentOverrides, processingFeeProduct: e.target.value})}
                      >
                        <option value="">Select Investment Product</option>
                        {investmentProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Status Control</label>
                      <select
                        value={investmentOverrides.statusControl}
                        onChange={(e) => setInvestmentOverrides({...investmentOverrides, statusControl: e.target.value})}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Investment Product (for Status Control)</label>
                      <select
                        value={investmentOverrides.statusControlProduct}
                        onChange={(e) => setInvestmentOverrides({...investmentOverrides, statusControlProduct: e.target.value})}
                      >
                        <option value="">Select Investment Product</option>
                        {investmentProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Investment')}>
                      Save Investment Overrides
                    </button>
                  </div>
                </div>
              )}

              {activeOverrideTab === 'loan' && (
                <div className={styles.overrideSection}>
                  <h3 className={styles.sectionTitle}>Loan Overrides</h3>
                  <div className={styles.overrideForm}>
                    <div className={styles.formRow}>
                      <label>LTV per Collateral</label>
                      <input
                        type="text"
                        value={loanOverrides.ltvPerCollateral}
                        onChange={(e) => setLoanOverrides({...loanOverrides, ltvPerCollateral: e.target.value})}
                        placeholder="Enter LTV (%)"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Collateral Type (for LTV)</label>
                      <select
                        value={loanOverrides.ltvCollateralType}
                        onChange={(e) => setLoanOverrides({...loanOverrides, ltvCollateralType: e.target.value})}
                      >
                        <option value="">Select Collateral Type</option>
                        {collateralTypes.map((type, idx) => (
                          <option key={idx} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Interest Rate per Loan Product</label>
                      <input
                        type="text"
                        value={loanOverrides.interestRatePerProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, interestRatePerProduct: e.target.value})}
                        placeholder="Enter interest rate (%)"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Interest Rate)</label>
                      <select
                        value={loanOverrides.interestRateLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, interestRateLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Tenor per Loan Product</label>
                      <input
                        type="text"
                        value={loanOverrides.tenorPerProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, tenorPerProduct: e.target.value})}
                        placeholder="Enter tenor"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Tenor)</label>
                      <select
                        value={loanOverrides.tenorLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, tenorLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Amount per Loan Product</label>
                      <input
                        type="text"
                        value={loanOverrides.amountPerProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, amountPerProduct: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Amount)</label>
                      <select
                        value={loanOverrides.amountLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, amountLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Penalty Rate</label>
                      <input
                        type="text"
                        value={loanOverrides.penaltyRate}
                        onChange={(e) => setLoanOverrides({...loanOverrides, penaltyRate: e.target.value})}
                        placeholder="Enter penalty rate (%)"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Penalty Rate)</label>
                      <select
                        value={loanOverrides.penaltyLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, penaltyLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Default Rate</label>
                      <input
                        type="text"
                        value={loanOverrides.defaultRate}
                        onChange={(e) => setLoanOverrides({...loanOverrides, defaultRate: e.target.value})}
                        placeholder="Enter default rate (%)"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Default Rate)</label>
                      <select
                        value={loanOverrides.defaultLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, defaultLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Early Repayment Penalty</label>
                      <input
                        type="text"
                        value={loanOverrides.earlyRepaymentPenalty}
                        onChange={(e) => setLoanOverrides({...loanOverrides, earlyRepaymentPenalty: e.target.value})}
                        placeholder="Enter penalty (%)"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Select Loan Product (for Early Repayment Penalty)</label>
                      <select
                        value={loanOverrides.earlyRepaymentLoanProduct}
                        onChange={(e) => setLoanOverrides({...loanOverrides, earlyRepaymentLoanProduct: e.target.value})}
                      >
                        <option value="">Select Loan Product</option>
                        {loanProducts.map((product, idx) => (
                          <option key={idx} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('Loan')}>
                      Save Loan Overrides
                    </button>
                  </div>
                </div>
              )}

              {activeOverrideTab === 'kyc' && (
                <div className={styles.overrideSection}>
                  <h3 className={styles.sectionTitle}>KYC Overrides</h3>
                  <div className={styles.overrideForm}>
                    <div className={styles.formRow}>
                      <label>KYC Status</label>
                      <select
                        value={kycOverrides.kycStatus}
                        onChange={(e) => setKycOverrides({...kycOverrides, kycStatus: e.target.value})}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Complete">Complete</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>Tier</label>
                      <select
                        value={kycOverrides.tier}
                        onChange={(e) => setKycOverrides({...kycOverrides, tier: e.target.value})}
                      >
                        <option value="Tier 1">Tier 1</option>
                        <option value="Tier 2">Tier 2</option>
                        <option value="Tier 3">Tier 3</option>
                      </select>
                    </div>
                    <div className={styles.formRow}>
                      <label>
                        <input
                          type="checkbox"
                          checked={kycOverrides.temporaryAccess}
                          onChange={(e) => setKycOverrides({...kycOverrides, temporaryAccess: e.target.checked})}
                        />
                        Temporary Access Permissions
                      </label>
                    </div>
                    <div className={styles.formRow}>
                      <label>
                        <input
                          type="checkbox"
                          checked={kycOverrides.conditionalProductAccess}
                          onChange={(e) => setKycOverrides({...kycOverrides, conditionalProductAccess: e.target.checked})}
                        />
                        Conditional Product Access
                      </label>
                    </div>
                    <button className={styles.saveOverrideBtn} onClick={() => handleOverrideSave('KYC')}>
                      Save KYC Overrides
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.securityTab}>
              <h3 className={styles.sectionTitle}>User Security Controls</h3>
              <div className={styles.securityActionsGrid}>
                <button
                  className={styles.securityActionBtn}
                  onClick={() => handleSecurityAction('forcePinReset')}
                >
                  <Shield size={20} />
                  Force Transaction PIN Reset
                </button>
                <button
                  className={styles.securityActionBtn}
                  onClick={() => handleSecurityAction('forceLogout')}
                >
                  <Shield size={20} />
                  Force Logout (Invalidate Sessions)
                </button>
                <button
                  className={styles.securityActionBtn}
                  onClick={() => handleSecurityAction('blockDevice')}
                >
                  <Shield size={20} />
                  Block / Reset Device Access
                </button>
                <button
                  className={styles.securityActionBtn}
                  onClick={() => handleSecurityAction('enforce2FA')}
                >
                  <Shield size={20} />
                  Enforce Mandatory 2FA
                </button>
                <button
                  className={styles.securityActionBtn}
                  onClick={() => handleSecurityAction('flagInvestigation')}
                >
                  <Shield size={20} />
                  Flag User for Investigation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default UserDetailsModal;

