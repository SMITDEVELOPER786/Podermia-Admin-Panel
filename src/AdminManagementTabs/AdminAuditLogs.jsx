import React, { useState, useMemo } from 'react';
import styles from '../css/AdminManagment2.module.css';
import DataTables from '../components/DataTable/DataTables';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import CustomModal from '../components/CustomModal/CustomModal';
import Toast from '../components/Toast/Toast';
import { Download, FileText, FileSpreadsheet, AlertCircle, Loader2, Eye } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminAuditLogs = () => {
  const [filters, setFilters] = useState({
    search: '',
    admin: '',
    action: '',
    date: '',
    risk: ''
  });

  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [toast, setToast] = useState(null);

  // Sample audit logs data
  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2025-01-15 14:30:15',
      admin: 'Sarah Wilson',
      email: 'sarah.wilson@podermonie.com',
      action: 'User Login',
      actionType: 'Login / Logout',
      risk: 'Low',
      status: 'Success',
      ipAddress: '192.168.1.100',
      detail: 'Successful login with global admin role',
      module: 'Authentication'
    },
    {
      id: 2,
      timestamp: '2025-01-15 13:15:22',
      admin: 'David Brown',
      email: 'david.brown@podermonie.com',
      action: 'Role Assignment',
      actionType: 'Role Assignment',
      risk: 'Medium',
      status: 'Success',
      ipAddress: '192.168.1.106',
      detail: 'Assigned KYC Admin role to user John Doe',
      module: 'User Management'
    },
    {
      id: 3,
      timestamp: '2025-01-15 12:45:33',
      admin: 'Emma Davis',
      email: 'emma.davis@podermonie.com',
      action: 'Permission Modified',
      actionType: 'Permission Changes',
      risk: 'High',
      status: 'Success',
      ipAddress: '192.168.1.115',
      detail: 'Modified wallet permissions for Wallet Admin role',
      module: 'RBAC System'
    },
    {
      id: 4,
      timestamp: '2025-01-15 11:20:44',
      admin: 'Sarah Wilson',
      email: 'sarah.wilson@podermonie.com',
      action: 'KYC Approval',
      actionType: 'Approval Decisions',
      risk: 'Medium',
      status: 'Success',
      ipAddress: '192.168.1.100',
      detail: 'Approved KYC documents for user Jane Smith (ID: 12345)',
      module: 'KYC Management'
    },
    {
      id: 5,
      timestamp: '2025-01-15 10:15:30',
      admin: 'Tom Miller',
      email: 'tom.miller@podermonie.com',
      action: 'Loan Override',
      actionType: 'Overrides Executed',
      risk: 'High',
      status: 'Success',
      ipAddress: '192.168.1.120',
      detail: 'Override loan limit for user Mike Johnson',
      module: 'Loans'
    },
    {
      id: 6,
      timestamp: '2025-01-15 09:30:20',
      admin: 'David Brown',
      email: 'david.brown@podermonie.com',
      action: 'Force Logout',
      actionType: 'Security Actions',
      risk: 'Medium',
      status: 'Success',
      ipAddress: '192.168.1.106',
      detail: 'Force logout executed for admin account',
      module: 'Security'
    },
    {
      id: 7,
      timestamp: '2025-01-14 16:45:10',
      admin: 'Lisa Anderson',
      email: 'lisa.anderson@podermonie.com',
      action: 'Data Export',
      actionType: 'Data Exports',
      risk: 'High',
      status: 'Success',
      ipAddress: '192.168.1.130',
      detail: 'Exported user data (CSV format) - 500 records',
      module: 'Data Management'
    },
    {
      id: 8,
      timestamp: '2025-01-14 15:20:05',
      admin: 'Sarah Wilson',
      email: 'sarah.wilson@podermonie.com',
      action: 'Failed Approval',
      actionType: 'Failed Approval Attempts',
      risk: 'Low',
      status: 'Failed',
      ipAddress: '192.168.1.100',
      detail: 'Failed to approve loan application - insufficient permissions',
      module: 'Loans'
    },
    {
      id: 9,
      timestamp: '2025-01-14 14:10:00',
      admin: 'Emma Davis',
      email: 'emma.davis@podermonie.com',
      action: 'User Logout',
      actionType: 'Login / Logout',
      risk: 'Low',
      status: 'Success',
      ipAddress: '192.168.1.115',
      detail: 'User logged out successfully',
      module: 'Authentication'
    },
    {
      id: 10,
      timestamp: '2025-01-14 13:05:15',
      admin: 'David Brown',
      email: 'david.brown@podermonie.com',
      action: 'Role Removed',
      actionType: 'Role Assignment',
      risk: 'Medium',
      status: 'Success',
      ipAddress: '192.168.1.106',
      detail: 'Removed Investment Admin role from user',
      module: 'User Management'
    }
  ]);

  // Filter data based on search and filters
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = !filters.search.trim() || 
        log.admin.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.action.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.actionType.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.detail.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.ipAddress.includes(filters.search);
      
      const matchesAdmin = !filters.admin || filters.admin === 'All Admins' || log.admin === filters.admin;
      const matchesAction = !filters.action || filters.action === 'All Actions' || log.actionType === filters.action;
      const matchesRisk = !filters.risk || filters.risk === 'All Risk Levels' || log.risk === filters.risk;
      
      let matchesDate = true;
      if (filters.date) {
        const filterDate = new Date(filters.date).toDateString();
        const logDate = new Date(log.timestamp).toDateString();
        matchesDate = filterDate === logDate;
      }
      
      return matchesSearch && matchesAdmin && matchesAction && matchesRisk && matchesDate;
    });
  }, [auditLogs, filters]);

  // Get unique values for filters
  const uniqueAdmins = useMemo(() => {
    return ['All Admins', ...new Set(auditLogs.map(log => log.admin))];
  }, [auditLogs]);

  const actionTypes = [
    'All Actions',
    'Login / Logout',
    'Role Assignment',
    'Permission Changes',
    'Approval Decisions',
    'Overrides Executed',
    'Security Actions',
    'Data Exports',
    'Failed Approval Attempts'
  ];

  const riskLevels = ['All Risk Levels', 'Low', 'Medium', 'High'];

  // Render risk badge
  const renderRisk = (risk) => {
    const riskClass = risk === 'High' 
      ? styles.riskHigh 
      : risk === 'Medium'
      ? styles.riskMedium
      : styles.riskLow;
    
    return <span className={riskClass}>{risk}</span>;
  };

  // Render status badge
  const renderStatus = (status) => {
    const statusClass = status === 'Success' 
      ? styles.statusSuccess 
      : styles.statusFailed;
    
    return <span className={statusClass}>{status}</span>;
  };

  // Render action type badge
  const renderActionType = (actionType) => {
    return <span className={styles.actionTypeBadge}>{actionType}</span>;
  };

  // Handle detail view
  const handleViewDetail = (log) => {
    setSelectedLog(log);
    setDetailModalOpen(true);
  };

  // Table columns
  const columns = [
    { header: 'Timestamp', key: 'timestamp' },
    { 
      header: 'Admin', 
      key: 'admin',
      render: (row) => (
        <div className={styles.adminInfo}>
          <div className={styles.adminName}>{row.admin}</div>
          <div className={styles.adminEmail}>{row.email}</div>
        </div>
      )
    },
    { 
      header: 'Action', 
      key: 'action',
      render: (row) => (
        <div className={styles.actionInfo}>
          <div className={styles.actionName}>{row.action}</div>
          <div className={styles.actionType}>{renderActionType(row.actionType)}</div>
        </div>
      )
    },
    { 
      header: 'Risk Level', 
      key: 'risk',
      render: (row) => renderRisk(row.risk)
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => renderStatus(row.status)
    },
    { header: 'IP Address', key: 'ipAddress' },
    { header: 'Module', key: 'module' },
    { 
      header: 'Details', 
      key: 'details',
      render: (row) => (
        <button
          className={styles.viewDetailButton}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetail(row);
          }}
          title="View full details"
        >
          <Eye size={18} />
        </button>
      )
    }
  ];

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by admin, action, IP address, or detail...',
    showDate: true,
    dropdowns: [
      {
        key: 'admin',
        label: 'All Admins',
        options: uniqueAdmins
      },
      {
        key: 'action',
        label: 'All Actions',
        options: actionTypes
      },
      {
        key: 'risk',
        label: 'All Risk Levels',
        options: riskLevels
      }
    ]
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Get exportable value from log
  const getExportValue = (log, column) => {
    if (column.key === 'admin') {
      return `${log.admin} (${log.email})`;
    }
    if (column.key === 'action') {
      return `${log.action} - ${log.actionType}`;
    }
    if (column.key === 'risk') {
      return log.risk;
    }
    if (column.key === 'status') {
      return log.status;
    }
    if (column.key === 'details') {
      return log.detail || '';
    }
    return log[column.key] || '';
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) {
      setToast({
        type: 'warning',
        title: 'No Data',
        message: 'No audit logs available to export'
      });
      return;
    }

    setLoadingCSV(true);
    setTimeout(() => {
      try {
        const headers = columns.map(c => c.header).join(',');
        const rows = filteredLogs.map(log => 
          columns.map(c => {
            const value = getExportValue(log, c);
            // Escape quotes and wrap in quotes
            const escapedValue = String(value).replace(/"/g, '""');
            return `"${escapedValue}"`;
          }).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `admin-audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        setLoadingCSV(false);
        setToast({
          type: 'success',
          title: 'Export Successful',
          message: `CSV file downloaded successfully (${filteredLogs.length} records)`
        });
      } catch (error) {
        console.error('CSV Export Error:', error);
        setLoadingCSV(false);
        setToast({
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export CSV file. Please try again.'
        });
      }
    }, 500);
  };

  // Export to PDF
  const handleExportPDF = () => {
    if (filteredLogs.length === 0) {
      setToast({
        type: 'warning',
        title: 'No Data',
        message: 'No audit logs available to export'
      });
      return;
    }

    setLoadingPDF(true);
    setTimeout(() => {
      try {
        // Use landscape orientation for wider table
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Admin Audit Logs Report', 14, 15);
        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);
        doc.text(`Total Records: ${filteredLogs.length}`, 14, 30);

        // Prepare table data with proper values
        const tableColumn = columns.map(c => c.header);
        const tableRows = filteredLogs.map(log => 
          columns.map(c => {
            const value = getExportValue(log, c);
            // Truncate long values for PDF
            if (typeof value === 'string' && value.length > 40) {
              return value.substring(0, 37) + '...';
            }
            return value || '';
          })
        );

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 35,
          theme: 'grid',
          headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 8
          },
          bodyStyles: { 
            fontSize: 7,
            cellPadding: 2
          },
          alternateRowStyles: { fillColor: [240, 240, 240] },
          margin: { top: 10, left: 10, right: 10 },
          styles: { 
            overflow: 'linebreak', 
            cellWidth: 'wrap',
            halign: 'left'
          },
          columnStyles: {
            0: { cellWidth: 35 }, // Timestamp
            1: { cellWidth: 45 }, // Admin
            2: { cellWidth: 50 }, // Action
            3: { cellWidth: 25 }, // Risk
            4: { cellWidth: 25 }, // Status
            5: { cellWidth: 30 }, // IP Address
            6: { cellWidth: 40 }, // Module
            7: { cellWidth: 50 }  // Details
          }
        });

        doc.save(`admin-audit-logs-${new Date().toISOString().split('T')[0]}.pdf`);
        setLoadingPDF(false);
        setToast({
          type: 'success',
          title: 'Export Successful',
          message: `PDF file downloaded successfully (${filteredLogs.length} records)`
        });
      } catch (error) {
        console.error('PDF Export Error:', error);
        setLoadingPDF(false);
        setToast({
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export PDF file. Please try again.'
        });
      }
    }, 500);
  };

  // Compliance Report State
  const [complianceForm, setComplianceForm] = useState({
    reportType: '',
    startDate: '',
    endDate: '',
    format: 'PDF'
  });
  const [loadingCompliance, setLoadingCompliance] = useState(false);

  // Generate Compliance Report
  const handleGenerateComplianceReport = () => {
    setComplianceModalOpen(true);
    // Reset form
    setComplianceForm({
      reportType: '',
      startDate: '',
      endDate: '',
      format: 'PDF'
    });
  };

  const handleComplianceFormChange = (e) => {
    const { name, value } = e.target;
    setComplianceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateComplianceForm = () => {
    if (!complianceForm.reportType) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please select a report type'
      });
      return false;
    }
    if (!complianceForm.startDate || !complianceForm.endDate) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please select both start and end dates'
      });
      return false;
    }
    if (new Date(complianceForm.startDate) > new Date(complianceForm.endDate)) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Start date must be before end date'
      });
      return false;
    }
    return true;
  };

  const handleComplianceReportSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateComplianceForm()) {
      return;
    }

    setLoadingCompliance(true);

    try {
      // Filter logs based on date range
      const startDate = new Date(complianceForm.startDate);
      const endDate = new Date(complianceForm.endDate);
      endDate.setHours(23, 59, 59, 999); // Include full end date

      const filteredComplianceLogs = auditLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate && logDate <= endDate;
      });

      if (filteredComplianceLogs.length === 0) {
        setToast({
          type: 'warning',
          title: 'No Data',
          message: 'No audit logs found for the selected date range'
        });
        setLoadingCompliance(false);
        return;
      }

      // Generate report based on format
      if (complianceForm.format === 'PDF') {
        // Use landscape orientation for wider table
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text(`${complianceForm.reportType} - Compliance Report`, 14, 15);
        doc.setFontSize(11);
        doc.text(`Date Range: ${complianceForm.startDate} to ${complianceForm.endDate}`, 14, 23);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
        doc.text(`Total Records: ${filteredComplianceLogs.length}`, 14, 37);

        const tableColumn = columns.map(c => c.header);
        const tableRows = filteredComplianceLogs.map(log => 
          columns.map(c => {
            const value = getExportValue(log, c);
            if (typeof value === 'string' && value.length > 40) {
              return value.substring(0, 37) + '...';
            }
            return value || '';
          })
        );

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 42,
          theme: 'grid',
          headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 8
          },
          bodyStyles: { 
            fontSize: 7,
            cellPadding: 2
          },
          alternateRowStyles: { fillColor: [240, 240, 240] },
          margin: { top: 10, left: 10, right: 10 },
          styles: { 
            overflow: 'linebreak', 
            cellWidth: 'wrap',
            halign: 'left'
          },
          columnStyles: {
            0: { cellWidth: 35 }, // Timestamp
            1: { cellWidth: 45 }, // Admin
            2: { cellWidth: 50 }, // Action
            3: { cellWidth: 25 }, // Risk
            4: { cellWidth: 25 }, // Status
            5: { cellWidth: 30 }, // IP Address
            6: { cellWidth: 40 }, // Module
            7: { cellWidth: 50 }  // Details
          }
        });

        const fileName = `compliance-report-${complianceForm.reportType.toLowerCase().replace(/\s+/g, '-')}-${complianceForm.startDate}.pdf`;
        doc.save(fileName);
      } else {
        // CSV Export
        const headers = columns.map(c => c.header).join(',');
        const rows = filteredComplianceLogs.map(log => 
          columns.map(c => {
            const value = getExportValue(log, c);
            const escapedValue = String(value).replace(/"/g, '""');
            return `"${escapedValue}"`;
          }).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const fileName = `compliance-report-${complianceForm.reportType.toLowerCase().replace(/\s+/g, '-')}-${complianceForm.startDate}.csv`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }

      setLoadingCompliance(false);
      setComplianceModalOpen(false);
      setToast({
        type: 'success',
        title: 'Compliance Report Generated',
        message: `${complianceForm.reportType} report (${complianceForm.format}) has been generated successfully.`
      });
    } catch (error) {
      console.error('Compliance Report Error:', error);
      setLoadingCompliance(false);
      setToast({
        type: 'error',
        title: 'Generation Failed',
        message: 'Failed to generate compliance report. Please try again.'
      });
    }
  };

  return (
    <div className={styles.auditLogsContainer}>
      {/* Header with Export Buttons */}
      <div className={styles.auditLogsHeader}>
        <h2 className={styles.auditLogsTitle}>Admin Audit Logs</h2>
        <div className={styles.exportButtons}>
          <button
            className={styles.exportButton}
            onClick={handleExportCSV}
            disabled={loadingCSV || filteredLogs.length === 0}
          >
            {loadingCSV ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            <span>Export CSV</span>
          </button>
          <button
            className={styles.exportButton}
            onClick={handleExportPDF}
            disabled={loadingPDF || filteredLogs.length === 0}
          >
            {loadingPDF ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : (
              <FileText size={16} />
            )}
            <span>Export PDF</span>
          </button>
          <button
            className={styles.complianceButton}
            onClick={handleGenerateComplianceReport}
          >
            <AlertCircle size={16} />
            <span>Compliance Report</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <FilterSearch 
        config={filterConfig}
        onFilterChange={handleFilterChange}
      />

      {/* Records Count */}
      <div className={styles.recordsCount}>
        Showing {filteredLogs.length} of {auditLogs.length} audit log records
      </div>

      {/* Data Table */}
      <div className={styles.tableSection}>
        <DataTables 
          columns={columns} 
          data={filteredLogs} 
          rowsPerPage={5}
        />
      </div>

      {/* Detail View Modal */}
      {detailModalOpen && selectedLog && (
        <CustomModal
          isOpen={detailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setSelectedLog(null);
          }}
          title="Audit Log Details"
          width="700px"
        >
          <div className={styles.detailModalContent}>
            <div className={styles.detailSection}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Timestamp:</span>
                <span className={styles.detailValue}>{selectedLog.timestamp}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Admin:</span>
                <span className={styles.detailValue}>
                  {selectedLog.admin} ({selectedLog.email})
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Action:</span>
                <span className={styles.detailValue}>{selectedLog.action}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Action Type:</span>
                <span className={styles.detailValue}>{selectedLog.actionType}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Risk Level:</span>
                <span className={styles.detailValue}>{renderRisk(selectedLog.risk)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{renderStatus(selectedLog.status)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>IP Address:</span>
                <span className={styles.detailValue}>{selectedLog.ipAddress}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Module:</span>
                <span className={styles.detailValue}>{selectedLog.module}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Details:</span>
                <div className={styles.detailValueFull}>{selectedLog.detail}</div>
              </div>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Compliance Report Modal */}
      {complianceModalOpen && (
        <CustomModal
          isOpen={complianceModalOpen}
          onClose={() => setComplianceModalOpen(false)}
          title="Generate Compliance Report"
          width="600px"
        >
          <form onSubmit={handleComplianceReportSubmit} className={styles.complianceForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Report Type <span className={styles.required}>*</span>
              </label>
              <select
                name="reportType"
                value={complianceForm.reportType}
                onChange={handleComplianceFormChange}
                className={`${styles.formInput} ${styles.formSelect}`}
                required
              >
                <option value="">Select Report Type</option>
                <option value="Security Audit">Security Audit</option>
                <option value="Access Control">Access Control</option>
                <option value="Data Protection">Data Protection</option>
                <option value="Regulatory Compliance">Regulatory Compliance</option>
                <option value="Full Audit Trail">Full Audit Trail</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Date Range <span className={styles.required}>*</span>
              </label>
              <div className={styles.dateRangeGroup}>
                <div className={styles.dateInputWrapper}>
                  <input
                    type="date"
                    name="startDate"
                    value={complianceForm.startDate}
                    onChange={handleComplianceFormChange}
                    className={styles.formInput}
                    required
                  />
                  <span className={styles.dateLabel}>Start Date</span>
                </div>
                <div className={styles.dateInputWrapper}>
                  <input
                    type="date"
                    name="endDate"
                    value={complianceForm.endDate}
                    onChange={handleComplianceFormChange}
                    className={styles.formInput}
                    min={complianceForm.startDate}
                    required
                  />
                  <span className={styles.dateLabel}>End Date</span>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Export Format <span className={styles.required}>*</span>
              </label>
              <select
                name="format"
                value={complianceForm.format}
                onChange={handleComplianceFormChange}
                className={`${styles.formInput} ${styles.formSelect}`}
                required
              >
                <option value="PDF">PDF</option>
                <option value="CSV">CSV</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => setComplianceModalOpen(false)}
                className={styles.cancelButton}
                disabled={loadingCompliance}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loadingCompliance}
              >
                {loadingCompliance ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    Generating...
                  </>
                ) : (
                  'Generate Report'
                )}
              </button>
            </div>
          </form>
        </CustomModal>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminAuditLogs;
