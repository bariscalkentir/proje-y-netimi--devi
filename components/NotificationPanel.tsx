'use client'

import { useStore, Notification } from '@/lib/store'
import styles from './NotificationPanel.module.css'

interface NotificationPanelProps {
  onAcceptTask?: (taskData: any) => void
  onRejectTask?: (taskData: any) => void
}

export default function NotificationPanel({ onAcceptTask, onRejectTask }: NotificationPanelProps) {
  const { notifications, currentUser, markNotificationRead, deleteNotification } = useStore()

  if (!currentUser) return null

  const userNotifications = notifications
    .filter(n => n.userId === currentUser.username)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const unreadCount = userNotifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task-assignment':
        return 'fa-tasks'
      case 'task-accepted':
        return 'fa-check-circle'
      case 'task-rejected':
        return 'fa-times-circle'
      case 'deadline-warning':
        return 'fa-exclamation-triangle'
      default:
        return 'fa-bell'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'task-assignment':
        return styles.blue
      case 'task-accepted':
        return styles.green
      case 'task-rejected':
        return styles.red
      case 'deadline-warning':
        return styles.orange
      default:
        return ''
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Az önce'
    if (diffMins < 60) return `${diffMins} dakika önce`
    if (diffHours < 24) return `${diffHours} saat önce`
    if (diffDays < 7) return `${diffDays} gün önce`
    return date.toLocaleDateString('tr-TR')
  }

  return (
    <div className={styles.notificationPanel}>
      <div className={styles.header}>
        <h3>
          <i className="fas fa-bell"></i> Bildirimler
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </h3>
      </div>

      <div className={styles.notificationList}>
        {userNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-bell-slash"></i>
            <p>Henüz bildirim yok</p>
          </div>
        ) : (
          userNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''} ${getNotificationColor(notification.type)}`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className={styles.notificationIcon}>
                <i className={`fas ${getNotificationIcon(notification.type)}`}></i>
              </div>
              <div className={styles.notificationContent}>
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className={styles.time}>{formatDate(notification.createdAt)}</span>
                
                {notification.type === 'task-assignment' && notification.taskData && (
                  <div className={styles.actions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onAcceptTask?.(notification.taskData)
                        deleteNotification(notification.id)
                      }}
                      className={styles.acceptBtn}
                    >
                      <i className="fas fa-check"></i> Kabul Et
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onRejectTask?.(notification.taskData)
                        deleteNotification(notification.id)
                      }}
                      className={styles.rejectBtn}
                    >
                      <i className="fas fa-times"></i> Reddet
                    </button>
                  </div>
                )}
              </div>
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNotification(notification.id)
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
