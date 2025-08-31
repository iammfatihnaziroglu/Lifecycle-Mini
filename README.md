# Lifecycle Mini - Müşteri Yönetim Sistemi

Vue.js 3 + Nuxt 3 + Express.js ile geliştirilmiş basit müşteri yönetim sistemi.

## Özellikler

- ✅ Müşteri listesi görüntüleme
- ✅ Yeni müşteri ekleme
- ✅ Müşteri skorlama (bütçeye göre)
- ✅ Responsive tasarım
- ✅ Backend API (Express.js)
- ✅ JSON dosya tabanlı veri saklama

## Teknolojiler

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Nuxt 3** - Vue.js meta-framework
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **JSON** - Veri saklama

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
# Ana proje bağımlılıkları
npm install

# Backend bağımlılıkları
cd server
npm install
cd ..
```

### 2. Geliştirme Sunucusunu Başlat

#### Sadece Frontend (Nuxt)
```bash
npm run dev
```
Frontend: http://localhost:3000

#### Sadece Backend (Express)
```bash
cd server
npm run dev
```
Backend: http://localhost:3001

#### Hem Frontend Hem Backend (Önerilen)
```bash
npm run dev:full
```
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## API Endpoints

### GET /api/customers
Tüm müşterileri getirir.

### POST /api/customers
Yeni müşteri ekler.

**Request Body:**
```json
{
  "name": "Müşteri Adı",
  "email": "musteri@example.com",
  "phone": "555 123 4567",
  "countryCode": "TR",
  "budget": 500000,
  "roomPreference": 3
}
```

### GET /health
Sunucu durumunu kontrol eder.

## Müşteri Skorlama

Müşteriler bütçelerine göre otomatik olarak skorlanır:

- **High**: 500,000 TL ve üzeri
- **Medium**: 300,000 - 499,999 TL
- **Low**: 300,000 TL altı

## Proje Yapısı

```
lifecycle-mini/
├── app/                    # Nuxt.js frontend
│   ├── components/         # Vue bileşenleri
│   ├── pages/             # Sayfa bileşenleri
│   └── assets/            # Statik dosyalar
├── server/                # Express.js backend
│   ├── server.js          # Ana sunucu dosyası
│   ├── customers.json     # Müşteri verileri
│   └── package.json       # Backend bağımlılıkları
└── package.json           # Ana proje bağımlılıkları
```

## Geliştirme

### Frontend Geliştirme
- `app/pages/customers/index.vue` - Müşteri listesi
- `app/pages/customers/newcustomers.vue` - Yeni müşteri ekleme
- `app/components/customers/CustomerTable.vue` - Müşteri tablosu

### Backend Geliştirme
- `server/server.js` - Express.js sunucu
- `server/customers.json` - Müşteri verileri

## Production

### Frontend Build
```bash
npm run build
npm run preview
```

### Backend Production
```bash
cd server
npm start
```

## Lisans

MIT
