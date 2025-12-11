import React, { useState, useRef, useEffect } from 'react';
import styles from '../../css/SupportSystem.module.css';
import { ChevronDown, Eye, Star, X } from 'lucide-react';
import Toast from '../../components/Toast/Toast';
import DataTables from '../../components/DataTable/DataTables';
import jsPDF from 'jspdf';

const TicketResolution = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  const [selectedTicketToResolve, setSelectedTicketToResolve] = useState('Select Ticket To Resolve');
  const [resolutionType, setResolutionType] = useState('Select Resolution Type');
  const [expectedSatisfaction, setExpectedSatisfaction] = useState('Predict Satisfaction');
  const [exportFormat, setExportFormat] = useState('Select Export Format');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [dataRetentionYears, setDataRetentionYears] = useState('10');
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(null);
  
  // Dropdown states
  const [showTicketDropdown, setShowTicketDropdown] = useState(false);
  const [showResolutionTypeDropdown, setShowResolutionTypeDropdown] = useState(false);
  const [showSatisfactionDropdown, setShowSatisfactionDropdown] = useState(false);
  const [showExportFormatDropdown, setShowExportFormatDropdown] = useState(false);
  
  // Refs
  const ticketDropdownRef = useRef(null);
  const resolutionTypeDropdownRef = useRef(null);
  const satisfactionDropdownRef = useRef(null);
  const exportFormatDropdownRef = useRef(null);

  const [checklist, setChecklist] = useState({
    customerInformed: false,
    solutionImplemented: false,
    knowledgeBaseUpdated: false,
    satisfactionSurveySent: false,
    rootCauseIdentified: false,
    customerConfirmed: false,
    preventionImplemented: false,
    auditTrailDocumented: false,
    followUpRequired: false
  });

  const [auditSettings, setAuditSettings] = useState({
    tamperProofLogging: false,
    blockchainAudit: false,
    complianceReporting: false
  });

  const ticketsToResolve = [
    { id: 'TKT-002', label: 'TKT-002 Transaction failed but amount debited (Critical)' },
    { id: 'TKT-003', label: 'TKT-003 - Cannot access savings dashboard - Technical error (Medium)' }
  ];

  const resolutionTypes = [
    'Select Resolution Type',
    'Issue Resolved',
    'Process Completed',
    'Technical Fix Applied',
    'Account Updated',
    'Refund Processed',
    'Escalated to Specialist',
    'Customer Request Withdrawn',
    'Duplicate Ticket',
    'Information Provided',
    'Cannot Reproduce Issue'
  ];

  const satisfactionOptions = [
    'Predict Satisfaction',
    '***** Excellent (5)',
    '**** Good (4)',
    '*** Average (3)',
    '** Poor (2)',
    '* Very Poor (1)'
  ];

  const exportFormats = [
    'Select Export Format',
    'CSV',
    'PDF',
    'EXCEL',
    'JSON'
  ];

  const [pendingTickets, setPendingTickets] = useState([
    {
      id: 'TKT-002',
      subject: 'Transaction failed but amount debited from wallet',
      customer: 'Sarah Johnson',
      category: 'Wallet',
      agent: 'John Anderson',
      timeSpent: '4h 30 m',
      priority: 'Critical'
    },
    {
      id: 'TKT-003',
      subject: 'Cannot access savings dashboard - Technical error',
      customer: 'David Brown',
      category: 'Technical',
      agent: 'Sarah Collins',
      timeSpent: '8h 15m',
      priority: 'Medium'
    }
  ]);

  const [resolvedTickets, setResolvedTickets] = useState([
    {
      id: 'TKT-004',
      customer: 'Lisa Wilson',
      category: 'Loan',
      agent: 'John Anderson',
      resolutionType: 'Information Provided',
      time: '18h 45m',
      satisfaction: '5/5',
      auditHealth: 'a1b2c3d4e5f6'
    },
    {
      id: 'TKT-001',
      customer: 'Robert Smith',
      category: 'KYC',
      agent: 'Sarah Collins',
      resolutionType: 'Issue Resolved',
      time: '6h 30 m',
      satisfaction: '4/5',
      auditHealth: 'f6e5d4c3b2a1'
    }
  ]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ticketDropdownRef.current && !ticketDropdownRef.current.contains(event.target)) {
        setShowTicketDropdown(false);
      }
      if (resolutionTypeDropdownRef.current && !resolutionTypeDropdownRef.current.contains(event.target)) {
        setShowResolutionTypeDropdown(false);
      }
      if (satisfactionDropdownRef.current && !satisfactionDropdownRef.current.contains(event.target)) {
        setShowSatisfactionDropdown(false);
      }
      if (exportFormatDropdownRef.current && !exportFormatDropdownRef.current.contains(event.target)) {
        setShowExportFormatDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChecklistChange = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAuditSettingChange = (key) => {
    setAuditSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAsDraft = () => {
    setToast({ show: true, message: 'Resolution saved as draft', type: 'success', title: 'Draft Saved' });
  };

  const handleNotifyCustomer = () => {
    setToast({ show: true, message: 'Customer notified successfully', type: 'success', title: 'Notification Sent' });
  };

  const handleMarkAsResolved = () => {
    // Validation
    if (selectedTicketToResolve === 'Select Ticket To Resolve') {
      setToast({ show: true, message: 'Please select a ticket to resolve', type: 'error', title: 'Validation Error' });
      return;
    }
    if (resolutionType === 'Select Resolution Type') {
      setToast({ show: true, message: 'Please select a resolution type', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!resolutionNotes.trim()) {
      setToast({ show: true, message: 'Please enter resolution notes', type: 'error', title: 'Validation Error' });
      return;
    }
    // Checklist validation - at least key items must be checked
    if (!checklist.customerInformed) {
      setToast({ show: true, message: 'Customer must be informed before resolving', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!checklist.solutionImplemented) {
      setToast({ show: true, message: 'Solution must be implemented and verified', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!checklist.customerConfirmed) {
      setToast({ show: true, message: 'Customer confirmation is required', type: 'error', title: 'Validation Error' });
      return;
    }

    // Find ticket from pending list
    const ticketId = selectedTicketToResolve.split(' ')[0];
    const ticket = pendingTickets.find(t => t.id === ticketId);
    
    if (ticket) {
      // Create resolved ticket object
      const resolvedTicket = {
        id: ticket.id,
        customer: ticket.customer,
        category: ticket.category,
        agent: ticket.agent,
        resolutionType: resolutionType,
        time: ticket.timeSpent,
        satisfaction: expectedSatisfaction === 'Predict Satisfaction' ? '4/5' : expectedSatisfaction.split('(')[1]?.replace(')', '') || '4/5',
        auditHealth: Math.random().toString(36).substring(2, 14)
      };

      // Add to resolved tickets
      setResolvedTickets(prev => [resolvedTicket, ...prev]);
      
      // Remove from pending tickets
      setPendingTickets(prev => prev.filter(t => t.id !== ticketId));
      
      // Reset form
      setSelectedTicketToResolve('Select Ticket To Resolve');
      setResolutionType('Select Resolution Type');
      setExpectedSatisfaction('Predict Satisfaction');
      setResolutionNotes('');
      setChecklist({
        customerInformed: false,
        solutionImplemented: false,
        knowledgeBaseUpdated: false,
        satisfactionSurveySent: false,
        rootCauseIdentified: false,
        customerConfirmed: false,
        preventionImplemented: false,
        auditTrailDocumented: false,
        followUpRequired: false
      });
    }

    setToast({ show: true, message: 'Ticket marked as resolved', type: 'success', title: 'Resolved' });
  };

  const handleCloseTicket = () => {
    setToast({ show: true, message: 'Ticket closed successfully', type: 'success', title: 'Ticket Closed' });
  };

  const handleResolveTicket = () => {
    // Validation
    if (selectedTicketToResolve === 'Select Ticket To Resolve') {
      setToast({ show: true, message: 'Please select a ticket to resolve', type: 'error', title: 'Validation Error' });
      return;
    }
    if (resolutionType === 'Select Resolution Type') {
      setToast({ show: true, message: 'Please select a resolution type', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!resolutionNotes.trim()) {
      setToast({ show: true, message: 'Please enter resolution notes', type: 'error', title: 'Validation Error' });
      return;
    }
    // Checklist validation - at least key items must be checked
    if (!checklist.customerInformed) {
      setToast({ show: true, message: 'Customer must be informed before resolving', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!checklist.solutionImplemented) {
      setToast({ show: true, message: 'Solution must be implemented and verified', type: 'error', title: 'Validation Error' });
      return;
    }
    if (!checklist.customerConfirmed) {
      setToast({ show: true, message: 'Customer confirmation is required', type: 'error', title: 'Validation Error' });
      return;
    }

    // Find ticket from pending list
    const ticketId = selectedTicketToResolve.split(' ')[0];
    const ticket = pendingTickets.find(t => t.id === ticketId);
    
    if (ticket) {
      // Create resolved ticket object
      const resolvedTicket = {
        id: ticket.id,
        customer: ticket.customer,
        category: ticket.category,
        agent: ticket.agent,
        resolutionType: resolutionType,
        time: ticket.timeSpent,
        satisfaction: expectedSatisfaction === 'Predict Satisfaction' ? '4/5' : expectedSatisfaction.split('(')[1]?.replace(')', '') || '4/5',
        auditHealth: Math.random().toString(36).substring(2, 14)
      };

      // Add to resolved tickets
      setResolvedTickets(prev => [resolvedTicket, ...prev]);
      
      // Remove from pending tickets
      setPendingTickets(prev => prev.filter(t => t.id !== ticketId));
      
      // Reset form
      setSelectedTicketToResolve('Select Ticket To Resolve');
      setResolutionType('Select Resolution Type');
      setExpectedSatisfaction('Predict Satisfaction');
      setResolutionNotes('');
      setChecklist({
        customerInformed: false,
        solutionImplemented: false,
        knowledgeBaseUpdated: false,
        satisfactionSurveySent: false,
        rootCauseIdentified: false,
        customerConfirmed: false,
        preventionImplemented: false,
        auditTrailDocumented: false,
        followUpRequired: false
      });
    }

    setToast({ show: true, message: 'Ticket resolved successfully', type: 'success', title: 'Resolved' });
  };

  const handleExportReport = (type) => {
    if (exportFormat === 'Select Export Format') {
      setToast({ show: true, message: 'Please select an export format', type: 'error', title: 'Validation Error' });
      return;
    }

    // Prepare report data
    const reportData = {
      reportType: type,
      generatedAt: new Date().toISOString(),
      resolvedTickets: resolvedTickets,
      pendingTickets: pendingTickets,
      auditSettings: auditSettings
    };

    const fileName = `${type.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;

    switch (exportFormat) {
      case 'CSV':
        downloadCSV(reportData, fileName);
        break;
      case 'PDF':
        downloadPDF(reportData, fileName);
        break;
      case 'EXCEL':
        downloadExcel(reportData, fileName);
        break;
      case 'JSON':
        downloadJSON(reportData, fileName);
        break;
      default:
        break;
    }

    setToast({ show: true, message: `${type} exported as ${exportFormat} successfully`, type: 'success', title: 'Export Complete' });
  };

  const downloadCSV = (data, fileName) => {
    const tickets = [...data.resolvedTickets, ...data.pendingTickets];
    const headers = ['Ticket ID', 'Customer', 'Category', 'Agent', 'Status', 'Time'];
    const rows = tickets.map(ticket => [
      ticket.id,
      ticket.customer,
      ticket.category,
      ticket.agent,
      ticket.resolutionType || 'Pending',
      ticket.time || ticket.timeSpent
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.click();
  };

  const downloadPDF = (data, fileName) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue color
    doc.text(data.reportType, 20, 20);
    
    // Generated timestamp
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // Gray color
    doc.text(`Generated: ${new Date(data.generatedAt).toLocaleString()}`, 20, 30);
    
    let yPos = 45;
    
    // Resolved Tickets Section
    doc.setFontSize(16);
    doc.setTextColor(55, 65, 81);
    doc.text(`Resolved Tickets (${data.resolvedTickets.length})`, 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    data.resolvedTickets.forEach((ticket, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(37, 99, 235);
      doc.text(`Ticket: ${ticket.id}`, 20, yPos);
      yPos += 6;
      
      doc.setTextColor(55, 65, 81);
      doc.text(`Customer: ${ticket.customer}`, 25, yPos);
      yPos += 5;
      doc.text(`Category: ${ticket.category}`, 25, yPos);
      yPos += 5;
      doc.text(`Agent: ${ticket.agent}`, 25, yPos);
      yPos += 5;
      doc.text(`Resolution: ${ticket.resolutionType}`, 25, yPos);
      yPos += 5;
      doc.text(`Time: ${ticket.time}`, 25, yPos);
      yPos += 5;
      doc.text(`Satisfaction: ${ticket.satisfaction}`, 25, yPos);
      yPos += 5;
      doc.text(`Audit Hash: ${ticket.auditHealth}`, 25, yPos);
      yPos += 10;
    });
    
    // Pending Tickets Section
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(55, 65, 81);
    doc.text(`Pending Tickets (${data.pendingTickets.length})`, 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    data.pendingTickets.forEach((ticket, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(37, 99, 235);
      doc.text(`Ticket: ${ticket.id}`, 20, yPos);
      yPos += 6;
      
      doc.setTextColor(55, 65, 81);
      doc.text(`Subject: ${ticket.subject}`, 25, yPos);
      yPos += 5;
      doc.text(`Customer: ${ticket.customer}`, 25, yPos);
      yPos += 5;
      doc.text(`Category: ${ticket.category}`, 25, yPos);
      yPos += 5;
      doc.text(`Agent: ${ticket.agent}`, 25, yPos);
      yPos += 5;
      doc.text(`Time Spent: ${ticket.timeSpent}`, 25, yPos);
      yPos += 5;
      doc.text(`Priority: ${ticket.priority}`, 25, yPos);
      yPos += 10;
    });
    
    // Save the PDF
    doc.save(`${fileName}.pdf`);
  };

  const downloadExcel = (data, fileName) => {
    // Create tab-separated values (Excel can open this)
    const tickets = [...data.resolvedTickets, ...data.pendingTickets];
    const headers = ['Ticket ID', 'Customer', 'Category', 'Agent', 'Status', 'Time'];
    const rows = tickets.map(ticket => [
      ticket.id,
      ticket.customer,
      ticket.category,
      ticket.agent,
      ticket.resolutionType || 'Pending',
      ticket.time || ticket.timeSpent
    ]);

    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xls`;
    link.click();
  };

  const downloadJSON = (data, fileName) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;
    link.click();
  };

  const handleResetForm = () => {
    setSelectedTicketToResolve('Select Ticket To Resolve');
    setResolutionType('Select Resolution Type');
    setExpectedSatisfaction('Predict Satisfaction');
    setResolutionNotes('');
    setChecklist({
      customerInformed: false,
      solutionImplemented: false,
      knowledgeBaseUpdated: false,
      satisfactionSurveySent: false,
      rootCauseIdentified: false,
      customerConfirmed: false,
      preventionImplemented: false,
      auditTrailDocumented: false,
      followUpRequired: false
    });
    setToast({ show: true, message: 'Form reset successfully', type: 'success', title: 'Reset Complete' });
  };

  const handleSaveResolutionSettings = () => {
    setToast({ show: true, message: 'Resolution settings saved successfully', type: 'success', title: 'Settings Saved' });
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicketDetails(ticket);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicketDetails(null);
  };

  const renderStars = (rating) => {
    const numStars = parseInt(rating);
    return (
      <span style={{ color: '#fbbf24' }}>
        {'★'.repeat(numStars)}
      </span>
    );
  };

  return (
    <div className={styles.ticketResolutionContainer}>
      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '', title: '' })}
        />
      )}

      {/* Modal for Ticket Details */}
      {showModal && selectedTicketDetails && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Ticket Details - {selectedTicketDetails.id}</h3>
              <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Ticket ID:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.id}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Customer:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.customer}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Category:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.category}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Agent:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.agent}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Resolution Type:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.resolutionType}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Time Spent:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.time}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Customer Satisfaction:</span>
                <span className={styles.detailValue}>
                  <span className={styles.satisfactionStars}>
                    {renderStars(selectedTicketDetails.satisfaction.split('/')[0])} {selectedTicketDetails.satisfaction}
                  </span>
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Audit Health Hash:</span>
                <span className={styles.detailValue}>{selectedTicketDetails.auditHealth}</span>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCloseFooterBtn} onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Title */}
      <h2 className={styles.resolutionMainTitle}>Ticket Resolution</h2>

      {/* KPI Cards */}
      <div className={styles.resolutionKpiGrid}>
        <div className={styles.resolutionKpiCard}>
          <h4>AVG Resolution</h4>
          <p className={styles.kpiValueRed}>12h 35m</p>
        </div>
        <div className={styles.resolutionKpiCard}>
          <h4>First Contact</h4>
          <p className={styles.kpiValueGreen}>78%</p>
        </div>
        <div className={styles.resolutionKpiCard}>
          <h4>Satisfaction</h4>
          <p className={styles.kpiValueOrange}>4.9/5.0</p>
        </div>
        <div className={styles.resolutionKpiCard}>
          <h4>SLA Compliance</h4>
          <p className={styles.kpiValueBlue}>94.2%</p>
        </div>
        <div className={styles.resolutionKpiCard}>
          <h4>Reopen Rate</h4>
          <p className={styles.kpiValueRed}>3.2%</p>
        </div>
      </div>

      {/* Resolution Performance by Category */}
      <div className={styles.resolutionPerformanceSection}>
        <h3>Resolution Performance by Category</h3>
        <div className={styles.categoryCardsGrid}>
          {['KYC', 'Wallet', 'Loan', 'Investment', 'Technical'].map((category) => (
            <div key={category} className={styles.categoryCard}>
              <h4>{category}</h4>
              <p>Resolved: 45</p>
              <p>Avg Time: 6h 20m</p>
              <p>Rating: 4.8/5</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Resolution & Closure Interface */}
      <div className={styles.resolutionFormSection}>
        <h3>Ticket Resolution & Closure Interface</h3>
        
        <div className={styles.resolutionFormGrid}>
          <div className={styles.formField}>
            <label>Select Ticket To Resolve</label>
            <div className={styles.customDropdownWrapper} ref={ticketDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowTicketDropdown(!showTicketDropdown)}
              >
                <span>{selectedTicketToResolve}</span>
                <ChevronDown size={18} className={showTicketDropdown ? styles.chevronRotate : ''} />
              </div>
              {showTicketDropdown && (
                <div className={styles.customDropdownMenu}>
                  {ticketsToResolve.map((ticket, idx) => (
                    <div
                      key={idx}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setSelectedTicketToResolve(ticket.label);
                        setShowTicketDropdown(false);
                      }}
                    >
                      {ticket.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formField}>
            <label>Resolution Type</label>
            <div className={styles.customDropdownWrapper} ref={resolutionTypeDropdownRef}>
              <div 
                className={styles.customDropdownSelected}
                onClick={() => setShowResolutionTypeDropdown(!showResolutionTypeDropdown)}
              >
                <span>{resolutionType}</span>
                <ChevronDown size={18} className={showResolutionTypeDropdown ? styles.chevronRotate : ''} />
              </div>
              {showResolutionTypeDropdown && (
                <div className={styles.customDropdownMenu}>
                  {resolutionTypes.map((type, idx) => (
                    <div
                      key={idx}
                      className={styles.customDropdownItem}
                      onClick={() => {
                        setResolutionType(type);
                        setShowResolutionTypeDropdown(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formField}>
          <label>Resolution Notes & Admin Actions</label>
          <textarea
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Provide Detail resolution notes including steps taking not cause identify solution implement costumer communication and any flow-up action required...."
            className={styles.resolutionTextarea}
            rows={4}
          />
          <p className={styles.auditNote}>All admin actions will be logged with tamper-proof audit trail</p>
        </div>

        {/* Resolution Checklist */}
        <div className={styles.checklistSection}>
          <h4>Resolution checklist (complete before resolving)</h4>
          <div className={styles.checklistGrid}>
            <div className={styles.checklistColumn}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.customerInformed}
                  onChange={() => handleChecklistChange('customerInformed')}
                />
                Costumer has been informed for the resolution
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.solutionImplemented}
                  onChange={() => handleChecklistChange('solutionImplemented')}
                />
                Solution has been implement and verified
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.knowledgeBaseUpdated}
                  onChange={() => handleChecklistChange('knowledgeBaseUpdated')}
                />
                Knowledge base update with solution (if applicable)
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.satisfactionSurveySent}
                  onChange={() => handleChecklistChange('satisfactionSurveySent')}
                />
                Customer satisfaction survey sent
              </label>
            </div>
            <div className={styles.checklistColumn}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.rootCauseIdentified}
                  onChange={() => handleChecklistChange('rootCauseIdentified')}
                />
                Root cause has been identified and documented
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.customerConfirmed}
                  onChange={() => handleChecklistChange('customerConfirmed')}
                />
                Customer has confirmed issue is resolved
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.preventionImplemented}
                  onChange={() => handleChecklistChange('preventionImplemented')}
                />
                Prevention measures implemented to avoid recurrence
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={checklist.auditTrailDocumented}
                  onChange={() => handleChecklistChange('auditTrailDocumented')}
                />
                Complete audit trail documented
              </label>
            </div>
          </div>

          <div className={styles.satisfactionRow}>
            <div className={styles.formField}>
              <label>Expected Customer Satisfaction</label>
              <div className={styles.customDropdownWrapper} ref={satisfactionDropdownRef}>
                <div 
                  className={styles.customDropdownSelected}
                  onClick={() => setShowSatisfactionDropdown(!showSatisfactionDropdown)}
                >
                  <span>{expectedSatisfaction}</span>
                  <ChevronDown size={18} className={showSatisfactionDropdown ? styles.chevronRotate : ''} />
                </div>
                {showSatisfactionDropdown && (
                  <div className={styles.customDropdownMenu}>
                    {satisfactionOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className={styles.customDropdownItem}
                        onClick={() => {
                          setExpectedSatisfaction(option);
                          setShowSatisfactionDropdown(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={checklist.followUpRequired}
                onChange={() => handleChecklistChange('followUpRequired')}
              />
              Follow up required
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.resolutionActions}>
          <button className={styles.saveDraftBtn} onClick={handleSaveAsDraft}>Save as Draft</button>
          <button className={styles.notifyCustomerBtn} onClick={handleNotifyCustomer}>Notify Customer</button>
          <button className={styles.resolveTicketBtn} onClick={handleResolveTicket}>Resolve</button>
          <button className={styles.markResolvedBtn} onClick={handleMarkAsResolved}>Mark as resolved</button>
          <button className={styles.closeTicketBtn} onClick={handleCloseTicket}>Close Ticket</button>
        </div>
      </div>

      {/* Tickets Pending Resolution */}
      <div className={styles.pendingTicketsSection}>
        <h3>Tickets Pending Resolution</h3>
        <DataTables
          columns={[
            { header: 'Ticket ID', key: 'id' },
            { header: 'Subject', key: 'subject' },
            { header: 'Customer', key: 'customer' },
            { header: 'Category', key: 'category' },
            { header: 'Agent', key: 'agent' },
            { header: 'Time Spent', key: 'timeSpent' },
            { 
              header: 'Priority', 
              key: 'priority',
              render: (row) => (
                <span className={row.priority === 'Critical' ? styles.priorityCritical : styles.priorityMedium}>
                  {row.priority}
                </span>
              )
            }
          ]}
          data={pendingTickets}
          rowsPerPage={5}
        />
      </div>

      {/* Recently Resolved - Audit Trail */}
      <div className={styles.resolvedTicketsSection}>
        <h3>Recently Resolved - Temper-Proof Audit Trail</h3>
        <DataTables
          columns={[
            { header: 'Ticket ID', key: 'id' },
            { header: 'Customer', key: 'customer' },
            { header: 'Category', key: 'category' },
            { header: 'Agent', key: 'agent' },
            { header: 'Resolution Type', key: 'resolutionType' },
            { header: 'Time', key: 'time' },
            { 
              header: 'Satisfaction', 
              key: 'satisfaction',
              render: (row) => (
                <span className={styles.satisfactionStars}>
                  {renderStars(row.satisfaction.split('/')[0])} {row.satisfaction}
                </span>
              )
            },
            { header: 'Audit Health', key: 'auditHealth' },
            { 
              header: 'Actions', 
              key: 'actions',
              render: (row) => (
                <button className={styles.viewBtn} onClick={() => handleViewTicket(row)}>
                  <Eye size={14} /> View
                </button>
              )
            }
          ]}
          data={resolvedTickets}
          rowsPerPage={5}
        />
      </div>

      {/* Audit & Compliance Reporting */}
      <div className={styles.auditComplianceSection}>
        <h3>Audit & Compliance Reporting</h3>
        <div className={styles.auditGrid}>
          <div className={styles.auditSettings}>
            <h4>Audit Settings</h4>
            <div className={styles.auditSettingItem}>
              <span>Temper Proof Logging</span>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={auditSettings.tamperProofLogging}
                  onChange={() => handleAuditSettingChange('tamperProofLogging')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            <div className={styles.auditSettingItem}>
              <span>Blockchain Audit</span>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={auditSettings.blockchainAudit}
                  onChange={() => handleAuditSettingChange('blockchainAudit')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            <div className={styles.auditSettingItem}>
              <span>Compliance Reporting</span>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={auditSettings.complianceReporting}
                  onChange={() => handleAuditSettingChange('complianceReporting')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            <div className={styles.retentionSetting}>
              <span>Data Retention Years</span>
              <input
                type="text"
                value={dataRetentionYears}
                onChange={(e) => setDataRetentionYears(e.target.value)}
                className={styles.retentionInput}
              />
              <span>Years</span>
            </div>
          </div>

          <div className={styles.exportReports}>
            <h4>Export Reports</h4>
            <div className={styles.formField}>
              <label>Export Format</label>
              <div className={styles.customDropdownWrapper} ref={exportFormatDropdownRef}>
                <div 
                  className={styles.customDropdownSelected}
                  onClick={() => setShowExportFormatDropdown(!showExportFormatDropdown)}
                >
                  <span>{exportFormat}</span>
                  <ChevronDown size={18} className={showExportFormatDropdown ? styles.chevronRotate : ''} />
                </div>
                {showExportFormatDropdown && (
                  <div className={styles.customDropdownMenu}>
                    {exportFormats.map((format, idx) => (
                      <div
                        key={idx}
                        className={styles.customDropdownItem}
                        onClick={() => {
                          setExportFormat(format);
                          setShowExportFormatDropdown(false);
                        }}
                      >
                        {format}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className={styles.exportReportBtn} onClick={() => handleExportReport('Resolution Report')}>Resolution Report</button>
            <button className={styles.exportReportBtn} onClick={() => handleExportReport('Compliance Report')}>Compliance Report</button>
            <button className={styles.exportReportBtn} onClick={() => handleExportReport('Full Audit Trail')}>Full Audit Trail</button>
          </div>
        </div>
      </div>

      {/* Final Action Buttons */}
      <div className={styles.finalActions}>
        <button className={styles.resetFormBtn} onClick={handleResetForm}>Reset Form</button>
        <button className={styles.saveSettingsBtn} onClick={handleSaveResolutionSettings}>Save Resolution Settings</button>
      </div>
    </div>
  );
};

export default TicketResolution;
