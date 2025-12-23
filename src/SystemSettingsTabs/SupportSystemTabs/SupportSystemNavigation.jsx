function SystemSettingsNav({ activeTab, onTabChange }) {
  const tabs = [
    'Support Queue',
    'Ticket Assignments',
    'Reply Threads',
    'Ticket Resolution',
    'Live Chat',
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

