import styles from '../css/UserManagement.module.css'
import UserManagementNav from '../AdminManagementTabs/UserManagementNav'
import AccessRole from '../AdminManagementTabs/AccessRole'
import UserOverview from '../AdminManagementTabs/UserOverview'
import RoleAssignment from '../AdminManagementTabs/RoleAssignment'
import { useState } from 'react'

function UserManagement() {
    const [activeTab, setActiveTab] = useState('User Overview')

      const renderContent = () => {
    switch (activeTab) {
      case 'User Overview':
        return <UserOverview />
      case 'Role Assignment':
        return <RoleAssignment />
      case 'Access Role':
        return <AccessRole />
      default:
        return <UserOverview />
    }
  }
  
  return (
    <div className="content-panel">
      <h3 className="panel-title">User Management</h3>
      <UserManagementNav activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default UserManagement

