function UserManagementNav({ activeTab, onTabChange }) {
  const tabs = [
    'User Overview',
    'Role Assignment',
    'Access Role'
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

export default UserManagementNav

