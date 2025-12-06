import { useState } from 'react'
import styles from '../css/WalletAdmin.module.css'
import WalletNavTabs from '../WalletAdminTabs/WalletNavTabs'
import Overview from '../WalletAdminTabs/Overview'
import TransactionLedger from '../WalletAdminTabs/TransactionLedger'
import WalletAdjustment from '../WalletAdminTabs/WalletAdjustment'
import Reconciliation from '../WalletAdminTabs/Reconciliation'

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
      default:
        return <Overview />
    }
  }
  return (
    <div className="content-panel">
       <Div className="title-and-exportBtn flexRow">
          <h3 className={styles.title}>Wallet Administration</h3>
         <button className={styles.exportBtn}>Export</button>
       </Div>

      <WalletNavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default WalletAdmin

