import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import KPICards from './components/KPICards'
import NavigationTabs from './components/NavigationTabs'
import Overview from './pages/Overview'
import KYCManagement from './pages/KYCManagement'
import Investment from './pages/Investment'
import Loans from './pages/Loans'
import WalletAdmin from './pages/WalletAdmin'
import SavingGoals from './pages/SavingGoals'
import UserManagement from './pages/UserManagement'
import SystemSetting from './pages/SystemSetting'
import Report from './pages/Report'

function App() {
  const [activeTab, setActiveTab] = useState('OverView')

  const renderContent = () => {
    switch (activeTab) {
      case 'OverView':
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
      case 'User Management':
        return <UserManagement />
      case 'System Setting':
        return <SystemSetting />
      case 'Report':
        return <Report />
      default:
        return <Overview />
    }
  }

  return (
    <div className="admin-dashboard">
      <Header activeTab={activeTab} />
      <KPICards />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default App
