import React, { useState } from 'react'
import styles from '../css/Investment.module.css'
import CustomModal from '../components/CustomModal/CustomModal'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import FailureCenter from './FailureCenter'
const PayoutCalender = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date(2024, 8)) // September 2024
  const [selectedFilter, setSelectedFilter] = useState('All Types')
  const [selectedSegment, setSelectedSegment] = useState('All Segments')
  const [selectedDate, setSelectedDate] = useState(null)
  const [showEventsModal, setShowEventsModal] = useState(false)
  const [showProcessModal, setShowProcessModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showExportSuccessModal, setShowExportSuccessModal] = useState(false)
  const [selectedPayouts, setSelectedPayouts] = useState([])
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedExportStatuses, setSelectedExportStatuses] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [activeTab, setActiveTab] = useState('calendar')
  const typeOptions = ['All Types', 'T-Bills', 'Bond', 'Commercial Paper']
  const segmentOptions = ['All Segments', 'Retail Investors', 'Institutional', 'High Net Worth']
  const statusOptions = ['All Status', 'Pending', 'Completed', 'Recently Processed']

  // Mock data with processedAt timestamps
  // Recently processed: within 24 hours
  // Completed: all matured payouts (old + recently processed)
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
  
  // Initialize payouts as state so they can be updated when processed
  const [payouts, setPayouts] = useState([
    { id: 1, date: 3, name: 'T-Bill 90 Days', status: 'Matured', color: '#c8e6c9', investors: 45, amount: 12500000, processedAt: tenDaysAgo },
    { id: 2, date: 5, name: 'Corporate Bond', status: 'Matured', color: '#c8e6c9', investors: 120, amount: 50000000, processedAt: threeDaysAgo },
    { id: 3, date: 9, name: 'T-Bill', status: 'Processing', color: '#bbdefb', investors: 78, amount: 30000000, processedAt: null },
    { id: 4, date: 12, name: 'Commercial Paper', status: 'Matured', color: '#fff9c4', investors: 55, amount: 18000000, processedAt: oneDayAgo },
    { id: 5, date: 15, name: 'Infrastructure Bond', status: 'Matured', color: '#c8e6c9', investors: 200, amount: 100000000, processedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000) }, // 12 hours ago - recently processed
    { id: 6, date: 18, name: 'T-Bill', status: 'Pending', color: '#fff9c4', investors: 89, amount: 42000000, processedAt: null },
    { id: 7, date: 20, name: 'Corporate Bond', status: 'Matured', color: '#e1bee7', investors: 150, amount: 75000000, processedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000) }, // 6 hours ago - recently processed
    { id: 8, date: 25, name: 'T-Bill', status: 'Pending', color: '#fff9c4', investors: 95, amount: 48000000, processedAt: null },
    { id: 9, date: 28, name: 'Infrastructure Bond', status: 'Matured', color: '#bbdefb', investors: 180, amount: 90000000, processedAt: new Date(now.getTime() - 18 * 60 * 60 * 1000) } // 18 hours ago - recently processed
  ])

  const processPayoutsList = [
    { id: 1, name: 'T-Bill 91 Days Batch A', due: 'Sep 15 • 2 + investors', amount: 12750000, status: 'Matured' },
    { id: 2, name: 'Corporate Bond Series B', due: 'Sep 18 • 12 + investors', amount: 52500000, status: 'Matured' },
    { id: 3, name: 'Commercial Paper CP-2024-Q3', due: 'Sep 22 • 8 + investors', amount: 36000000, status: 'Matured' },
    { id: 4, name: 'Infrastructure Bond IB-001', due: 'Sep 25 • 15 + investors', amount: 102000000, status: 'Matured' },
    { id: 5, name: 'Government Bond GB-2024-H2', due: 'Sep 28 • 10 + investors', amount: 81200000, status: 'Matured' },
    { id: 6, name: 'Quick T-Bill 30 Days', due: 'Sep 5 • 3 + investors', amount: 9350000, status: 'Matured' },
    { id: 7, name: 'Corporate Note CN-2024', due: 'Sep 12 • 6 + investors', amount: 24850000, status: 'Matured' },
    { id: 8, name: 'High Yield Bond HY-001', due: 'Sep 30 • 20 + investors', amount: 135000000, status: 'Matured' }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Filter payouts based on status
  const getFilteredPayouts = () => {
    let filtered = [...payouts]
    const currentTime = new Date()
    const oneDayAgoTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000).getTime()
    
    // Filter by status
    if (selectedStatus === 'Pending') {
      filtered = filtered.filter(p => p.status === 'Pending')
    } else if (selectedStatus === 'Completed') {
      filtered = filtered.filter(p => p.status === 'Matured')
    } else if (selectedStatus === 'Recently Processed') {
      filtered = filtered.filter(p => {
        if (p.status !== 'Matured' || !p.processedAt) return false
        const processedTime = new Date(p.processedAt).getTime()
        return processedTime >= oneDayAgoTime
      })
    }
    // 'All Status' - no filtering needed
    
    // Sort: Recently processed payouts (within 24 hours) first, then by processedAt date (newest first)
    filtered.sort((a, b) => {
      // Check if payout is recently processed (within 24 hours)
      const aIsRecent = a.processedAt && new Date(a.processedAt).getTime() >= oneDayAgoTime
      const bIsRecent = b.processedAt && new Date(b.processedAt).getTime() >= oneDayAgoTime
      
      // Recently processed payouts come first
      if (aIsRecent && !bIsRecent) return -1
      if (!aIsRecent && bIsRecent) return 1
      
      // If both are recent or both are not recent, sort by processedAt (newest first)
      if (a.processedAt && b.processedAt) {
        return new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
      }
      
      // If only one has processedAt, prioritize it
      if (a.processedAt && !b.processedAt) return -1
      if (!a.processedAt && b.processedAt) return 1
      
      // Otherwise, sort by date (newest first)
      return b.date - a.date
    })
    
    return filtered
  }

  const filteredPayouts = getFilteredPayouts()
  
  // Check if any filter is active (excluding default values)
  const hasActiveFilters = selectedStatus !== 'All Status'

  // Function to get relative time (e.g., "2h ago", "1min ago")
  const getRelativeTime = (processedAt) => {
    if (!processedAt) return null
    
    const now = new Date()
    const processed = new Date(processedAt)
    const diffInMs = now.getTime() - processed.getTime()
    const diffInSeconds = Math.floor(diffInMs / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}min ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return null // Don't show for older than 7 days
    }
  }

  const getEventsForDate = (day) => {
    return filteredPayouts.filter(p => p.date === day)
  }

  const handleDateClick = (day) => {
    const events = getEventsForDate(day)
    if (events.length > 0) {
      setSelectedDate(day)
      setShowEventsModal(true)
    }
  }

  const handlePayoutSelect = (id) => {
    setSelectedPayouts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedPayouts.length === processPayoutsList.length) {
      setSelectedPayouts([])
    } else {
      setSelectedPayouts(processPayoutsList.map(p => p.id))
    }
  }

  const handleProcessPayouts = () => {
    const processedTime = new Date() // Current time when processing
    
    // Get selected payouts to process
    const payoutsToProcess = processPayoutsList.filter(p => selectedPayouts.includes(p.id))
    
    // Update or add payouts
    setPayouts(prevPayouts => {
      const updatedPayouts = [...prevPayouts]
      
      payoutsToProcess.forEach(processPayout => {
        // Extract date from "due" field (e.g., "Sep 15 • 2 + investors" -> 15)
        const dateMatch = processPayout.due.match(/(\w+)\s+(\d+)/)
        let payoutDate = null
        if (dateMatch) {
          const monthName = dateMatch[1]
          const day = parseInt(dateMatch[2])
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          const monthIndex = monthNames.findIndex(m => m === monthName)
          if (monthIndex !== -1) {
            payoutDate = day
          }
        }
        
        // Extract investors count from "due" field (e.g., "2 + investors" -> 2)
        const investorsMatch = processPayout.due.match(/(\d+)\s*\+?\s*investors?/i)
        const investors = investorsMatch ? parseInt(investorsMatch[1]) : 0
        
        // If date not found, use day 1 as default
        if (!payoutDate) {
          payoutDate = 1
        }
        
        // Try to find existing payout by name or amount
        const existingIndex = updatedPayouts.findIndex(p => 
          p.name === processPayout.name || 
          (p.amount === processPayout.amount && p.date === payoutDate)
        )
        
        if (existingIndex !== -1) {
          // Update existing payout
          updatedPayouts[existingIndex] = {
            ...updatedPayouts[existingIndex],
            status: 'Matured',
            processedAt: processedTime,
            investors: investors || updatedPayouts[existingIndex].investors
          }
        } else {
          // Add new payout
          // Generate a new unique ID
          const maxId = updatedPayouts.length > 0 ? Math.max(...updatedPayouts.map(p => p.id)) : 0
          
          // Assign color based on payout type or use default colors
          const defaultColors = ['#c8e6c9', '#bbdefb', '#fff9c4', '#e1bee7', '#c5cae9']
          const colorIndex = (maxId + 1) % defaultColors.length
          
          const newPayout = {
            id: maxId + 1,
            date: payoutDate || 1, // Default to day 1 if date not found
            name: processPayout.name,
            status: 'Matured',
            color: defaultColors[colorIndex], // Rotate through default colors
            investors: investors || 0,
            amount: processPayout.amount,
            processedAt: processedTime
          }
          updatedPayouts.push(newPayout)
        }
      })
      
      return updatedPayouts
    })
    
    setShowProcessModal(false)
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowSuccessModal(false)
      setSelectedPayouts([])
    }, 2000)
  }

  const handleTodayClick = () => {
    setSelectedMonth(new Date())
  }

  const handleExportStatusToggle = (status) => {
    setSelectedExportStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
  }

  const handleExportSchedule = () => {
    setShowExportModal(false)
    setShowExportSuccessModal(true)
    setTimeout(() => {
      setShowExportSuccessModal(false)
      setSelectedExportStatuses([])
    }, 2000)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth)
    const firstDay = getFirstDayOfMonth(selectedMonth)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.calendarDay}></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day)
      days.push(
        <div 
          key={day} 
          className={`${styles.calendarDay} ${events.length > 0 ? styles.hasEvents : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <div className={styles.dayHeader}>
            <div className={styles.dayNumber}>{day}</div>
            {events.length > 0 && (
              <div className={styles.eventIndicators}>
                {events.map((event, idx) => (
                  <div 
                    key={idx}
                    className={styles.eventColorDot} 
                    style={{ backgroundColor: event.color }}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.eventsContainer}>
            {events.map((event, idx) => (
              <div 
                key={idx} 
                className={styles.calendarEvent}
                style={{ backgroundColor: event.color }}
              >
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.eventMobile}>
                  <div className={styles.eventColorBar} style={{ backgroundColor: event.color }}></div>
                  {/* <span className={styles.eventViewText}>View</span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
if (activeTab === 'Failure Center') {
  return <FailureCenter onBack={() => setActiveTab('calendar')} />
}
  return (
    <div className={styles.payoutCalendarContainer}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>Payout Calendar</h2>
        <div className={styles.calendarActions}>
          <button className={styles.actionBtn} onClick={() => setShowExportModal(true)}>Export Schedule</button>
          <button className={styles.actionBtn} onClick={() => setShowProcessModal(true)}>Process Payout</button>
          <button className={styles.actionBtnDanger} onClick={() => setActiveTab('Failure Center')}> Failure Center</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.calendarKpiGrid}>
        <div className={styles.calendarKpi}>
          <div className={styles.kpiLabel}>This month</div>
          <div className={styles.kpiValue}>68,950,000.00</div>
        </div>
        <div className={styles.calendarKpi}>
          <div className={styles.kpiLabel}>Total Investor</div>
          <div className={styles.kpiValue}>1,333</div>
        </div>
        <div className={styles.calendarKpi}>
          <div className={styles.kpiLabel}>Schedule Payout</div>
          <div className={styles.kpiValue}>8</div>
        </div>
        <div className={styles.calendarKpi}>
          <div className={styles.kpiLabel}>Processing</div>
          <div className={styles.kpiValue}>1</div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.calendarFilters}>
        {/* Type Dropdown */}
        <div className={styles.customDropdown}>
          <div 
            className={styles.dropdownSelected}
            onClick={() => {
              setShowTypeDropdown(!showTypeDropdown)
              setShowSegmentDropdown(false)
              setShowStatusDropdown(false)
            }}
          >
            {selectedFilter}
            <ChevronDown size={18} className={`${styles.dropdownIcon} ${showTypeDropdown ? styles.rotate : ''}`} />
          </div>
          {showTypeDropdown && (
            <div className={styles.dropdownMenu}>
              {typeOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.dropdownItem} ${selectedFilter === option ? styles.active : ''}`}
                  onClick={() => {
                    setSelectedFilter(option)
                    setShowTypeDropdown(false)
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Segment Dropdown */}
        <div className={styles.customDropdown}>
          <div 
            className={styles.dropdownSelected}
            onClick={() => {
              setShowSegmentDropdown(!showSegmentDropdown)
              setShowTypeDropdown(false)
              setShowStatusDropdown(false)
            }}
          >
            {selectedSegment}
            <ChevronDown size={18} className={`${styles.dropdownIcon} ${showSegmentDropdown ? styles.rotate : ''}`} />
          </div>
          {showSegmentDropdown && (
            <div className={styles.dropdownMenu}>
              {segmentOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.dropdownItem} ${selectedSegment === option ? styles.active : ''}`}
                  onClick={() => {
                    setSelectedSegment(option)
                    setShowSegmentDropdown(false)
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className={styles.customDropdown}>
          <div 
            className={styles.dropdownSelected}
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown)
              setShowTypeDropdown(false)
              setShowSegmentDropdown(false)
            }}
          >
            {selectedStatus}
            <ChevronDown size={18} className={`${styles.dropdownIcon} ${showStatusDropdown ? styles.rotate : ''}`} />
          </div>
          {showStatusDropdown && (
            <div className={styles.dropdownMenu}>
              {statusOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.dropdownItem} ${selectedStatus === option ? styles.active : ''}`}
                  onClick={() => {
                    setSelectedStatus(option)
                    setShowStatusDropdown(false)
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.monthSelector}>
          <button 
            className={styles.monthNav}
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
          >
            <ChevronLeft size={18} />
          </button>
          <span className={styles.monthLabel}>
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </span>
          <button 
            className={styles.monthNav}
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <button className={styles.todayBtn} onClick={handleTodayClick}>Today</button>
      </div>

      {/* List View when filters are active */}
      {hasActiveFilters ? (
        <div className={styles.payoutsListView}>
          <div className={styles.listViewHeader}>
            <h3>Filtered Payouts ({filteredPayouts.length})</h3>
          </div>
          <div className={styles.payoutsListContainer}>
            {filteredPayouts.length > 0 ? (
              filteredPayouts.map((payout) => (
                <div 
                  key={payout.id} 
                  className={styles.payoutListItem}
                  style={{ backgroundColor: payout.color }}
                  onClick={() => {
                    setSelectedDate(payout.date)
                    setShowEventsModal(true)
                  }}
                >
                  <div className={styles.payoutListInfo}>
                    <div className={styles.payoutListName}>{payout.name}</div>
                    <div className={styles.payoutListDate}>
                      {monthNames[selectedMonth.getMonth()]} {payout.date}, {selectedMonth.getFullYear()}
                      {payout.processedAt && getRelativeTime(payout.processedAt) && (
                        <span className={styles.payoutRelativeTime}>
                          • {getRelativeTime(payout.processedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.payoutListDetails}>
                    <div className={styles.payoutListStatus}>{payout.status}</div>
                    <div className={styles.payoutListInvestors}>Investors: {payout.investors}</div>
                    <div className={styles.payoutListAmount}>₦{payout.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noPayoutsMessage}>
                No payouts found for the selected filters.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Calendar Grid */
        <div className={styles.calendarGrid}>
          <div className={styles.calendarWeekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.weekday}>{day}</div>
            ))}
          </div>
          <div className={styles.calendarDays}>
            {renderCalendar()}
          </div>
        </div>
      )}

      {/* Events Modal */}
      <CustomModal
        isOpen={showEventsModal}
        onClose={() => setShowEventsModal(false)}
        title={`Events on ${monthNames[selectedMonth.getMonth()]} ${selectedDate}, ${selectedMonth.getFullYear()}`}
        width="500px"
      >
        <div className={styles.eventsModalContent}>
          {selectedDate && getEventsForDate(selectedDate).map((event, idx) => (
            <div key={event.id} className={styles.eventCard} style={{ borderLeft: `4px solid ${event.color}` }}>
              <div className={styles.eventCardHeader}>
                <h4>{event.name}</h4>
                <span className={styles.eventBadge} style={{ backgroundColor: event.color }}>
                  {event.status}
                </span>
              </div>
              <div className={styles.eventCardDetails}>
                <p>Investors: {event.investors}</p>
                <p>Amount: ₦{event.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CustomModal>

      {/* Process Payout Modal */}
      <CustomModal
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
        title="Process Payouts"
        width="600px"
      
      >
        <div className={styles.processModalContent}>
        
   <div className={styles.processStats}>
          
            <div className={styles.processStat}>
              <div className={styles.processStatValue}>0</div>
              <div className={styles.processStatLabel}>Scheduled payouts</div>
            </div>
              <div className={styles.processStat}>
              <div className={styles.processStatValue}>{selectedPayouts.length}</div>
              <div className={styles.processStatLabel}>Selected for Processing</div>
            </div>
            <div className={styles.processStat}>
              <div className={styles.processStatValue}>₦0.00</div>
              <div className={styles.processStatLabel}>Total Amount</div>
            </div>
          </div>
          <div className={styles.processListHeader}>
            <h4>Select Payouts to Process</h4>
            <label className={styles.selectAllLabel}>
              <input 
                type="checkbox" 
                checked={selectedPayouts.length === processPayoutsList.length}
                onChange={handleSelectAll}
              />
              Select All
            </label>
          </div>

          <div className={styles.processPayoutList}>
            {processPayoutsList.map(payout => (
              <div 
                key={payout.id} 
                className={`${styles.processPayoutItem} ${selectedPayouts.includes(payout.id) ? styles.selected : ''}`}
              >
                <input 
                  type="checkbox"
                  checked={selectedPayouts.includes(payout.id)}
                  onChange={() => handlePayoutSelect(payout.id)}
                />
                <div className={styles.processPayoutInfo}>
                  <div className={styles.processPayoutName}>{payout.name}</div>
                  <div className={styles.processPayoutDue}>{payout.due}</div>
                </div>
                <div className={styles.processPayoutAmount}>
                  <div className={styles.amount}>₦{payout.amount.toLocaleString()}.00</div>
                  <div className={styles.status}>{payout.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.processModalActions}>
            <button className={styles.cancelBtn} onClick={() => setShowProcessModal(false)}>Cancel</button>
            <button 
              className={styles.processBtnPrimary}
              onClick={handleProcessPayouts}
              disabled={selectedPayouts.length === 0}
            >
              Process Payouts
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Export Modal */}
      <CustomModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Payout Schedule"
        width="500px"
      >
        <div className={styles.exportModalContent}>
          <div className={styles.formGroup}>
            <label>Date Range</label>
            <div className={styles.dateRange}>
              <input type="date" placeholder="Start Date" />
              <input type="date" placeholder="End Date" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Export Format</label>
            <select className={styles.formSelect}>
              <option>CSV (Comma Separated Value)</option>
              <option>Excel</option>
              <option>PDF</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Include Payout Status</label>
            <div className={styles.checkboxGroup}>
            <div className={styles.exportCheckGroup}>
              <input 
                type="checkbox"
                checked={selectedExportStatuses.includes('scheduled')}
                onChange={() => handleExportStatusToggle('scheduled')}
                style={{ width: 'fit-content' }}
              />
              <label>Scheduled Payouts (8)</label>
            </div>
            <div className={styles.exportCheckGroup}>
              <input 
                type="checkbox"
                checked={selectedExportStatuses.includes('processing')}
                onChange={() => handleExportStatusToggle('processing')}
                style={{ width: 'fit-content' }}
              />
              <label>Processing Payouts (1)</label>
            </div>
            <div className={styles.exportCheckGroup}>
              <input 
                type="checkbox"
                checked={selectedExportStatuses.includes('completed')}
                onChange={() => handleExportStatusToggle('completed')}
                style={{ width: 'fit-content' }}
              />
              <label>Completed Payouts (45)</label>
            </div>
            <div className={styles.exportCheckGroup}>
              <input 
                type="checkbox"
                checked={selectedExportStatuses.includes('failed')}
                onChange={() => handleExportStatusToggle('failed')}
                style={{ width: 'fit-content' }}
              />
              <label>Failed Payouts (2)</label>
            </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Export Summary</label>
            <p className={styles.exportSummary}>9 Payouts wil be exported as CSV</p>
          </div>

          <div className={styles.exportModalActions}>
            <button className={styles.cancelBtn} onClick={() => setShowExportModal(false)}>Cancel</button>
            <button 
              className={styles.exportBtnPrimary}
              onClick={handleExportSchedule}
              disabled={selectedExportStatuses.length === 0}
            >
              Export Schedule
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Success Modal */}
      <CustomModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        width="400px"
        showClose={false}
      >
        <div className={styles.successModalContent}>
          <h2 className={styles.successTitle}>Payout Successful</h2>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="#2563eb" />
              <path d="M25 40 L35 50 L55 30" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </CustomModal>

           {/* Export Success Modal */}
      <CustomModal
        isOpen={showExportSuccessModal}
        onClose={() => setShowExportSuccessModal(false)}
        width="400px"
        showClose={false}
      >
        <div className={styles.successModalContent}>
          <h2 className={styles.successTitle}>Export Successful</h2>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="#2563eb" />
              <path d="M25 40 L35 50 L55 30" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default PayoutCalender
