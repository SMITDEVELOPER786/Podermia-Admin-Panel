import { SquareActivityIcon, UserRoundIcon, TrendingUp, FileCheck, Wallet, Gift, Award } from "lucide-react";

function KPICards({ displayNone, suspendedCard, systemHealthCard, notificationsMode }) {
  return (
    <div className="kpi-section">
      {/* First Card - Different for Notifications vs Dashboard */}
      {notificationsMode ? (
        <div className="kpi-card">
          <div className="kpi-icon">
            <TrendingUp size={25} color="currentColor" />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">3</h3>
            <p className="kpi-label">Pending Investment Approval</p>
            <p className="kpi-subtext">Awaiting Review</p>
          </div>
        </div>
      ) : (
        <div className="kpi-card">
          <div className="kpi-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">3</h3>
            <p className="kpi-label">Total User</p>
            <p className="kpi-subtext">23 Today</p>
          </div>
        </div>
      )}

      {/* Second Card - Different for Notifications vs Dashboard */}
      {notificationsMode ? (
        <div className="kpi-card">
          <div className="kpi-icon">
            <FileCheck size={25} color="currentColor" />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">2</h3>
            <p className="kpi-label">Pending Loan Approval</p>
            <p className="kpi-subtext">Awaiting Review</p>
          </div>
        </div>
      ) : (
        <div className="kpi-card">
          <div className="kpi-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14l3-3 3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">2</h3>
            <p className="kpi-label">Active User</p>
            <p className="kpi-subtext">+5% Today</p>
          </div>
        </div>
      )}

      {/* Third Card - Different for Notifications vs Dashboard */}
      {notificationsMode ? (
        <div className="kpi-card">
          <div className="kpi-icon">
            <Wallet size={25} color="currentColor" />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">5</h3>
            <p className="kpi-label">Pending Wallet Withdrawal Approval</p>
            <p className="kpi-subtext">Awaiting Review</p>
          </div>
        </div>
      ) : (
        <div className="kpi-card">
          <div className="kpi-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="14 2 14 8 20 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 15l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">1</h3>
            <p className="kpi-label">Active Savings</p>
            <p className="kpi-subtext">Need Review</p>
          </div>
        </div>
      )}

      {/* Additional Cards for Notifications Mode */}
      {notificationsMode && (
        <>
          <div className="kpi-card">
            <div className="kpi-icon">
              <Gift size={25} color="currentColor" />
            </div>
            <div className="kpi-content">
              <h3 className="kpi-value">4</h3>
              <p className="kpi-label">Pending Coupon Payout Approval</p>
              <p className="kpi-subtext">Awaiting Review</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">
              <Award size={25} color="currentColor" />
            </div>
            <div className="kpi-content">
              <h3 className="kpi-value">6</h3>
              <p className="kpi-label">Pending Bonus Payout Approval</p>
              <p className="kpi-subtext">Awaiting Review</p>
            </div>
          </div>
        </>
      )}

      {suspendedCard && (
        <div className="kpi-card">
          <div className="kpi-icon">
            <UserRoundIcon size={25} color="currentColor" />
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">0</h3>
            <p className="kpi-label">Suspended</p>
            <p className="kpi-subtext">Today</p>
          </div>
        </div>
      )}

      {!displayNone && (
        <>
          <div className="kpi-card">
            <div className="kpi-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6 4.03-6 9-6 9 4.8 9 6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17c-4.97 0-9-4.8-9-6 0-1.2 4.03-6 9-6s9 4.8 9 6c0 1.2-4.03 6-9 6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="kpi-content">
              <h3 className="kpi-value">₦ 0.2M</h3>
              <p className="kpi-label">Total Balance</p>
              <p className="kpi-subtext">All Wallets</p>
            </div>
          </div>

          {systemHealthCard ? (
            <div className="kpi-card">
              <div className="kpi-icon">
                <SquareActivityIcon size={25} color="currentColor" />
              </div>
              <div className="kpi-content">
                <h3 className="kpi-value">12,450</h3>
                <p className="kpi-label">System Health</p>
                <p className="kpi-subtext">23 Today</p>
              </div>
            </div>
          ) : (
            <div className="kpi-card">
              <div className="kpi-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="22 6 13.5 15.5 8.5 10.5 2 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="16 6 22 6 22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="kpi-content">
                <h3 className="kpi-value">₦ 2.5M</h3>
                <p className="kpi-label">Investment</p>
                <p className="kpi-subtext">Active</p>
              </div>
            </div>
          )}

          <div className="kpi-card">
            <div className="kpi-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="kpi-content">
              <h3 className="kpi-value">₦ 1.8M</h3>
              <p className="kpi-label">Loans</p>
              <p className="kpi-subtext">Outstanding</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default KPICards;
