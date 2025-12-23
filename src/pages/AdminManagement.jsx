import styles from '../css/AdminManagement.module.css'
import AdminManagementNav from '../AdminManagementTabs/AdminManagementNav'
import AccessRole from '../AdminManagementTabs/AccessRole'
import UserOverview from '../AdminManagementTabs/AdminOverview'
import RoleAssignment from '../AdminManagementTabs/RoleAssignment'
import AdminDirectory from '../AdminManagementTabs/AdminDirectory'
import AdminAuditLogs from '../AdminManagementTabs/AdminAuditLogs'
import { useState } from 'react'

function AdminManagement() {
    const [activeTab, setActiveTab] = useState('Admin Directory')

      const renderContent = () => {
    switch (activeTab) {
      case 'Admin Directory':
        return <AdminDirectory />
      case 'Admin Overview':
        return <UserOverview />
      case 'Admin Audit Logs':
        return <AdminAuditLogs />
      case 'Role Assignment':
        return <RoleAssignment />
      default:
        return <AdminDirectory />
    }
  }
  
  return (
    <div className="content-panel">
      <h3 className="panel-title">Admin Management</h3>
      <AdminManagementNav activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default AdminManagement

