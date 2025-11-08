# 🔧 Hata Çözüm Rehberi

## 📋 Hata Aldınız mı?

Bu rehber size yardımcı olacak!

---

## ❌ "npm install" Hatası

### Çözüm 1: Temiz Kurulum

```bash
cd nextjs-akademik-takip
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Çözüm 2: Legacy Peer Dependencies

```bash
npm install --legacy-peer-deps
```

### Çözüm 3: Farklı Registry

```bash
npm config set registry https://registry.npmjs.org/
npm install
```

---

## ❌ Node.js Versiyonu Eski

### Kontrol Edin

```bash
node --version
```

**Gerekli:** v18.0.0 veya üzeri

### Güncelleme

1. [nodejs.org](https://nodejs.org/) adresine gidin
2. **LTS** versiyonunu indirin
3. Kurulumu tamamlayın
4. Terminal'i kapatıp yeniden açın
5. Tekrar kontrol edin: `node --version`

---

## ❌ "Cannot find module" Hatası

### Çözüm

```bash
# Tüm bağımlılıkları temizle
rm -rf node_modules package-lock.json .next

# Yeniden yükle
npm install

# Sunucuyu başlat
npm run dev
```

---

## ❌ "Port 3000 already in use"

### Çözüm 1: Farklı Port

```bash
PORT=3001 npm run dev
```

### Çözüm 2: Port'u Boşalt (Mac/Linux)

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Çözüm 3: Port'u Boşalt (Windows)

```cmd
netstat -ano | findstr :3000
taskkill /PID [PID_NUMARASI] /F
npm run dev
```

---

## ❌ "EACCES: permission denied"

### Mac/Linux

```bash
sudo npm install
```

### Windows

- Command Prompt'u **Yönetici olarak çalıştır**
- Komutu tekrar çalıştırın

---

## ❌ "network timeout" veya "ETIMEDOUT"

### Çözüm 1: Timeout Süresini Artır

```bash
npm config set fetch-timeout 60000
npm install
```

### Çözüm 2: Proxy Ayarları

```bash
npm config delete proxy
npm config delete https-proxy
npm install
```

### Çözüm 3: VPN Kapat

- VPN kullanıyorsanız kapatın
- Tekrar deneyin

---

## ❌ TypeScript Hataları

### Çözüm

```bash
# TypeScript'i yeniden yükle
npm install --save-dev typescript@latest

# Type definitions'ı yükle
npm install --save-dev @types/react @types/react-dom @types/node
```

---

## ❌ "Module not found: Can't resolve"

### Çözüm

```bash
# .next klasörünü sil
rm -rf .next

# Yeniden başlat
npm run dev
```

---

## ❌ Sayfa Yüklenmiyor / Beyaz Ekran

### Kontrol Listesi

1. **Terminal'de hata var mı?**
   - Terminal'i kontrol edin
   - Hata mesajlarını okuyun

2. **Tarayıcı Konsolu**
   - F12 tuşuna basın
   - Console sekmesine bakın
   - Hataları kontrol edin

3. **Cache Temizle**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

4. **Farklı Tarayıcı Dene**
   - Chrome, Firefox, Safari

---

## ❌ "Hydration Error"

### Çözüm

```bash
# .next klasörünü temizle
rm -rf .next

# Sunucuyu yeniden başlat
npm run dev
```

---

## 🔍 Detaylı Hata Logu

Hata mesajını kaydetmek için:

```bash
npm install 2>&1 | tee install-error.log
```

veya

```bash
npm run dev 2>&1 | tee dev-error.log
```

---

## 💡 Alternatif Çözümler

### 1. Yarn Kullan

```bash
# Yarn yükle
npm install -g yarn

# Yarn ile yükle
yarn install

# Sunucuyu başlat
yarn dev
```

### 2. pnpm Kullan

```bash
# pnpm yükle
npm install -g pnpm

# pnpm ile yükle
pnpm install

# Sunucuyu başlat
pnpm dev
```

---

## 🆘 Hala Çalışmıyor?

### Sistem Bilgilerini Topla

```bash
node --version
npm --version
npx --version
```

### Hata Mesajını Kaydet

Terminal'deki tüm hata mesajını kopyalayın.

### Kontrol Edin

- [ ] Node.js v18+ yüklü
- [ ] npm v9+ yüklü
- [ ] İnternet bağlantısı aktif
- [ ] Yeterli disk alanı var (500MB+)
- [ ] Firewall/Antivirus engellemiyor
- [ ] VPN kapalı

---

## 🔄 Son Çare: Sıfırdan Başla

```bash
# Proje klasörünü tamamen sil
cd ..
rm -rf nextjs-akademik-takip

# Yeniden oluştur
# (Orijinal dosyaları tekrar kopyala)
```

---

## 📞 Yardım İste

Eğer hiçbir şey çalışmazsa:

1. **Hata mesajını** tam olarak kaydedin
2. **Node.js versiyonunu** kontrol edin
3. **İşletim sisteminizi** belirtin
4. Yardım isteyin

---

## ✅ Başarılı Kurulum Kontrolü

Kurulum başarılı olduysa:

```bash
npm run dev
```

Şunu göreceksiniz:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

Tarayıcıda `http://localhost:3000` açılmalı.

---

**Not:** Next.js projesi çalışmazsa, orijinal HTML/CSS/JS versiyonunu kullanabilirsiniz!
