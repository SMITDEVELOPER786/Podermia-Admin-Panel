import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Settings, FileText, Database, Lock, BarChart3 } from 'lucide-react'
import styles from '../css/AdminPanel.module.css'
import QuickActions from '../components/QuickActions'

const AdminPanel = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const cards = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage user account, KYC status and permission.'
    },
    {
      icon: Settings,
      title: 'System Settings',
      description: 'Configure system-wide settings and preferences.'
    },
    {
      icon: FileText,
      title: 'Audit Logs',
      description: 'View and export system activity logs.'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Manage database backups and maintenance.'
    },
    {
      icon: Lock,
      title: 'Security Settings',
      description: 'Configure security protocols and authentication.'
    },
    {
      icon: BarChart3,
      title: 'System Monitoring',
      description: 'Monitor system performance and health.'
    }
  ]

  const activities = [
    { text: "User 'admin' logged in", time: "5 hours ago" },
    { text: "Database backup completed", time: "2 minutes ago" },
    { text: "Failed login attempt detected", time: "1 hour ago" },
    { text: "System settings updated", time: "1 minute ago" }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} className={styles.backArrow} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className={styles.title}>Admin Panel</h1>
      </div>

      <div className={styles.cardsGrid}>
        {cards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <IconComponent size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.activitySection}>
        <h2 className={styles.activityTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {activities.map((activity, index) => (
            <div key={index} className={styles.activityItem}>
              <div className={styles.activityBullet}></div>
              <span className={styles.activityText}>{activity.text}</span>
              <span className={styles.activityTime}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      <QuickActions />
    </div>
  )
}

export default AdminPanel