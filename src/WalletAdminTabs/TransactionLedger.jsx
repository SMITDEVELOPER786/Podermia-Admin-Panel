import React, { useState, useMemo, useEffect, useRef } from 'react'
import styles from '../css/WalletAdmin.module.css'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import DataTable from '../components/DataTable/DataTables'
import CustomModal from '../components/CustomModal/CustomModal'
import Toast from '../components/Toast/Toast'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Download, FileText, FileSpreadsheet } from 'lucide-react'

const TransactionLedger = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    accountType: '',
    startDate: '',
    endDate: ''
  })
  const [modalOpen, setModalOpen] = useState(false)

  const [pendingTransfers, setPendingTransfers] = useState([
    {
      id: 1,
      user: 'Mike Wilson',
      amount: '75.00',
      date: 'Jan 14, 2024',
      bank: '**** 4567',
      reference: 'REF003',
      description: 'Transfer to savings account',
      estCompletion: '2-3 business days',
      status: 'Pending'
    },
    {
      id: 2,
      user: 'Alice Johnson',
      amount: '1,200.00',
      date: 'Jan 16 2024',
      bank: '**** 8912',
      reference: 'REF006',
      description: 'Bank transfer withdrawal',
      estCompletion: '1-2 business days',
      status: 'Processing'
    },
    {
      id: 3,
      user: 'Robert Davis',
      amount: '450.00',
      date: 'Jan 16, 2024',
      bank: '**** 3456',
      reference: 'REF007',
      description: 'External bank transfer',
      estCompletion: 'Pending verification',
      status: 'Verification Required'
    }
  ])

  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    processing: 0,
    verification: 0
  })

  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const exportDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };

    if (showExportDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportDropdown]);

  React.useEffect(() => {
    const counts = {
      total: pendingTransfers.filter(t => 
        t.status === 'Pending' || 
        t.status === 'Verification Required'
      ).length,
      processing: pendingTransfers.filter(t => t.status === 'Processing').length,
      verification: pendingTransfers.filter(t => t.status === 'Verification Required').length
    };
    setStatusCounts(counts);
  }, [pendingTransfers]);

  const mockData = [
    {
      transactionId: 'TXN001',
      userId: 'USR001',
      user: 'John Smith',
      type: 'Credit',
      accountType: 'Cash & Cash Equivalents',
      amount: '$500.00',
      status: 'Completed',
      date: 'Jan 15,2024',
      description: 'Wallet top-up via bank transfer',
      reference: 'REF001'
    },
    {
      transactionId: 'TXN002',
      userId: 'USR002',
      user: 'Sarah Johnson',
      type: 'Debit',
      accountType: 'Investment Assets',
      amount: '$150.00',
      status: 'Completed',
      date: 'Jan 15,2024',
      description: 'Investment Purchase',
      reference: 'REF002'
    },
    {
      transactionId: 'TXN003',
      userId: 'USR003',
      user: 'Mike Wilson',
      type: 'Credit',
      accountType: 'Savings Liability',
      amount: '$75.00',
      status: 'Pending',
      date: 'Jan 14,2024',
      description: 'Transfer to savings accounts',
      reference: 'REF003'
    },
    {
      transactionId: 'TXN004',
      userId: 'USR004',
      user: 'Emily Davis',
      type: 'Debit',
      accountType: 'Wallet Liability',
      amount: '$200.00',
      status: 'Failed',
      date: 'Jan 14,2024',
      description: 'Withdrawal attempt',
      reference: 'REF004'
    },
    {
      transactionId: 'TXN005',
      userId: 'USR005',
      user: 'David Brown',
      type: 'Credit',
      accountType: 'Receivables',
      amount: '$1000.00',
      status: 'Completed',
      date: 'Jan 13,2024',
      description: 'Loan disbursement',
      reference: 'REF005'
    }
  ]

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by user, reference, or ID',
    showDatePeriod: true,
    dropdowns: [
      {
        key: 'type',
        label: 'All Types',
        options: ['All Types', 'Credit', 'Debit']
      },
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Completed', 'Pending', 'Failed']
      },
      {
        key: 'accountType',
        label: 'All Account Types',
        options: [
          'All Account Types',
          'Cash & Cash Equivalents',
          'Receivables',
          'Investment Assets',
          'Wallet Liability',
          'Savings Liability',
          'Investment Liability',
          'Loan Collateral Liability',
          'Payables',
          'Equity Account',
          'Interest Income',
          'Fee & Commission Income',
          'Direct Costs',
          'Interest Expense',
          'Operating Expenses'
        ]
      }
    ]
  }

  const columns = [
    { header: 'Transaction ID', key: 'transactionId' },
    { header: 'User ID', key: 'userId' },
    { header: 'User', key: 'user' },
    { 
      header: 'Type', 
      key: 'type',
      styleMap: {
        'Credit': styles.typeCredit,
        'Debit': styles.typeDebit,
        'Transfer': styles.typeTransfer
      }
    },
    { header: 'Account Type', key: 'accountType' },
    { header: 'Amount', key: 'amount' },
    { 
      header: 'Status', 
      key: 'status',
      styleMap: {
        'Completed': styles.statusCompleted,
        'Pending': styles.statusPending,
        'Failed': styles.statusFailed
      }
    },
    { header: 'Date', key: 'date' },
    { header: 'Description', key: 'description' },
    { header: 'Reference', key: 'reference' }
  ]

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const searchMatch = !filters.search || 
        item.user.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.userId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.reference.toLowerCase().includes(filters.search.toLowerCase())
      
      const typeMatch = !filters.type || 
        filters.type === 'All Types' || 
        item.type === filters.type
      
      const statusMatch = !filters.status || 
        filters.status === 'All Status' ||
        item.status === filters.status
      
      const accountTypeMatch = !filters.accountType || 
        filters.accountType === 'All Account Types' ||
        item.accountType === filters.accountType
      
      const dateMatch = (!filters.startDate && !filters.endDate) || (() => {
        if (!filters.startDate && !filters.endDate) return true
        const itemDate = new Date(item.date.replace(/,/g, ''))
        const startDate = filters.startDate ? new Date(filters.startDate) : null
        const endDate = filters.endDate ? new Date(filters.endDate) : null
        
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate
        } else if (startDate) {
          return itemDate >= startDate
        } else if (endDate) {
          return itemDate <= endDate
        }
        return true
      })()
      
      return searchMatch && typeMatch && statusMatch && accountTypeMatch && dateMatch
    })
  }, [filters])

  const kpiData = useMemo(() => {
    const totalCredits = filteredData
      .filter(t => t.type === 'Credit')
      .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0)
    
    const totalDebits = filteredData
      .filter(t => t.type === 'Debit')
      .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0)
    
    return [
      { label: 'Total Credits', value: `$${totalCredits.toFixed(2)}`, color: '#10b981' },
      { label: 'Total Debits', value: `$${totalDebits.toFixed(2)}`, color: '#ef4444' },
      { label: 'Total Transaction', value: filteredData.length, color: '#3b82f6' }
    ]
  }, [filteredData])

  const handleProcessNow = (transferId) => {
    console.log(`Processing transfer with ID: ${transferId}`);
    
    setPendingTransfers(prevTransfers => 
      prevTransfers.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, status: 'Processing', estCompletion: '1-2 business days' } 
          : transfer
      )
    );
    
    setStatusCounts(prevCounts => ({
      total: prevCounts.total - 1,
      processing: prevCounts.processing + 1,
      verification: prevCounts.verification
    }));
  };

  const handleRejectTransfer = (transferId) => {
    console.log(`Rejecting transfer with ID: ${transferId}`);
    
    setPendingTransfers(prevTransfers => 
      prevTransfers.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, status: 'Rejected', estCompletion: 'Transfer rejected' } 
          : transfer
      )
    );
    
    setStatusCounts(prevCounts => ({
      total: prevCounts.total - 1,
      processing: prevCounts.processing,
      verification: prevCounts.verification - 1
    }));
  };

  const handleApproveTransfer = (transferId) => {
    console.log(`Approving transfer with ID: ${transferId}`);
    
    setPendingTransfers(prevTransfers => 
      prevTransfers.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, status: 'Processing', estCompletion: '1-2 business days' } 
          : transfer
      )
    );
    
    setStatusCounts(prevCounts => ({
      total: prevCounts.total - 1,
      processing: prevCounts.processing + 1,
      verification: prevCounts.verification - 1
    }));
  };

  const handleRefreshStatus = () => {
    console.log('Refreshing transfer status...');
    setToast({ show: true, message: 'Refreshing transfer status...', type: 'info' });
    
    
    setPendingTransfers(prevTransfers => [...prevTransfers]);
    
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      setToast({
        show: true,
        type: 'warning',
        message: 'No transaction data available to export'
      });
      return;
    }

    setLoadingCSV(true);
    setTimeout(() => {
      try {
        const headers = ['Transaction ID', 'User ID', 'User', 'Type', 'Account Type', 'Amount', 'Status', 'Date', 'Description', 'Reference'];
        const csvContent = [
          headers.join(','),
          ...filteredData.map(transaction => [
            transaction.transactionId,
            transaction.userId,
            `"${transaction.user}"`,
            transaction.type,
            transaction.accountType,
            transaction.amount,
            transaction.status,
            transaction.date,
            `"${transaction.description}"`,
            transaction.reference
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `transaction-ledger-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setToast({
          show: true,
          type: 'success',
          message: `CSV file downloaded successfully (${filteredData.length} transactions)`
        });
        setLoadingCSV(false);
        setShowExportDropdown(false);
      } catch (error) {
        console.error('CSV Export Error:', error);
        setLoadingCSV(false);
        setToast({
          show: true,
          type: 'error',
          message: 'Failed to export CSV file. Please try again.'
        });
      }
    }, 500);
  };

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      setToast({
        show: true,
        type: 'warning',
        message: 'No transaction data available to export'
      });
      return;
    }

    setLoadingPDF(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text('Transaction Ledger Report', 14, 15);
        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);
        doc.text(`Total Transactions: ${filteredData.length}`, 14, 30);

        const tableColumn = ['Transaction ID', 'User ID', 'User', 'Type', 'Account Type', 'Amount', 'Status', 'Date', 'Description', 'Reference'];
        const tableRows = filteredData.map(transaction => [
          transaction.transactionId,
          transaction.userId,
          transaction.user,
          transaction.type,
          transaction.accountType,
          transaction.amount,
          transaction.status,
          transaction.date,
          transaction.description.length > 30 ? transaction.description.substring(0, 27) + '...' : transaction.description,
          transaction.reference
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 37,
          theme: 'grid',
          styles: { 
            fontSize: 7,
            cellPadding: 2
          },
          headStyles: { 
            fillColor: [41, 92, 191],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 8
          },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 25 },
            3: { cellWidth: 18 },
            4: { cellWidth: 35 },
            5: { cellWidth: 22 },
            6: { cellWidth: 22 },
            7: { cellWidth: 25 },
            8: { cellWidth: 45 },
            9: { cellWidth: 25 }
          }
        });

        doc.save(`transaction-ledger-${new Date().toISOString().split('T')[0]}.pdf`);

        setToast({
          show: true,
          type: 'success',
          message: `PDF file downloaded successfully (${filteredData.length} transactions)`
        });
        setLoadingPDF(false);
        setShowExportDropdown(false);
      } catch (error) {
        console.error('PDF Export Error:', error);
        setLoadingPDF(false);
        setToast({
          show: true,
          type: 'error',
          message: 'Failed to export PDF file. Please try again.'
        });
      }
    }, 500);
  };

  return (
    <>
    <div className={styles.transactionLedgerContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Transaction Ledger</h2>
        <div className={styles.headerButtons}>
          <div className={styles.exportDropdownContainer} ref={exportDropdownRef}>
            <button 
              className={styles.exportBtn}
              onClick={() => setShowExportDropdown(!showExportDropdown)}
            >
              Export
            </button>
            {showExportDropdown && (
              <div className={styles.exportDropdown}>
                <button
                  className={styles.exportOption}
                  onClick={handleExportCSV}
                  disabled={loadingCSV || loadingPDF}
                >
                  <FileSpreadsheet size={16} />
                  {loadingCSV ? 'Exporting...' : 'Export CSV'}
                </button>
                <button
                  className={styles.exportOption}
                  onClick={handleExportPDF}
                  disabled={loadingCSV || loadingPDF}
                >
                  <FileText size={16} />
                  {loadingPDF ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            )}
          </div>
          <button className={styles.pendingBankBtn} onClick={() => setModalOpen(true)}>Pending Bank Transfer</button>
        </div>
      </div>

      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      <div className={styles.tableSection}>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={400}
        />
      </div>

      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiValue} style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
          </div>
        ))}
      </div>
    </div>
    <CustomModal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)} 
      showClose={true}
      width="800px"
      title=" "
    >
      <div className={styles.modalContent}>
           <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600',  }}>
            Bank Transfer Pending Status
          </h2>
          <p style={{ fontSize: '14px', color: 'grey', marginBottom: 15 }}>
            Manage critical loan operations and system-wide actions
          </p>
        </div>
        <div className={styles.infoBanner}>
          {statusCounts.total} bank transfers are currently pending processing or verification.
        </div>

        <div className={styles.statusCardsGrid}>
          <div className={styles.statusCard}>
            <h3>Total Pending</h3>
            <div className={styles.statusNumber} style={{ color: '#f59e0b' }}>
              {statusCounts.total}
            </div>
            <p>Awaiting processing</p>
          </div>
          <div className={styles.statusCard}>
            <h3>Processing</h3>
            <div className={styles.statusNumber} style={{ color: '#3b82f6' }}>
              {statusCounts.processing}
            </div>
            <p>In progress</p>
          </div>
          <div className={styles.statusCard}>
            <h3>Verification Needed</h3>
            <div className={styles.statusNumber} style={{ color: '#ef4444' }}>
              {statusCounts.verification}
            </div>
            <p>Requires attention</p>
          </div>
        </div>

        <div className={styles.transfersList}>
          {pendingTransfers.map((transfer) => (
            <div key={transfer.id} className={styles.transferCard}>
              <div className={styles.transferHeader}>
                <div>
                  <h4>{transfer.user}</h4>
                </div>
                <div className={styles.transferActions}>
                  <span 
                    className={`${styles.statusBadge} ${
                      transfer.status === 'Pending' ? styles.badgePending :
                      transfer.status === 'Processing' ? styles.badgeProcessing :
                      transfer.status === 'Verification Required' ? styles.badgeVerification :
                      transfer.status === 'Rejected' ? styles.badgeRejected :
                      styles.badgePending
                    }`}
                  >
                    {transfer.status}
                  </span>
                  {transfer.status === 'Pending' && (
                    <button 
                      className={styles.processBtn} 
                      onClick={() => handleProcessNow(transfer.id)}
                    >
                      Process Now
                    </button>
                  )}
                  {transfer.status === 'Verification Required' && (
                    <>
                      <button 
                        className={styles.rejectBtn}
                        onClick={() => handleRejectTransfer(transfer.id)}
                      >
                        Reject
                      </button>
                      <button 
                        className={styles.approveBtn}
                        onClick={() => handleApproveTransfer(transfer.id)}
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className={styles.transferDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Amount</span>
                  <span className={styles.detailValue}>{transfer.amount}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>{transfer.date}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Bank:</span>
                  <span className={styles.detailValue}>{transfer.bank}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Reference:</span>
                  <span className={styles.detailValue}>{transfer.reference}</span>
                </div>
              </div>

              <div className={styles.transferFooter}>
                <div>
                  <span className={styles.detailLabel}>Description: </span>
                  <span>{transfer.description}</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Est. Completion: </span>
                  <span style={{ color: '#3b82f6' }}>{transfer.estCompletion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.refreshBtn} 
            onClick={handleRefreshStatus}
          >
            Refresh Status
          </button>
          <button className={styles.closeModalBtn} onClick={() => setModalOpen(false)}>Close</button>
        </div>
      </div>
    </CustomModal>
    {toast.show && toast.message && (
      <Toast 
        message={toast.message} 
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: '' })}
      />
    )}
    </>

  )
}

export default TransactionLedger
