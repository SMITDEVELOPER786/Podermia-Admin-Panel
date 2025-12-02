function ReferralsNavigation({ activeTab, onTabChange }) {
  const tabs = [
    'Campaigns',
    'Analytics',
    'Fraud Monitor',
    'Payouts',
    'Export',
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

export default ReferralsNavigation

