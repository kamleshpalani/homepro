# ✅ Quick Deployment Checklist

Use this as a quick reference while deploying from GitHub to Vercel.

---

## 🗄️ MongoDB Setup (5 min)

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user with password
- [ ] Saved username: ******\_\_\_\_******
- [ ] Saved password: ******\_\_\_\_******
- [ ] Added IP address: `0.0.0.0/0` (Allow from Anywhere)
- [ ] Copied connection string
- [ ] Replaced `<password>` in connection string

**My Connection String:**

```
mongodb+srv://________________________
```

---

## 🔧 Backend Deployment (10 min)

- [ ] Created Vercel account (with GitHub)
- [ ] Imported repository: `kamleshpalani/homepro`
- [ ] Set project name: `homecarepro-backend`
- [ ] Selected root directory: `backend`
- [ ] Framework: "Other"
- [ ] Build command: (empty)
- [ ] Added environment variables:
  - [ ] `MONGODB_URI` = (my connection string)
  - [ ] `JWT_SECRET` = `HomeCarePro2024SecureJWTSecretKey987654321`
  - [ ] `ADMIN_EMAIL` = `admin@homecarepro.com`
  - [ ] `ADMIN_PASSWORD` = `Admin@123456`
  - [ ] `PORT` = `4000`
  - [ ] `NODE_ENV` = `production`
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded ✅
- [ ] Tested backend URL - shows success message

**My Backend URL:**

```
https://________________________________
```

---

## 🎨 Frontend Deployment (5 min)

- [ ] Imported repository again: `kamleshpalani/homepro`
- [ ] Set project name: `homecarepro-frontend`
- [ ] Selected root directory: `frontend/vite-project`
- [ ] Framework: "Vite"
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Added environment variable:
  - [ ] `VITE_API_URL` = (my backend URL)
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded ✅
- [ ] Frontend loads without errors

**My Frontend URL:**

```
https://________________________________
```

---

## 🔗 Connect Projects (2 min)

- [ ] Went to backend project settings
- [ ] Added environment variable:
  - [ ] `FRONTEND_URL` = (my frontend URL)
- [ ] Redeployed backend
- [ ] Backend redeployment succeeded ✅

---

## 🧪 Testing (5 min)

- [ ] Backend URL shows: "HomeCare Pro backend is running"
- [ ] Frontend loads correctly
- [ ] No console errors (checked F12)
- [ ] Admin login works:
  - Email: `admin@homecarepro.com`
  - Password: `Admin@123456`
- [ ] Can see admin dashboard
- [ ] Can create test booking
- [ ] Booking appears in admin dashboard
- [ ] Can submit cleaner application
- [ ] Application appears in admin cleaners list

---

## ✅ Deployment Complete!

**My Live URLs:**

Frontend: https://**************\_\_\_\_**************

Backend: https://**************\_\_\_\_**************

**Admin Credentials:**

- Email: `admin@homecarepro.com`
- Password: `Admin@123456`

**Date Deployed:** ******\_\_\_\_******

---

## 📝 Notes

Issues encountered:

---

Solutions applied:

---

---

## 🔄 For Future Updates

Just push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel auto-deploys! 🚀

---

**Status: [ ] DEPLOYED [ ] TESTED [ ] LIVE**
