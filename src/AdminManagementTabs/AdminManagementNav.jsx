function AdminManagementNav({ activeTab, onTabChange }) {
  const tabs = [
    'Admin Directory',
    'Admin Overview',
    'Admin Audit Logs',
    'Role Assignment',
    'Manage Users'
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

export default AdminManagementNav

