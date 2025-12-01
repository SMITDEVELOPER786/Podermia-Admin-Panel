function Header({ activeTab }) {
  return (
    <header className="dashboard-header">
      <h1 className="brand-name">PoderMonie</h1>
      <div className="row">
        <div className="header-left">
          <div className="welcome-section">
            <h2 className="welcome-message">
              Welcome back <br /> <span className="admin-name">Admin, John Doe</span>
            </h2>
            <p className="welcome-subtitle">
              Manage your investments, savings and Loans.
            </p>
          </div>
        </div>
        <div className="header-right">
          {activeTab === "KYC Management" && (
            <span className="kyc-verified-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22 4 12 14.01 9 11.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              KYC Verified
            </span>
          )}
          <button className="btn-header">Admin Panel</button>
          <button className="btn-header btn-notification">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Notification
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
