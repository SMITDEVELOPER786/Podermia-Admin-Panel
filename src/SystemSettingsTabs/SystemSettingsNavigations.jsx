function SystemSettingsNav({ activeTab, onTabChange }) {
  const tabs = [
    'General Settings',
    'API & Integration',
    'Notifications',
    'Backup Management',
    'System Health',
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

export default SystemSettingsNav;

