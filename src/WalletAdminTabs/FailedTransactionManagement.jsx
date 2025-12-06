import React, { useState, useMemo } from 'react'
import styles from '../css/WalletAdmin.module.css'
import DataTable from '../components/DataTable/DataTables'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

const FailedTransactionManagement = ({onBack}) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  })

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
      action: 'Support'
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
      action: 'Support'
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
      action: 'Retry'
    }
  ]

  // Filter configuration
  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by user Transaction ID or User ID',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Failed', 'Pending']
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

  // KPI Data
  const kpiData = [
    { label: 'Total Failed', value: '3', subtext: 'Transaction', color: '#ef4444' },
    { label: 'High Priority', value: '2', subtext: 'Need Attention', color: '#f59e0b' },
    { label: 'Pending Transfers', value: '2', subtext: 'Bank Transfer', color: '#3b82f6' },
    { label: 'Total Amount', value: '$2,650.00', subtext: 'At risk', color: '#000' }
  ]

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
          className={row.action === 'Support' ? styles.supportBtn : styles.retryActionBtn}
        >
          {row.action}
        </button>
      )
    }
  ]

  return (
    <div className={styles.failedManagementContainer}>
      {/* Header */}
      <div className={styles.managementHeader}>
        <div className={styles.headerWithBack}>
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className={styles.pageTitle}>Failed Transaction Management</h2>
            <p className={styles.subtitle}>Monitor and resolve failed transactions and pending bank transfers</p>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <div className={styles.criticalAlert}>
        <div className={styles.alertContent}>
          <AlertTriangle size={20} />
          <span>Critical Alert: 2 high-priority transactions require immediate attention</span>
        </div>
        <button className={styles.actionRequiredBtn}>Action Required</button>
      </div>

      {/* Pending Bank Transfer Notices */}
      <div className={styles.noticesSection}>
        <h3 className={styles.noticesTitle}>Pending Bank Transfer Notices</h3>
        
        <div className={styles.noticeCard}>
          <div className={styles.noticeHeader}>
            <AlertTriangle size={18} color="#f59e0b" />
            <span className={styles.noticeLabel}>Pending Bank Transfer Notice</span>
          </div>
          <p className={styles.noticeText}>
            Transaction PBT001 is experiencing processing delays. Estimated completion time: 1-3 business days. Bank transfers may take longer during weekends and holidays.
          </p>
        </div>

        <div className={styles.noticeCard}>
          <div className={styles.noticeHeader}>
            <AlertTriangle size={18} color="#f59e0b" />
            <span className={styles.noticeLabel}>Pending Bank Transfer Notice</span>
          </div>
          <p className={styles.noticeText}>
            Transaction PBT002 is experiencing processing delays. Estimated completion time: 2-4 business days. Bank transfers may take longer during weekends and holidays.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue} style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className={styles.kpiSubtext}>{kpi.subtext}</div>
          </div>
        ))}
      </div>

      {/* Failed Transaction Review Section */}
      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Failed Transaction Review</h3>
            <p className={styles.sectionSubtext}>Transactions that have failed after multiple webhook retries</p>
          </div>
        </div>

        {/* FilterSearch */}
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
      </div>
    </div>
  )
}

export default FailedTransactionManagement
