import React, { useState, useMemo } from 'react'
import styles from '../css/Investment.module.css'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import DataTable from '../components/DataTable/DataTables'
import CustomModal from '../components/CustomModal/CustomModal'
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog'
import { Eye, Upload as UploadIcon, Loader2, Pause, Play } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const UserInvestments = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    product: '',
    userType: '',
    date: '',
    startDate: '',
    endDate: ''
  })
  const [showViewModal, setShowViewModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)
  const [loadingPDF, setLoadingPDF] = useState(false)
  const [isInvestmentPaused, setIsInvestmentPaused] = useState(false)

  const kpiData = [
    { label: 'Total Investment', value: '5' },
    { label: 'Total Value', value: '3' },
    { label: 'Active Investment', value: '1' },
    { label: 'Total Earning', value: '130,6000.000' }
  ]

  const [mockData, setMockData] = useState([
    {
      id: 1,
      userId: 'USR000001',
      user: 'John Doe',
      userType: 'Individual',
      email: 'jhon.Doi @gmail.com',
      product: 'T-Bill 182 days',
      amount: '₦10,000.000',
      investmentDate: '2025-07-24',
      maturityDate: '2024-08-23',
      status: 'Active',
      currentValue: '15,250.00',
      action: 'Early Exit'
    },
    {
      id: 2,
      userId: 'USR000002',
      user: 'Sarah Jhonson',
      userType: 'Corporate',
      email: 'Sarah.Jhonson @gmail.com',
      product: 'Corporate Bond',
      amount: '₦500,000.000',
      investmentDate: '2024-02-07',
      maturityDate: '2025-01-03',
      status: 'Active',
      currentValue: '25,875.00',
      action: 'Early Exit'
    },
    {
      id: 3,
      userId: 'USR000003',
      user: 'Michael Brown',
      userType: 'Individual',
      email: 'Mike.brown @gmail.com',
      product: 'Commercial Paper',
      amount: '₦250,000.000',
      investmentDate: '2010-08-23',
      maturityDate: '2009-03-23',
      status: 'Matured',
      currentValue: '12,00.000',
      action: ''
    },
    {
      id: 4,
      userId: 'USR000004',
      user: 'Emily Davis',
      userType: 'Individual',
      email: 'Emilydavis @gmail.com',
      product: 'T-Bills91 days',
      amount: '₦75,000.000',
      investmentDate: '2005-05-07',
      maturityDate: '2004-05-07',
      status: 'Pending',
      currentValue: '34,00.000',
      action: 'Rejected'
    },
    {
      id: 5,
      userId: 'USR000005',
      user: 'Robert Welson',
      userType: 'Corporate',
      email: 'Robertvelson @gmail.com',
      product: 'Infrastructuor bond',
      amount: '₦1,000,000.00',
      investmentDate: '2025-03-24',
      maturityDate: '2029-01-10',
      status: 'Active',
      currentValue: '12,00.000',
      action: 'Approved'
    }
  ])

  const uniqueUserTypes = useMemo(() => {
    const types = mockData.map(item => item.userType)
    return ['All User Types', ...new Set(types)]
  }, [mockData])

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search by Name or User ID',
    showDatePeriod: true,
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Pending', 'Active', 'Matured', 'Cancelled']
      },
      {
        key: 'userType',
        label: 'All User Types',
        options: uniqueUserTypes
      },
      {
        key: 'product',
        label: 'All Products',
        options: ['All Products', 'T-Bill', 'Bond', 'Commercial Paper']
      }
    ]
  }

  const columns = [
    { header: 'User ID', key: 'userId' },
    { header: 'User', key: 'user' },
    { header: 'User Type', key: 'userType' },
    { header: 'Product', key: 'product' },
    { header: 'Amount', key: 'amount' },
    { header: 'Investment Date', key: 'investmentDate' },
    { header: 'Maturity Date', key: 'maturityDate' },
    { 
      header: 'Status', 
      key: 'status',
      styleMap: {
        'Active': styles.statusActive,
        'Matured': styles.statusMatured,
        'Pending': styles.statusPending,
        'Cancelled': styles.statusCancelled
      }
    },
    { header: 'Current Value', key: 'currentValue' },
    { 
      header: 'Action', 
      key: 'action',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className={styles.eyeBtn} 
            title="View Details"
            onClick={() => handleViewDetails(row)}
          >
            <Eye size={18} />
          </button>
          
          {row.status === 'Pending' && (
            <>
              <button 
                className={styles.approveBtn}
                onClick={() => handleActionClick(row, 'Accept')}
              >
                Accept
              </button>
              <button 
                className={styles.rejectedBtn}
                onClick={() => handleActionClick(row, 'Reject')}
              >
                Reject
              </button>
            </>
          )}
          {row.status === 'Active' && (
            <button 
              className={styles.approveBtn}
              onClick={() => handleActionClick(row, 'Mark as Pending')}
            >
              Mark as Pending
            </button>
          )}

          {/* {row.action && row.action === 'Early Exit' && (
            <button 
              className={styles.earlyExitBtn}
              onClick={() => handleActionClick(row, 'Early Exit')}
            >
              Early Exit
            </button>
          )} */}
        </div>
      )
    }
  ]

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const searchMatch = !filters.search || 
        item.user.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.userId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.product.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.email.toLowerCase().includes(filters.search.toLowerCase())
      
      const statusMatch = !filters.status || 
        filters.status === 'All Status' || 
        item.status === filters.status
      
      const productMatch = !filters.product || 
        filters.product === 'All Products' ||
        item.product.toLowerCase().includes(filters.product.toLowerCase())
      
      const userTypeMatch = !filters.userType || 
        filters.userType === 'All User Types' ||
        item.userType === filters.userType
      
      let dateMatch = true
      if (filters.date) {
        dateMatch = item.investmentDate === filters.date || item.investmentDate.startsWith(filters.date)
      }
      if (filters.startDate && filters.endDate) {
        dateMatch = item.investmentDate >= filters.startDate && item.investmentDate <= filters.endDate
      }
      
      return searchMatch && statusMatch && productMatch && userTypeMatch && dateMatch
    })
  }, [filters, mockData])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleViewDetails = (investment) => {
    setSelectedInvestment(investment)
    setShowViewModal(true)
  }

  const handleActionClick = (investment, action) => {
    setSelectedInvestment(investment)
    setPendingAction(action)
    
    let confirmMessage = ''
    let confirmTitle = ''
    
    switch(action) {
      case 'Accept':
      case 'Approved':
        confirmTitle = 'Approve Investment'
        confirmMessage = `Are you sure you want to approve this investment for ${investment.user}?`
        break
      case 'Reject':
      case 'Rejected':
        confirmTitle = 'Reject Investment'
        confirmMessage = `Are you sure you want to reject this investment for ${investment.user}?`
        break
      case 'Mark as Pending':
        confirmTitle = 'Mark as Pending'
        confirmMessage = `Are you sure you want to mark this investment as pending for ${investment.user}?`
        break
      // case 'Early Exit':
      //   confirmTitle = 'Process Early Exit'
      //   confirmMessage = `Are you sure you want to process early exit for ${investment.user}'s investment?`
      //   break
      default:
        confirmTitle = 'Confirm Action'
        confirmMessage = `Are you sure you want to perform this action?`
    }
    
    setShowConfirmDialog({
      isOpen: true,
      title: confirmTitle,
      message: confirmMessage,
      type: action === 'Reject' || action === 'Rejected' ? 'warning' : 'question'
    })
  }

  const handleConfirmAction = () => {
    if (pendingAction === 'Pause' || pendingAction === 'Restart') {
      handleCriticalActionConfirm()
      return
    }

    if (!selectedInvestment || !pendingAction) return

    setMockData(prevData => 
      prevData.map(item => {
        if (item.id === selectedInvestment.id) {
          let updatedItem = { ...item }
          
          switch(pendingAction) {
            case 'Accept':
            case 'Approved':
              updatedItem.status = 'Active'
              updatedItem.action = 'Approved'
              break
            case 'Reject':
            case 'Rejected':
              updatedItem.status = 'Cancelled'
              updatedItem.action = 'Rejected'
              break
            case 'Mark as Pending':
              updatedItem.status = 'Pending'
              updatedItem.action = ''
              break
          }
          
          return updatedItem
        }
        return item
      })
    )

    setShowConfirmDialog({ isOpen: false })
    setSelectedInvestment(null)
    setPendingAction(null)
  }

  const handleCancelAction = () => {
    setShowConfirmDialog({ isOpen: false })
    setSelectedInvestment(null)
    setPendingAction(null)
  }

  const handleExportPDF = () => {
    setLoadingPDF(true)
    setTimeout(() => {
      const doc = new jsPDF()
      doc.setFontSize(18)
      doc.text("User Investments Data", 14, 15)

      const exportColumns = columns.filter(c => c.key !== "action")
      const tableColumn = exportColumns.map((c) => c.header)
      const tableRows = filteredData.map((item) =>
        exportColumns.map((c) => item[c.key] || '')
      )

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        theme: "grid",
        headStyles: {
          fillColor: [41, 92, 191],
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      })

      doc.save("user_investments.pdf")
      setLoadingPDF(false)
    }, 1000)
  }

  const handlePauseInvestments = () => {
    setShowConfirmDialog({
      isOpen: true,
      title: 'Pause All Investment Actions',
      message: 'Are you sure you want to pause all investment actions? This will temporarily halt all investment processing.',
      type: 'warning'
    })
    setPendingAction('Pause')
  }

  const handleRestartInvestments = () => {
    setShowConfirmDialog({
      isOpen: true,
      title: 'Restart All Investment Actions',
      message: 'Are you sure you want to restart all investment actions? This will resume all investment processing.',
      type: 'question'
    })
    setPendingAction('Restart')
  }

  const handleCriticalActionConfirm = () => {
    if (pendingAction === 'Pause') {
      setIsInvestmentPaused(true)
    } else if (pendingAction === 'Restart') {
      setIsInvestmentPaused(false)
    }
    setShowConfirmDialog({ isOpen: false })
    setPendingAction(null)
  }

  return (
    <div className={styles.userInvestmentContainer}>
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      <div className={styles.criticalActionsSection}>
        <h3 className={styles.sectionTitle} style={{marginBottom: 10}}>Critical Actions</h3>
        <div className={styles.criticalActionsBox}>
          <div className={styles.actionStatus}>
            <span className={styles.statusLabel}>Investment Actions Status:</span>
            <span className={`${styles.statusBadge} ${isInvestmentPaused ? styles.paused : styles.active}`}>
              {isInvestmentPaused ? 'Paused' : 'Active'}
            </span>
          </div>
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.pauseBtn} ${isInvestmentPaused ? styles.disabled : ''}`}
              onClick={handlePauseInvestments}
              disabled={isInvestmentPaused}
            >
              <Pause size={18} />
              Pause All Actions
            </button>
            <button 
              className={`${styles.restartBtn} ${!isInvestmentPaused ? styles.disabled : ''}`}
              onClick={handleRestartInvestments}
              disabled={!isInvestmentPaused}
            >
              <Play size={18} />
              Restart All Actions
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3 className={styles.sectionTitle}>Activity Log Entries</h3>
          <div className={styles.tableActions}>
            <span className={styles.recordCount}>
              {filteredData.length} records
            </span>
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
                  Export Data
                </>
              )}
            </button>
          </div>
        </div>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={500}
        />
      </div>

      <CustomModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false)
          setSelectedInvestment(null)
        }}
        title="Investment Details"
        width="600px"
      >
        {selectedInvestment && (() => {
          const currentInvestment = mockData.find(item => item.id === selectedInvestment.id) || selectedInvestment
          return (
          <div className={styles.investmentDetailsModal}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User ID:</span>
              <span className={styles.detailValue}>{currentInvestment.userId}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User:</span>
              <span className={styles.detailValue}>{currentInvestment.user}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>User Type:</span>
              <span className={styles.detailValue}>{currentInvestment.userType}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email:</span>
              <span className={styles.detailValue}>{currentInvestment.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Product:</span>
              <span className={styles.detailValue}>{currentInvestment.product}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Amount:</span>
              <span className={styles.detailValue}>{currentInvestment.amount}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Investment Date:</span>
              <span className={styles.detailValue}>{currentInvestment.investmentDate}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Maturity Date:</span>
              <span className={styles.detailValue}>{currentInvestment.maturityDate}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={`${styles.detailValue} ${styles.modalStatusBadge} ${
                currentInvestment.status === 'Active' ? styles.statusActive :
                currentInvestment.status === 'Matured' ? styles.statusMatured :
                currentInvestment.status === 'Pending' ? styles.statusPending :
                styles.statusCancelled
              }`}>
                {currentInvestment.status}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Current Value:</span>
              <span className={styles.detailValue}>{currentInvestment.currentValue}</span>
            </div>
            {currentInvestment.action && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Action:</span>
                <span className={styles.detailValue}>{currentInvestment.action}</span>
              </div>
            )}
          </div>
          )
        })()}
      </CustomModal>

      <ConfirmDialog
        isOpen={showConfirmDialog.isOpen}
        type={showConfirmDialog.type || 'question'}
        title={showConfirmDialog.title || 'Confirm Action'}
        message={showConfirmDialog.message || 'Are you sure you want to perform this action?'}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  )
}

export default UserInvestments
