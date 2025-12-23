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

    </div>
  );
};

export default ManualAssignment;
