function NavigationTabs({ activeTab, onTabChange }) {
  const tabs = [
    'OverView',
    'KYC Management',
    'Investment',
    'Loans',
    'Wallet Admin',
    'Saving & Goals',
    'User Management',
    'System Setting',
    'Report'
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

