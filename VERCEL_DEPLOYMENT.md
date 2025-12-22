# 🚀 Vercel Deployment Guide for HomeCare Pro

This guide will help you deploy the HomeCare Pro application (backend + frontend) to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **GitHub Repository**: Push your code to GitHub (recommended for automatic deployments)
4. **Vercel CLI** (optional): `npm install -g vercel`

## 🏗️ Project Structure

```
homepro/
├── backend/              # Express.js API (Serverless Functions)
│   ├── api/
│   │   └── index.js     # Vercel serverless entry point
│   ├── server.js        # Main Express app
│   ├── package.json
│   └── vercel.json      # Backend Vercel configuration
├── frontend/
│   └── vite-project/    # React + Vite frontend
│       ├── src/
│       ├── package.json
│       └── .env.example
└── vercel.json          # Root Vercel configuration
```

## 🔐 Environment Variables Setup

### Backend Environment Variables (Required)

Set these in your Vercel project settings:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homecarepro?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secure-random-jwt-secret-key-here
ADMIN_EMAIL=admin@homecarepro.com
ADMIN_PASSWORD=your-secure-admin-password

# Server Config
PORT=4000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables

```bash
VITE_API_URL=https://your-backend-url.vercel.app
```

## 📦 Deployment Methods

### Method 1: Deploy via Vercel CLI (Recommended for Testing)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy Backend**:

   ```bash
   cd backend
   vercel --prod
   ```

   During deployment:

   - Select your Vercel account
   - Choose project name: `homecarepro-backend`
   - Accept default settings
   - **IMPORTANT**: Add environment variables in Vercel dashboard

4. **Deploy Frontend**:

   ```bash
   cd ../frontend/vite-project
   vercel --prod
   ```

   During deployment:

   - Select your Vercel account
   - Choose project name: `homecarepro-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add `VITE_API_URL` environment variable with your backend URL

### Method 2: Deploy via GitHub (Recommended for Production)

1. **Push Code to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy Backend**:

   - Go to [vercel.com](https://vercel.com/new)
   - Import your GitHub repository
   - Select **Backend** as root directory: `backend`
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Add all backend environment variables
   - Click **Deploy**

3. **Deploy Frontend**:

   - Go to [vercel.com](https://vercel.com/new)
   - Import the same GitHub repository again
   - Select **Frontend** as root directory: `frontend/vite-project`
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add frontend environment variables
   - Click **Deploy**

4. **Connect Projects**:
   - Copy your **backend URL** from Vercel (e.g., `https://homecarepro-backend.vercel.app`)
   - Add it as `VITE_API_URL` in your **frontend** environment variables
   - Redeploy frontend
   - Copy your **frontend URL** and add it as `FRONTEND_URL` in your **backend** environment variables
   - Redeploy backend

## 🔧 Configuration Details

### Backend Configuration

The backend uses Vercel's serverless functions. Key changes made:

1. **Created** [`backend/api/index.js`](backend/api/index.js) - Serverless wrapper
2. **Modified** [`backend/server.js`](backend/server.js):
   - Conditional server start (doesn't start in production)
   - Exports Express app for serverless
   - Dynamic CORS for Vercel URLs
3. **Created** [`backend/vercel.json`](backend/vercel.json) - Routes configuration

### Frontend Configuration

The frontend is built as static files and served via Vercel CDN:

1. **Created** [`frontend/vite-project/src/config.js`](frontend/vite-project/src/config.js) - API URL configuration
2. **Updated** build scripts in package.json
3. API calls use environment-based URL

## 🧪 Testing Your Deployment

### Test Backend API:

```bash
curl https://your-backend-url.vercel.app/
# Should return: "HomeCare Pro backend is running with MongoDB"

curl https://your-backend-url.vercel.app/api/cleaners \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Test Frontend:

1. Visit your frontend URL: `https://your-frontend-url.vercel.app`
2. Try logging in as admin
3. Test booking form
4. Check browser console for any API errors

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Cannot connect to MongoDB"

- **Solution**: Check your `MONGODB_URI` in Vercel environment variables
- Ensure MongoDB Atlas allows connections from `0.0.0.0/0` (or Vercel IPs)

**Problem**: "CORS error"

- **Solution**: Add your frontend URL to `FRONTEND_URL` environment variable
- Redeploy backend after adding the variable

**Problem**: "Function execution timeout"

- **Solution**: Optimize database queries or upgrade to Vercel Pro for longer timeouts

### Frontend Issues

**Problem**: "API calls failing"

- **Solution**: Check `VITE_API_URL` environment variable
- Ensure it points to your backend URL
- Check browser console for exact error

**Problem**: "Build failed"

- **Solution**: Run `npm install` and `npm run build` locally first
- Fix any TypeScript/ESLint errors
- Check build logs in Vercel dashboard

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically:

- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Rolls back on deployment failures

## 📱 Mobile App Configuration

The React Native/Expo mobile app **cannot be deployed to Vercel**. Instead:

1. **Update API URL** in [`frontend/mobile-app/src/api/client.ts`](frontend/mobile-app/src/api/client.ts):

   ```typescript
   const API_URL = "https://your-backend-url.vercel.app";
   ```

2. **Test locally** with Expo:

   ```bash
   cd frontend/mobile-app
   npm start
   ```

3. **Build for production**:
   - Android: `expo build:android` or use EAS Build
   - iOS: `expo build:ios` or use EAS Build

## 📊 Monitoring

Monitor your deployments:

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Function Logs**: Check logs for serverless functions
- **Analytics**: View traffic and performance metrics

## 🔐 Security Checklist

- [ ] Use strong `JWT_SECRET` (at least 32 characters)
- [ ] Use strong `ADMIN_PASSWORD`
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS only (Vercel provides this by default)
- [ ] Review and limit CORS origins in production
- [ ] Regularly update dependencies

## 💰 Cost Considerations

**Vercel Free Tier Includes**:

- 100GB bandwidth/month
- Unlimited serverless function invocations (with fair use)
- Automatic HTTPS
- Unlimited preview deployments

**When to Upgrade**:

- Need more bandwidth
- Need longer function execution times
- Need team collaboration features
- Need custom domains

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Docs**: [docs.mongodb.com](https://docs.mongodb.com)
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)

## 🎉 Next Steps

After successful deployment:

1. Set up custom domain (optional)
2. Configure email service for notifications
3. Set up error tracking (e.g., Sentry)
4. Configure analytics (e.g., Google Analytics)
5. Set up monitoring and alerts
6. Create backup strategy for MongoDB

---

**Happy Deploying! 🚀**
