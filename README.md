# 🎓 Akademik Görev Takip Sistemi

Modern ve kullanıcı dostu akademik görev takip uygulaması. Next.js 14 ile geliştirilmiş, TypeScript tabanlı React uygulaması.

## 🌟 Özellikler

### 👥 Kullanıcı Rolleri
- **Admin**: Sistem yönetimi ve kullanıcı kontrolü
- **Müdür**: Görev atama ve takip
- **Kullanıcı**: Görev alma ve tamamlama

### 🚀 Ana Özellikler
- ✅ **Görev Yönetimi**: Ödev, tez, sınav ve proje takibi
- 🔔 **Bildirimler**: Görev atamaları için anlık bildirimler
- 📅 **Takvim Entegrasyonu**: 2 haftalık ve aylık görünüm
- 📝 **Not Alma Sistemi**: Zengin metin editörü
- 📊 **İstatistikler**: Detaylı görev ve performans takibi
- 📁 **Dosya Yükleme**: Görevlere dosya ekleme
- ⏰ **Geri Sayım**: 48 saat uyarı sistemi
- 🍎 **iOS Tasarım Dili**: Apple Human Interface Guidelines'a uygun modern arayüz
- 🌓 **Dark/Light Tema**: iOS tarzı tema desteği
- ✨ **Glassmorphism**: Blur efektleri ve yarı saydam arka planlar
- 📧 **Mail Onay Sistemi**: Güvenli kayıt işlemi
- 👤 **Profil Yönetimi**: Kullanıcı bilgileri ve şifre değiştirme
- 💾 **LocalStorage**: Tarayıcı tabanlı veri saklama

## 🛠️ Teknolojiler

- **Next.js 14**: React framework
- **TypeScript**: Type-safe kod
- **Zustand**: State management
- **CSS Modules**: Scoped styling
- **iOS Design System**: Apple Human Interface Guidelines
- **SF Pro Font Stack**: Native Apple font ailesi
- **CSS Backdrop Filter**: Glassmorphism efektleri
- **Font Awesome**: İkonlar

## 📦 Kurulum

### Gereksinimler
- Node.js 18.17 veya üzeri
- npm veya yarn

### Adımlar

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

### Alternatif Kurulum Yöntemleri

**Windows için:**
```bash
BASLAT.bat
```

**Mac/Linux için:**
```bash
chmod +x BASLAT.sh
./BASLAT.sh
```

veya

```bash
chmod +x KOLAY-BASLAT.sh
./KOLAY-BASLAT.sh
```

## 🎯 Kullanım

### Demo Hesaplar

**Admin:**
- Kullanıcı Adı: `admin`
- Şifre: `1234`

**Müdür:**
- Kullanıcı Adı: `mudur`
- Şifre: `1234`

### Yeni Kullanıcı Kaydı

1. Giriş ekranında "Kayıt Ol" butonuna tıklayın
2. Kullanıcı adı, e-posta ve şifre bilgilerinizi girin
3. E-posta onay kodunu girin (demo için ekranda gösterilir)
4. Kayıt tamamlandıktan sonra giriş yapın

## 📱 Sayfalar

### Ana Sayfa (/)
- Modern landing page
- Özellikler tanıtımı
- İletişim formu

### Giriş Sayfası (/app)
- Kullanıcı/Müdür girişi
- Kayıt olma
- Mail onay sistemi

### Dashboard (/dashboard)
- İstatistik kartları
- Görev listesi
- Takvim görünümü
- Bildirim paneli
- Not alma

### Profil Sayfası (/profile)
- Profil fotoğrafı yükleme
- Bilgi güncelleme
- Şifre değiştirme

### Admin Paneli (/admin)
- Kullanıcı yönetimi
- Sistem ayarları

## 🎨 Tema Sistemi

Uygulama otomatik olarak sistem temasını algılar. Manuel olarak değiştirmek için sağ üst köşedeki tema butonunu kullanın.

## 📂 Proje Yapısı

```
akademik-takip/
├── app/                        # Next.js app router
│   ├── page.tsx               # Ana sayfa
│   ├── app/                   # Login sayfası
│   ├── dashboard/             # Dashboard
│   ├── profile/               # Profil sayfası
│   ├── admin/                 # Admin paneli
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global stiller
├── components/                # React bileşenleri
│   ├── Calendar.tsx           # Takvim bileşeni
│   ├── NotificationPanel.tsx # Bildirim paneli
│   ├── TaskCountdown.tsx      # Geri sayım
│   ├── NoteCard.tsx           # Not kartı
│   └── ThemeProvider.tsx      # Tema sağlayıcı
├── lib/                       # Yardımcı kütüphaneler
│   └── store.ts              # Zustand store
├── public/                    # Statik dosyalar
├── package.json              # Bağımlılıklar
├── tsconfig.json             # TypeScript config
└── next.config.js            # Next.js config
```

## 🔧 Geliştirme

### Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Lint kontrolü
npm run lint
```

### Özelleştirme

#### Renk Teması
`app/globals.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... diğer renkler */
}
```

#### Yeni Özellik Ekleme
1. `lib/store.ts` dosyasına yeni state ekleyin
2. İlgili component'i oluşturun
3. Sayfaya entegre edin

## 🚀 Deployment

### Vercel (Önerilen)

1. GitHub repository'nizi Vercel'e bağlayın
2. Otomatik deploy edilecektir
3. Her commit'te otomatik güncelleme

### Manuel Deployment

```bash
# Build oluştur
npm run build

# Production sunucusu başlat
npm start
```

## 📚 Dokümantasyon

Detaylı kurulum ve kullanım kılavuzları için:
- [BASIT-KURULUM.md](BASIT-KURULUM.md)
- [KURULUM.md](KURULUM.md)
- [HATA-COZUM.md](HATA-COZUM.md)
- [NASIL-CALISTIRILIR.md](NASIL-CALISTIRILIR.md)

## 🐛 Bilinen Sorunlar

- LocalStorage kullanıldığı için veriler tarayıcıya özeldir
- Gerçek e-posta gönderimi simüle edilmiştir
- Dosya yüklemeleri base64 formatında saklanır (büyük dosyalar için uygun değil)

## 🚀 Gelecek Planları

- [ ] Backend entegrasyonu (Node.js/Express)
- [ ] Gerçek veritabanı desteği (MongoDB/PostgreSQL)
- [ ] Gerçek e-posta servisi entegrasyonu
- [ ] Dosya yükleme için cloud storage
- [ ] Mobil uygulama (React Native)
- [ ] PWA desteği
- [ ] Çoklu dil desteği
- [ ] Real-time bildirimler (WebSocket)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

**Barış Çalkentir**
- GitHub: [@bariscalkentir](https://github.com/bariscalkentir)

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkürler! Sorularınız veya önerileriniz için issue açabilirsiniz.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
