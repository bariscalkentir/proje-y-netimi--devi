'use client'

import { useState, useEffect } from 'react'
import styles from './Calendar.module.css'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'task' | 'note' | 'event'
}

interface CalendarProps {
  events: CalendarEvent[]
  onDateClick?: (date: Date) => void
}

export default function Calendar({ events, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | '2week'>('2week')

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: Date[] = []
    
    // Önceki ayın günleri
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i)
      days.push(day)
    }
    
    // Bu ayın günleri
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    // Sonraki ayın günleri
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }
    
    return days
  }

  const getTwoWeeks = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)
    
    const days: Date[] = []
    for (let i = 0; i < 14; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const days = view === 'month' ? getDaysInMonth(currentDate) : getTwoWeeks(currentDate)

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + direction)
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 14))
    }
    setCurrentDate(newDate)
  }

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

  // 48 saat kontrolü
  const isWithin48Hours = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = diff / (1000 * 60 * 60)
    return hours > 0 && hours <= 48
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={() => navigateMonth(-1)} className={styles.navBtn}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className={styles.calendarTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={() => navigateMonth(1)} className={styles.navBtn}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${view === '2week' ? styles.active : ''}`}
          onClick={() => setView('2week')}
        >
          2 Hafta
        </button>
        <button
          className={`${styles.viewBtn} ${view === 'month' ? styles.active : ''}`}
          onClick={() => setView('month')}
        >
          Ay
        </button>
      </div>

      <div className={styles.calendarGrid}>
        {dayNames.map(day => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day)
          const hasUrgentEvent = dayEvents.some(e => isWithin48Hours(new Date(e.date)))
          return (
            <div
              key={index}
              className={`${styles.calendarDay} ${
                isToday(day) ? styles.today : ''
              } ${!isCurrentMonth(day) ? styles.otherMonth : ''} ${
                hasUrgentEvent ? styles.urgent : ''
              }`}
              onClick={() => onDateClick?.(day)}
            >
              <div className={styles.dayNumber}>
                {day.getDate()}
                {hasUrgentEvent && (
                  <i className="fas fa-exclamation-circle" style={{ marginLeft: '4px', color: '#f56565' }}></i>
                )}
              </div>
              <div className={styles.dayEvents}>
                {dayEvents.slice(0, 3).map(event => {
                  const isUrgent = isWithin48Hours(new Date(event.date))
                  return (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[event.type]} ${isUrgent ? styles.urgentEvent : ''}`}
                      title={`${event.title}${isUrgent ? ' - ⚠️ 48 saat içinde!' : ''}`}
                    >
                      {isUrgent && <i className="fas fa-exclamation-triangle"></i>} {event.title}
                    </div>
                  )
                })}
                {dayEvents.length > 3 && (
                  <div className={styles.moreEvents}>
                    +{dayEvents.length - 3} daha
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
