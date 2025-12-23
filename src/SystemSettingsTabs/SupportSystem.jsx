import React, { useState } from "react";
import SupportQueue from "./SupportSystemTabs/SupportQueue";
import ReplyThreads from "./SupportSystemTabs/ReplyThreads";
import TicketAssignments from "./SupportSystemTabs/TicketAssignments";
import TicketResolution from "./SupportSystemTabs/TicketResolution";
import LiveChat from "./SupportSystemTabs/LiveChat";
import SupportSystemNavigation from "./SupportSystemTabs/SupportSystemNavigation";
import styles from "../css/SupportSystem.module.css";

import { ArrowLeft } from "lucide-react";
const SupportSystem = ({ onBack }) => {
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
      default:
        return <SupportQueue />;
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={onBack} className={styles.backButton}><ArrowLeft size={25}/></button>
      <SupportSystemNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default SupportSystem;
