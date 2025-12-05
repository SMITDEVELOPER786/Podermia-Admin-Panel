import React, { useState } from 'react'
import styles from '../css/Investment.module.css'
import { ChevronDown } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Reports = () => {
  const [reportType, setReportType] = useState('Performance Overview')
  const [timeRange, setTimeRange] = useState('Last 6 months')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showReportDropdown, setShowReportDropdown] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)

  const reportTypes = ['Performance Overview', 'Investment Analysis', 'Payout Report', 'Risk Assessment']
  const timeRanges = ['Last 6 months', 'Last 12 months', 'Last 3 months', 'Custom Range']

  // Custom bar shape with rounded top corners
  const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={6} ry={6} />
      </g>
    )
  }

  const fundsData = [
    { month: 'Jan', amount: 1.3 },
    { month: 'Feb', amount: 1.8 },
    { month: 'Mar', amount: 2.1 },
    { month: 'Apr', amount: 1.9 },
    { month: 'May', amount: 2.5 },
    { month: 'Jun', amount: 2.8 },
    { month: 'Jul', amount: 2.6 },
    { month: 'Aug', amount: 3.1 }
  ]

  const pieData = [
    { name: 'T-Bills', value: 45, color: '#2563eb' },
    { name: 'Government Bonds', value: 20, color: '#60a5fa' },
    { name: 'Corporate Bonds', value: 30, color: '#1e40af' },
    { name: 'Commercial Paper', value: 5, color: '#93c5fd' }
  ]

  const tenureData = [
    { month: 'Jan', short: 20, medium: 35, long: 45 },
    { month: 'Feb', short: 25, medium: 40, long: 50 },
    { month: 'Mar', short: 30, medium: 38, long: 55 },
    { month: 'Apr', short: 28, medium: 42, long: 52 },
    { month: 'May', short: 32, medium: 45, long: 58 },
    { month: 'Jun', short: 35, medium: 48, long: 62 },
    { month: 'Jul', short: 38, medium: 50, long: 65 },
    { month: 'Aug', short: 40, medium: 52, long: 68 }
  ]

  const yieldData = [
    { name: 'T-Bills: 45%', yield: '12.5%' },
    { name: 'Corporate Bonds: 30%', yield: '8.7%' },
    { name: 'Government Bonds: 20%', yield: '9.2%' },
    { name: 'Commercial Paper: 5%', yield: '13.8%' }
  ]

  const topIssuers = [
    { rank: 1, name: 'Federal Government of Nigeria', products: '15 active products', amount: '₦8.5B', percent: '47.0% of total' },
    { rank: 2, name: 'Dangote Group', products: '8 active products', amount: '₦2.1B', percent: '11.6% of total' },
    { rank: 3, name: 'Zenith Bank Plc', products: '12 active products', amount: '₦1.9B', percent: '10.5% of total' },
    { rank: 4, name: 'MTN Nigeria', products: '5 active products', amount: '₦1.2B', percent: '6.6% of total' },
    { rank: 5, name: 'Flour Mills Nigeria', products: '6 active products', amount: '₦950.0M', percent: '5.2% of total' }
  ]

  return (
    <div className={styles.reportsContainer}>
      <div className={styles.reportsHeader}>
        <h1 className={styles.reportsTitle}>Investment Reports</h1>
        <div className={styles.reportActions}>
          <button className={styles.exportBtn}>Export CSV</button>
          <button className={styles.exportBtn}>Export PDF</button>
          <button className={styles.exportBtn}>Schedule Reports</button>
        </div>
      </div>

      <div className={styles.reportConfig}>
        <h3 className={styles.configTitle}>Report Configuration</h3>
        <div className={styles.configRow}>
          <div className={styles.configField}>
            <label>Report Type</label>
            <div className={styles.customDropdown}>
              <div className={styles.dropdownHeader} onClick={() => setShowReportDropdown(!showReportDropdown)}>
                <span>{reportType}</span>
                <ChevronDown size={16} className={showReportDropdown ? styles.rotated : ''} />
              </div>
              {showReportDropdown && (
                <div className={styles.dropdownMenu}>
                  {reportTypes.map((type) => (
                    <div
                      key={type}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setReportType(type)
                        setShowReportDropdown(false)
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.configField}>
            <label>Time Range</label>
            <div className={styles.customDropdown}>
              <div className={styles.dropdownHeader} onClick={() => setShowTimeDropdown(!showTimeDropdown)}>
                <span>{timeRange}</span>
                <ChevronDown size={16} className={showTimeDropdown ? styles.rotated : ''} />
              </div>
              {showTimeDropdown && (
                <div className={styles.dropdownMenu}>
                  {timeRanges.map((range) => (
                    <div
                      key={range}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setTimeRange(range)
                        setShowTimeDropdown(false)
                      }}
                    >
                      {range}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.configField}>
            <label>Start Date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className={styles.dateInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className={styles.configField}>
            <label>End Date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className={styles.dateInput}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.kpiCardsRow}>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Total Funds Raised</p>
          <h2 className={styles.kpiValue}>₦18.1B</h2>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Total Investments</p>
          <h2 className={styles.kpiValue}>3,611</h2>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Average Yield</p>
          <h2 className={styles.kpiValue}>11.1%</h2>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Active Investors</p>
          <h2 className={styles.kpiValue}>2,847</h2>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Funds Raised Over Time</h3>
          <ResponsiveContainer width="100%" height={370}>
            <BarChart data={fundsData} margin={{ top: 50, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#264DAF" shape={<RoundedBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Investment Distribution by Product Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className={styles.pieCenter}>
                <tspan x="50%" dy="0" style={{ fontSize: '24px', fontWeight: '600', fill: '#111827' }}>100%</tspan>
                <tspan x="50%" dy="20" style={{ fontSize: '14px', fill: '#6b7280' }}>Total</tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.pieLegend}>
            {pieData.map((item, idx) => (
              <div key={idx} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: item.color }}></span>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Investment Trends by Tenure</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={tenureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="short" stroke="#1e40af" strokeWidth={2} name="Short term < 1 year" />
              <Line type="monotone" dataKey="medium" stroke="#60a5fa" strokeWidth={2} name="Medium Term (1-3) years" />
              <Line type="monotone" dataKey="long" stroke="#93c5fd" strokeWidth={2} name="Long Term(>3 years)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Average Yields by Product Type</h3>
          <div className={styles.yieldList}>
            {yieldData.map((item, idx) => (
              <div key={idx} className={styles.yieldItem}>
                <div className={styles.yieldInfo}>
                  <span className={styles.yieldDot} style={{ background: pieData[idx]?.color }}></span>
                  <span>{item.name}</span>
                </div>
                <span className={styles.yieldPercent}>{item.yield}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.issuersSection}>
        {topIssuers.map((issuer) => (
          <div key={issuer.rank} className={styles.issuerCard}>
            <div className={styles.issuerRank}>{issuer.rank}</div>
            <div className={styles.issuerInfo}>
              <h4>{issuer.name}</h4>
              <p>{issuer.products}</p>
            </div>
            <div className={styles.issuerAmount}>
              <h3>{issuer.amount}</h3>
              <p>{issuer.percent}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.executiveSummary}>
        <h3 className={styles.summaryTitle}>Executive Summary</h3>
        <p className={styles.summaryOverview}>
          <strong>Period Overview:</strong> The investment platform has shown strong performance over the past 8 months, with total funds raised reaching ₦18,080,000,000 across 3611 individual investments.
        </p>
        <div className={styles.summarySection}>
          <h4>Key Highlights:</h4>
          <ul>
            <li>T-Bills continue to dominate the portfolio at 45% of total investments</li>
            <li>Average portfolio yield of 11.1% exceeds market benchmarks</li>
            <li>Strong diversification across 5 major issuers</li>
            <li>Consistent month-over-month growth in both volume and investor participation</li>
          </ul>
        </div>
        <div className={styles.summarySection}>
          <h4>Risk Assessment:</h4>
          <p>
            The current portfolio maintains a balanced risk profile with government securities comprising the majority of holdings. Corporate exposures are well-diversified across sectors and credit ratings.
          </p>
        </div>
        <div className={styles.summarySection}>
          <h4>Recommendations:</h4>
          <ul>
            <li>Consider expanding product offerings in medium-term instruments</li>
            <li>Enhance investor education programs to support portfolio diversification</li>
            <li>Monitor liquidity requirements for upcoming maturity obligations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Reports
