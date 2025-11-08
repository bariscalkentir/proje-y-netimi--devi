'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore, User } from '@/lib/store'
import styles from './admin.module.css'

export default function AdminPage() {
  const router = useRouter()
  const { currentUser, users, addUser, updateUser, deleteUser, tasks, setCurrentUser } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'admin' | 'mudur' | 'user',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/app')
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== 'admin') {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!')
      return
    }

    if (users.some(u => u.username === formData.username)) {
      alert('Bu kullanıcı adı zaten kullanılıyor!')
      return
    }

    const newUser: User = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      userCode: String(users.length + 1).padStart(4, '0')
    }

    addUser(newUser)
    alert('Kullanıcı başarıyla eklendi!')
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      email: '',
      phone: ''
    })
    setShowForm(false)
  }

  const handleDelete = (username: string) => {
    if (username === 'admin') {
      alert('Admin kullanıcısı silinemez!')
      return
    }
    if (confirm(`${username} kullanıcısını silmek istediğinizden emin misiniz?`)) {
      deleteUser(username)
      alert('Kullanıcı silindi!')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    router.push('/')
  }

  const totalUsers = users.length
  const totalMudur = users.filter(u => u.role === 'mudur').length
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>
            <i className="fas fa-cogs"></i> Yönetim Paneli
          </h1>
          <p>Kullanıcı yönetimi ve sistem istatistikleri</p>
        </div>
        <div className={styles.headerButtons}>
          <button onClick={() => router.push('/dashboard')} className={styles.dashboardBtn}>
            <i className="fas fa-home"></i> Ana Sayfa
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
        </div>
      </header>

      {/* İstatistikler */}
      <section className={styles.statsSection}>
        <h2>
          <i className="fas fa-chart-bar"></i> Sistem İstatistikleri
        </h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-users"></i>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{totalUsers}</div>
              <div className={styles.statLabel}>Toplam Kullanıcı</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-user-tie"></i>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{totalMudur}</div>
              <div className={styles.statLabel}>Toplam Müdür</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-tasks"></i>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{totalTasks}</div>
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
        </div>
      </section>

      {/* Kullanıcı Yönetimi */}
      <section className={styles.userManagement}>
        <div className={styles.sectionHeader}>
          <h2>
            <i className="fas fa-users"></i> Kullanıcı Yönetimi
          </h2>
          <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <i className="fas fa-plus"></i> Yeni Kullanıcı
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.userForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Kullanıcı Adı"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Şifre"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Şifre Tekrar"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                >
                  <option value="user">Kullanıcı</option>
                  <option value="mudur">Müdür</option>
                  <option value="admin">Yönetici</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="E-posta (Opsiyonel)"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  placeholder="Telefon (Opsiyonel)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <button type="submit" className={styles.submitBtn}>
              <i className="fas fa-plus"></i> Kullanıcı Ekle
            </button>
          </form>
        )}

        <div className={styles.tableContainer}>
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>Kod</th>
                <th>E-posta</th>
                <th>Telefon</th>
                <th>Rol</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>#{user.userCode}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                      {user.role === 'admin' ? 'Yönetici' : user.role === 'mudur' ? 'Müdür' : 'Kullanıcı'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.username)}
                      className={styles.deleteBtn}
                      disabled={user.username === 'admin'}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
