import { useNavigate } from 'react-router-dom'
function RecentTransactions() {
  const navigate = useNavigate()
  return (
    <div className="content-panel">
      <h3 className="panel-title">Recent Transaction</h3>
      <div className="transaction-list">
        <div className="transaction-item">
          <div className="transaction-info">
            <p className="transaction-name">John Doi</p>
            <p className="transaction-desc">Investment - T-Bill 182</p>
          </div>
          <div className="transaction-right">
            <div className="transaction-amount">₦ 100,000</div>
            <span className="status-badge status-completed">Completed</span>
          </div>
        </div>
        <div className="transaction-item">
          <div className="transaction-info">
            <p className="transaction-name">Jane Smith</p>
            <p className="transaction-desc">Loan - Cash-backed</p>
          </div>
          <div className="transaction-right">
            <div className="transaction-amount">₦ 100,000</div>
            <span className="status-badge status-disbursed">disbursed</span>
          </div>
        </div>
        <div className="transaction-item">
          <div className="transaction-info">
            <p className="transaction-name">Mike jhonson</p>
            <p className="transaction-desc">Withdrawl- wallet</p>
          </div>
          <div className="transaction-right">
            <div className="transaction-amount">₦ 50,00</div>
            <span className="status-badge status-pending">pending</span>
          </div>
        </div>
      </div>
      <button className="btn-view-all" onClick={() => navigate('/all-transactions')}>View All Transaction</button>
    </div>
  )
}

export default RecentTransactions

