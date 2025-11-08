#!/bin/bash

clear
echo "=================================="
echo "  Akademik Takip - Kolay Başlatma"
echo "=================================="
echo ""

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo "❌ HATA: Node.js bulunamadı!"
    echo ""
    echo "Lütfen Node.js'i yükleyin:"
    echo "https://nodejs.org/"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"
echo ""

# node_modules var mı kontrol et
if [ ! -d "node_modules" ]; then
    echo "📦 İlk kurulum yapılıyor..."
    echo "Bu işlem birkaç dakika sürebilir..."
    echo ""
    
    # npm install dene
    if npm install; then
        echo ""
        echo "✅ Kurulum başarılı!"
    else
        echo ""
        echo "❌ Kurulum başarısız!"
        echo ""
        echo "Alternatif çözümler:"
        echo "1. npm cache clean --force"
        echo "2. rm -rf node_modules package-lock.json"
        echo "3. npm install --legacy-peer-deps"
        echo ""
        echo "Veya BASIT-KURULUM.md dosyasına bakın"
        exit 1
    fi
else
    echo "✅ Bağımlılıklar zaten yüklü"
fi

echo ""
echo "🚀 Sunucu başlatılıyor..."
echo ""
echo "Tarayıcınızda açın: http://localhost:3000"
echo ""
echo "Durdurmak için: Ctrl+C"
echo ""
echo "=================================="
echo ""

npm run dev
