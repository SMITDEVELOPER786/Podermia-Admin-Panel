import React, { useState } from "react";
import SupportQueue from "./SupportSystemTabs/SupportQueue";
import ReplyThreads from "./SupportSystemTabs/ReplyThreads";
import TicketAssignments from "./SupportSystemTabs/TicketAssignments";
import TicketResolution from "./SupportSystemTabs/TicketResolution";
import LiveChat from "./SupportSystemTabs/LiveChat";
import SupportSystemNavigation from "./SupportSystemTabs/SupportSystemNavigation";
import styles from "../css/SupportSystem.module.css";
import ReferralSystem from "../OverviewTabs/AdminReferrals";

const SupportSystem = () => {
  const [activeTab, setActiveTab] = useState("Support Queue");
  const renderContent = () => {
    switch (activeTab) {
      case "Support Queue":
        return <SupportQueue />;
      case "Ticket Assignments":
        return <TicketAssignments />;
      case "Reply Threads":
        return <ReplyThreads />;
      case "Ticket Resolution":
        return <TicketResolution />;
      case "Live Chat":
        return <LiveChat />;
      case "Referral System":
        return <ReferralSystem />;
      default:
        return <SupportQueue />;
    }
  };

  return (
    <div className={styles.container}>
      <SupportSystemNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {renderContent()}
    </div>
  );
};

export default SupportSystem;
