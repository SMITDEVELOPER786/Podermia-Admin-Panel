import React, { useState, useMemo } from 'react'
import styles from '../css/Investment.module.css'
import FilterSearch from '../components/FilterSearch/FilterSearch'
import DataTable from '../components/DataTable/DataTables'
import { Eye } from 'lucide-react'

const UserInvestments = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    product: ''
  })

  // Mock KPI data
  const kpiData = [
    { label: 'Total Investment', value: '5' },
    { label: 'Total Value', value: '3' },
    { label: 'Active Investment', value: '1' },
    { label: 'Total Earning', value: '130,6000.000' }
  ]

  // Mock table data
  const mockData = [
    {
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
  ]

  // Filter configuration
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

  // Table columns with custom render for Action
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
          <button className={styles.eyeBtn} title="View Details">
            <Eye size={18} />
          </button>
          {row.action && row.action !== '' && (
            <button 
              className={
                row.action === 'Early Exit' ? styles.earlyExitBtn :
                row.action === 'Approved' ? styles.approvedBtn :
                row.action === 'Rejected' ? styles.rejectedBtn :
                styles.approveBtn
              }
            >
              {row.action}
            </button>
          )}
        </div>
      )
    }
  ]

  // Filtered data
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
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className={styles.userInvestmentContainer}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      {/* Activity Log Entries */}
      <div className={styles.tableSection}>
        <h3 className={styles.sectionTitle}>Activity Log Entries</h3>
        <DataTable 
          columns={columns}
          data={filteredData}
          scrollHeight={500}
        />
      </div>
    </div>
  )
}

export default UserInvestments
