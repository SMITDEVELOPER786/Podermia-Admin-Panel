import React, { useState } from 'react';
import styles from '../../css/SupportSystem.module.css';
import DataTables from '../../components/DataTable/DataTables';
import Toast from '../../components/Toast/Toast';

const ManualAssignment = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
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

  const [agents] = useState([
    {
      name: 'Mike Wilson',
      department: 'Technical Support',
      shift: '9 AM - 6 PM (WAT)',
      workLoad: '8/15',
      response: '2.5 Hours',
      resolution: '94%',
      satisfaction: '4.8/5',
      specialization: ['KYC', 'Technical']
    },
    {
      name: 'Mike Wilson',
      department: 'Customer Service',
      shift: '9 AM - 6 PM (WAT)',
      workLoad: '12/20',
      response: '2.5 Hours',
      resolution: '94%',
      satisfaction: '4.8/5',
      specialization: ['Wallet', 'Technical']
    },
    {
      name: 'Mike Wilson',
      department: 'Financial Service',
      shift: '9 AM - 6 PM (WAT)',
      workLoad: '5/12',
      response: '2.5 Hours',
      resolution: '94%',
      satisfaction: '4.8/5',
      specialization: ['Investment', 'Technical']
    },
    {
      name: 'Mike Wilson',
      department: 'Technical Support',
      shift: '9 AM - 6 PM (WAT)',
      workLoad: '15/15',
      response: '2.5 Hours',
      resolution: '94%',
      satisfaction: '4.8/5',
      specialization: ['KYC', 'Technical']
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

  const handleAssign = (ticketId) => {
    setAssignedTickets(prev => [...prev, ticketId]);
  };

  const ticketColumns = [
    {
      header: () => <input type="checkbox" />,
      key: 'checkbox',
      render: () => <input type="checkbox" />
    },
    { header: 'Ticket ID', key: 'id' },
    { header: 'Subject', key: 'subject' },
    {
      header: 'Customer',
      key: 'customer',
      render: (row) => (
        <div>
          <div>{row.customer}</div>
          <div className={styles.customerType}>{row.customerType}</div>
        </div>
      )
    },
    { header: 'Category', key: 'category' },
    {
      header: 'Priority',
      key: 'priority',
      render: (row) => (
        <span className={styles[`priority${row.priority}`]}>{row.priority}</span>
      )
    },
    { header: 'Est. Time', key: 'estTime' },
    {
      header: 'Recommended Agent',
      key: 'recommendedAgent',
      render: (row) => (
        <div>
          <div>{row.recommendedAgent}</div>
          {row.agentLoad && <div className={styles.agentLoad}>Load: {row.agentLoad}</div>}
        </div>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        assignedTickets.includes(row.id) ? (
          <span className={styles.assignedText}>Assigned</span>
        ) : (
          <button className={styles.assignBtn} onClick={() => handleAssign(row.id)}>Assign</button>
        )
      )
    }
  ];

  return (
    <div className={styles.assignmentContent}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      <div className={styles.unassignedSection}>
        <h3>Unassigned Tickets(3)</h3>
        <DataTables columns={ticketColumns} data={tickets} itemsPerPage={10} />
      </div>

      <div className={styles.agentSection}>
        <h3>Agent Availability & Performance</h3>
        <div className={styles.agentGrid}>
          {agents.map((agent, index) => (
            <div key={index} className={styles.agentCard}>
              <div className={styles.agentHeader}>
                <h4>{agent.name}</h4>
                <p>{agent.department}</p>
                <p className={styles.shift}>{agent.shift}</p>
              </div>
              <div className={styles.workLoadSection}>
                <div className={styles.workLoadHeader}>
                  <span>Work Load</span>
                  <span>{agent.workLoad}</span>
                </div>
                <div className={styles.workLoadBar}>
                  <div 
                    className={styles.workLoadFill} 
                    style={{ width: `${(parseInt(agent.workLoad.split('/')[0]) / parseInt(agent.workLoad.split('/')[1])) * 100}%` }}
                  />
                </div>
              </div>
              <div className={styles.agentMetrics}>
                <div>
                  <span>Response</span>
                  <span>{agent.response}</span>
                </div>
                <div>
                  <span>Resolution</span>
                  <span>{agent.resolution}</span>
                </div>
                <div>
                  <span>Satisfaction</span>
                  <span>{agent.satisfaction}</span>
                </div>
              </div>
              <div className={styles.specialization}>
                <span>Specialization</span>
                <div className={styles.specializationTags}>
                  {agent.specialization.map((spec, i) => (
                    <span key={i} className={styles.specTag}>{spec}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Assignment Rules & Configuration */}
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

      {/* Escalation Rules & Timeframes */}
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

export default ManualAssignment;
