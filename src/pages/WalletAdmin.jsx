import { useState } from 'react'
import styles from '../css/WalletAdmin.module.css'
import WalletNavTabs from '../WalletAdminTabs/WalletNavTabs'
import Overview from '../WalletAdminTabs/Overview'
import TransactionLedger from '../WalletAdminTabs/TransactionLedger'
import WalletAdjustment from '../WalletAdminTabs/WalletAdjustment'
import Reconciliation from '../WalletAdminTabs/Reconciliation'
import WalletManagement from '../WalletAdminTabs/WalletManagement'
import WalletSettings from '../WalletAdminTabs/WalletSettings'
function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}
function WalletAdmin() {
    const [activeTab, setActiveTab] = useState('Overview')

    const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview />
      case 'Transaction ledger':
        return <TransactionLedger />
      case 'Wallet Adjustment':
        return <WalletAdjustment />
      case 'Reconciliation':
        return <Reconciliation />
      case 'Wallet Management':
        return <WalletManagement />
      case 'Wallet Settings':
        return <WalletSettings />
      default:
        return <Overview />
    }
  }
  return (
    <div className="content-panel">
       <Div className="title-and-exportBtn flexRow">
          <h3 className={styles.title}>Wallet Administration</h3>
       </Div>

      <WalletNavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default WalletAdmin

