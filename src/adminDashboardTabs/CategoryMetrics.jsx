import React, { useState, useMemo } from 'react';
import styles from '../css/SystemLogs.module.css';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import CustomModal from '../components/CustomModal/CustomModal';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import Toast from '../components/Toast/Toast';
import { ArrowLeftIcon, UploadIcon, Loader2, Settings, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { generateMetrics, computeStatus } from './SystemLogs';

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const ThresholdModal = ({ metric, onClose, onSave }) => {
  const [thresholdValue, setThresholdValue] = useState(metric.threshold || '');

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

const CategoryMetrics = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(categoryName || '');
  
  const [metrics, setMetrics] = useState(generateMetrics());
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [thresholdModal, setThresholdModal] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);

  const categoryMetrics = useMemo(() => {
    return metrics.filter(m => m.category === decodedCategoryName);
  }, [metrics, decodedCategoryName]);

  const handleBack = () => navigate('/system/logs');

  const statuses = useMemo(
    () => ['All', ...new Set(categoryMetrics.map((m) => m.status))],
    [categoryMetrics]
  );

  const services = useMemo(
    () => ['All', ...new Set(categoryMetrics.map((m) => m.sourceService))],
    [categoryMetrics]
  );

  const kpiData = useMemo(() => {
    const total = categoryMetrics.length;
    const critical = categoryMetrics.filter(m => m.status === 'Critical').length;
    const warning = categoryMetrics.filter(m => m.status === 'Warning').length;
    const normal = categoryMetrics.filter(m => m.status === 'Normal').length;

    return [
      { label: 'Total Metrics', value: total, color: '#3b82f6' },
      { label: 'Critical', value: critical, color: '#ef4444' },
      { label: 'Warning', value: warning, color: '#f59e0b' },
      { label: 'Normal', value: normal, color: '#10b981' },
    ];
  }, [categoryMetrics]);

  const onFilterChange = (filters) => {
    setLoading(true);
    setTimeout(() => {
      let temp = [...categoryMetrics];

      if (filters.search) {
        temp = temp.filter(
          (m) =>
            m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            m.id.toLowerCase().includes(filters.search.toLowerCase())
        );
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

  const handleSelectAll = (isSelected) => {
    const dataToSelect = filteredMetrics.length > 0 ? filteredMetrics : categoryMetrics;
    if (isSelected) {
      setSelectedMetrics([...dataToSelect]);
    } else {
      setSelectedMetrics([]);
    }
  };

  const isAllSelected = () => {
    const dataToCheck = filteredMetrics.length > 0 ? filteredMetrics : categoryMetrics;
    return dataToCheck.length > 0 && selectedMetrics.length === dataToCheck.length;
  };

  const handleBulkAcknowledge = () => {
    const unacknowledgedMetrics = selectedMetrics.filter(m => !m.acknowledged && m.status !== 'Normal');
    
    if (unacknowledgedMetrics.length === 0) {
      setToast({
        type: 'warning',
        title: 'No Alerts to Acknowledge',
        message: 'All selected metrics are already acknowledged or have Normal status.',
      });
      return;
    }

    setConfirmDialog({
      type: 'info',
      title: 'Acknowledge Multiple Alerts',
      message: `Are you sure you want to acknowledge ${unacknowledgedMetrics.length} alert(s)?`,
      confirmText: 'Yes, Acknowledge All',
      cancelText: 'Cancel',
      onConfirm: () => {
        const metricIds = unacknowledgedMetrics.map(m => m.id);
        
        setMetrics(prevMetrics =>
          prevMetrics.map(m =>
            metricIds.includes(m.id) ? { ...m, acknowledged: true } : m
          )
        );
        
        if (filteredMetrics.length > 0) {
          setFilteredMetrics(prevFiltered =>
            prevFiltered.map(m =>
              metricIds.includes(m.id) ? { ...m, acknowledged: true } : m
            )
          );
        }

        setSelectedMetrics(prevSelected =>
          prevSelected.map(m =>
            metricIds.includes(m.id) ? { ...m, acknowledged: true } : m
          )
        );
        setToast({
          type: 'success',
          title: 'Alerts Acknowledged',
          message: `${unacknowledgedMetrics.length} alert(s) have been acknowledged successfully.`,
        });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  const handleAcknowledge = (metric) => {
    setConfirmDialog({
      type: 'info',
      title: 'Acknowledge Alert',
      message: `Are you sure you want to acknowledge the alert for "${metric.name}"?`,
      confirmText: 'Yes, Acknowledge',
      cancelText: 'Cancel',
      onConfirm: () => {
        setMetrics(prevMetrics =>
          prevMetrics.map(m =>
            m.id === metric.id ? { ...m, acknowledged: true } : m
          )
        );
        
        if (filteredMetrics.length > 0) {
          setFilteredMetrics(prevFiltered =>
            prevFiltered.map(m =>
              m.id === metric.id ? { ...m, acknowledged: true } : m
            )
          );
        }

        setSelectedMetrics(prevSelected =>
          prevSelected.map(m => m.id === metric.id ? { ...m, acknowledged: true } : m)
        );

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

  const handleSetThreshold = (metric) => {
    const latestMetric = metrics.find(m => m.id === metric.id) || metric;
    setThresholdModal(latestMetric);
  };

  const handleSaveThreshold = (newThreshold) => {
    const metricId = thresholdModal.id;

    setMetrics(prevMetrics =>
      prevMetrics.map(m => {
        if (m.id === metricId) {
          const updated = { ...m, threshold: newThreshold };
          updated.status = computeStatus(updated);
          return updated;
        }
        return m;
      })
    );

    if (filteredMetrics.length > 0) {
      setFilteredMetrics(prevFiltered =>
        prevFiltered.map(m => {
          if (m.id === metricId) {
            const updated = { ...m, threshold: newThreshold };
            updated.status = computeStatus(updated);
            return updated;
          }
          return m;
        })
      );
    }

    setSelectedMetrics(prevSelected =>
      prevSelected.map(m => {
        if (m.id === metricId) {
          const updated = { ...m, threshold: newThreshold };
          updated.status = computeStatus(updated);
          return updated;
        }
        return m;
      })
    );

    setToast({
      type: 'success',
      title: 'Threshold Updated',
      message: `Threshold for "${thresholdModal.name}" has been updated to ${newThreshold}.`,
    });
    setThresholdModal(null);
  };

  const handleExportPDF = () => {
    setLoadingPDF(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      const exportTitle = selectedMetrics.length > 0 
        ? `Selected Metrics - ${decodedCategoryName}` 
        : `All Metrics - ${decodedCategoryName}`;
      doc.text(exportTitle, 14, 15);

      const dataToExport = selectedMetrics.length > 0 
        ? selectedMetrics 
        : (filteredMetrics.length > 0 ? filteredMetrics : categoryMetrics);

      const tableColumn = ['Metric ID', 'Metric Name', 'Value', 'Threshold', 'Status', 'Source Service', 'Timestamp'];
      const tableRows = dataToExport.map((m) => [
        m.id,
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

      doc.save(`${decodedCategoryName}-metrics.pdf`);
      setLoadingPDF(false);
    }, 1000);
  };

  const groupedMetrics = useMemo(() => {
    const dataToGroup = filteredMetrics.length > 0 ? filteredMetrics : categoryMetrics;
    const grouped = {};
    dataToGroup.forEach(metric => {
      if (!grouped[metric.sourceService]) {
        grouped[metric.sourceService] = [];
      }
      grouped[metric.sourceService].push(metric);
    });
    return grouped;
  }, [filteredMetrics, categoryMetrics]);

  const MetricCard = ({ metric }) => {
    const isSelected = isMetricSelected(metric);
    const statusClass = 
      metric.status === 'Normal' ? styles.statusNormal :
      metric.status === 'Warning' ? styles.statusWarning :
      styles.statusCritical;

    return (
      <div className={`${styles.metricCard} ${isSelected ? styles.selected : ''}`}>
        {metric.acknowledged && (
          <div className={styles.acknowledgedBadgeFixed}>Acknowledged</div>
        )}
        <div className={styles.metricCardHeader}>
          <div className={styles.metricCardHeaderLeft}>
            <div className={styles.metricId}>{metric.id}</div>
            <div className={styles.metricName}>{metric.name}</div>
            <span className={styles.metricCategory}>{metric.category}</span>
          </div>
          <div className={styles.metricCardHeaderRight}>
            <input
              type="checkbox"
              className={styles.metricCardCheckbox}
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                handleSelectMetric(metric, e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <div className={styles.metricDetails}>
          <div className={styles.metricDetailRow}>
            <span className={styles.metricDetailLabel}>Value</span>
            <span className={`${styles.metricDetailValue} ${styles.metricValueLarge}`}>
              {metric.value}
            </span>
          </div>
          
          <div className={styles.metricDetailRow}>
            <span className={styles.metricDetailLabel}>Threshold</span>
            <span className={styles.metricDetailValue}>
              {metric.threshold || 'N/A'}
            </span>
          </div>
          
          <div className={styles.metricDetailRow}>
            <span className={styles.metricDetailLabel}>Status</span>
            <span className={statusClass}>{metric.status}</span>
          </div>
          
          <div className={styles.metricDetailRow}>
            <span className={styles.metricDetailLabel}>Source Service</span>
            <span className={styles.metricDetailValue}>{metric.sourceService}</span>
          </div>
        </div>

        <div className={styles.metricCardFooter}>
          <span className={styles.metricTimestamp}>
            {new Date(metric.timestamp).toLocaleString()}
          </span>
          <div className={styles.metricCardActions}>
            <button
              className={styles.metricCardActionBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleSetThreshold(metric);
              }}
              title="Set Threshold"
            >
              <Settings size={14} />
            </button>
            {metric.status !== 'Normal' && !metric.acknowledged && (
              <button
                className={styles.metricCardActionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAcknowledge(metric);
                }}
                title="Acknowledge Alert"
              >
                <CheckCircle size={14} />
              </button>
            )}
          </div>
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
          <h2>{decodedCategoryName} Metrics</h2>
          <p>View and manage metrics for {decodedCategoryName}</p>
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
          showSearch: true,
          searchPlaceholder: 'Search by metric name or ID...',
          dropdowns: [
            { key: 'status', label: 'Status', options: statuses },
            { key: 'service', label: 'Source Service', options: services },
          ],
          showDate: true,
        }}
        onFilterChange={onFilterChange}
      />

      <Div className="table-wrapper">
        <Div className="table-header flexRow">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              checked={isAllSelected()}
              onChange={(e) => handleSelectAll(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#295cbf' }}
              title="Select All"
            />
            <h3>{decodedCategoryName} Metrics</h3>
          </div>
          <span className={styles.recordCount}>
            {filteredMetrics.length > 0 ? filteredMetrics.length : categoryMetrics.length} records
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {selectedMetrics.some(m => !m.acknowledged && m.status !== 'Normal') && (
                <button
                  onClick={handleBulkAcknowledge}
                  style={{
                    background: '#10b981',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle size={16} />
                  Acknowledge Alerts
                </button>
              )}
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
            </div>
          </Div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <Loader2 className={styles.spin} size={32} style={{ margin: '0 auto' }} />
            <p style={{ marginTop: '16px' }}>Loading metrics...</p>
          </div>
        ) : Object.keys(groupedMetrics).length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <div className={styles.emptyStateText}>No metrics found</div>
          </div>
        ) : (
          Object.keys(groupedMetrics).map((sourceService) => (
            <div key={sourceService} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{sourceService}</h3>
                <span className={styles.categoryCount}>
                  {groupedMetrics[sourceService].length} metric{groupedMetrics[sourceService].length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.metricsGrid}>
                {groupedMetrics[sourceService].map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            </div>
          ))
        )}
      </Div>

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

      {thresholdModal && (
        <ThresholdModal
          metric={thresholdModal}
          onClose={() => setThresholdModal(null)}
          onSave={handleSaveThreshold}
        />
      )}

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

export default CategoryMetrics;
