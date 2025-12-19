import React from "react";
import styles from "../css/Notifcations.module.css";
import { ArrowLeft, CheckCircle, TrendingUp, AlertCircle, Wallet, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import KPICards from "../components/KPICards";
import QuickActions from "../components/QuickActions";

const Notifications = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const notifications = [
    {
      icon: CheckCircle,
      iconColor: "#10b981",
      iconBg: "#10b981",
      title: "KYC Verification Approved",
      description: "Your identity verification has been successfully completed. You can now access all features.",
      time: "2 hours ago",
      hasBullet: true
    },
    {
      icon: TrendingUp,
      iconColor: "#295cbf",
      iconBg: "#295cbf",
      title: "T-Bill Investment Matured",
      description: "Your 182-day Treasury Bill investment of ₦500,000 has matured. Proceeds credited to wallet.",
      time: "5 hours ago",
      hasBullet: false
    },
    {
      icon: AlertCircle,
      iconColor: "#f97316",
      iconBg: "#f97316",
      title: "Loan Repayment Due Tomorrow",
      description: "Your cash-backed loan repayment of ₦15,000 is due tomorrow. Ensure sufficient wallet balance.",
      time: "2 days ago",
      hasBullet: true
    },
    {
      icon: Wallet,
      iconColor: "#295cbf",
      iconBg: "#295cbf",
      title: "Wallet Top-up Successful",
      description: "Your wallet has been credited with ₦50,000 via bank transfer from GTB.",
      time: "3 days ago",
      hasBullet: false
    },
    {
      icon: Target,
      iconColor: "#10b981",
      iconBg: "#10b981",
      title: "Withdrawal Request Processed",
      description: "Congratulations! You've reached your \"Car Purchase\" savings goal of ₦1,500,000.",
      time: "5 days ago",
      hasBullet: true
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} className={styles.backArrow} />
          <span>Back to Dashboard</span>
        </button>
        <div className={styles.titleContainer}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>Access all the notifications</p>
        </div>
      </div>

      <KPICards displayNone={true}/>

      <div className={styles.notificationsContainer}>
        {notifications.map((notification, index) => {
          const IconComponent = notification.icon;
          return (
            <div key={index} className={styles.notificationCard} style={notification.hasBullet ? { backgroundColor: "#EFF6FF" } : { backgroundColor: "#fff" }}>
              {notification.hasBullet && <div className={styles.bullet}></div>}
              <div className={styles.iconContainer} >
                <IconComponent size={24} color={notification.iconColor} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{notification.title}</h3>
                <p className={styles.cardDescription}>{notification.description}</p>
                <span className={styles.cardTime}>{notification.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <QuickActions />
    </div>
  );
};

export default Notifications;
