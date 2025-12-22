# 🚀 Quick Start - Deploy to Vercel

This is a simplified guide to get your HomeCare Pro app deployed to Vercel in minutes!

## ⚡ Quick Deploy (3 Steps)

### 1️⃣ Prepare Your Environment

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@homecarepro.com
ADMIN_PASSWORD=your_secure_password
```

### 2️⃣ Install Vercel CLI

```bash
npm install -g vercel
```

### 3️⃣ Deploy

**Option A: Use Deployment Script (Easiest)**

Windows:

```bash
deploy-to-vercel.bat
```

Mac/Linux:

```bash
chmod +x deploy-to-vercel.sh
./deploy-to-vercel.sh
```

**Option B: Manual Deployment**

Deploy Backend:

```bash
cd backend
vercel --prod
```

Deploy Frontend:

```bash
cd frontend/vite-project
vercel --prod
```

## ⚙️ Configure Environment Variables

After deployment, go to [Vercel Dashboard](https://vercel.com/dashboard) and add:

**Backend Project:**

- `MONGODB_URI` = Your MongoDB connection string
- `JWT_SECRET` = Your secret key
- `ADMIN_EMAIL` = admin@homecarepro.com
- `ADMIN_PASSWORD` = Your admin password
- `FRONTEND_URL` = Your frontend Vercel URL
- `NODE_ENV` = production

**Frontend Project:**

- `VITE_API_URL` = Your backend Vercel URL

## 🧪 Test Your Deployment

1. Visit your frontend URL
2. Try the booking form
3. Login as admin
4. Check if everything works!

## 📚 Need More Help?

Read the detailed guide: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

## ⚠️ Important Notes

- Mobile app cannot be deployed to Vercel (it's for mobile devices only)
- Update the mobile app's API URL after backend deployment
- Vercel free tier should be sufficient for testing
- Make sure MongoDB Atlas allows connections from `0.0.0.0/0`

## 🎯 What Was Changed for Deployment

We've made these changes to make your app Vercel-ready:

✅ Created `backend/api/index.js` for serverless functions  
✅ Updated `backend/server.js` to work with Vercel  
✅ Added `vercel.json` configuration files  
✅ Updated CORS to allow Vercel URLs  
✅ Added environment variable support  
✅ Created deployment scripts

**Your code is now ready to deploy! 🎉**
