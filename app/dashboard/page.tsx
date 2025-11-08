'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore, Task, Note } from '@/lib/store'
import Calendar from '@/components/Calendar'
import NoteCard from '@/components/NoteCard'
import NotificationPanel from '@/components/NotificationPanel'
import TaskCountdown from '@/components/TaskCountdown'
import styles from './dashboard.module.css'

export default function Dashboard() {
  const router = useRouter()
  const { 
    currentUser, 
    tasks, 
    users, 
    notes,
    notifications,
    addTask, 
    updateTask, 
    deleteTask, 
    addNote,
    updateNote,
    deleteNote,
    addNotification,
    setCurrentUser 
  } = useStore()
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskForm, setTaskForm] = useState({
    title: '',
    type: '',
    description: '',
    deadline: '',
    assignedTo: ''
  })
  const [noteForm, setNoteForm] = useState({
    id: '',
    title: '',
    content: ''
  })
  const [submitForm, setSubmitForm] = useState({
    taskNote: '',
    files: [] as File[]
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
    if (!currentUser) {
      router.push('/app')
    }
  }, [currentUser, router])

  // 48 saat uyarısı kontrolü
  useEffect(() => {
    if (!currentUser) return

    const checkDeadlines = () => {
      const now = new Date()
      const isMudurRole = currentUser.role === 'mudur' || currentUser.role === 'admin'
      const userTasks = isMudurRole ? tasks : tasks.filter((t: Task) => t.assignedTo === currentUser.username)
      
      userTasks.forEach((task: Task) => {
        if (task.completed) return
        
        const deadline = new Date(task.deadline)
        const diff = deadline.getTime() - now.getTime()
        const hours = diff / (1000 * 60 * 60)
        
        // 48 saat kaldıysa ve daha önce bildirim gönderilmediyse
        if (hours > 0 && hours <= 48) {
          const hasWarning = notifications.some(
            (n: any) => n.type === 'deadline-warning' && 
            n.message.includes(task.title) &&
            n.userId === currentUser.username
          )
          
          if (!hasWarning) {
            addNotification({
              id: Date.now().toString() + Math.random(),
              userId: currentUser.username,
              type: 'deadline-warning',
              title: '⚠️ Görev Süresi Dolmak Üzere!',
              message: `"${task.title}" görevi için ${Math.floor(hours)} saat kaldı!`,
              read: false,
              createdAt: new Date().toISOString()
            })
          }
        }
      })
    }

    checkDeadlines()
    const interval = setInterval(checkDeadlines, 3600000) // Her saat kontrol et
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, currentUser, notifications])

  if (isLoading || !currentUser) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  const isMudur = currentUser.role === 'mudur' || currentUser.role === 'admin'
  const userTasks = isMudur ? tasks : tasks.filter(t => t.assignedTo === currentUser.username)
  const completedTasks = userTasks.filter(t => t.completed).length
  const pendingTasks = userTasks.length - completedTasks
  const urgentTasks = userTasks.filter(t => {
    const deadline = new Date(t.deadline)
    const now = new Date()
    const diffDays = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= 1 && !t.completed
  }).length

  const handleLogout = () => {
    setCurrentUser(null)
    router.push('/')
  }

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const targetUser = users.find(u => u.username === taskForm.assignedTo)
    if (!targetUser) {
      alert('Kullanıcı bulunamadı!')
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskForm.title,
      type: taskForm.type,
      description: taskForm.description,
      deadline: taskForm.deadline,
      assignedTo: taskForm.assignedTo,
      assignedToCode: targetUser.userCode,
      assignedBy: currentUser.username,
      completed: false,
      status: 'pending'
    }

    // Bildirim gönder
    addNotification({
      id: Date.now().toString(),
      userId: taskForm.assignedTo,
      type: 'task-assignment',
      title: 'Yeni Görev Ataması',
      message: `${currentUser.username} size "${taskForm.title}" başlıklı bir görev atadı. Lütfen onaylayın veya reddedin.`,
      taskData: newTask,
      read: false,
      createdAt: new Date().toISOString()
    })

    alert(`Görev ${targetUser.username}#${targetUser.userCode} kullanıcısına bildirim olarak gönderildi!`)
    setTaskForm({
      title: '',
      type: '',
      description: '',
      deadline: '',
      assignedTo: ''
    })
    setShowTaskForm(false)
  }

  const handleAcceptTask = (taskData: Task) => {
    addTask({ ...taskData, status: 'accepted' })
    
    // Müdüre bildirim gönder
    addNotification({
      id: Date.now().toString(),
      userId: taskData.assignedBy,
      type: 'task-accepted',
      title: 'Görev Kabul Edildi',
      message: `${currentUser.username} "${taskData.title}" görevini kabul etti.`,
      read: false,
      createdAt: new Date().toISOString()
    })
    
    alert('Görev kabul edildi!')
  }

  const handleRejectTask = (taskData: Task) => {
    // Müdüre bildirim gönder
    addNotification({
      id: Date.now().toString(),
      userId: taskData.assignedBy,
      type: 'task-rejected',
      title: 'Görev Reddedildi',
      message: `${currentUser.username} "${taskData.title}" görevini reddetti.`,
      read: false,
      createdAt: new Date().toISOString()
    })
    
    alert('Görev reddedildi!')
  }

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      updateTask(taskId, { completed: !task.completed })
    }
  }

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      deleteTask(taskId)
      alert('Görev silindi!')
    }
  }

  const handleOpenSubmitModal = (task: Task) => {
    setSelectedTask(task)
    setSubmitForm({ taskNote: task.notes || '', files: [] })
    setShowSubmitModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubmitForm({ ...submitForm, files: Array.from(e.target.files) })
    }
  }

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask) return

    const filePromises = submitForm.files.map(file => {
      return new Promise<{ name: string; content: string; uploadDate: string }>((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve({
            name: file.name,
            content: event.target?.result as string,
            uploadDate: new Date().toISOString()
          })
        }
        reader.readAsDataURL(file)
      })
    })

    const uploadedFiles = await Promise.all(filePromises)

    updateTask(selectedTask.id, {
      notes: submitForm.taskNote,
      files: [...(selectedTask.files || []), ...uploadedFiles],
      submittedAt: new Date().toISOString()
    })

    // Müdüre bildirim gönder
    addNotification({
      id: Date.now().toString(),
      userId: selectedTask.assignedBy,
      type: 'task-accepted',
      title: 'Görev Teslim Edildi',
      message: `${currentUser.username} "${selectedTask.title}" görevini teslim etti. ${uploadedFiles.length} dosya ve not eklendi.`,
      read: false,
      createdAt: new Date().toISOString()
    })

    alert('Görev başarıyla teslim edildi!')
    setShowSubmitModal(false)
    setSelectedTask(null)
    setSubmitForm({ taskNote: '', files: [] })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>
            <i className="fas fa-graduation-cap"></i> Dashboard
          </h1>
          <p>Hoş geldin, {currentUser.username}#{currentUser.userCode}!</p>
        </div>
        <div className={styles.headerButtons}>
          <Link href="/profile" className={styles.profileBtn}>
            <i className="fas fa-user"></i> Profil
          </Link>
          {currentUser.role === 'admin' && (
            <Link href="/admin" className={styles.adminBtn}>
              <i className="fas fa-cogs"></i> Admin
            </Link>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-tasks"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{userTasks.length}</div>
            <div className={styles.statLabel}>Toplam Görev</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{completedTasks}</div>
            <div className={styles.statLabel}>Tamamlanan</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-clock"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{pendingTasks}</div>
            <div className={styles.statLabel}>Bekleyen</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{urgentTasks}</div>
            <div className={styles.statLabel}>Acil</div>
          </div>
        </div>
      </div>

      {/* Görev Geri Sayımı */}
      <section className={styles.countdownSection}>
        <TaskCountdown tasks={userTasks} />
      </section>

      {/* Bildirimler */}
      <section className={styles.notificationsSection}>
        <NotificationPanel
          onAcceptTask={handleAcceptTask}
          onRejectTask={handleRejectTask}
        />
      </section>

      {/* Takvim Bölümü */}
      <section className={styles.calendarSection}>
        <h2>
          <i className="fas fa-calendar-alt"></i> Takvim
        </h2>
        <Calendar
          events={[
            ...tasks.filter(t => !isMudur || true).map(task => ({
              id: task.id,
              title: task.title,
              date: task.deadline,
              type: 'task' as const
            })),
            ...notes.filter(n => n.userId === currentUser.username).map(note => ({
              id: note.id,
              title: note.title,
              date: note.createdAt,
              type: 'note' as const
            }))
          ]}
          onDateClick={(date) => {
            setNoteForm({
              id: '',
              title: '',
              content: ''
            })
            setShowNoteModal(true)
          }}
        />
      </section>

      {/* Notlar Bölümü */}
      <section className={styles.notesSection}>
        <div className={styles.sectionHeader}>
          <h2>
            <i className="fas fa-sticky-note"></i> Notlarım
          </h2>
          <button onClick={() => {
            setNoteForm({ id: '', title: '', content: '' })
            setShowNoteModal(true)
          }} className={styles.addNoteBtn}>
            <i className="fas fa-plus"></i> Yeni Not
          </button>
        </div>
        <div className={styles.notesGrid}>
          {notes.filter(n => n.userId === currentUser.username).length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-sticky-note"></i>
              <h3>Henüz not yok</h3>
              <p>Yeni not ekleyerek başlayın</p>
            </div>
          ) : (
            notes.filter(n => n.userId === currentUser.username).map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={(note) => {
                  setNoteForm({
                    id: note.id,
                    title: note.title,
                    content: note.content
                  })
                  setShowNoteModal(true)
                }}
                onDelete={deleteNote}
              />
            ))
          )}
        </div>
      </section>

      {/* Not Modal */}
      {showNoteModal && (
        <div className={styles.modal} onClick={() => setShowNoteModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>
                <i className="fas fa-sticky-note"></i> {noteForm.id ? 'Notu Düzenle' : 'Yeni Not'}
              </h3>
              <button onClick={() => setShowNoteModal(false)} className={styles.closeBtn}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              if (noteForm.id) {
                updateNote(noteForm.id, {
                  title: noteForm.title,
                  content: noteForm.content,
                  updatedAt: new Date().toISOString()
                })
              } else {
                addNote({
                  id: Date.now().toString(),
                  title: noteForm.title,
                  content: noteForm.content,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  userId: currentUser.username
                })
              }
              setShowNoteModal(false)
              setNoteForm({ id: '', title: '', content: '' })
            }} className={styles.noteForm}>
              <div className={styles.formGroup}>
                <label htmlFor="note-title">Başlık</label>
                <input
                  id="note-title"
                  type="text"
                  placeholder="Not başlığı girin..."
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="note-content">İçerik</label>
                <textarea
                  id="note-content"
                  placeholder="Not içeriğini yazın..."
                  rows={10}
                  value={noteForm.content}
                  onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowNoteModal(false)} className={styles.cancelBtn}>
                  İptal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  <i className="fas fa-save"></i> Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Müdür için Görev Ekleme Formu */}
      {isMudur && (
        <section className={styles.addTaskSection}>
          <div className={styles.sectionHeader}>
            <h2>
              <i className="fas fa-plus-circle"></i> Yeni Görev Ekle
            </h2>
            <button onClick={() => setShowTaskForm(!showTaskForm)} className={styles.toggleBtn}>
              <i className={`fas fa-${showTaskForm ? 'minus' : 'plus'}`}></i>
              {showTaskForm ? 'Gizle' : 'Göster'}
            </button>
          </div>

          {showTaskForm && (
            <form onSubmit={handleTaskSubmit} className={styles.taskForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Görev Başlığı"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Görev Türü (Ödev, Tez, Sınav...)"
                    value={taskForm.type}
                    onChange={(e) => setTaskForm({...taskForm, type: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <textarea
                  placeholder="Açıklama (opsiyonel)"
                  rows={3}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="datetime-local"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({...taskForm, deadline: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <select
                    value={taskForm.assignedTo}
                    onChange={(e) => setTaskForm({...taskForm, assignedTo: e.target.value})}
                    required
                  >
                    <option value="">Kullanıcı Seçin</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.username} value={user.username}>
                        {user.username} #{user.userCode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>
                <i className="fas fa-plus"></i> Görev Ekle
              </button>
            </form>
          )}
        </section>
      )}

      <section className={styles.tasksSection}>
        <h2>
          <i className="fas fa-tasks"></i> {isMudur ? 'Tüm Görevler' : 'Görevlerim'}
        </h2>
        {userTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-folder-open"></i>
            <h3>Henüz görev yok</h3>
            <p>{isMudur ? 'Henüz görev eklenmemiş' : 'Size atanan görevler burada görünecek'}</p>
          </div>
        ) : (
          <div className={styles.taskList}>
            {userTasks.map((task) => (
              <div key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
                <div className={styles.taskHeader}>
                  <div>
                    <h3>{task.title}</h3>
                    <span className={styles.taskType} data-type={task.type}>{task.type}</span>
                  </div>
                  <div className={styles.taskActions}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className={styles.taskCheckbox}
                    />
                    {isMudur && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className={styles.deleteBtn}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
                {task.description && (
                  <p className={styles.taskDescription}>{task.description}</p>
                )}
                <div className={styles.taskMeta}>
                  <span>
                    <i className="fas fa-calendar-alt"></i> {new Date(task.deadline).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span>
                    <i className="fas fa-user"></i> {isMudur ? `Atanan: ${task.assignedTo}` : `Atayan: ${task.assignedBy}`}
                  </span>
                </div>
                
                {/* Dosya Yükleme ve Görüntüleme */}
                {!isMudur && !task.completed && (
                  <div className={styles.taskFileSection}>
                    <button
                      onClick={() => handleOpenSubmitModal(task)}
                      className={styles.uploadBtn}
                    >
                      <i className="fas fa-upload"></i> Dosya Yükle & Not Ekle
                    </button>
                  </div>
                )}
                
                {/* Yüklenen Dosyalar */}
                {task.files && task.files.length > 0 && (
                  <div className={styles.uploadedFiles}>
                    <h4><i className="fas fa-paperclip"></i> Yüklenen Dosyalar ({task.files.length})</h4>
                    <div className={styles.fileList}>
                      {task.files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                          <i className="fas fa-file"></i>
                          <a href={file.content} download={file.name} className={styles.fileName}>
                            {file.name}
                          </a>
                          <span className={styles.fileDate}>
                            {new Date(file.uploadDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Görev Notu */}
                {task.notes && (
                  <div className={styles.taskNotes}>
                    <h4><i className="fas fa-comment"></i> Not:</h4>
                    <p>{task.notes}</p>
                  </div>
                )}
                
                {/* Teslim Tarihi */}
                {task.submittedAt && (
                  <div className={styles.submittedInfo}>
                    <i className="fas fa-check-circle"></i> Teslim edildi: {new Date(task.submittedAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dosya Yükleme Modal */}
      {showSubmitModal && selectedTask && (
        <div className={styles.modal} onClick={() => setShowSubmitModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>
                <i className="fas fa-upload"></i> Görev Teslimi: {selectedTask.title}
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className={styles.closeBtn}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitTask} className={styles.submitForm}>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-comment"></i> Not Ekle
                </label>
                <textarea
                  placeholder="Göreviniz hakkında not ekleyin..."
                  rows={5}
                  value={submitForm.taskNote}
                  onChange={(e) => setSubmitForm({...submitForm, taskNote: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-paperclip"></i> Dosya Ekle
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                {submitForm.files.length > 0 && (
                  <div className={styles.selectedFiles}>
                    <p><strong>Seçilen dosyalar:</strong></p>
                    <ul>
                      {submitForm.files.map((file, index) => (
                        <li key={index}>
                          <i className="fas fa-file"></i> {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowSubmitModal(false)} className={styles.cancelBtn}>
                  İptal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  <i className="fas fa-check"></i> Teslim Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
