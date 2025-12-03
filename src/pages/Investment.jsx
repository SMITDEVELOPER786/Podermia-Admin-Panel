import React, { useState } from 'react'
import PayoutCalender from '../InvestmentTabs/PayoutCalender'
import AddProducts from '../InvestmentTabs/AddProducts'
import Reports from '../InvestmentTabs/Reports'
import UserInvestments from '../InvestmentTabs/UserInvestments'
import InvestmentProducts from '../InvestmentTabs/InvestmentProducts'
import InvestmentNavigations from '../InvestmentTabs/InvestmentNavigations'
import styles from '../css/Investment.module.css'

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}
function Investment() {
   const [activeTab, setActiveTab] = useState('Investment Products')

       const renderContent = () => {
    switch (activeTab) {
      case 'Investment Products':
        return <InvestmentProducts />
      case 'User Investments':
        return <UserInvestments />
      case 'Add Products':
        return <AddProducts />
      case 'Reports':
        return <Reports />
      case 'Payout Calender':
        return <PayoutCalender />
      default:
        return <InvestmentProducts />
    }
  }
  return (
    <div className="content-panel">
     <InvestmentNavigations activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default Investment

