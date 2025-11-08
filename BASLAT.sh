#!/bin/bash

echo "🎓 Akademik Takip Sistemi - Başlatılıyor..."
echo ""

# Node.js kontrolü
if ! command -v node &> /dev/null
then
    echo "❌ Node.js bulunamadı!"
    echo "Lütfen Node.js'i yükleyin: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js versiyonu: $(node --version)"
echo "✅ npm versiyonu: $(npm --version)"
echo ""

# node_modules kontrolü
if [ ! -d "node_modules" ]; then
    echo "📦 Bağımlılıklar yükleniyor..."
    npm install
    echo ""
fi

echo "🚀 Geliştirme sunucusu başlatılıyor..."
echo ""
echo "Tarayıcınızda şu adresi açın: http://localhost:3000"
echo ""
echo "Durdurmak için: Ctrl+C"
echo ""

npm run dev
