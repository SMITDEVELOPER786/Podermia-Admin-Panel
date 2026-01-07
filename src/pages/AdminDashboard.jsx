import { useState } from 'react'
import Header from '../components/Header'
import KPICards from '../components/KPICards'
import NavigationTabs from '../components/NavigationTabs'
import Overview from './Overview'
import KYCManagement from './KYCManagement'
import Investment from './Investment'
import Loans from './Loans'
import WalletAdmin from './WalletAdmin'
import SavingGoals from './SavingGoals'
import AdminManagement from './AdminManagement'
import SystemSetting from './SystemSetting'
import Report from './Report'
import SupportSystem from '../SystemSettingsTabs/SupportSystem'
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview />
      case 'KYC Management':
        return <KYCManagement />
      case 'Investment':
        return <Investment />
      case 'Loans':
        return <Loans />
      case 'Wallet Admin':
        return <WalletAdmin />
      case 'Saving & Goals':
        return <SavingGoals />
      case 'Admin Management':
        return <AdminManagement />
      case 'System Setting':
        return <SystemSetting />
      case 'Report':
        return <Report />
      case 'Support System':
        return <SupportSystem />
      default:
        return <Overview />
    }
  }

  return (
    <>
     <Header activeTab={activeTab} />
    <div className="admin-dashboard">
     
      <KPICards />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
    </>
  )
}

export default AdminDashboard
