function KYCManagement() {
  return (
    <>
      {/* Send Reminder Toggle */}
      <div className="kyc-header-controls">
        <div className="send-reminder-toggle">
          <span>Send Reminder</span>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* KYC Management Panel */}
      <div className="content-panel">
        <div className="kyc-panel-header">
          <h3 className="panel-title">KYC Management</h3>
          <div className="kyc-header-actions">
            <input type="text" className="search-input" placeholder="Q Search Users....." />
            <button className="btn-override">Override Log</button>
          </div>
        </div>

        {/* KYC Table */}
        <div className="kyc-table-container">
          <table className="kyc-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-name">John Doe</div>
                    <div className="user-email">John@exmple.com</div>
                  </div>
                </td>
                <td>Individual</td>
                <td>2025-01-14</td>
                <td>
                  <span className="status-badge status-pending">Pending</span>
                </td>
                <td>
                  <button className="btn-view-detail">View Detail</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-name">ABC Holdings</div>
                    <div className="user-email">Admin@abc.com</div>
                  </div>
                </td>
                <td>Business</td>
                <td>2025-01-13</td>
                <td>
                  <span className="status-badge status-under-review">Under Review</span>
                </td>
                <td>
                  <button className="btn-view-detail">View Detail</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-name">Jane Smith</div>
                    <div className="user-email">Jnae@example.com</div>
                  </div>
                </td>
                <td>Individual</td>
                <td>2025-01-15</td>
                <td>
                  <span className="status-badge status-approved">Approved</span>
                </td>
                <td>
                  <button className="btn-view-detail">View Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Restrictions Section */}
      <div className="content-panel admin-restrictions">
        <div className="restrictions-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="panel-title">Admin Restrictions for Incomplete KYC Settings</h3>
        </div>
        <div className="restrictions-list">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Block Wallet Withdrawals</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Block New Transactions (Investments, Loans, Savings)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Show KYC Reminder</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Redirect to KYC completion page</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default KYCManagement

