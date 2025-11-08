import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <i className="fas fa-graduation-cap"></i>
            <span>AkademikTakip</span>
          </div>
          <div className={styles.navMenu}>
            <a href="#home" className={styles.navLink}>Ana Sayfa</a>
            <a href="#features" className={styles.navLink}>Özellikler</a>
            <a href="#about" className={styles.navLink}>Hakkında</a>
            <a href="#contact" className={styles.navLink}>İletişim</a>
            <Link href="/app" className={styles.navBtn}>
              <i className="fas fa-sign-in-alt"></i> Giriş Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Akademik Görevlerinizi
              <span className={styles.gradientText}> Kolayca Takip Edin</span>
            </h1>
            <p className={styles.heroDescription}>
              Ödev, tez, sınav ve projelerinizi organize edin. Bildirimler alın, 
              takvim ile planlayın ve ekip arkadaşlarınızla işbirliği yapın.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/app" className={styles.btnPrimary}>
                <i className="fas fa-rocket"></i> Hemen Başla
              </Link>
              <a href="#features" className={styles.btnSecondary}>
                <i className="fas fa-play"></i> Özellikleri Keşfet
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Aktif Kullanıcı</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>Tamamlanan Görev</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>99%</div>
                <div className={styles.statLabel}>Memnuniyet</div>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroCard}>
              <div className={styles.cardHeader}>
                <i className="fas fa-tasks"></i>
                <span>Görevlerim</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.taskItem}>
                  <i className="fas fa-circle-check"></i>
                  <span>Matematik Ödevi</span>
                  <span className={styles.taskStatusCompleted}>Tamamlandı</span>
                </div>
                <div className={styles.taskItem}>
                  <i className="fas fa-clock"></i>
                  <span>Fizik Projesi</span>
                  <span className={styles.taskStatusPending}>Devam Ediyor</span>
                </div>
                <div className={styles.taskItem}>
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Kimya Sınavı</span>
                  <span className={styles.taskStatusUrgent}>Acil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Güçlü Özellikler</h2>
            <p>Akademik hayatınızı kolaylaştıran modern araçlar</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-tasks"></i>
              </div>
              <h3>Görev Yönetimi</h3>
              <p>Ödev, proje ve sınavlarınızı organize edin. Öncelik belirleyin ve ilerleme takibi yapın.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-bell"></i>
              </div>
              <h3>Akıllı Bildirimler</h3>
              <p>Görev atamaları ve son teslim tarihleri için otomatik bildirimler alın.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Takvim Entegrasyonu</h3>
              <p>Görevlerinizi takvimde görüntüleyin ve etkinliklerinizi planlayın.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-sticky-note"></i>
              </div>
              <h3>Not Alma</h3>
              <p>Notion benzeri zengin metin editörü ile notlarınızı alın ve organize edin.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-users"></i>
              </div>
              <h3>Ekip İşbirliği</h3>
              <p>Müdürler görev atayabilir, kullanıcılar onaylayabilir veya reddedebilir.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>İlerleme Takibi</h3>
              <p>Detaylı istatistikler ve raporlar ile performansınızı analiz edin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h2>Neden AkademikTakip?</h2>
              <p>
                Akademik hayatın karmaşıklığını anlıyoruz. Ödevler, projeler, sınavlar ve
                son teslim tarihleri arasında kaybolmak çok kolay. AkademikTakip, tüm
                akademik görevlerinizi tek bir yerde organize etmenizi sağlar.
              </p>
              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeature}>
                  <i className="fas fa-check-circle"></i>
                  <span>Kullanıcı dostu arayüz</span>
                </div>
                <div className={styles.aboutFeature}>
                  <i className="fas fa-check-circle"></i>
                  <span>Mobil uyumlu tasarım</span>
                </div>
                <div className={styles.aboutFeature}>
                  <i className="fas fa-check-circle"></i>
                  <span>Güvenli veri saklama</span>
                </div>
                <div className={styles.aboutFeature}>
                  <i className="fas fa-check-circle"></i>
                  <span>7/24 erişim</span>
                </div>
              </div>
              <Link href="/app" className={styles.btnPrimary}>
                <i className="fas fa-arrow-right"></i> Hemen Deneyin
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <div className={styles.aboutCard}>
                <div className={styles.cardStats}>
                  <div className={styles.statCircle}>
                    <div className={styles.circleProgress}>
                      <span>85%</span>
                    </div>
                    <p>Tamamlanan Görevler</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>İletişime Geçin</h2>
            <p>Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız!</p>
          </div>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h4>E-posta</h4>
                  <p>destek@akademiktakip.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h4>Telefon</h4>
                  <p>+90 (212) 555-0123</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h4>Adres</h4>
                  <p>İstanbul, Türkiye</p>
                </div>
              </div>
            </div>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Adınız" required />
                <i className="fas fa-user"></i>
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="E-posta Adresiniz" required />
                <i className="fas fa-envelope"></i>
              </div>
              <div className={styles.formGroup}>
                <textarea placeholder="Mesajınız" rows={5} required></textarea>
                <i className="fas fa-message"></i>
              </div>
              <button type="submit" className={styles.btnPrimary}>
                <i className="fas fa-paper-plane"></i> Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>
                <i className="fas fa-graduation-cap"></i>
                <span>AkademikTakip</span>
              </div>
              <p>Akademik başarınız için güvenilir ortağınız.</p>
              <div className={styles.socialLinks}>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            <div className={styles.footerSection}>
              <h4>Hızlı Linkler</h4>
              <ul>
                <li><a href="#home">Ana Sayfa</a></li>
                <li><a href="#features">Özellikler</a></li>
                <li><a href="#about">Hakkında</a></li>
                <li><Link href="/app">Giriş Yap</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Destek</h4>
              <ul>
                <li><a href="#">Yardım Merkezi</a></li>
                <li><a href="#">SSS</a></li>
                <li><a href="#contact">İletişim</a></li>
                <li><a href="#">Geri Bildirim</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Yasal</h4>
              <ul>
                <li><a href="#">Gizlilik Politikası</a></li>
                <li><a href="#">Kullanım Şartları</a></li>
                <li><a href="#">Çerez Politikası</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 AkademikTakip. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
