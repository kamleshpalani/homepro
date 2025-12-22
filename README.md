# HomeCarePro – Cleaning Service Platform

HomeCarePro is a full-stack web application for managing home cleaning service bookings.
It includes a customer booking form, admin dashboard, cleaner registration, and secure authentication.

## 🚀 Deploy from GitHub to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kamleshpalani/homepro)

### 📖 Deployment Guides

**Web Deployment:**

- 🚀 [START_HERE.md](START_HERE.md) - Overview & quick links
- 📋 [GITHUB_VERCEL_DEPLOYMENT.md](GITHUB_VERCEL_DEPLOYMENT.md) - Complete guide (30 min)
- ✅ [DEPLOYMENT_QUICK_CHECKLIST.md](DEPLOYMENT_QUICK_CHECKLIST.md) - Printable checklist

**Mobile Deployment:**

- 📱 [MOBILE_DEPLOYMENT_GUIDE.md](MOBILE_DEPLOYMENT_GUIDE.md) - iOS & Android deployment

**More Resources:**

- 📚 [Full Technical Guide](VERCEL_DEPLOYMENT.md) - Detailed documentation
- 🏗️ [Architecture Overview](ARCHITECTURE.md) - System design
- ⚡ [Quick Start](QUICK_START.md) - 5-minute overview

## Technologies Used

### Frontend

- React (Vite)
- React Router DOM
- React Native (Expo) for Mobile App
- Tailwind / Custom CSS

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- CORS
- Vercel Serverless Functions (Production)

## Project Structure

```
homecarepro/
│
├── backend/                    # Express.js API
│   ├── api/
│   │   └── index.js           # Vercel serverless entry
│   ├── server.js              # Main Express app
│   ├── .env                   # Environment variables (local)
│   ├── vercel.json            # Vercel configuration
│   └── package.json
│
├── frontend/
│   ├── vite-project/          # React web app
│   │   ├── src/
│   │   ├── dist/              # Build output
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── mobile-app/            # React Native (Expo)
│       ├── src/
│       ├── App.tsx
│       └── package.json
│
├── vercel.json                # Root Vercel config
├── VERCEL_DEPLOYMENT.md       # Deployment guide
├── QUICK_START.md             # Quick deploy guide
└── README.md
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
ADMIN_EMAIL=admin@homecarepro.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=super_secret_key
NODE_ENV=development
```

Optional `.env` inside `frontend/vite-project/`:

```env
VITE_API_URL=http://localhost:4000
```

**📝 Note**: For production deployment, see [environment variables guide](VERCEL_DEPLOYMENT.md#environment-variables-setup)

## Running the Project Locally

### 1. Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:4000`

### 2. Frontend (Web)

```bash
cd frontend/vite-project
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Mobile App (Optional)

```bash
cd frontend/mobile-app
npm install
npm start
```

Follow Expo instructions to run on iOS/Android simulator or device.

Admin Login

Access admin login:

http://localhost:5173/admin/login

Credentials come from .env.

## Features

### Customer Features

- ✅ Book cleaning services
- ✅ View service details
- ✅ User authentication & profiles
- ✅ Booking history
- ✅ Fully responsive UI
- ✅ Mobile app support

### Admin Features

- ✅ Secure login using JWT
- ✅ View all bookings
- ✅ Update booking status
- ✅ Assign cleaners
- ✅ View registered cleaners
- ✅ Approve/reject cleaner applications
- ✅ Performance metrics

### Cleaner Features

- ✅ Public cleaner registration form
- ✅ Multi-step application process
- ✅ Profile management
- ✅ Cleaner data saved to MongoDB

## API Endpoints

### Auth

- `POST /api/admin/login` - Admin login
- `POST /api/auth/login` - Customer login
- `POST /api/auth/signup` - Customer registration
- `GET /api/auth/profile` - Get user profile

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all bookings (admin only)
- `PATCH /api/bookings/:id` - Update booking (admin only)

### Cleaners

- `POST /api/cleaners/apply` - Cleaner application (public)
- `POST /api/cleaners` - Add cleaner (admin only)
- `GET /api/cleaners` - List cleaners (admin only)
- `GET /api/admin/cleaners` - List with metrics (admin only)
- `PATCH /api/admin/cleaners/:id/status` - Approve/reject (admin only)

## Deployment

### 🚀 Vercel (Recommended)

**Quick Deploy:**

```bash
# Windows
deploy-to-vercel.bat

# Mac/Linux
chmod +x deploy-to-vercel.sh
./deploy-to-vercel.sh
```

**Or manually:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd ../frontend/vite-project
vercel --prod
```

📚 **Full Guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Other Platforms

**Frontend:**

- Vercel (Recommended)
- Netlify
- GitHub Pages

**Backend:**

- Vercel Serverless (Recommended)
- Render
- Railway
- DigitalOcean
- AWS EC2

**Mobile App:**

- Expo Application Services (EAS)
- App Store (iOS)
- Google Play Store (Android)

## 📚 Documentation

- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Complete deployment guide
- [QUICK_START.md](QUICK_START.md) - 5-minute deployment
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [DEPLOYMENT_CHANGES.md](DEPLOYMENT_CHANGES.md) - What changed for deployment

Contributing

Pull requests are welcome.
For major changes, open an issue first.

License

MIT License
