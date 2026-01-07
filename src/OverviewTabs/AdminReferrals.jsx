import React, { useState } from "react";
import styles from "../css/AdminReferrals.module.css";
// import KPICards from "../components/KPICards";
// import Header from "../components/Header";
import ReferralsNavigation from "./AdminReferralsTabs/ReferralsNavigation";
import Compaigns from "./AdminReferralsTabs/Compaigns";
import Payouts from "./AdminReferralsTabs/Payouts";
import FraudMonitor from "./AdminReferralsTabs/FraudMonitor";
import Export from "./AdminReferralsTabs/Export";
import Analytics from "./AdminReferralsTabs/Analytics";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const AdminReferrals = () => {
   const [activeTab, setActiveTab] = useState('Campaigns')

     const renderContent = () => {
    switch (activeTab) {
      case 'Campaigns':
        return <Compaigns />
      case 'Payouts':
        return <Payouts />
      case 'Fraud Monitor':
        return <FraudMonitor />
      case 'Export':
        return <Export />
      case 'Analytics':
        return <Analytics />
      default:
        return <Compaigns />
    }
  }
  return (
    <>
      {/* <Header/> */}
      <Div className="referrals-section" style={{ padding: "0" }}>
        {/* <KPICards suspendedCard={false}  systemHealthCard={true}/> */}
        <Div className="admin-heading flexRow">
          <h3>Admin Referrals</h3>
          <p>Super Admin</p>
        </Div>
        <ReferralsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </Div>
    </>
  );
};

export default AdminReferrals;
