# Panduan Pengembangan PLN Payment App

## Setup Lokal

### 1. Prerequisites
- Node.js 18+ dan npm
- MongoDB (lokal atau MongoDB Atlas)
- Akun Midtrans (sandbox untuk development)
- Git

### 2. Clone Repository
```bash
git clone https://github.com/snur9966-png/pln-payment-app.git
cd pln-payment-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dan isi dengan kredensial Anda:
```
MONGODB_URI=mongodb://localhost:27017/pln-payment-app
JWT_SECRET=your-secret-key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_SERVER_KEY=your-server-key
```

### 5. Setup Database
Pastikan MongoDB running:
```bash
# Untuk MongoDB lokal
mongod

# Atau gunakan MongoDB Atlas (cloud)
# Update MONGODB_URI di .env.local
```

### 6. Run Development Server
```bash
npm run dev
```

Akses di `http://localhost:3000`

## Struktur Project

```
pln-payment-app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   └── login/
│   │   └── payment/
│   │       ├── check-bill/
│   │       ├── create-transaction/
│   │       └── callback/
│   ├── (auth)/                 # Auth pages group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Dashboard pages
│   ├── admin/                  # Admin panel
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   └── globals.css
├── components/                 # Reusable React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Card.jsx
│   └── ...
├── lib/                        # Utility functions
│   ├── db.js                   # MongoDB connection
│   ├── auth.js                 # Auth utilities
│   └── payment.js              # Payment utilities
├── models/                     # MongoDB schemas
│   ├── User.js
│   ├── Bill.js
│   └── Transaction.js
├── public/                     # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Development Tips

### 1. Testing Authentication
- Register akun baru di `/register`
- Login dengan akun tersebut di `/login`
- Token akan disimpan di cookie

### 2. Testing Payment (Midtrans Sandbox)
Gunakan kartu kredit test Midtrans:
```
Card Number: 4811111111111114
Exp: 12/25
CVV: 123
```

### 3. Database Connection Troubleshooting

**Error: MongooseError: Cannot connect**
```bash
# Pastikan MongoDB running
mongod

# Atau gunakan MongoDB Atlas
# Update MONGODB_URI ke connection string Anda
```

**Error: ECONNREFUSED**
- Pastikan MongoDB service berjalan
- Check MongoDB port (default: 27017)

### 4. Environment Variables Issues

Jika perubahan `.env.local` tidak terdeteksi:
```bash
# Stop development server
# Delete .next folder
rm -rf .next

# Restart
npm run dev
```

### 5. API Testing dengan cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Check Bill:**
```bash
curl "http://localhost:3000/api/payment/check-bill?customerId=12345678" \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

## Next Steps

1. **Buat halaman login**: `app/(auth)/login/page.js`
2. **Buat halaman register**: `app/(auth)/register/page.js`
3. **Buat dashboard**: `app/(dashboard)/layout.js` & `page.js`
4. **Implementasi payment flow**
5. **Admin dashboard**
6. **Testing & deployment**

## Deployment

### Deploy ke Vercel
```bash
# Login ke Vercel
npx vercel login

# Deploy
npx vercel
```

### Deploy ke Cloud Run (GCP)
```bash
# Setup gcloud
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy pln-payment-app \
  --source . \
  --platform managed \
  --region asia-southeast1
```

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Midtrans Documentation](https://docs.midtrans.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Troubleshooting

### Issue: Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: Midtrans payment not working
- Pastikan MIDTRANS_SERVER_KEY dan CLIENT_KEY benar
- Check Midtrans dashboard untuk lebih detail error

## Contact & Support

Jika ada pertanyaan atau issues, buat GitHub Issue di repository ini.
