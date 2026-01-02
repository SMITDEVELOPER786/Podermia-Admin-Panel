import React, { useState } from 'react';
import styles from '../css/SystemSetting.module.css';
import { Database, Server, Globe, Shield } from 'lucide-react';
import Toast from '../components/Toast/Toast';
import FilterSearch from '../components/FilterSearch/FilterSearch';

const SystemHealth = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  const [filters, setFilters] = useState({
    date: ''
  });

  const [healthData] = useState({
    database: { status: 'Online', health: 98 },
    apiServer: { status: 'Healthy', health: 95 },
    externalApis: { status: 'Connected', health: 92 },
    security: { status: 'Secure', health: 100 }
  });

  // Filter Configuration
  const filterConfig = {
    showSearch: false,
    showDate: true,
    dropdowns: []
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would filter health data based on date
    // For now, we'll just update the filter state
  };

  const getHealthColor = () => {
    return '#3b82f6';
  };

  return (
    <div className={styles.systemHealthContainer}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      {/* Header Section */}
      <div className={styles.healthHeader}>
        <div>
          <h2>System Health & Monitoring</h2>
          <p className={styles.subtitle}>Monitor system components and performance</p>
        </div>
      </div>

      {/* Date Filter */}
      <div style={{ marginBottom: '24px' }}>
        <FilterSearch config={filterConfig} onFilterChange={handleFilterChange} />
      </div>

      {/* System Health Cards */}
      <div className={styles.healthCardsGrid}>
        <div className={styles.healthCard}>
          <Database size={48} color="#2563eb" />
          <h3>Database</h3>
          <p className={styles.statusOnline}>{healthData.database.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.database.health}%`,
                backgroundColor: getHealthColor(healthData.database.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.database.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Server size={48} color="#2563eb" />
          <h3>API Server</h3>
          <p className={styles.statusHealthy}>{healthData.apiServer.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.apiServer.health}%`,
                backgroundColor: getHealthColor(healthData.apiServer.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.apiServer.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Globe size={48} color="#2563eb" />
          <h3>External APIs</h3>
          <p className={styles.statusConnected}>{healthData.externalApis.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.externalApis.health}%`,
                backgroundColor: getHealthColor(healthData.externalApis.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.externalApis.health}% Health</span>
        </div>

        <div className={styles.healthCard}>
          <Shield size={48} color="#2563eb" />
          <h3>Security</h3>
          <p className={styles.statusSecure}>{healthData.security.status}</p>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthFill} 
              style={{ 
                width: `${healthData.security.health}%`,
                backgroundColor: getHealthColor(healthData.security.health)
              }}
            />
          </div>
          <span className={styles.healthPercent}>{healthData.security.health}% Health</span>
        </div>
      </div>

    </div>
  );
};

export default SystemHealth;
