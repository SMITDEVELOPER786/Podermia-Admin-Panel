import React, { useState } from 'react';
import styles from '../../css/SupportSystem.module.css';
import Toast from '../../components/Toast/Toast';

const AutoAssignment = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  
  const [tickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Unable to complete KYC verification - Document upload failing',
      customer: 'John Smith',
      customerType: 'Premium',
      category: 'KYC',
      priority: 'High',
      estTime: '4 hours',
      recommendedAgent: 'Mike Wilson',
      agentLoad: '8/15'
    },
    {
      id: 'TKT-002',
      subject: 'Transaction failed but amount debited from wallet',
      customer: 'Sarah Johnson',
      customerType: 'Standard',
      category: 'Wallet',
      priority: 'Critical',
      estTime: '2 hours',
      recommendedAgent: 'Emily Davis',
      agentLoad: '12/20'
    },
    {
      id: 'TKT-003',
      subject: 'Investment returns calculation seems incorrect',
      customer: 'David Brownsd',
      customerType: 'Premium',
      category: 'Investment',
      priority: 'Medium',
      estTime: '6 hours',
      recommendedAgent: 'No suitable agent',
      agentLoad: ''
    }
  ]);

  const [rules, setRules] = useState({
    enableAutoAssignment: false,
    categoryBasedRouting: false,
    workloadBalancing: false,
    priorityWeighting: false,
    customerTypePreference: false,
    timeZoneConsideration: false,
    roundRobinFallback: false,
    skillMatching: false
  });

  const [weights, setWeights] = useState({
    skillMatch: 40,
    responseTime: 20,
    workload: 25,
    satisfaction: 15
  });

  const [escalation, setEscalation] = useState({
    kyc: 15,
    wallet: 15,
    loan: 15,
    investment: 15,
    technical: 15
  });

  const handleToggle = (key) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleWeightChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    setWeights(prev => ({ ...prev, [key]: numValue }));
  };

  const handleEscalationChange = (key, value) => {
    setEscalation(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  const handleResetRules = () => {
    setRules({
      enableAutoAssignment: false,
      categoryBasedRouting: false,
      workloadBalancing: false,
      priorityWeighting: false,
      customerTypePreference: false,
      timeZoneConsideration: false,
      roundRobinFallback: false,
      skillMatching: false
    });
    setWeights({
      skillMatch: 40,
      responseTime: 20,
      workload: 25,
      satisfaction: 15
    });
    setEscalation({
      kyc: 15,
      wallet: 15,
      loan: 15,
      investment: 15,
      technical: 15
    });
    setToast({ show: true, message: 'All rules have been reset to default values', type: 'success', title: 'Reset Complete' });
  };

  const handleSaveSettings = () => {
    setToast({ show: true, message: 'Assignment settings saved successfully', type: 'success', title: 'Settings Saved' });
  };

  return (
    <div className={styles.autoAssignmentContent}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      <div className={styles.autoConfigSection}>
        <h3>Auto-Assignment Rules & Configuration</h3>
        <div className={styles.autoConfigGrid}>
          <div className={styles.rulesColumn}>
            <h4>Assignment Rules</h4>
            <div className={styles.rulesList}>
              <div className={styles.ruleItem}>
                <div>
                  <h5>Enable Auto Assignment</h5>
                  <p>Enable automatic ticket assignment</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.enableAutoAssignment}
                    onChange={() => handleToggle('enableAutoAssignment')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Category Based Routing</h5>
                  <p>Route tickets based on category specialization</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.categoryBasedRouting}
                    onChange={() => handleToggle('categoryBasedRouting')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Workload Balancing</h5>
                  <p>Match tickets to agent skills</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.workloadBalancing}
                    onChange={() => handleToggle('workloadBalancing')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Priority Weighting</h5>
                  <p>Consider VIP/Premium customer preferences</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.priorityWeighting}
                    onChange={() => handleToggle('priorityWeighting')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Customer Type Preference</h5>
                  <p>Consider VIP/Premium customer preferences</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.customerTypePreference}
                    onChange={() => handleToggle('customerTypePreference')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Time Zone Consideration</h5>
                  <p>Consider agent time zones</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.timeZoneConsideration}
                    onChange={() => handleToggle('timeZoneConsideration')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Round Robin Fallback</h5>
                  <p>Use round-robin when criteria are equal</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.roundRobinFallback}
                    onChange={() => handleToggle('roundRobinFallback')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.ruleItem}>
                <div>
                  <h5>Skill Matching</h5>
                  <p>Match tickets to agent skills</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={rules.skillMatching}
                    onChange={() => handleToggle('skillMatching')}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.weightsColumn}>
            <h4>Assignment Criteria Weight</h4>
            <div className={styles.weightsList}>
              <div className={styles.weightItem}>
                <label>Skill Match Weight ({weights.skillMatch}%)</label>
                <div className={styles.weightInputWrapper}>
                  <input
                    type="text"
                    value={weights.skillMatch}
                    onChange={(e) => handleWeightChange('skillMatch', e.target.value)}
                    className={styles.weightInput}
                  />
                </div>
              </div>

              <div className={styles.weightItem}>
                <label>Response Time Weight ({weights.responseTime}%)</label>
                <div className={styles.weightInputWrapper}>
                  <input
                    type="text"
                    value={weights.responseTime}
                    onChange={(e) => handleWeightChange('responseTime', e.target.value)}
                    className={styles.weightInput}
                  />
                </div>
              </div>

              <div className={styles.weightItem}>
                <label>Workload Weight ({weights.workload}%)</label>
                <div className={styles.weightInputWrapper}>
                  <input
                    type="text"
                    value={weights.workload}
                    onChange={(e) => handleWeightChange('workload', e.target.value)}
                    className={styles.weightInput}
                  />
                </div>
              </div>

              <div className={styles.weightItem}>
                <label>Customer Satisfaction Weight ({weights.satisfaction}%)</label>
                <div className={styles.weightInputWrapper}>
                  <input
                    type="text"
                    value={weights.satisfaction}
                    onChange={(e) => handleWeightChange('satisfaction', e.target.value)}
                    className={styles.weightInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.escalationSection}>
        <h3>Escalation Rules & Timeframes</h3>
        <p className={styles.escalationDesc}>Automatically escalates tickets if not resolved within set wireframes</p>
        <div className={styles.escalationGrid}>
          <div className={styles.escalationItem}>
            <label>KYC (hours)</label>
            <input
              type="number"
              value={escalation.kyc}
              onChange={(e) => handleEscalationChange('kyc', e.target.value)}
              className={styles.escalationInput}
            />
          </div>
          <div className={styles.escalationItem}>
            <label>Wallet (hours)</label>
            <input
              type="number"
              value={escalation.wallet}
              onChange={(e) => handleEscalationChange('wallet', e.target.value)}
              className={styles.escalationInput}
            />
          </div>
          <div className={styles.escalationItem}>
            <label>Loan (hours)</label>
            <input
              type="number"
              value={escalation.loan}
              onChange={(e) => handleEscalationChange('loan', e.target.value)}
              className={styles.escalationInput}
            />
          </div>
          <div className={styles.escalationItem}>
            <label>Investment (hours)</label>
            <input
              type="number"
              value={escalation.investment}
              onChange={(e) => handleEscalationChange('investment', e.target.value)}
              className={styles.escalationInput}
            />
          </div>
          <div className={styles.escalationItem}>
            <label>Technical (hours)</label>
            <input
              type="number"
              value={escalation.technical}
              onChange={(e) => handleEscalationChange('technical', e.target.value)}
              className={styles.escalationInput}
            />
          </div>
        </div>

        <div className={styles.escalationActions}>
          <button className={styles.resetRulesBtn} onClick={handleResetRules}>
            Reset Rules
          </button>
          <button className={styles.saveSettingsBtn} onClick={handleSaveSettings}>
            Save Assignment Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoAssignment;
