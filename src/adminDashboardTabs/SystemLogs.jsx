import React, { useState, useMemo } from 'react';
import styles from '../css/SystemLogs.module.css';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import DataTable from '../components/DataTable/DataTables';
import CustomModal from '../components/CustomModal/CustomModal';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import Toast from '../components/Toast/Toast';
import { ArrowLeftIcon, UploadIcon, Loader2, Settings, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

// Generate mock metrics data
const generateMetrics = () => {
  const categories = [
    'Infrastructure',
    'Application Performance',
    'Transaction System',
    'Security & Risk',
    'Growth & Usage'
  ];

  const statuses = ['Normal', 'Warning', 'Critical'];
  const services = ['API Gateway', 'Payment Service', 'Auth Service', 'Database', 'Cache Service', 'Notification Service'];

  const metrics = [];

  // Infrastructure Metrics
  metrics.push(
    { id: 'INF001', category: 'Infrastructure', name: 'Server Uptime', value: '99.9%', threshold: '99.5%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date().toISOString() },
    { id: 'INF002', category: 'Infrastructure', name: 'CPU Usage', value: '45%', threshold: '80%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'INF003', category: 'Infrastructure', name: 'Memory Usage', value: '72%', threshold: '85%', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
    { id: 'INF004', category: 'Infrastructure', name: 'Disk I/O', value: '234 MB/s', threshold: '500 MB/s', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
    { id: 'INF005', category: 'Infrastructure', name: 'Network Latency', value: '12ms', threshold: '50ms', status: 'Normal', sourceService: 'Infrastructure', timestamp: new Date(Date.now() - 20 * 60000).toISOString() },
    { id: 'INF006', category: 'Infrastructure', name: 'Error Rate (4xx)', value: '0.2%', threshold: '1%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
    { id: 'INF007', category: 'Infrastructure', name: 'Error Rate (5xx)', value: '0.05%', threshold: '0.5%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
  );

  // Application Performance Metrics
  metrics.push(
    { id: 'APP001', category: 'Application Performance', name: 'API Response Time', value: '150ms', threshold: '300ms', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 35 * 60000).toISOString() },
    { id: 'APP002', category: 'Application Performance', name: 'API Failure Rate', value: '0.1%', threshold: '1%', status: 'Normal', sourceService: 'API Gateway', timestamp: new Date(Date.now() - 40 * 60000).toISOString() },
    { id: 'APP003', category: 'Application Performance', name: 'Request Volume - /api/payments', value: '1,234/min', threshold: '5000/min', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 45 * 60000).toISOString() },
    { id: 'APP004', category: 'Application Performance', name: 'Request Volume - /api/auth', value: '567/min', threshold: '2000/min', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 50 * 60000).toISOString() },
    { id: 'APP005', category: 'Application Performance', name: 'Timeouts', value: '2', threshold: '10', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 55 * 60000).toISOString() },
    { id: 'APP006', category: 'Application Performance', name: 'Retry Rate', value: '0.5%', threshold: '2%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
    { id: 'APP007', category: 'Application Performance', name: 'Queue Backlog Size', value: '45', threshold: '100', status: 'Normal', sourceService: 'Notification Service', timestamp: new Date(Date.now() - 65 * 60000).toISOString() },
  );

  // Transaction System Metrics
  metrics.push(
    { id: 'TXN001', category: 'Transaction System', name: 'Transactions per Minute', value: '2,345', threshold: '10000', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 70 * 60000).toISOString() },
    { id: 'TXN002', category: 'Transaction System', name: 'Success vs Failure Ratio', value: '99.8%', threshold: '99%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 75 * 60000).toISOString() },
    { id: 'TXN003', category: 'Transaction System', name: 'Settlement Lag', value: '2.5s', threshold: '5s', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 80 * 60000).toISOString() },
    { id: 'TXN004', category: 'Transaction System', name: 'Payment Gateway Latency', value: '180ms', threshold: '500ms', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 85 * 60000).toISOString() },
    { id: 'TXN005', category: 'Transaction System', name: 'Reversal Frequency', value: '0.1%', threshold: '0.5%', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 90 * 60000).toISOString() },
    { id: 'TXN006', category: 'Transaction System', name: 'Timeout Thresholds Breached', value: '0', threshold: '5', status: 'Normal', sourceService: 'Payment Service', timestamp: new Date(Date.now() - 95 * 60000).toISOString() },
  );

  // Security & Risk Metrics
  metrics.push(
    { id: 'SEC001', category: 'Security & Risk', name: 'Failed Login Spikes', value: '3', threshold: '10', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 100 * 60000).toISOString() },
    { id: 'SEC002', category: 'Security & Risk', name: 'OTP/PIN Retry Frequency', value: '1.2%', threshold: '5%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 105 * 60000).toISOString() },
    { id: 'SEC003', category: 'Security & Risk', name: '2FA Failure Rate', value: '0.3%', threshold: '2%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 110 * 60000).toISOString() },
    { id: 'SEC004', category: 'Security & Risk', name: 'Device Mismatch Frequency', value: '0.5%', threshold: '3%', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 115 * 60000).toISOString() },
    { id: 'SEC005', category: 'Security & Risk', name: 'Velocity Rule Triggers', value: '2', threshold: '10', status: 'Normal', sourceService: 'Auth Service', timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
    { id: 'SEC006', category: 'Security & Risk', name: 'AML Flag Volume', value: '5', threshold: '20', status: 'Normal', sourceService: 'Risk Service', timestamp: new Date(Date.now() - 125 * 60000).toISOString() },
  );

  // Growth & Usage Metrics
  metrics.push(
    { id: 'GRW001', category: 'Growth & Usage', name: 'DAU (Daily Active Users)', value: '45,234', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 130 * 60000).toISOString() },
    { id: 'GRW002', category: 'Growth & Usage', name: 'MAU (Monthly Active Users)', value: '1,234,567', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 135 * 60000).toISOString() },
    { id: 'GRW003', category: 'Growth & Usage', name: 'New Signups per Day', value: '1,234', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 140 * 60000).toISOString() },
    { id: 'GRW004', category: 'Growth & Usage', name: 'Active Wallets', value: '234,567', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 145 * 60000).toISOString() },
    { id: 'GRW005', category: 'Growth & Usage', name: 'Active Savings Plans', value: '12,345', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 150 * 60000).toISOString() },
    { id: 'GRW006', category: 'Growth & Usage', name: 'Active Loans', value: '5,678', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 155 * 60000).toISOString() },
    { id: 'GRW007', category: 'Growth & Usage', name: 'Feature Usage Rate', value: '78%', threshold: null, status: 'Normal', sourceService: 'Analytics Service', timestamp: new Date(Date.now() - 160 * 60000).toISOString() },
  );

  // Add some Warning and Critical statuses
  metrics[1].status = 'Warning';
  metrics[2].status = 'Warning';
  metrics[8].status = 'Critical';
  metrics[15].status = 'Warning';

  // Add acknowledged field to all metrics (default false)
  metrics.forEach(metric => {
    metric.acknowledged = false;
  });

  return metrics;
};

