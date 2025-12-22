import React, { useState, useMemo } from 'react'
import styles from '../css/Investment.module.css'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import DataTable from '../components/DataTable/DataTables'
import CustomModal from '../components/CustomModal/CustomModal'
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog'
import { Eye } from 'lucide-react'

const UserInvestments = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    product: ''
  })
  const [showViewModal, setShowViewModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)

  const kpiData = [
    { label: 'Total Investment', value: '5' },
    { label: 'Total Value', value: '3' },
    { label: 'Active Investment', value: '1' },
    { label: 'Total Earning', value: '130,6000.000' }
  ]

  const [mockData, setMockData] = useState([
    {
      id: 1,
      user: 'John Doe',
      email: 'jhon.Doi @gmail.com',
      product: 'T-Bill 182 days',
      amount: '₦10,000.000',
      investmentDate: 'jul-24-2025',
      maturityDate: 'aug-23-2024',
      status: 'Active',
      currentValue: '15,250.00',
      action: 'Early Exit'
    },
    {
      id: 2,
      user: 'Sarah Jhonson',
      email: 'Sarah.Jhonson @gmail.com',
      product: 'Corporate Bond',
      amount: '₦500,000.000',
      investmentDate: 'feb-7-2024',
      maturityDate: 'jan-3-2025',
      status: 'Active',
      currentValue: '25,875.00',
      action: 'Early Exit'
    },
    {
      id: 3,
      user: 'Michael Brown',
      email: 'Mike.brown @gmail.com',
      product: 'Commercial Paper',
      amount: '₦250,000.000',
      investmentDate: 'aug-23-2010',
      maturityDate: 'Mar-23-2009',
      status: 'Matured',
      currentValue: '12,00.000',
      action: ''
    },
    {
      id: 4,
      user: 'Emily Davis',
      email: 'Emilydavis @gmail.com',
      product: 'T-Bills91 days',
      amount: '₦75,000.000',
      investmentDate: 'may-7-2005',
      maturityDate: 'May-7-2004',
      status: 'Pending',
      currentValue: '34,00.000',
      action: 'Rejected'
    },
    {
      id: 5,
      user: 'Robert Welson',
      email: 'Robertvelson @gmail.com',
      product: 'Infrastructuor bond',
      amount: '₦1,000,000.00',
      investmentDate: '24-march-2025',
      maturityDate: 'Jan-10-2029',
      status: 'Active',
      currentValue: '12,00.000',
      action: 'Approved'
    }
  ])

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search User or product',
    dropdowns: [
      {
        key: 'status',
        label: 'All Status',
        options: ['All Status', 'Pending', 'Active', 'Matured', 'Cancelled']
      },
      {
        key: 'product',
        label: 'All Products',
        options: ['All Products', 'T-Bill', 'Bond', 'Commercial Paper']
      }
    ]
  }

  const columns = [
    { header: 'User', key: 'user' },
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
        item.product.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.email.toLowerCase().includes(filters.search.toLowerCase())
      
      const statusMatch = !filters.status || 
        filters.status === 'All Status' || 
        item.status === filters.status
      
      const productMatch = !filters.product || 
        filters.product === 'All Products' ||
        item.product.toLowerCase().includes(filters.product.toLowerCase())
      
      return searchMatch && statusMatch && productMatch
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
            // case 'Early Exit':
            //   updatedItem.status = 'Matured'
            //   updatedItem.action = ''
            //   break
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

      <div className={styles.tableSection}>
        <h3 className={styles.sectionTitle}>Activity Log Entries</h3>
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
              <span className={styles.detailLabel}>User:</span>
              <span className={styles.detailValue}>{currentInvestment.user}</span>
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
