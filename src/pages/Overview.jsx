import AlertBanner from '../components/AlertBanner'
import RecentTransactions from '../components/RecentTransactions'
import SystemMetrics from '../components/SystemMetrics'
import QuickActions from '../components/QuickActions'

function Overview() {
  return (
    <>
      <AlertBanner />
      
      <div className="main-content">
        <RecentTransactions />
        <SystemMetrics />
      </div>

      <QuickActions />
    </>
  )
}

export default Overview

