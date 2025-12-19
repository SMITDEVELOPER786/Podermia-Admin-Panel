import React from 'react'
import styles from '../css/AllTransactions.module.css'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DataTable from '../components/DataTable/DataTables'
import QuickActions from '../components/QuickActions'

const AllTransactions = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const transactions = [
    {
      transactionId: 'TXN001',
      userName: 'John Doe',
      type: 'Investment - T-Bill 182',
      amount: '₦ 100,000',
      status: 'Failed',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN002',
      userName: 'Sarah Smith',
      type: 'Loan - Cash-backed',
      amount: '₦ 50,000',
      status: 'Pending',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN003',
      userName: 'Mike Wilson',
      type: 'Withdrawal - Wallet',
      amount: '₦ 200,000',
      status: 'Completed',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN004',
      userName: 'John Doe',
      type: 'Investment - T-Bill 91',
      amount: '₦ 150,000',
      status: 'Disbursed',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN005',
      userName: 'Sarah Smith',
      type: 'Investment - T-Bill 182',
      amount: '₦ 100,000',
      status: 'Failed',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN006',
      userName: 'Mike Wilson',
      type: 'Loan - Cash-backed',
      amount: '₦ 50,000',
      status: 'Pending',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN007',
      userName: 'John Doe',
      type: 'Withdrawal - Wallet',
      amount: '₦ 200,000',
      status: 'Completed',
      dateTime: '2024-12-15 10:30 AM'
    },
    {
      transactionId: 'TXN008',
      userName: 'Sarah Smith',
      type: 'Investment - T-Bill 91',
      amount: '₦ 150,000',
      status: 'Disbursed',
      dateTime: '2024-12-15 10:30 AM'
    }
  ]

  const columns = [
    { header: 'Transaction ID', key: 'transactionId' },
    { header: 'User Name', key: 'userName' },
    { header: 'Type', key: 'type' },
    { header: 'Amount', key: 'amount' },
    {
      header: 'Status',
      key: 'status',
      styleMap: {
        'Failed': styles.statusFailed,
        'Pending': styles.statusPending,
        'Completed': styles.statusCompleted,
        'Disbursed': styles.statusDisbursed
      }
    },
    { header: 'Date & Time', key: 'dateTime' }
  ]

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft size={20} className={styles.backArrow} />
                <span>Back to Dashboard</span>
            </button>
            <h1 className={styles.title}>All Transactions</h1>
        </div>
        
        <div className={styles.tableWrapper}>
          <DataTable 
            columns={columns} 
            data={transactions} 
            rowsPerPage={5}
            showPagination={true}
          />
        </div>

        <QuickActions />
    </div>
  )
}

export default AllTransactions