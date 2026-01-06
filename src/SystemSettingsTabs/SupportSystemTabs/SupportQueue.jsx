import React, { useState } from 'react';
import styles from '../../css/SupportSystem.module.css';
import systemStyles from '../../css/SystemSetting.module.css';
import FilterSearch from '../../components/FilterSearch/FilterSearch';
import DataTable from '../../components/DataTable/DataTables';
import CustomModal from '../../components/CustomModal/CustomModal';
import Toast from '../../components/Toast/Toast';
import { FileDown, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SupportQueue = () => {
  // KPI Cards Data
  const kpiCards = [
    { title: 'Total Tickets', value: '5', subtitle: 'All time', color: '#1e3a5f' },
    { title: 'Open Tickets', value: '2', subtitle: 'Requires attention', color: '#dc2626' },
    { title: 'SLA Breaches', value: '1', subtitle: 'Users Requiring immediate attention', color: '#f59e0b' },
    { title: 'Unassigned', value: '1', subtitle: 'Awaiting assignment', color: '#6b7280' },
    { title: 'Pending', value: '1', subtitle: '', color: '#f59e0b' },
    { title: 'Resolved', value: '1', subtitle: '', color: '#059669' },
    { title: 'Closed', value: '1', subtitle: '', color: '#6b7280' },
    { title: 'Escalated', value: '1', subtitle: '', color: '#dc2626' }
  ];

  // Support Tickets Data
  const [tickets] = useState([
    {
      id: 'TKT-001',
      userId: 'USR000001',
      subject: 'Unable to complete KYC verification - Document upload issue',
      customer: 'John Smith',
      tier: 'Premium',
      category: 'KYC',
      autoDelist: 'High',
      status: 'Open',
      assignee: 'Unassigned',
      slaStatus: 'Within SLA',
      priority: 'High',
      createdDate: '2024-12-08 10:30 AM',
      date: '2024-12-08',
      lastUpdate: '2024-12-08 11:45 AM',
      description: 'User is unable to upload KYC documents. Error message appears when trying to submit verification.',
      ticketHistory: [
        { date: '2024-12-08 10:30 AM', action: 'Ticket Created', user: 'System' },
        { date: '2024-12-08 11:45 AM', action: 'Status Updated', user: 'Admin' }
      ]
    },
    {
      id: 'TKT-002',
      userId: 'USR000002',
      subject: 'Transaction failed but amount debited from wallet',
      customer: 'Sarah Johnson',
      tier: 'Standard',
      category: 'Wallet',
      autoDelist: 'Critical',
      status: 'Pending',
      assignee: 'Mike Wilson',
      slaStatus: 'SLA Breach',
      priority: 'Critical',
      createdDate: '2024-12-07 02:15 PM',
      date: '2024-12-07',
      lastUpdate: '2024-12-08 09:20 AM',
      description: 'Customer reports transaction failure but amount was deducted from wallet balance.',
      ticketHistory: [
        { date: '2024-12-07 02:15 PM', action: 'Ticket Created', user: 'System' },
        { date: '2024-12-07 03:30 PM', action: 'Assigned to Mike Wilson', user: 'Admin' },
        { date: '2024-12-08 09:20 AM', action: 'Investigation Started', user: 'Mike Wilson' }
      ]
    },
    {
      id: 'TKT-003',
      userId: 'USR000003',
      subject: 'Loan application status inquiry - updates needed',
      customer: 'David Brownsd',
      tier: 'Premium',
      category: 'Loan',
      autoDelist: 'Medium',
      status: 'Open',
      assignee: 'Emily Davis',
      slaStatus: 'Within SLA',
      priority: 'Medium',
      createdDate: '2024-12-06 11:00 AM',
      date: '2024-12-06',
      lastUpdate: '2024-12-08 08:15 AM',
      description: 'Customer inquiring about loan application status and requesting updates on approval timeline.',
      ticketHistory: [
        { date: '2024-12-06 11:00 AM', action: 'Ticket Created', user: 'System' },
        { date: '2024-12-06 02:45 PM', action: 'Assigned to Emily Davis', user: 'Admin' },
        { date: '2024-12-08 08:15 AM', action: 'Response Sent', user: 'Emily Davis' }
      ]
    },
    {
      id: 'TKT-004',
      userId: 'USR000004',
      subject: 'Investment portfolio not updating properly',
      customer: 'Lisa Wilson',
      tier: 'VIP',
      category: 'Investment',
      autoDelist: 'Low',
      status: 'Resolved',
      assignee: 'John Anderson',
      slaStatus: 'Resolved On Time',
      priority: 'Low',
      createdDate: '2024-12-05 09:00 AM',
      date: '2024-12-05',
      lastUpdate: '2024-12-06 04:30 PM',
      description: 'Investment portfolio values not reflecting recent market changes.',
      ticketHistory: [
        { date: '2024-12-05 09:00 AM', action: 'Ticket Created', user: 'System' },
        { date: '2024-12-05 10:30 AM', action: 'Assigned to John Anderson', user: 'Admin' },
        { date: '2024-12-06 02:15 PM', action: 'Issue Fixed', user: 'John Anderson' },
        { date: '2024-12-06 04:30 PM', action: 'Ticket Resolved', user: 'John Anderson' }
      ]
    },
    {
      id: 'TKT-005',
      userId: 'USR000005',
      subject: 'Mobile app crashed during login',
      customer: 'Robert Davis',
      tier: 'Standard',
      category: 'Technical',
      autoDelist: 'High',
      status: 'Closed',
      assignee: 'Sarah Collins',
      slaStatus: 'Closed',
      priority: 'High',
      createdDate: '2024-12-04 03:20 PM',
      date: '2024-12-04',
      lastUpdate: '2024-12-05 11:00 AM',
      description: 'Mobile application crashes when user attempts to login.',
      ticketHistory: [
        { date: '2024-12-04 03:20 PM', action: 'Ticket Created', user: 'System' },
        { date: '2024-12-04 04:00 PM', action: 'Assigned to Sarah Collins', user: 'Admin' },
        { date: '2024-12-05 09:30 AM', action: 'Fix Deployed', user: 'Sarah Collins' },
        { date: '2024-12-05 11:00 AM', action: 'Ticket Closed', user: 'Sarah Collins' }
      ]
    }
  ]);

  // State Management
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: "Search by Ticket ID, Subject, User ID...",
    showDate: false,
    showDatePeriod: true,
    dropdowns: [
      {
        key: "status",
        label: "All Status",
        options: ["All Status", "Open", "Pending", "Resolved", "Closed"]
      },
      {
        key: "category",
        label: "All Categories",
        options: ["All Categories", "KYC", "Wallet", "Loan", "Investment", "Technical"]
      },
      {
        key: "priority",
        label: "All Priority",
        options: ["All Priority", "High", "Medium", "Low", "Critical"]
      }
    ]
  };

  // Handle Filter Change
  const handleFilterChange = (filters) => {
    let filtered = tickets;

    // Search Filter
    if (filters.search) {
      filtered = filtered.filter(ticket =>
        ticket.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.userId.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status Filter
    if (filters.status && filters.status !== "All Status") {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // Category Filter
    if (filters.category && filters.category !== "All Categories") {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }

    if (filters.priority && filters.priority !== "All Priority") {
      filtered = filtered.filter(ticket => ticket.autoDelist === filters.priority);
    }

    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter(ticket => {
        const ticketDate = new Date(ticket.date);
        ticketDate.setHours(0, 0, 0, 0);
        
        if (filters.startDate && filters.endDate) {
          const startDate = new Date(filters.startDate);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999);
          return ticketDate >= startDate && ticketDate <= endDate;
        } else if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          startDate.setHours(0, 0, 0, 0);
          return ticketDate >= startDate;
        } else if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999);
          return ticketDate <= endDate;
        }
        return true;
      });
    }

    setFilteredTickets(filtered);
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (ticketId) => {
    setSelectedTickets(prev =>
      prev.includes(ticketId)
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(ticket => ticket.id));
    }
  };

  // Handle View Details
  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setViewModalOpen(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = selectedTickets.length > 0
      ? tickets.filter(ticket => selectedTickets.includes(ticket.id))
      : filteredTickets;

    if (dataToExport.length === 0) {
      setToastMessage('No tickets available to export');
      setShowToast(true);
      return;
    }

    setLoadingCSV(true);
    setTimeout(() => {
      try {
        const headers = ['Ticket ID', 'User ID', 'Subject', 'Customer', 'Category', 'Auto-Delist', 'Status', 'Assignee', 'SLA Status'];
        const csvContent = [
          headers.join(','),
          ...dataToExport.map(ticket =>
            [ticket.id, ticket.userId, `"${ticket.subject}"`, ticket.customer, ticket.category, ticket.autoDelist, ticket.status, ticket.assignee, ticket.slaStatus].join(',')
          )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `support-tickets-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setToastMessage(`CSV file downloaded successfully (${dataToExport.length} tickets)`);
        setShowToast(true);
        setLoadingCSV(false);
      } catch (error) {
        console.error('CSV Export Error:', error);
        setToastMessage('Failed to export CSV file. Please try again.');
        setShowToast(true);
        setLoadingCSV(false);
      }
    }, 500);
  };

  // Export to PDF
  const exportToPDF = () => {
    const dataToExport = selectedTickets.length > 0
      ? tickets.filter(ticket => selectedTickets.includes(ticket.id))
      : filteredTickets;

    if (dataToExport.length === 0) {
      setToastMessage('No tickets available to export');
      setShowToast(true);
      return;
    }

    setLoadingPDF(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Support Ticket Queue Report', 14, 15);
        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);
        doc.text(`Total Tickets: ${dataToExport.length}`, 14, 30);

        const tableData = dataToExport.map(ticket => [
          ticket.id,
          ticket.userId,
          ticket.subject.length > 30 ? ticket.subject.substring(0, 27) + '...' : ticket.subject,
          ticket.customer,
          ticket.category,
          ticket.autoDelist,
          ticket.status,
          ticket.assignee,
          ticket.slaStatus
        ]);

        autoTable(doc, {
          head: [['Ticket ID', 'User ID', 'Subject', 'Customer', 'Category', 'Priority', 'Status', 'Assignee', 'SLA Status']],
          body: tableData,
          startY: 37,
          theme: 'grid',
          headStyles: {
            fillColor: [30, 58, 95],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 8
          },
          bodyStyles: {
            fontSize: 7,
            cellPadding: 2
          },
          alternateRowStyles: { fillColor: [245, 247, 250] }
        });

        doc.save(`support-tickets-${new Date().toISOString().split('T')[0]}.pdf`);

        setToastMessage(`PDF file downloaded successfully (${dataToExport.length} tickets)`);
        setShowToast(true);
        setLoadingPDF(false);
      } catch (error) {
        console.error('PDF Export Error:', error);
        setToastMessage('Failed to export PDF file. Please try again.');
        setShowToast(true);
        setLoadingPDF(false);
      }
    }, 500);
  };

  // DataTable Columns
  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
          onChange={handleSelectAll}
          style={{ cursor: 'pointer' }}
        />
      ),
      key: 'checkbox',
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedTickets.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
          onClick={(e) => e.stopPropagation()}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    { header: 'Ticket ID', key: 'id' },
    { header: 'User ID', key: 'userId' },
    { header: 'Subject', key: 'subject' },
    { header: 'Customer', key: 'customer' },
    { header: 'Category', key: 'category' },
    {
      header: 'Auto-Delist',
      key: 'autoDelist',
      styleMap: {
        High: systemStyles.statusError,
        Critical: systemStyles.statusError,
        Medium: systemStyles.statusDegraded,
        Low: systemStyles.statusOperational
      }
    },
    {
      header: 'Status',
      key: 'status',
      styleMap: {
        Open: systemStyles.statusError,
        Pending: systemStyles.statusDegraded,
        Resolved: systemStyles.statusOperational,
        Closed: systemStyles.statusCompleted
      }
    },
    { header: 'Assignee', key: 'assignee' },
    { header: 'SLA Status', key: 'slaStatus' },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <button
          className={styles.viewBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(row);
          }}
        >
          View
        </button>
      )
    }
  ];

  return (
    <div className={systemStyles.generalSettingContainer}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((card, index) => (
          <div key={index} className={styles.kpiCard}>
            <h4 className={styles.kpiTitle}>{card.title}</h4>
            <p className={styles.kpiValue} style={{ color: card.color }}>{card.value}</p>
            {card.subtitle && <p className={styles.kpiSubtitle}>{card.subtitle}</p>}
          </div>
        ))}
      </div>

      {/* Support Ticket Queue Management */}
      <div className={systemStyles.settingSection}>
        <div className={styles.queueHeader}>
          <div>
            <h3 className={styles.queueTitle}>Support Ticket Queue Management</h3>
            <p className={styles.queueSubtitle}>Search Tickets</p>
          </div>
          <button
            className={styles.refreshBtn}
            onClick={() => {
              setFilteredTickets(tickets);
              setToastMessage('Queue refreshed successfully!');
              setShowToast(true);
            }}
          >
            Refresh Queue
          </button>
        </div>

        {/* Filter & Search */}
        <FilterSearch config={filterConfig} onFilterChange={handleFilterChange} />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredTickets}
          scrollHeight={500}
        />
      </div>

      {/* Audit & Reporting */}
      <div className={systemStyles.settingSection}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Audit & Reporting
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={exportToCSV}
            disabled={loadingCSV || filteredTickets.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: loadingCSV || filteredTickets.length === 0 ? 'not-allowed' : 'pointer',
              opacity: loadingCSV || filteredTickets.length === 0 ? 0.6 : 1,
              fontWeight: '500',
              fontSize: '14px',
              color: '#374151'
            }}
          >
            {loadingCSV ? (
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToPDF}
            disabled={loadingPDF || filteredTickets.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: loadingPDF || filteredTickets.length === 0 ? 'not-allowed' : 'pointer',
              opacity: loadingPDF || filteredTickets.length === 0 ? 0.6 : 1,
              fontWeight: '500',
              fontSize: '14px',
              color: '#374151'
            }}
          >
            {loadingPDF ? (
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <FileText size={16} />
            )}
            <span>Export PDF</span>
          </button>
        </div>
        <p className={styles.exportInfo}>
          {selectedTickets.length > 0
            ? `${selectedTickets.length} ticket(s) selected for export`
            : `All ${filteredTickets.length} tickets will be exported`}
        </p>
      </div>

      {/* View Details Modal */}
      {selectedTicket && (
        <CustomModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Ticket Details - ${selectedTicket.id}`}
          width="800px"
          showClose={true}
        >
          <div style={{ padding: '8px 0' }}>
            <div className={styles.detailsGrid}>
              <div>
                <label className={styles.detailLabel}>Subject</label>
                <p className={styles.detailValue}>{selectedTicket.subject}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Customer</label>
                <p className={styles.detailValue}>{selectedTicket.customer} ({selectedTicket.tier})</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Category</label>
                <p className={styles.detailValue}>{selectedTicket.category}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Priority</label>
                <p className={styles.detailValue}>{selectedTicket.autoDelist}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Status</label>
                <p className={styles.detailValue}>{selectedTicket.status}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Assignee</label>
                <p className={styles.detailValue}>{selectedTicket.assignee}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>SLA Status</label>
                <p className={styles.detailValue}>{selectedTicket.slaStatus}</p>
              </div>
              <div>
                <label className={styles.detailLabel}>Created Date</label>
                <p className={styles.detailValue}>{selectedTicket.createdDate}</p>
              </div>
              <div className={styles.detailsGridFull}>
                <label className={styles.detailLabel}>Description</label>
                <p className={styles.detailValueLong}>{selectedTicket.description}</p>
              </div>
            </div>

            <div className={styles.historySection}>
              <h4 className={styles.historyTitle}>Ticket History</h4>
              <div className={styles.historyList}>
                {selectedTicket.ticketHistory.map((history, index) => (
                  <div key={index} className={styles.historyItem}>
                    <div>
                      <span className={styles.historyAction}>{history.action}</span>
                      <span className={styles.historyUser}>by {history.user}</span>
                    </div>
                    <span className={styles.historyDate}>{history.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.closeModalBtn} onClick={() => setViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Success Toast */}
      {showToast && (
        <Toast
          type="success"
          title="Success!"
          message={toastMessage}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default SupportQueue;
