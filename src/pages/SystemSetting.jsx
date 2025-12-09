import ApiAndIntegration from "../SystemSettingsTabs/ApiAndIntegration";
import GeneralSetting from "../SystemSettingsTabs/GeneralSetting";
import Notifications from "../SystemSettingsTabs/Notifications";
import BackupManagement from "../SystemSettingsTabs/BackupManagment";
import SystemHealth from "../SystemSettingsTabs/SystemHealth";
import SystemSettingsNav from "../SystemSettingsTabs/SystemSettingsNavigations";
import { useState } from "react";
import styles from "../css/SystemSetting.module.css";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}
function SystemSetting() {
  const [activeTab, setActiveTab] = useState("General Settings");

  const renderContent = () => {
    switch (activeTab) {
      case "General Settings":
        return <GeneralSetting />;
      case "API & Integration":
        return <ApiAndIntegration />;
      case "Notifications":
        return <Notifications />;
      case "Backup Management":
        return <BackupManagement />;
      case "System Health":
        return <SystemHealth />;
      default:
        return <GeneralSetting />;
    }
  };

  return (
    <div className="content-panel">
      <Div className="button-and-head">
        <h3>System Settings</h3>
        <button>Support System</button>
      </Div>

      <SystemSettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default SystemSetting;
