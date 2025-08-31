# Lifecycle Mini Backend

Basit bir Express.js backend API'si. Müşteri verilerini JSON dosyasında saklar.

## Kurulum

```bash
cd server
npm install
```

## Çalıştırma

### Geliştirme modu (nodemon ile)
```bash
npm run dev
```

### Production modu
```bash
npm start
```

## API Endpoints

### GET /api/customers
Tüm müşterileri getirir.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "532 123 4567",
    "countryCode": "TR",
    "budget": 500000,
    "roomPreference": 3,
    "score": "High"
  }
]
```

### POST /api/customers
Yeni müşteri ekler.

**Request Body:**
```json
{
  "name": "Yeni Müşteri",
  "email": "yeni@example.com",
  "phone": "555 123 4567",
  "countryCode": "TR",
  "budget": 400000,
  "roomPreference": 2
}
```

**Response:**
```json
{
  "id": 1703123456789,
  "name": "Yeni Müşteri",
  "email": "yeni@example.com",
  "phone": "555 123 4567",
  "countryCode": "TR",
  "budget": 400000,
  "roomPreference": 2,
  "score": "Medium"
}
```

### GET /health
Sunucu durumunu kontrol eder.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Veri Yapısı

Müşteri verileri `customers.json` dosyasında saklanır. Her müşteri için:

- `id`: Benzersiz kimlik (timestamp)
- `name`: Müşteri adı
- `email`: E-posta adresi (benzersiz)
- `phone`: Telefon numarası
- `countryCode`: Ülke kodu
- `budget`: Bütçe (TL)
- `roomPreference`: Oda tercihi (1-5)
- `score`: Otomatik hesaplanan skor (Low/Medium/High)

## Skor Hesaplama

- Budget >= 500,000 TL: High
- Budget >= 300,000 TL: Medium
- Budget < 300,000 TL: Low

## Port

Varsayılan port: 3001
Environment variable ile değiştirilebilir: `PORT=3002 npm start`
