# 📦 Akademik Takip Sistemi - Kurulum Rehberi

## 🎯 Hızlı Başlangıç

### 1. Projeyi Açın

Terminal'de proje klasörüne gidin:

```bash
cd nextjs-akademik-takip
```

### 2. Bağımlılıkları Yükleyin

Node.js paketlerini yükleyin:

```bash
npm install
```

veya yarn kullanıyorsanız:

```bash
yarn install
```

Bu işlem birkaç dakika sürebilir. İnternet bağlantınızın aktif olduğundan emin olun.

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

veya

```bash
yarn dev
```

### 4. Tarayıcıda Açın

Tarayıcınızda şu adresi açın:

```
http://localhost:3000
```

🎉 Tebrikler! Uygulama çalışıyor.

---

## 🔧 Detaylı Kurulum

### Gereksinimler

Sisteminizde şunlar yüklü olmalı:

- **Node.js** (v18.0.0 veya üzeri)
- **npm** (v9.0.0 veya üzeri) veya **yarn**

#### Node.js Kurulumu

Node.js yüklü değilse:

1. [nodejs.org](https://nodejs.org/) adresine gidin
2. LTS (Long Term Support) versiyonunu indirin
3. Kurulum sihirbazını takip edin

Kurulumu kontrol edin:

```bash
node --version
npm --version
```

### Adım Adım Kurulum

#### 1. Proje Klasörüne Gidin

```bash
cd nextjs-akademik-takip
```

#### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

Yüklenen paketler:
- `next` - Next.js framework
- `react` - React kütüphanesi
- `react-dom` - React DOM
- `zustand` - State management
- `typescript` - TypeScript desteği

#### 3. Geliştirme Modunda Çalıştırın

```bash
npm run dev
```

Sunucu başladığında şunu göreceksiniz:

```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

#### 4. Tarayıcıda Test Edin

Tarayıcınızda `http://localhost:3000` adresini açın.

---

## 🚀 Production Build

Production için optimize edilmiş build almak:

### 1. Build Oluşturun

```bash
npm run build
```

Bu komut:
- TypeScript kodunu derler
- Optimizasyon yapar
- Static dosyaları oluşturur

### 2. Production Sunucusunu Başlatın

```bash
npm start
```

Production sunucusu `http://localhost:3000` adresinde çalışacak.

---

## 📱 Kullanım

### Demo Hesaplar

Uygulamaya giriş yapmak için:

**Admin Hesabı:**
- Kullanıcı Adı: `admin`
- Şifre: `1234`

**Müdür Hesabı:**
- Kullanıcı Adı: `mudur`
- Şifre: `1234`

### Özellikler

1. **Ana Sayfa** - Landing page
2. **Giriş** - `/app` sayfası
3. **Dashboard** - Kullanıcı paneli
4. **Tema Değiştirme** - Sol üst köşedeki buton

---

## 🛠️ Geliştirme Komutları

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

---

## 📁 Proje Yapısı

```
nextjs-akademik-takip/
├── app/                    # Next.js sayfaları
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── app/               # Giriş sayfası
│   └── dashboard/         # Dashboard
├── components/            # React bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
│   └── store.ts           # State management
├── public/                # Statik dosyalar
├── package.json           # Proje bağımlılıkları
└── tsconfig.json          # TypeScript ayarları
```

---

## ❓ Sorun Giderme

### Port 3000 Kullanımda

Eğer port 3000 kullanımdaysa:

```bash
# Farklı port kullanın
PORT=3001 npm run dev
```

### Bağımlılık Hataları

Eğer kurulum sırasında hata alırsanız:

```bash
# node_modules ve package-lock.json'u silin
rm -rf node_modules package-lock.json

# Tekrar yükleyin
npm install
```

### Cache Temizleme

Next.js cache'ini temizlemek için:

```bash
rm -rf .next
npm run dev
```

### TypeScript Hataları

TypeScript hatalarını görmek için:

```bash
npm run lint
```

---

## 🔄 Güncelleme

Projeyi güncellemek için:

```bash
# Bağımlılıkları güncelle
npm update

# Veya belirli bir paketi güncelle
npm update next
```

---

## 📞 Destek

Sorun yaşarsanız:

1. Terminal'deki hata mesajlarını kontrol edin
2. `node_modules` klasörünü silip tekrar yükleyin
3. Node.js versiyonunuzu kontrol edin
4. README.md dosyasını okuyun

---

## ✅ Kontrol Listesi

Kurulum tamamlandıktan sonra:

- [ ] Node.js yüklü (v18+)
- [ ] Bağımlılıklar yüklendi
- [ ] Geliştirme sunucusu çalışıyor
- [ ] http://localhost:3000 açılıyor
- [ ] Giriş yapabiliyorum
- [ ] Tema değiştirme çalışıyor

---

**Başarılar! 🎉**

Herhangi bir sorunla karşılaşırsanız, hata mesajlarını ve Node.js versiyonunuzu kontrol edin.
