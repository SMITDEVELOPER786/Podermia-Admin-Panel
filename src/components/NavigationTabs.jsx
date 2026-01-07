function NavigationTabs({ activeTab, onTabChange }) {
  const tabs = [
    'Overview',
    'KYC Management',
    'Investment',
    'Loans',
    'Wallet Admin',
    'Saving & Goals',
    'Admin Management',
    'System Setting',
    'Report',
    'Support System'
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

export default NavigationTabs

