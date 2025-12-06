import React, { useState, useMemo } from 'react'
import styles from '../css/WalletAdmin.module.css'
import { ArrowLeft, Eye } from 'lucide-react'
import DataTable from '../components/DataTable/DataTables'
import CustomModal from '../components/CustomModal/CustomModal'
import Toast from '../components/Toast/Toast'
import FilterSearch from '../components/FilterSearch/FilterSearch'

const FailedTransactionReview = ({onBack, handleRetry}) => {
  const [toast, setToast] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  })
  const [note, setNote] = useState('')

  // Mock failed transactions data
  const failedTransactions = [
    {
      id: 'REC001',
      user: 'John Smith',
      userId: 'USER001',
      type: 'top-up',
      amount: '$500.00',
      status: 'Failed',
      gateway: 'Paystack',
      failure: 'Insufficient fund in source account',
      retries: '2',
      date: '1/15/2024',
      fullName: 'John Smith',
      reference: 'PAY_001',
      reason: 'Insufficient funds',
      retryCount: '2',
      attemptedAt: '1/15/2024   9:15:00 AM'
    },
    {
      id: 'FTX001',
      user: 'Sarah Johnson',
      userId: 'USER002',
      type: 'Withdrawal',
      amount: '$2000.00',
      status: 'Pending',
      gateway: 'Flutterwave',
      failure: 'Bank verification required',
      retries: '0',
      date: '1/15/2024',
      fullName: 'Sarah Johnson',
      reference: 'FLW_002',
      reason: 'Bank verification required',
      retryCount: '0',
      attemptedAt: '1/15/2024   9:15:00 AM'
    },
    {
      id: 'FTX006',
      user: 'Mike Wilson',
      userId: 'USER003',
      type: 'Transfer',
      amount: '$2000.00',
      status: 'Pending',
      gateway: 'Flutterwave',
      failure: 'Network timeout',
      retries: '1',
      date: '1/14/2024',
      fullName: 'Mike Wilson',
      reference: 'FLW_006',
      reason: 'Network timeout',
      retryCount: '1',
      attemptedAt: '1/14/2024   3:30:00 PM'
    }
  ]

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by user refrence ID',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Failed', 'Pending', 'Investigation']
      },
      {
        key: 'type',
        label: 'All Type',
        options: ['All Type', 'top-up', 'Withdrawal', 'Transfer']
      }
    ]
  }

  // Filter data
  const filteredData = useMemo(() => {
    return failedTransactions.filter(item => {
      const searchMatch = !filters.search || 
        item.user.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.userId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.id.toLowerCase().includes(filters.search.toLowerCase())
      
      const statusMatch = !filters.status || filters.status === 'All Status' || item.status === filters.status
      const typeMatch = !filters.type || filters.type === 'All Type' || item.type === filters.type
      
      return searchMatch && statusMatch && typeMatch
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  // Calculate KPI values
  const kpiData = [
    { label: 'Failed Transaction', value: '2', color: '#ef4444' },
    { label: 'Pending Retry', value: '1', color: '#f59e0b' },
    { label: 'Under investigation', value: '1', color: '#3b82f6' },
    { label: 'Under investigation', value: '$15777.00', color: '#000' }
  ]


  const handleReverse = () => {
    setToast({
      type: 'error',
      title: 'Transaction Reversed',
      message: 'Transaction has been reversed'
    })
    setSelectedTransaction(null)
  }

  const handleFlag = () => {
    setToast({
      type: 'info',
      title: 'Flagged for Support',
      message: 'Transaction has been flagged for support team'
    })
    setSelectedTransaction(null)
  }

  const columns = [
    { header: 'ID', key: 'id' },
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
        'top-up': styles.typeTopUp,
        'Withdrawal': styles.typeWithdrawal,
        'Transfer': styles.typeTransfer
      }
    },
    { header: 'Amount', key: 'amount' },
    { 
      header: 'Status', 
      key: 'status',
      styleMap: {
        'Failed': styles.statusFailed,
        'Pending': styles.statusPending
      }
    },
    { 
      header: 'Gateway', 
      key: 'gateway',
      render: (row) => (
        <span className={styles.gatewayBadge}>{row.gateway}</span>
      )
    },
    { header: 'Failure', key: 'failure' },
    { header: 'Retries', key: 'retries' },
    { header: 'Date', key: 'date' },
    { 
      header: 'Action', 
      key: 'action',
      render: (row) => (
        <button 
          className={styles.eyeBtn}
          onClick={() => setSelectedTransaction(row)}
        >
          <Eye size={18} />
        </button>
      )
    }
  ]

  return (
    <div className={styles.failedTransactionContainer}>
      {/* Header */}
      <div className={styles.failedTransactionHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h2 className={styles.pageTitle}>Failed Transaction Review</h2>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.criticalBadge}>1 critical failures</span>
          <span className={styles.pendingBadge}>1 pending retries</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className={styles.infoBanner}>
        1 high-value transactions (&gt;$500) have failed and require immediate attention.
      </div>

      {/* Filter Search */}
      <FilterSearch 
        config={filterConfig}
        onFilterChange={handleFilterChange}
      />

      {/* DataTable */}
      <div className={styles.tableSection}>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={400}
        />
      </div>

      {/* KPI Cards */}
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <CustomModal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          showClose={true}
          width="500px"
          title={<h2 className={styles.modalTitle}>Transaction Details - {selectedTransaction.id}</h2>}
        >
          <div className={styles.modalContent}>
            
            <div className={styles.detailsGrid}>
              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>👤 User Information</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Full Name:</span>
                  <span className={styles.detailValue}>{selectedTransaction.fullName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID:</span>
                  <span className={styles.detailValue}>{selectedTransaction.userId}</span>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Transaction Details</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Type:</span>
                  <span className={styles.detailValue}>{selectedTransaction.type}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Amount:</span>
                  <span className={styles.detailValue}>{selectedTransaction.amount}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Gateway:</span>
                  <span className={styles.detailValue}>{selectedTransaction.gateway}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Reference:</span>
                  <span className={styles.detailValue}>{selectedTransaction.reference}</span>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Failure Information</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Reason:</span>
                  <span className={styles.detailValue}>{selectedTransaction.reason}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Retry Count:</span>
                  <span className={styles.detailValue}>{selectedTransaction.retryCount}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Attempted At:</span>
                  <span className={styles.detailValue}>{selectedTransaction.attemptedAt}</span>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Failure Information</h3>
                <textarea
                  className={styles.noteTextarea}
                  placeholder="Add note for this action..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.retryBtn} onClick={handleRetry}>Retry</button>
              <button className={styles.reverseBtn} onClick={handleReverse}>Reverse</button>
              <button className={styles.flagBtn} onClick={handleFlag}>Flag for Support</button>
            </div>
          </div>
        </CustomModal>
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
    </div>
  )
}

export default FailedTransactionReview
