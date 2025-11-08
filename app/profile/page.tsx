'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import styles from './profile.module.css'

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, updateUser, setCurrentUser } = useStore()
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    profileImage: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (!currentUser) {
      router.push('/app')
    } else {
      setProfileData({
        username: currentUser.username,
        email: currentUser.email || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phone: currentUser.phone || '',
        bio: currentUser.bio || '',
        profileImage: currentUser.profileImage || ''
      })
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(currentUser.username, profileData)
    alert('Profil başarıyla güncellendi!')
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.currentPassword !== currentUser.password) {
      alert('Mevcut şifre yanlış!')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor!')
      return
    }

    if (passwordData.newPassword.length < 4) {
      alert('Şifre en az 4 karakter olmalı!')
      return
    }

    updateUser(currentUser.username, { password: passwordData.newPassword })
    alert('Şifre başarıyla değiştirildi!')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setProfileData({...profileData, profileImage: imageData})
        updateUser(currentUser.username, { profileImage: imageData })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>
            <i className="fas fa-user-circle"></i> Profil Yönetimi
          </h1>
          <p>Kişisel bilgilerinizi düzenleyin</p>
        </div>
        <div className={styles.headerButtons}>
          <button onClick={() => router.push('/dashboard')} className={styles.dashboardBtn}>
            <i className="fas fa-arrow-left"></i> Geri Dön
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
        </div>
      </header>

      {/* Profil Bilgileri */}
      <section className={styles.profileSection}>
        <h2>
          <i className="fas fa-user"></i> Profil Bilgileri
        </h2>
        
        <div className={styles.profileContainer}>
          {/* Profil Resmi */}
          <div className={styles.profileImageSection}>
            <div className={styles.profileImageContainer}>
              {profileData.profileImage ? (
                <img src={profileData.profileImage} alt="Profil" className={styles.profileImage} />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  <i className="fas fa-user"></i>
                </div>
              )}
              <div className={styles.profileImageOverlay}>
                <button onClick={() => document.getElementById('imageInput')?.click()} className={styles.changeImageBtn}>
                  <i className="fas fa-camera"></i>
                </button>
              </div>
            </div>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <p className={styles.imageHelpText}>Profil resminizi değiştirmek için kamera ikonuna tıklayın</p>
          </div>

          {/* Profil Formu */}
          <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Kullanıcı Adı</label>
                <input
                  type="text"
                  value={profileData.username}
                  readOnly
                  disabled
                />
              </div>
              <div className={styles.formGroup}>
                <label>E-posta</label>
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Ad</label>
                <input
                  type="text"
                  placeholder="Adınız"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Soyad</label>
                <input
                  type="text"
                  placeholder="Soyadınız"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Telefon</label>
                <input
                  type="tel"
                  placeholder="+90 555 123 45 67"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rol</label>
                <input
                  type="text"
                  value={currentUser.role === 'admin' ? 'Yönetici' : currentUser.role === 'mudur' ? 'Müdür' : 'Kullanıcı'}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Hakkında</label>
              <textarea
                placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              <i className="fas fa-save"></i> Profili Güncelle
            </button>
          </form>
        </div>
      </section>

      {/* Şifre Değiştirme */}
      <section className={styles.passwordSection}>
        <h2>
          <i className="fas fa-lock"></i> Şifre Değiştir
        </h2>
        
        <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label>Mevcut Şifre</label>
            <input
              type="password"
              placeholder="Mevcut şifrenizi girin"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Yeni Şifre</label>
              <input
                type="password"
                placeholder="Yeni şifrenizi girin"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                placeholder="Yeni şifrenizi tekrar girin"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.passwordBtn}>
            <i className="fas fa-lock"></i> Şifreyi Değiştir
          </button>
        </form>
      </section>
    </div>
  )
}
