function SystemMetrics() {
  return (
    <div className="content-panel">
      <h3 className="panel-title">System Matrics</h3>
      <div className="metrics-list">
        <div className="metric-item">
          <span className="metric-label">System Uptime:</span>
          <span className="metric-value">99.9%</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Api response time:</span>
          <span className="metric-value">150ms</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Failed Transaction:</span>
          <span className="metric-value">0.2%</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Security Alerts:</span>
          <span className="metric-value">0</span>
        </div>
      </div>
      <button className="btn-view-all">View System Logs</button>
    </div>
  )
}

export default SystemMetrics

