# 🚀 GitHub → Vercel: Complete Deployment Guide

## Your Repository

**GitHub URL:** https://github.com/kamleshpalani/homepro

## 📖 Choose Your Guide

### 🎯 Quick Deploy (Recommended)

**[GITHUB_VERCEL_DEPLOYMENT.md](GITHUB_VERCEL_DEPLOYMENT.md)** - Step-by-step with screenshots

- **Time:** 30 minutes
- **Method:** GitHub → Vercel (auto-deploy)
- **Best for:** First-time deployment

### ✅ Checklist

**[DEPLOYMENT_QUICK_CHECKLIST.md](DEPLOYMENT_QUICK_CHECKLIST.md)** - Printable checklist

- **Use this:** While following the guide above
- **Print it:** Check off each step

### 📚 Detailed Documentation

**[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Full technical guide

- **Use this:** For troubleshooting
- **Reference:** Detailed explanations

---

## ⚡ Quick Start (3 Steps)

### Step 1: MongoDB Setup (5 min)

1. Go to https://mongodb.com/cloud/atlas/register
2. Create free cluster
3. Create user + password
4. Allow IP: `0.0.0.0/0`
5. Copy connection string

### Step 2: Deploy Backend (10 min)

1. Go to https://vercel.com
2. Import: `kamleshpalani/homepro`
3. Root: `backend`
4. Add environment variables (see checklist)
5. Deploy!

### Step 3: Deploy Frontend (5 min)

1. Import same repo again
2. Root: `frontend/vite-project`
3. Add: `VITE_API_URL`
4. Deploy!

---

## 🔐 Environment Variables Needed

### Backend (6 variables)

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
JWT_SECRET=HomeCarePro2024SecureJWTSecretKey987654321
ADMIN_EMAIL=admin@homecarepro.com
ADMIN_PASSWORD=Admin@123456
PORT=4000
NODE_ENV=production
FRONTEND_URL=(add after frontend deployed)
```

### Frontend (1 variable)

```
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🧪 Test Your Deployment

After deployment, test these:

1. **Backend:** Visit backend URL → Should show success message
2. **Frontend:** Visit frontend URL → Page loads
3. **Admin:** Login at `/admin/login` with credentials above
4. **Booking:** Submit test booking → Appears in dashboard
5. **Cleaner:** Submit application → Appears in admin

---

## 🐛 Common Errors & Quick Fixes

| Error                       | Quick Fix                                 |
| --------------------------- | ----------------------------------------- |
| "Cannot connect to MongoDB" | Check MongoDB IP whitelist: `0.0.0.0/0`   |
| "CORS error"                | Add `FRONTEND_URL` to backend env vars    |
| "API calls fail"            | Check `VITE_API_URL` in frontend          |
| "Admin login fails"         | Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` |
| "Build failed"              | Check root directory selection            |

---

## 📞 Help & Resources

- **Main Guide:** [GITHUB_VERCEL_DEPLOYMENT.md](GITHUB_VERCEL_DEPLOYMENT.md)
- **Checklist:** [DEPLOYMENT_QUICK_CHECKLIST.md](DEPLOYMENT_QUICK_CHECKLIST.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com

---

## 💡 Pro Tips

1. **Auto-Deploy:** Once connected, every GitHub push auto-deploys
2. **Preview URLs:** Each branch gets its own preview URL
3. **Rollback:** Easy rollback to previous deployment
4. **Custom Domain:** Add your own domain in project settings
5. **Monitoring:** Check Vercel Analytics for traffic stats

---

## ✅ Success Checklist

- [ ] MongoDB database created and configured
- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Both projects connected (FRONTEND_URL added)
- [ ] Admin login works
- [ ] Booking form works
- [ ] Cleaner application works
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

---

## 🎉 After Deployment

**Your Live App:**

- Frontend: `https://homecarepro-frontend.vercel.app`
- Backend: `https://homecarepro-backend.vercel.app`

**Admin Access:**

- Email: `admin@homecarepro.com`
- Password: `Admin@123456`

**Future Updates:**

```bash
git push origin main  # Vercel auto-deploys! 🚀
```

---

**Ready to deploy?**

Start here: **[GITHUB_VERCEL_DEPLOYMENT.md](GITHUB_VERCEL_DEPLOYMENT.md)**

Good luck! 🚀
