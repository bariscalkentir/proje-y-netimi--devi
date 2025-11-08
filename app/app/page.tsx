'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import styles from './app.module.css'

export default function AppPage() {
  const router = useRouter()
  const { users, setCurrentUser, currentUser, addUser } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginRole, setLoginRole] = useState<'user' | 'mudur'>('user')
  
  // Kayıt formu state'leri
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // Mail onay state'leri
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [pendingUser, setPendingUser] = useState<any>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      if (loginRole === 'mudur' && user.role !== 'mudur' && user.role !== 'admin') {
        alert('Müdür girişi için yetkiniz yok!')
        return
      }
      if (loginRole === 'user' && user.role === 'admin') {
        alert('Admin kullanıcısı için lütfen Yönetim Panelini kullanın!')
        return
      }
      
      setCurrentUser(user)
      alert(`Hoş geldin ${user.username}!`)
      
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      alert('Kullanıcı adı veya parola hatalı!')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validasyonlar
    if (registerData.password !== registerData.confirmPassword) {
      alert('Şifreler eşleşmiyor!')
      return
    }
    
    if (registerData.password.length < 4) {
      alert('Şifre en az 4 karakter olmalı!')
      return
    }
    
    if (users.find(u => u.username === registerData.username)) {
      alert('Bu kullanıcı adı zaten kullanılıyor!')
      return
    }
    
    if (users.find(u => u.email === registerData.email)) {
      alert('Bu e-posta adresi zaten kayıtlı!')
      return
    }
    
    // 6 haneli onay kodu oluştur
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedCode(code)
    
    // Kullanıcı bilgilerini geçici olarak sakla
    const userCode = Math.floor(1000 + Math.random() * 9000).toString()
    setPendingUser({
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      role: 'user' as const,
      userCode: userCode
    })
    
    // Onay modalını aç
    setShowRegisterModal(false)
    setShowVerificationModal(true)
    
    alert(`E-posta adresinize onay kodu gönderildi!\n\nDemo için kod: ${code}`)
  }

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (verificationCode === generatedCode) {
      // Kullanıcıyı kaydet
      addUser(pendingUser)
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
      
      // Formu temizle
      setShowVerificationModal(false)
      setVerificationCode('')
      setGeneratedCode('')
      setPendingUser(null)
      setRegisterData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } else {
      alert('Onay kodu hatalı!')
    }
  }

  if (currentUser) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <i className="fas fa-graduation-cap"></i> Akademik Görev Takip Uygulaması
          </h1>
          <p>Ödev, tez, sınav ve projelerinizi kolayca takip edin</p>
        </div>
        <button 
          onClick={() => router.push('/')} 
          className={styles.backBtn}
        >
          <i className="fas fa-arrow-left"></i> Ana Sayfa
        </button>
      </header>

      <section className={styles.loginSection}>
        <div className={styles.loginOptions}>
          <button
            className={`${styles.loginOptionBtn} ${loginRole === 'user' ? styles.active : ''}`}
            onClick={() => setLoginRole('user')}
          >
            <i className="fas fa-user"></i>
            <span>Kullanıcı Girişi</span>
          </button>
          <button
            className={`${styles.loginOptionBtn} ${loginRole === 'mudur' ? styles.active : ''}`}
            onClick={() => setLoginRole('mudur')}
          >
            <i className="fas fa-user-tie"></i>
            <span>Müdür Girişi</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fas fa-lock"></i>
          </div>
          <button type="submit" className={styles.btnPrimary}>
            <i className="fas fa-sign-in-alt"></i> Giriş Yap
          </button>
        </form>

        <div className={styles.registerLink}>
          <p>Hesabınız yok mu?</p>
          <button 
            type="button" 
            onClick={() => setShowRegisterModal(true)}
            className={styles.btnSecondary}
          >
            <i className="fas fa-user-plus"></i> Kayıt Ol
          </button>
        </div>

        <div className={styles.demoInfo}>
          <h3>Demo Hesaplar:</h3>
          <p><strong>Admin:</strong> admin / 1234</p>
          <p><strong>Müdür:</strong> mudur / 1234</p>
        </div>
      </section>

      {/* Kayıt Modal */}
      {showRegisterModal && (
        <div className={styles.modal} onClick={() => setShowRegisterModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3><i className="fas fa-user-plus"></i> Kayıt Ol</h3>
              <button onClick={() => setShowRegisterModal(false)} className={styles.closeBtn}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleRegister} className={styles.registerForm}>
              <div className={styles.formGroup}>
                <label>Kullanıcı Adı</label>
                <input
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
              <div className={styles.formGroup}>
                <label>E-posta</label>
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
              <div className={styles.formGroup}>
                <label>Şifre</label>
                <input
                  type="password"
                  placeholder="En az 4 karakter"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
              <div className={styles.formGroup}>
                <label>Şifre Tekrar</label>
                <input
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
              <div className={styles.infoBox}>
                <i className="fas fa-info-circle"></i>
                <p>Kayıt olduktan sonra e-posta adresinize bir onay kodu gönderilecektir.</p>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowRegisterModal(false)} className={styles.btnCancel}>
                  İptal
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  <i className="fas fa-paper-plane"></i> Kayıt Ol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mail Onay Modal */}
      {showVerificationModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3><i className="fas fa-envelope-open"></i> E-posta Onayı</h3>
            </div>
            <div className={styles.verificationInfo}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Onay Kodu Gönderildi!</h4>
                <p>{registerData.email} adresine 6 haneli bir onay kodu gönderdik.</p>
              </div>
            </div>
            <form onSubmit={handleVerification} className={styles.verificationForm}>
              <div className={styles.formGroup}>
                <label>Onay Kodu</label>
                <input
                  type="text"
                  placeholder="6 haneli kodu girin"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className={styles.codeInput}
                />
                <i className="fas fa-key"></i>
              </div>
              <div className={styles.codeDisplay}>
                <i className="fas fa-info-circle"></i>
                <p><strong>Demo Amaçlı:</strong> Onay kodunuz: <span className={styles.codeHighlight}>{generatedCode}</span></p>
              </div>
              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowVerificationModal(false)
                    setShowRegisterModal(true)
                  }} 
                  className={styles.btnCancel}
                >
                  <i className="fas fa-arrow-left"></i> Geri
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  <i className="fas fa-check"></i> Onayla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
