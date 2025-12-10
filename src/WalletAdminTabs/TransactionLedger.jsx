import React, { useState, useMemo } from 'react'
import styles from '../css/WalletAdmin.module.css'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import DataTable from '../components/DataTable/DataTables'
import CustomModal from '../components/CustomModal/CustomModal'

const TransactionLedger = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: ''
  })
  const [modalOpen, setModalOpen] = useState(false)

  // Pending bank transfers data
  const pendingTransfers = [
    {
      id: 1,
      user: 'Mike Wilson',
      userId: 'USER003',
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
      userId: 'USER006',
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
      userId: 'USER006',
      amount: '450.00',
      date: 'Jan 16, 2024',
      bank: '**** 3456',
      reference: 'REF007',
      description: 'External bank transfer',
      estCompletion: 'Pending verification',
      status: 'Verification Required'
    }
  ]

  const statusCounts = {
    total: pendingTransfers.length,
    processing: pendingTransfers.filter(t => t.status === 'Processing').length,
    verification: pendingTransfers.filter(t => t.status === 'Verification Required').length
  }

  // Mock transaction data
  const mockData = [
    {
      transactionId: 'TXN001',
      user: 'John Smith',
      userId: 'USER001',
      type: 'Credit',
      amount: '$500.00',
      status: 'Completed',
      date: 'Jan 15,2024',
      description: 'Wallet top-up via bank transfer',
      reference: 'REF001'
    },
    {
      transactionId: 'TXN002',
      user: 'Sarah Johnson',
      userId: 'USER002',
      type: 'Debit',
      amount: '$150.00',
      status: 'Completed',
      date: 'Jan 15,2024',
      description: 'Investment Purchase',
      reference: 'REF002'
    },
    {
      transactionId: 'TXN003',
      user: 'Mike Wilson',
      userId: 'USER003',
      type: 'Transfer',
      amount: '$75.00',
      status: 'Pending',
      date: 'Jan 14,2024',
      description: 'Transfer to savings accounts',
      reference: 'REF003'
    },
    {
      transactionId: 'TXN004',
      user: 'Emily Davis',
      userId: 'USER004',
      type: 'Debit',
      amount: '$200.00',
      status: 'Failed',
      date: 'Jan 14,2024',
      description: 'Withdrawal attempt',
      reference: 'REF004'
    },
    {
      transactionId: 'TXN005',
      user: 'David Brown',
      userId: 'USER005',
      type: 'Credit',
      amount: '$1000.00',
      status: 'Completed',
      date: 'Jan 13,2024',
      description: 'Loan disbursement',
      reference: 'REF005'
    }
  ]

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by user, refrence,or ID',
    dropdowns: [
      {
        key: 'type',
        label: 'All Types',
        options: ['All Types', 'Credit', 'Debit', 'Transfer']
      },
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Completed', 'Pending', 'Failed']
      }
    ]
  }

  // Table columns
  const columns = [
    { header: 'Transaction ID', key: 'transactionId' },
    { 
      header: 'User', 
      key: 'user',
      render: (row) => (
        <div>
          <div>{row.user}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{row.userId}</div>
        </div>
      )
    },
    { 
      header: 'Type', 
      key: 'type',
      styleMap: {
        'Credit': styles.typeCredit,
        'Debit': styles.typeDebit,
        'Transfer': styles.typeTransfer
      }
    },
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

  // Filtered data
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
      
      return searchMatch && typeMatch && statusMatch
    })
  }, [filters])

  // Calculate KPI values from filtered data
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
    <div className={styles.transactionLedgerContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Transaction Ledger</h2>
        <div className={styles.headerButtons}>
          <button className={styles.exportBtn}>Export</button>
          <button className={styles.pendingBankBtn} onClick={() => setModalOpen(true)}>Pending Bank Transfer</button>
        </div>
      </div>

      {/* Filter & Search */}
      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      {/* Transaction Table */}
      <div className={styles.tableSection}>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={400}
        />
      </div>

      {/* KPI Cards at bottom */}
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
        {/* Info Banner */}
        <div className={styles.infoBanner}>
          {statusCounts.total} bank transfers are currently pending processing or verification.
        </div>

        {/* Status Cards */}
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

        {/* Pending Transfers List */}
        <div className={styles.transfersList}>
          {pendingTransfers.map((transfer) => (
            <div key={transfer.id} className={styles.transferCard}>
              <div className={styles.transferHeader}>
                <div>
                  <h4>{transfer.user}</h4>
                  <span className={styles.userId}>{transfer.userId}</span>
                </div>
                <div className={styles.transferActions}>
                  <span 
                    className={`${styles.statusBadge} ${
                      transfer.status === 'Pending' ? styles.badgePending :
                      transfer.status === 'Processing' ? styles.badgeProcessing :
                      styles.badgeVerification
                    }`}
                  >
                    {transfer.status}
                  </span>
                  {transfer.status === 'Pending' && (
                    <button className={styles.processBtn}>Process Now</button>
                  )}
                  {transfer.status === 'Verification Required' && (
                    <>
                      <button className={styles.rejectBtn}>Rejected</button>
                      {/* <button className={styles.approveBtn}>Approved</button> */}
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

        {/* Footer Buttons */}
        <div className={styles.modalFooter}>
          <button className={styles.refreshBtn}>Refresh Status</button>
          <button className={styles.closeModalBtn} onClick={() => setModalOpen(false)}>Close</button>
        </div>
      </div>
    </CustomModal>

    </>
  )
}

export default TransactionLedger
