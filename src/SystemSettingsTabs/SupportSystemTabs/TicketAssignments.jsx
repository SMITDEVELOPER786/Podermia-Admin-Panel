import React, { useState } from 'react';
import styles from '../../css/SupportSystem.module.css';
import ManualAssignment from './ManualAssignment';
import AutoAssignment from './AutoAssignment';

const TicketAssignments = () => {
  const [activeMode, setActiveMode] = useState('manual');

  const kpiData = [
    { label: 'Total Agents', value: '4', color: '#dc2626' },
    { label: 'Available', value: '2', color: '#16a34a' },
    { label: 'Unassigned', value: '3', color: '#f59e0b' },
    { label: 'Avg Load', value: '64%', color: '#2563eb' },
    { label: 'At Capacity', value: '1', color: '#dc2626' }
  ];

  return (
    <div className={styles.ticketAssignmentsContainer}>
      <h2>Ticket Assignment</h2>

      {/* KPI Cards */}
      <div className={styles.kpiCardsGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <h4>{kpi.label}</h4>
            <p style={{ color: kpi.color }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Assignment Mode Section */}
      <div className={styles.assignmentModeSection}>
        <h3>Manual Auto-Ticket</h3>
        <div className={styles.modeButtons}>
          <span>Assignment Mode:</span>
          <button
            className={`${styles.modeBtn} ${activeMode === 'manual' ? styles.activeModeBtn : ''}`}
            onClick={() => setActiveMode('manual')}
          >
            Manual Assignment
          </button>
          <button
            className={`${styles.modeBtn} ${activeMode === 'auto' ? styles.activeModeBtn : ''}`}
            onClick={() => setActiveMode('auto')}
          >
            Auto Assignment
          </button>
        </div>

        {/* Render Active Component */}
        {activeMode === 'manual' ? <ManualAssignment /> : <AutoAssignment />}
      </div>
    </div>
  );
};

export default TicketAssignments;
