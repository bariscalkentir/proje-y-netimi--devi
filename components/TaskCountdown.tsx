'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/lib/store'
import styles from './TaskCountdown.module.css'

interface TaskCountdownProps {
  tasks: Task[]
}

export default function TaskCountdown({ tasks }: TaskCountdownProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [nextTask, setNextTask] = useState<Task | null>(null)

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const incompleteTasks = tasks
        .filter(t => !t.completed && new Date(t.deadline) > now)
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      
      if (incompleteTasks.length > 0) {
        const task = incompleteTasks[0]
        setNextTask(task)
        
        const deadline = new Date(task.deadline)
        const diff = deadline.getTime() - now.getTime()
        
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      } else {
        setNextTask(null)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [tasks])

  if (!nextTask) {
    return (
      <div className={styles.countdown}>
        <div className={styles.emptyState}>
          <i className="fas fa-check-circle"></i>
          <p>Tüm görevler tamamlandı veya yaklaşan görev yok!</p>
        </div>
      </div>
    )
  }

  const isUrgent = countdown.days === 0 && countdown.hours < 24

  return (
    <div className={`${styles.countdown} ${isUrgent ? styles.urgent : ''}`}>
      <div className={styles.taskInfo}>
        <div className={styles.taskTitle}>
          <i className="fas fa-tasks"></i>
          <span>{nextTask.title}</span>
        </div>
        <div className={styles.taskType}>{nextTask.type}</div>
      </div>
      
      <div className={styles.countdownTitle}>
        <i className="fas fa-hourglass-half"></i> Görevin Bitmesine Kalan Süre
      </div>
      
      <div className={styles.countdownTimer}>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{countdown.days}</span>
          <span className={styles.timeLabel}>Gün</span>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{countdown.hours}</span>
          <span className={styles.timeLabel}>Saat</span>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{countdown.minutes}</span>
          <span className={styles.timeLabel}>Dakika</span>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{countdown.seconds}</span>
          <span className={styles.timeLabel}>Saniye</span>
        </div>
      </div>

      {isUrgent && (
        <div className={styles.urgentWarning}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>Acil! 24 saatten az süre kaldı!</span>
        </div>
      )}
    </div>
  )
}
