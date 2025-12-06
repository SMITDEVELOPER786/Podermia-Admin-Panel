function WalletNavTabs({ activeTab, onTabChange }) {
  const tabs = [
    'Overview',
    'Transaction ledger',
    'Wallet Adjustment',
    'Reconciliation',
  ]

  return (
    <div className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default WalletNavTabs

