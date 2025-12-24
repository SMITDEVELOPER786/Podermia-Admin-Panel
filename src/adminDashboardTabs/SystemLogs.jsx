import React, { useState, useMemo } from 'react';
import styles from '../css/SystemLogs.module.css';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import { ArrowLeftIcon, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}


export const parseNumber = (str) => {
  if (str === null || str === undefined) return null;
  const cleaned = String(str).replace(/,/g, '').trim();
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  return parseFloat(match[0]);
};
export const isLowBad = (name) => {
  if (!name) return false;
  const key = name.toLowerCase();
  const lowBadKeywords = [
    'uptime', 'success', 'dau', 'mau', 'active', 'new signups', 'success vs failure', 'success rate'
  ];
  return lowBadKeywords.some(k => key.includes(k));
};

export const computeStatus = (metric) => {
  const { value, threshold } = metric;
  const v = parseNumber(value);
  const t = threshold !== null && threshold !== undefined ? parseNumber(threshold) : null;

  if (t === null || isNaN(t)) {
    return 'Normal';
  }
  if (v === null || isNaN(v)) {
    return metric.status || 'Normal';
  }

  const lowBad = isLowBad(metric.name);

  if (!lowBad) {
    if (v >= t) return 'Critical';
    if (v >= t * 0.9) return 'Warning';
    return 'Normal';
  } else {
    if (v <= t) return 'Critical';
    if (v <= t * 0.995) return 'Warning';
    return 'Normal';
  }
};


export const generateMetrics = () => {
  const metrics = [];

  metrics.push(
    { id: 'INF001', category: 'Infrastructure', name: 'Server Uptime', value: '99.9%', threshold: '99.5%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date().toISOString() },
    { id: 'INF002', category: 'Infrastructure', name: 'CPU Usage', value: '45%', threshold: '80%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'INF003', category: 'Infrastructure', name: 'Memory Usage', value: '72%', threshold: '70%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
    { id: 'INF004', category: 'Infrastructure', name: 'Disk I/O', value: '234 MB/s', threshold: '500 MB/s', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
    { id: 'INF005', category: 'Infrastructure', name: 'Network Latency', value: '12ms', threshold: '50ms', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 20 * 60000).toISOString() },
    { id: 'INF006', category: 'Infrastructure', name: 'Error Rate (4xx)', value: '0.2%', threshold: '1%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
    { id: 'INF007', category: 'Infrastructure', name: 'Error Rate (5xx)', value: '0.05%', threshold: '0.5%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
  );

  metrics.push(
    { id: 'APP001', category: 'Application Performance', name: 'API Response Time', value: '150ms', threshold: '100ms', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 35 * 60000).toISOString() },
    { id: 'APP002', category: 'Application Performance', name: 'API Failure Rate', value: '0.1%', threshold: '1%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 40 * 60000).toISOString() },
    { id: 'APP003', category: 'Application Performance', name: 'Request Volume - /api/payments', value: '1,234/min', threshold: '5000/min', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 45 * 60000).toISOString() },
    { id: 'APP004', category: 'Application Performance', name: 'Request Volume - /api/auth', value: '567/min', threshold: '2000/min', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 50 * 60000).toISOString() },
    { id: 'APP005', category: 'Application Performance', name: 'Timeouts', value: '2', threshold: '10', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 55 * 60000).toISOString() },
    { id: 'APP006', category: 'Application Performance', name: 'Retry Rate', value: '0.5%', threshold: '2%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
    { id: 'APP007', category: 'Application Performance', name: 'Queue Backlog Size', value: '45', threshold: '100', status: 'Normal', sourceService: 'Notification Service', timestamp: new Date(Date.now() - 65 * 60000).toISOString() },
  );

  metrics.push(
    { id: 'TXN001', category: 'Transaction System', name: 'Transactions per Minute', value: '2,345', threshold: '10000', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 70 * 60000).toISOString() },
    { id: 'TXN002', category: 'Transaction System', name: 'Success vs Failure Ratio', value: '99.8%', threshold: '99%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 75 * 60000).toISOString() },
    { id: 'TXN003', category: 'Transaction System', name: 'Settlement Lag', value: '2.5s', threshold: '5s', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 80 * 60000).toISOString() },
    { id: 'TXN004', category: 'Transaction System', name: 'Payment Gateway Latency', value: '180ms', threshold: '500ms', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 85 * 60000).toISOString() },
    { id: 'TXN005', category: 'Transaction System', name: 'Reversal Frequency', value: '0.1%', threshold: '0.5%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 90 * 60000).toISOString() },
    { id: 'TXN006', category: 'Transaction System', name: 'Timeout Thresholds Breached', value: '0', threshold: '5', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 95 * 60000).toISOString() },
  );

  metrics.push(
    { id: 'SEC001', category: 'Security & Risk', name: 'Failed Login Spikes', value: '3', threshold: '10', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 100 * 60000).toISOString() },
    { id: 'SEC002', category: 'Security & Risk', name: 'OTP/PIN Retry Frequency', value: '1.2%', threshold: '5%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 105 * 60000).toISOString() },
    { id: 'SEC003', category: 'Security & Risk', name: '2FA Failure Rate', value: '0.3%', threshold: '2%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 110 * 60000).toISOString() },
    { id: 'SEC004', category: 'Security & Risk', name: 'Device Mismatch Frequency', value: '0.5%', threshold: '3%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 115 * 60000).toISOString() },
    { id: 'SEC005', category: 'Security & Risk', name: 'Velocity Rule Triggers', value: '2', threshold: '10', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
    { id: 'SEC006', category: 'Security & Risk', name: 'AML Flag Volume', value: '5', threshold: '4', status: 'Normal', sourceService: 'Risk Service', timestamp: new Date(Date.now() - 125 * 60000).toISOString() },
  );

  metrics.push(
    { id: 'GRW001', category: 'Growth & Usage', name: 'DAU (Daily Active Users)', value: '45,234', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 130 * 60000).toISOString() },
    { id: 'GRW002', category: 'Growth & Usage', name: 'MAU (Monthly Active Users)', value: '1,234,567', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 135 * 60000).toISOString() },
    { id: 'GRW003', category: 'Growth & Usage', name: 'New Signups per Day', value: '1,234', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 140 * 60000).toISOString() },
    { id: 'GRW004', category: 'Growth & Usage', name: 'Active Wallets', value: '234,567', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 145 * 60000).toISOString() },
    { id: 'GRW005', category: 'Growth & Usage', name: 'Active Savings Plans', value: '12,345', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 150 * 60000).toISOString() },
    { id: 'GRW006', category: 'Growth & Usage', name: 'Active Loans', value: '5,678', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 155 * 60000).toISOString() },
    { id: 'GRW007', category: 'Growth & Usage', name: 'Feature Usage Rate', value: '78%', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 160 * 60000).toISOString() },
  );

  metrics.forEach(metric => {
    const computed = computeStatus(metric);
    metric.status = computed;
    metric.acknowledged = false;
  });

  return metrics;
};

