import React, { useState, useMemo } from 'react'
import styles from '../css/AllTransactions.module.css'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UploadIcon, Loader2 } from 'lucide-react'
import DataTable from '../components/DataTable/DataTables'
import QuickActions from '../components/QuickActions'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const AllTransactions = () => {
  const navigate = useNavigate()
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingPDF, setLoadingPDF] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const transactions = [
    {
      transactionId: 'TXN001',
      userId: 'USR000001',
      userName: 'John Doe',
      type: 'Investment - T-Bill 182',
      amount: '₦ 100,000',
      status: 'Failed',
      dateTime: '2024-12-15 10:30 AM',
      date: '2024-12-15'
    },
    {
      transactionId: 'TXN002',
      userId: 'USR000002',
      userName: 'Sarah Smith',
      type: 'Loan - Cash-backed',
      amount: '₦ 50,000',
      status: 'Pending',
      dateTime: '2024-12-15 10:30 AM',
      date: '2024-12-15'
    },
    {
      transactionId: 'TXN003',
      userId: 'USR000003',
      userName: 'Mike Wilson',
      type: 'Withdrawal - Wallet',
      amount: '₦ 200,000',
      status: 'Completed',
      dateTime: '2024-12-15 10:30 AM',
      date: '2024-12-15'
    },
    {
      transactionId: 'TXN004',
      userId: 'USR000004',
      userName: 'John Doe',
      type: 'Investment - T-Bill 91',
      amount: '₦ 150,000',
      status: 'Disbursed',
      dateTime: '2024-12-14 10:30 AM',
      date: '2024-12-14'
    },
    {
      transactionId: 'TXN005',
      userId: 'USR000005',
      userName: 'Sarah Smith',
      type: 'Investment - T-Bill 182',
      amount: '₦ 100,000',
      status: 'Failed',
      dateTime: '2024-12-13 10:30 AM',
      date: '2024-12-13'
    },
    {
      transactionId: 'TXN006',
      userId: 'USR000006',
      userName: 'Mike Wilson',
      type: 'Loan - Cash-backed',
      amount: '₦ 50,000',
      status: 'Pending',
      dateTime: '2024-12-12 10:30 AM',
      date: '2024-12-12'
    },
    {
      transactionId: 'TXN007',
      userId: 'USR000007',
      userName: 'John Doe',
      type: 'Withdrawal - Wallet',
      amount: '₦ 200,000',
      status: 'Completed',
      dateTime: '2024-12-11 10:30 AM',
      date: '2024-12-11'
    },
    {
      transactionId: 'TXN008',
      userId: 'USR000008',
      userName: 'Sarah Smith',
      type: 'Investment - T-Bill 91',
      amount: '₦ 150,000',
      status: 'Disbursed',
      dateTime: '2024-12-10 10:30 AM',
      date: '2024-12-10'
    }
  ]

  const userIds = useMemo(
    () => ['All', ...new Set(transactions.map((t) => t.userId))],
    [transactions]
  )

  const columns = [
    { header: 'Transaction ID', key: 'transactionId' },
    { header: 'User ID', key: 'userId' },
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

  const onFilterChange = (filters) => {
    setLoading(true)
    setTimeout(() => {
      let temp = [...transactions]

      if (filters.search) {
        temp = temp.filter(
          (t) =>
            t.transactionId.toLowerCase().includes(filters.search.toLowerCase()) ||
            t.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
            t.userId.toLowerCase().includes(filters.search.toLowerCase())
        )
      }

      if (filters.userId && filters.userId !== 'All') {
        temp = temp.filter((t) => t.userId === filters.userId)
      }

      if (filters.date) {
        temp = temp.filter((t) => t.date === filters.date)
      }

      setFiltered(temp)
      setLoading(false)
    }, 500)
  }

  const handleExportPDF = () => {
    setLoadingPDF(true)
    setTimeout(() => {
      const doc = new jsPDF()
      doc.setFontSize(18)
      doc.text('All Transactions Data', 14, 15)

      const tableColumn = columns.map((c) => c.header)
      const dataToExport = filtered.length > 0 ? filtered : transactions
      const tableRows = dataToExport.map((t) =>
        columns.map((c) => t[c.key] || '')
      )

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 92, 191],
          textColor: 255,
          fontStyle: 'bold',
        },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      })

      doc.save('transactions.pdf')
      setLoadingPDF(false)
    }, 1000)
  }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft size={20} className={styles.backArrow} />
                <span>Back to Dashboard</span>
            </button>
            <h1 className={styles.title}>All Transactions</h1>
        </div>

        <FilterSearch
          config={{
            showSearch: true,
            searchPlaceholder: "Search by Transaction ID, User ID, or User Name...",
            dropdowns: [
              { key: "userId", label: "User ID", options: userIds },
            ],
            showDate: false,
            showDatePeriod: true,
          }}
          onFilterChange={onFilterChange}
        />
        
        <div className={styles.tableWrapper}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0 }}>All Transactions</h3>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              {filtered.length > 0 ? filtered.length : transactions.length} records
            </span>
          </div>
          <DataTable 
            columns={columns} 
            data={filtered.length > 0 ? filtered : transactions} 
            rowsPerPage={5}
            showPagination={true}
            loading={loading}
          />
        </div>

        <button
          onClick={handleExportPDF}
          disabled={loadingPDF}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#295cbf',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loadingPDF ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: loadingPDF ? 0.7 : 1
          }}
        >
          {loadingPDF ? (
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <UploadIcon size={20} />
          )}
          {loadingPDF ? 'Exporting...' : 'Export Data'}
        </button>

        <QuickActions />
    </div>
  )
}

export default AllTransactions