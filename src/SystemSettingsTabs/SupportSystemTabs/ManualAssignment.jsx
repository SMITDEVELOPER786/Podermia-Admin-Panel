import React, { useState, useMemo } from 'react';
import styles from '../../css/SupportSystem.module.css';
import systemStyles from '../../css/SystemSetting.module.css';
import DataTables from '../../components/DataTable/DataTables';
import FilterSearch from '../../components/FilterSearch/FilterSearch';
import Toast from '../../components/Toast/Toast';
import { FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ManualAssignment = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '', title: '' });
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  
  const [tickets] = useState([
    {
      id: 'TKT-001',
      userId: 'USR000001',
      subject: 'Unable to complete KYC verification - Document upload failing',
      customer: 'John Smith',
      customerType: 'Premium',
      category: 'KYC',
      priority: 'High',
      estTime: '4 hours',
      recommendedAgent: 'Mike Wilson',
      agentLoad: '8/15',
      date: '2024-12-08'
    },
    {
      id: 'TKT-002',
      userId: 'USR000002',
      subject: 'Transaction failed but amount debited from wallet',
      customer: 'Sarah Johnson',
      customerType: 'Standard',
      category: 'Wallet',
      priority: 'Critical',
      estTime: '2 hours',
      recommendedAgent: 'Emily Davis',
      agentLoad: '12/20',
      date: '2024-12-07'
    },
    {
      id: 'TKT-003',
      userId: 'USR000003',
      subject: 'Investment returns calculation seems incorrect',
      customer: 'David Brownsd',
      customerType: 'Premium',
      category: 'Investment',
      priority: 'Medium',
      estTime: '6 hours',
      recommendedAgent: 'No suitable agent',
      agentLoad: '',
      date: '2024-12-06'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    date: ''
  });

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
    if (selectedTickets.length === filteredTickets.length && filteredTickets.length > 0) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(ticket => ticket.id));
    }
  };

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = !filters.search || 
        ticket.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.userId.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesDate = !filters.date || ticket.date === filters.date;
      
      return matchesSearch && matchesDate;
    });
  }, [tickets, filters]);

  // Filter Configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by Ticket ID, Subject, User ID...',
    showDate: true,
    dropdowns: []
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = selectedTickets.length > 0
      ? tickets.filter(ticket => selectedTickets.includes(ticket.id))
      : filteredTickets;

    if (dataToExport.length === 0) {
      setToast({
        show: true,
        type: 'warning',
        title: 'No Data',
        message: 'No tickets available to export'
      });
      return;
    }

    setLoadingCSV(true);
    setTimeout(() => {
      try {
        const headers = ['Ticket ID', 'User ID', 'Subject', 'Customer', 'Category', 'Priority', 'Est. Time', 'Recommended Agent'];
        const csvContent = [
          headers.join(','),
          ...dataToExport.map(ticket =>
            [ticket.id, ticket.userId, `"${ticket.subject}"`, ticket.customer, ticket.category, ticket.priority, ticket.estTime, ticket.recommendedAgent].join(',')
          )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `ticket-assignments-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setToast({
          show: true,
          type: 'success',
          title: 'Export Successful',
          message: `CSV file downloaded successfully (${dataToExport.length} tickets)`
        });
        setLoadingCSV(false);
      } catch (error) {
        console.error('CSV Export Error:', error);
        setToast({
          show: true,
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export CSV file. Please try again.'
        });
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
      setToast({
        show: true,
        type: 'warning',
        title: 'No Data',
        message: 'No tickets available to export'
      });
      return;
    }

    setLoadingPDF(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Ticket Assignment Report', 14, 15);
        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);
        doc.text(`Total Tickets: ${dataToExport.length}`, 14, 30);

        const tableData = dataToExport.map(ticket => [
          ticket.id,
          ticket.userId,
          ticket.subject.length > 30 ? ticket.subject.substring(0, 27) + '...' : ticket.subject,
          ticket.customer,
          ticket.category,
          ticket.priority,
          ticket.estTime,
          ticket.recommendedAgent
        ]);

        autoTable(doc, {
          head: [['Ticket ID', 'User ID', 'Subject', 'Customer', 'Category', 'Priority', 'Est. Time', 'Recommended Agent']],
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

        doc.save(`ticket-assignments-${new Date().toISOString().split('T')[0]}.pdf`);

        setToast({
          show: true,
          type: 'success',
          title: 'Export Successful',
          message: `PDF file downloaded successfully (${dataToExport.length} tickets)`
        });
        setLoadingPDF(false);
      } catch (error) {
        console.error('PDF Export Error:', error);
        setToast({
          show: true,
          type: 'error',
          title: 'Export Failed',
          message: 'Failed to export PDF file. Please try again.'
        });
        setLoadingPDF(false);
      }
    }, 500);
  };

  const ticketColumns = [
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
        <h3>Unassigned Tickets({filteredTickets.length})</h3>
        
        {/* Filter & Search */}
        <FilterSearch config={filterConfig} onFilterChange={handleFilterChange} />
        
        {/* Data Table */}
        <DataTables columns={ticketColumns} data={filteredTickets} itemsPerPage={10} />

        {/* Export Section */}
        <div className={systemStyles.settingSection} style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            Export Data
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
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {selectedTickets.length > 0
              ? `${selectedTickets.length} ticket(s) selected for export`
              : `All ${filteredTickets.length} tickets will be exported`}
          </p>
        </div>
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