const SystemLogs = () => {
  const navigate = useNavigate();
  const [metrics] = useState(generateMetrics());
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBack = () => navigate('/');

  const categories = useMemo(
    () => ['All', ...new Set(metrics.map((m) => m.category))],
    [metrics]
  );

  const statuses = useMemo(
    () => ['All', ...new Set(metrics.map((m) => m.status))],
    [metrics]
  );

  const services = useMemo(
    () => ['All', ...new Set(metrics.map((m) => m.sourceService))],
    [metrics]
  );

  const kpiData = useMemo(() => {
    const total = metrics.length;
    const critical = metrics.filter(m => m.status === 'Critical').length;
    const warning = metrics.filter(m => m.status === 'Warning').length;
    const normal = metrics.filter(m => m.status === 'Normal').length;

    return [
      { label: 'Total Metrics', value: total, color: '#3b82f6' },
      { label: 'Critical', value: critical, color: '#ef4444' },
      { label: 'Warning', value: warning, color: '#f59e0b' },
      { label: 'Normal', value: normal, color: '#10b981' },
    ];
  }, [metrics]);

  const onFilterChange = (filters) => {
    setLoading(true);
    setTimeout(() => {
      let temp = [...metrics];

      if (filters.category && filters.category !== 'All') {
        temp = temp.filter((m) => m.category === filters.category);
      }

      if (filters.status && filters.status !== 'All') {
        temp = temp.filter((m) => m.status === filters.status);
      }

      if (filters.service && filters.service !== 'All') {
        temp = temp.filter((m) => m.sourceService === filters.service);
      }

      if (filters.date) {
        temp = temp.filter((m) => {
          const metricDate = new Date(m.timestamp).toISOString().split('T')[0];
          return metricDate === filters.date;
        });
      }

      setFilteredMetrics(temp);
      setLoading(false);
    }, 500);
  };

  const categoriesData = useMemo(() => {
    const categoryMap = {};
    const allMetrics = filteredMetrics.length > 0 ? filteredMetrics : metrics;
    
    allMetrics.forEach(metric => {
      if (!categoryMap[metric.category]) {
        categoryMap[metric.category] = {
          name: metric.category,
          totalMetrics: 0,
          critical: 0,
          warning: 0,
          normal: 0,
        };
      }
      categoryMap[metric.category].totalMetrics++;
      if (metric.status === 'Critical') categoryMap[metric.category].critical++;
      else if (metric.status === 'Warning') categoryMap[metric.category].warning++;
      else categoryMap[metric.category].normal++;
    });
    
    return Object.values(categoryMap);
  }, [filteredMetrics, metrics]);

  const CategoryCard = ({ categoryData }) => {
    const handleClick = () => {
      navigate(`/system/logs/category/${encodeURIComponent(categoryData.name)}`);
    };

    return (
      <div className={styles.sourceServiceCard} onClick={handleClick}>
        <div className={styles.sourceServiceCardHeader}>
          <h3 className={styles.sourceServiceName}>{categoryData.name}</h3>
          <div className={styles.sourceServiceArrow}>
            <ArrowRight size={24} />
          </div>
        </div>
        
        <div className={styles.sourceServiceStats}>
          <div className={styles.sourceServiceStat}>
            <span className={styles.sourceServiceStatLabel}>Total Metrics</span>
            <span className={styles.sourceServiceStatValue}>{categoryData.totalMetrics}</span>
          </div>
          
          <div className={styles.sourceServiceStatRow}>
            <div className={styles.sourceServiceStat}>
              <span className={styles.sourceServiceStatLabel}>Critical</span>
              <span className={styles.sourceServiceStatValue} style={{ color: '#ef4444' }}>
                {categoryData.critical}
              </span>
            </div>
            <div className={styles.sourceServiceStat}>
              <span className={styles.sourceServiceStatLabel}>Warning</span>
              <span className={styles.sourceServiceStatValue} style={{ color: '#f59e0b' }}>
                {categoryData.warning}
              </span>
            </div>
            <div className={styles.sourceServiceStat}>
              <span className={styles.sourceServiceStatLabel}>Normal</span>
              <span className={styles.sourceServiceStatValue} style={{ color: '#10b981' }}>
                {categoryData.normal}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.sourceServiceClickHint}>
          Click to view all metrics
        </div>
      </div>
    );
  };

  return (
    <Div className="system-logs-section">
      <Div className="head-and-details flexRow">
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeftIcon size={25} className={styles.backArrow} />
        </button>
        <div>
          <h2>System Logs</h2>
          <p>Monitor system metrics, performance, and health indicators</p>
        </div>
      </Div>

      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue} style={{ color: kpi.color }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      <FilterSearch
        config={{
          showSearch: false,
          dropdowns: [
            { key: 'category', label: 'Category', options: categories },
            { key: 'status', label: 'Status', options: statuses },
            { key: 'service', label: 'Source Service', options: services },
          ],
          showDate: true,
          heading: 'Filter',
        }}
        onFilterChange={onFilterChange}
      />

      <Div className="table-wrapper">
        <Div className="table-header flexRow">
          <h3>Metric Categories</h3>
          <span className={styles.recordCount}>
            {categoriesData.length} categor{categoriesData.length !== 1 ? 'ies' : 'y'}
          </span>
        </Div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <Loader2 className={styles.spin} size={32} style={{ margin: '0 auto' }} />
            <p style={{ marginTop: '16px' }}>Loading categories...</p>
          </div>
        ) : categoriesData.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <div className={styles.emptyStateText}>No categories found</div>
          </div>
        ) : (
          <div className={styles.sourceServicesGrid}>
            {categoriesData.map((categoryData, index) => (
              <CategoryCard key={index} categoryData={categoryData} />
            ))}
          </div>
        )}
      </Div>

    </Div>
  );
};

export default SystemLogs;
