# 🚀 Step-by-Step Deployment Guide for GitHub → Vercel

## Your Repository: https://github.com/kamleshpalani/homepro

Follow these exact steps to deploy your HomeCare Pro application to Vercel without errors.

---

## 📋 STEP 1: Prepare MongoDB Database (5 minutes)

### 1.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's free)
3. Verify your email

### 1.2 Create a Database Cluster

1. Click **"Build a Database"**
2. Choose **"Free"** tier (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose region closest to you
5. Click **"Create"**
6. Wait 3-5 minutes for cluster to be created

### 1.3 Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `homecarepro`
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT!**
6. User Privileges: **"Atlas Admin"**
7. Click **"Add User"**

### 1.4 Allow Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Confirm: **"0.0.0.0/0"** (This allows Vercel to connect)
5. Click **"Confirm"**

### 1.5 Get Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://homecarepro:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with the password you copied in step 1.3
6. **SAVE THIS** - You'll need it in Step 3!

---

## 📦 STEP 2: Deploy Backend to Vercel (10 minutes)

### 2.1 Create Vercel Account

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### 2.2 Import Your Repository

1. On Vercel Dashboard, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Find **"kamleshpalani/homepro"**
4. Click **"Import"**

### 2.3 Configure Backend Deployment

1. **Project Name**: `homecarepro-backend`
2. **Framework Preset**: Select **"Other"**
3. **Root Directory**: Click **"Edit"** → Select **"backend"** folder
4. **Build Command**: Leave EMPTY (no build needed)
5. **Output Directory**: Leave EMPTY
6. **Install Command**: `npm install` (default)

### 2.4 Add Environment Variables (CRITICAL!)

Click **"Environment Variables"** and add these ONE BY ONE:

| Name             | Value                                        |
| ---------------- | -------------------------------------------- |
| `MONGODB_URI`    | (Paste your connection string from Step 1.5) |
| `JWT_SECRET`     | `HomeCarePro2024SecureJWTSecretKey987654321` |
| `ADMIN_EMAIL`    | `admin@homecarepro.com`                      |
| `ADMIN_PASSWORD` | `Admin@123456`                               |
| `PORT`           | `4000`                                       |
| `NODE_ENV`       | `production`                                 |

**Note**: We'll add `FRONTEND_URL` after deploying the frontend.

### 2.5 Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Once complete, you'll see: ✅ **"Project deployed successfully"**
4. **COPY YOUR BACKEND URL** (e.g., `https://homecarepro-backend.vercel.app`)
5. **TEST IT**: Visit your backend URL - you should see:
   ```
   HomeCare Pro backend is running with MongoDB
   ```

---

## 🎨 STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Import Repository Again

1. On Vercel Dashboard, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Find **"kamleshpalani/homepro"** again
4. Click **"Import"**

### 3.2 Configure Frontend Deployment

1. **Project Name**: `homecarepro-frontend`
2. **Framework Preset**: Select **"Vite"**
3. **Root Directory**: Click **"Edit"** → Select **"frontend/vite-project"** folder
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 3.3 Add Environment Variable

Click **"Environment Variables"** and add:

| Name           | Value                                  |
| -------------- | -------------------------------------- |
| `VITE_API_URL` | (Paste your BACKEND URL from Step 2.5) |

Example: `https://homecarepro-backend.vercel.app`

### 3.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Once complete: ✅ **"Project deployed successfully"**
4. **COPY YOUR FRONTEND URL** (e.g., `https://homecarepro-frontend.vercel.app`)

---

## 🔗 STEP 4: Connect Backend & Frontend (2 minutes)

### 4.1 Update Backend Environment Variables

1. Go to Vercel Dashboard
2. Select your **BACKEND project** (`homecarepro-backend`)
3. Go to **"Settings"** → **"Environment Variables"**
4. Click **"Add New"**
5. Add:
   - **Name**: `FRONTEND_URL`
   - **Value**: (Your frontend URL from Step 3.4)
   - Example: `https://homecarepro-frontend.vercel.app`
6. Click **"Save"**

### 4.2 Redeploy Backend

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm
6. Wait 1-2 minutes

---

## ✅ STEP 5: Test Your Deployment (5 minutes)

### 5.1 Test Backend

1. Visit your backend URL: `https://your-backend.vercel.app`
2. You should see: `HomeCare Pro backend is running with MongoDB`
3. If you see an error, check MongoDB connection string

### 5.2 Test Frontend

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Page should load with no errors
3. Open browser console (F12) - check for errors

### 5.3 Test Admin Login

1. On frontend, go to: `/admin/login`
2. Login with:
   - **Email**: `admin@homecarepro.com`
   - **Password**: `Admin@123456`
3. You should see the admin dashboard

### 5.4 Test Booking Form

1. Go to the booking page
2. Fill out a test booking
3. Submit the form
4. Check admin dashboard - booking should appear

### 5.5 Test Cleaner Application

1. Go to cleaner application form
2. Fill out and submit
3. Check admin cleaners page - application should appear

---

## 🎉 SUCCESS! Your App is Live!

**Your URLs:**

- Frontend: `https://homecarepro-frontend.vercel.app`
- Backend: `https://homecarepro-backend.vercel.app`

**Admin Login:**

- Email: `admin@homecarepro.com`
- Password: `Admin@123456`

---

## 🐛 Troubleshooting Common Errors

### Error: "Cannot connect to MongoDB"

**Solution:**

1. Go to MongoDB Atlas → Network Access
2. Ensure `0.0.0.0/0` is allowed
3. Check your connection string has the correct password
4. Verify database user was created

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solution:**

1. Go to backend project → Settings → Environment Variables
2. Check `FRONTEND_URL` is set correctly
3. Redeploy backend

### Error: "Failed to fetch" or API calls failing

**Solution:**

1. Go to frontend project → Settings → Environment Variables
2. Check `VITE_API_URL` is set correctly
3. Must match your backend URL exactly
4. Redeploy frontend

### Error: "Admin login failed"

**Solution:**

1. Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in backend env vars
2. Make sure they match what you're typing
3. Passwords are case-sensitive

### Error: "Build failed" on frontend

**Solution:**

1. Go to frontend deployment logs
2. Look for specific error
3. Common fix: Make sure root directory is `frontend/vite-project`

### Error: "Build failed" on backend

**Solution:**

1. Check root directory is `backend`
2. Make sure all environment variables are set
3. Check deployment logs for specific error

---

## 📞 Need More Help?

### Check Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on latest deployment
4. Click **"Function Logs"** or **"Build Logs"**
5. Look for errors

### MongoDB Connection Issues

1. MongoDB Atlas → Database Access → Check user exists
2. MongoDB Atlas → Network Access → Check 0.0.0.0/0 is allowed
3. Test connection string locally first

### Still Having Issues?

1. Read [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed troubleshooting
2. Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Vercel Docs: https://vercel.com/docs
4. MongoDB Docs: https://docs.mongodb.com

---

## 🎯 Quick Commands for Future Updates

```bash
# Update code
git add .
git commit -m "Your changes"
git push origin main

# Vercel will auto-deploy! 🚀
```

---

## 💡 Pro Tips

1. **Custom Domain**: Go to Project Settings → Domains to add your own domain
2. **Monitoring**: Check Vercel Analytics to see traffic
3. **Rollback**: If something breaks, click "Redeploy" on a previous successful deployment
4. **Environment Variables**: Never commit `.env` files - always use Vercel dashboard
5. **Preview Deployments**: Every git branch gets its own preview URL

---

**You're all set! 🎉**

Your app should now be live and working. If you encounter any issues, follow the troubleshooting section above.

**Share your app:**

- Frontend: `https://homecarepro-frontend.vercel.app`
- Backend API: `https://homecarepro-backend.vercel.app`

Happy deploying! 🚀
