# 🚀 Basit Kurulum Rehberi

## ⚠️ Sorun mu Yaşıyorsunuz?

Eğer `npm install` hatası alıyorsanız, bu adımları takip edin:

### 1️⃣ Node.js Versiyonunu Kontrol Edin

```bash
node --version
```

**Gerekli:** v18.0.0 veya üzeri

Eğer eski versiyonunuz varsa:
- [nodejs.org](https://nodejs.org/) adresinden LTS versiyonunu indirin
- Kurulumu tamamlayın
- Terminal'i kapatıp yeniden açın

### 2️⃣ Temiz Kurulum

```bash
# Proje klasörüne gidin
cd nextjs-akademik-takip

# Eğer varsa eski dosyaları silin
rm -rf node_modules package-lock.json

# Bağımlılıkları yükleyin
npm install

# Sunucuyu başlatın
npm run dev
```

### 3️⃣ Hala Hata Alıyorsanız

**npm cache temizleyin:**
```bash
npm cache clean --force
npm install
```

**Farklı Node.js versiyonu deneyin:**
```bash
# Node.js 18 LTS önerilir
node --version
```

### 4️⃣ Alternatif: Yarn Kullanın

```bash
# Yarn yükleyin (eğer yoksa)
npm install -g yarn

# Yarn ile yükleyin
yarn install

# Sunucuyu başlatın
yarn dev
```

---

## ✅ Başarılı Kurulum

Eğer kurulum başarılı olduysa şunu göreceksiniz:

```
added 250 packages in 45s
```

Sonra:

```bash
npm run dev
```

Şu mesajı göreceksiniz:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

---

## 🔍 Yaygın Hatalar ve Çözümleri

### Hata: "Cannot find module"

**Çözüm:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hata: "EACCES: permission denied"

**Çözüm (Mac/Linux):**
```bash
sudo npm install
```

**Çözüm (Windows):**
- Command Prompt'u "Yönetici olarak çalıştır"

### Hata: "network timeout"

**Çözüm:**
```bash
# npm registry'yi değiştirin
npm config set registry https://registry.npmjs.org/
npm install
```

### Hata: "peer dependency"

**Çözüm:**
```bash
npm install --legacy-peer-deps
```

---

## 📦 Manuel Paket Yükleme

Eğer otomatik kurulum çalışmazsa, paketleri tek tek yükleyin:

```bash
npm install next@14.0.4
npm install react@18.2.0
npm install react-dom@18.2.0
npm install zustand@4.4.7
npm install --save-dev typescript@5.3.3
npm install --save-dev @types/react@18.2.45
npm install --save-dev @types/react-dom@18.2.18
npm install --save-dev @types/node@20.10.5
```

---

## 🆘 Hala Çalışmıyor mu?

### Sistem Bilgilerinizi Kontrol Edin

```bash
node --version    # v18.0.0 veya üzeri olmalı
npm --version     # v9.0.0 veya üzeri olmalı
```

### İnternet Bağlantısı

- İnternet bağlantınızın aktif olduğundan emin olun
- Firewall veya proxy ayarlarını kontrol edin

### Disk Alanı

- Yeterli disk alanınız olduğundan emin olun (en az 500MB)

---

## 💡 Alternatif Çözüm: Basit Versiyon

Eğer hiçbir şey çalışmazsa, daha basit bir versiyon oluşturabiliriz:

1. Sadece HTML/CSS/JS versiyonunu kullanın (orijinal proje)
2. Veya bana hata mesajını gönderin, birlikte çözelim

---

## 📞 Yardım

Hata mesajını tam olarak görmem gerekiyor. Terminal'de gördüğünüz hatayı paylaşın:

```bash
npm install 2>&1 | tee error.log
```

Bu komut hatayı `error.log` dosyasına kaydeder.

---

**Not:** Next.js projesi çalışmazsa, orijinal HTML/CSS/JS versiyonu hala kullanılabilir durumda!