// Threshold Modal Component
const ThresholdModal = ({ metric, onClose, onSave }) => {
  const [thresholdValue, setThresholdValue] = useState(metric.threshold || '');

  // Update threshold value when metric changes
  React.useEffect(() => {
    setThresholdValue(metric.threshold || '');
  }, [metric.threshold]);

  const handleSave = () => {
    if (thresholdValue.trim()) {
      onSave(thresholdValue.trim());
    }
  };

  return (
    <CustomModal
      isOpen={!!metric}
      onClose={onClose}
      width="500px"
      showClose={true}
    >
      <div className={styles.thresholdModal}>
        <h2 className={styles.modalTitle}>Set Alert Threshold</h2>
        <div className={styles.modalContent}>
          <div className={styles.metricInfo}>
            <p><strong>Metric:</strong> {metric.name}</p>
            <p><strong>Current Value:</strong> {metric.value}</p>
            <p><strong>Current Threshold:</strong> {metric.threshold || 'Not Set'}</p>
          </div>
          <div className={styles.inputGroup}>
            <label>New Threshold Value:</label>
            <input
              type="text"
              placeholder="Enter threshold value"
              value={thresholdValue}
              onChange={(e) => setThresholdValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
              autoFocus
            />
          </div>
          <div className={styles.modalActions}>
            <button
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={!thresholdValue.trim()}
            >
              Save Threshold
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

const SystemLogs = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(generateMetrics());
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [thresholdModal, setThresholdModal] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);

  const handleBack = () => navigate(-1);

  // Filter categories
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

  // KPI Summary
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

  // Handle filter change
  const onFilterChange = (filters) => {
    setLoading(true);
    setTimeout(() => {
      let temp = [...metrics];

      if (filters.search) {
        temp = temp.filter(
          (m) =>
            m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            m.id.toLowerCase().includes(filters.search.toLowerCase()) ||
            m.sourceService.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

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

  // Handle metric selection
  const handleSelectMetric = (metric, isSelected) => {
    if (isSelected) {
      setSelectedMetrics((prev) => [...prev, metric]);
    } else {
      setSelectedMetrics((prev) => prev.filter((m) => m.id !== metric.id));
    }
  };

  const isMetricSelected = (metric) => {
    return selectedMetrics.some((m) => m.id === metric.id);
  };

  // Handle acknowledge alert
  const handleAcknowledge = (metric) => {
    setConfirmDialog({
      type: 'info',
      title: 'Acknowledge Alert',
      message: `Are you sure you want to acknowledge the alert for "${metric.name}"?`,
      confirmText: 'Yes, Acknowledge',
      cancelText: 'Cancel',
      onConfirm: () => {
        // Update the metric's acknowledged status
        setMetrics(prevMetrics =>
          prevMetrics.map(m =>
            m.id === metric.id ? { ...m, acknowledged: true } : m
          )
        );
        
        // Update filtered metrics if needed
        if (filteredMetrics.length > 0) {
          setFilteredMetrics(prevFiltered =>
            prevFiltered.map(m =>
              m.id === metric.id ? { ...m, acknowledged: true } : m
            )
          );
        }

        setToast({
          type: 'success',
          title: 'Alert Acknowledged',
          message: `Alert for "${metric.name}" has been acknowledged successfully.`,
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  // Handle set threshold
  const handleSetThreshold = (metric) => {
    // Get the latest metric data from state
    const latestMetric = metrics.find(m => m.id === metric.id) || metric;
    setThresholdModal(latestMetric);
  };

  // Handle save threshold
  const handleSaveThreshold = (newThreshold) => {
    // Update the metric's threshold
    setMetrics(prevMetrics =>
      prevMetrics.map(m =>
        m.id === thresholdModal.id ? { ...m, threshold: newThreshold } : m
      )
    );
    
    // Update filtered metrics if needed
    if (filteredMetrics.length > 0) {
      setFilteredMetrics(prevFiltered =>
        prevFiltered.map(m =>
          m.id === thresholdModal.id ? { ...m, threshold: newThreshold } : m
        )
      );
    }

    setToast({
      type: 'success',
      title: 'Threshold Updated',
      message: `Threshold for "${thresholdModal.name}" has been updated to ${newThreshold}.`,
    });
    setThresholdModal(null);
  };

  // Export to PDF
  const handleExportPDF = () => {
    setLoadingPDF(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      const exportTitle = selectedMetrics.length > 0 ? 'Selected Metrics Data' : 'All Metrics Data';
      doc.text(exportTitle, 14, 15);

      const dataToExport = selectedMetrics.length > 0 ? selectedMetrics : (filteredMetrics.length > 0 ? filteredMetrics : metrics);

      const tableColumn = ['Metric ID', 'Category', 'Metric Name', 'Value', 'Threshold', 'Status', 'Source Service', 'Timestamp'];
      const tableRows = dataToExport.map((m) => [
        m.id,
        m.category,
        m.name,
        m.value,
        m.threshold || 'N/A',
        m.status,
        m.sourceService,
        new Date(m.timestamp).toLocaleString(),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 92, 191],
          textColor: 255,
          fontStyle: 'bold',
        },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      doc.save('system-metrics.pdf');
      setLoadingPDF(false);
    }, 1000);
  };

  // Table columns
  const columns = [
    {
      header: 'Select',
      key: 'checkbox',
      render: (row) => (
        <input
          type="checkbox"
          checked={isMetricSelected(row)}
          onChange={(e) => {
            e.stopPropagation();
            handleSelectMetric(row, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
    { header: 'Metric ID', key: 'id' },
    { header: 'Category', key: 'category' },
    { header: 'Metric Name', key: 'name' },
    { header: 'Value', key: 'value' },
    { header: 'Threshold', key: 'threshold', render: (row) => row.threshold || 'N/A' },
    {
      header: 'Status',
      key: 'status',
      styleMap: {
        Normal: styles.statusNormal,
        Warning: styles.statusWarning,
        Critical: styles.statusCritical,
      },
    },
    { header: 'Source Service', key: 'sourceService' },
    {
      header: 'Timestamp',
      key: 'timestamp',
      render: (row) => new Date(row.timestamp).toLocaleString(),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className={styles.actionButtons}>
          <button
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleSetThreshold(row);
            }}
            title="Set Threshold"
          >
            <Settings size={16} />
          </button>
          {row.status !== 'Normal' && !row.acknowledged && (
            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleAcknowledge(row);
              }}
              title="Acknowledge Alert"
            >
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

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

      {/* KPI Cards */}
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

      {/* Filters */}
      <FilterSearch
        config={{
          showSearch: true,
          searchPlaceholder: 'Search by metric name, ID, or service...',
          dropdowns: [
            { key: 'category', label: 'Category', options: categories },
            { key: 'status', label: 'Status', options: statuses },
            { key: 'service', label: 'Source Service', options: services },
          ],
          showDate: true,
        }}
        onFilterChange={onFilterChange}
      />

      {/* Table */}
      <Div className="table-wrapper">
        <Div className="table-header flexRow">
          <h3>System Metrics</h3>
          <span className={styles.recordCount}>
            {filteredMetrics.length > 0 ? filteredMetrics.length : metrics.length} records
          </span>
        </Div>

        {selectedMetrics.length > 0 && (
          <Div className="selection-info flexRow" style={{
            marginTop: '12px',
            marginBottom: '12px',
            padding: '8px 16px',
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', color: '#295cbf', fontWeight: '500' }}>
              {selectedMetrics.length} metric{selectedMetrics.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setSelectedMetrics([])}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#295cbf',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'underline',
                padding: '4px 8px'
              }}
            >
              Clear selection
            </button>
          </Div>
        )}

        <DataTable
          columns={columns}
          data={filteredMetrics.length > 0 ? filteredMetrics : metrics}
          scrollHeight={500}
          onRowClick={(row) => console.log('Metric clicked:', row)}
          loading={loading}
        />
      </Div>

      {/* Export Button */}
      <button
        className={styles.exportBtn}
        onClick={handleExportPDF}
        disabled={loadingPDF}
      >
        {loadingPDF ? (
          <Loader2 className={styles.spin} size={16} />
        ) : (
          <>
            <UploadIcon size={20} color="#fff" />
            {selectedMetrics.length > 0 ? `Export Selected Metrics (${selectedMetrics.length})` : 'Export All Metrics'}
          </>
        )}
      </button>

      {/* Set Threshold Modal */}
      {thresholdModal && (
        <ThresholdModal
          metric={thresholdModal}
          onClose={() => setThresholdModal(null)}
          onSave={handleSaveThreshold}
        />
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
    </Div>
  );
};

export default SystemLogs;
