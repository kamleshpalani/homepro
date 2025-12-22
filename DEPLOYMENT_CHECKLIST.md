# ✅ Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## 📋 Pre-Deployment Checklist

### MongoDB Setup

- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (allow `0.0.0.0/0` for Vercel)
- [ ] Connection string copied
- [ ] Test connection locally

### Local Development Testing

- [ ] Backend runs without errors (`npm start`)
- [ ] Frontend runs without errors (`npm run dev`)
- [ ] Can login as admin
- [ ] Can create bookings
- [ ] Can submit cleaner applications
- [ ] All API endpoints working
- [ ] MongoDB connection works

### Environment Variables Prepared

- [ ] `MONGODB_URI` ready
- [ ] `JWT_SECRET` generated (32+ characters)
- [ ] `ADMIN_EMAIL` set
- [ ] `ADMIN_PASSWORD` set (strong password)
- [ ] All values tested locally

### Code Repository

- [ ] Code committed to Git
- [ ] `.env` files NOT committed (in `.gitignore`)
- [ ] `.vercel` folder NOT committed
- [ ] Pushed to GitHub (recommended)
- [ ] No sensitive data in code

## 🚀 Backend Deployment Checklist

### Vercel Setup

- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged in to Vercel CLI (`vercel login`)

### Backend Deployment

- [ ] Navigate to `backend` directory
- [ ] Run `vercel --prod`
- [ ] Backend URL copied (e.g., `homecarepro-backend.vercel.app`)
- [ ] Deployment successful (no errors)

### Backend Environment Variables

Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables

- [ ] `MONGODB_URI` added
- [ ] `JWT_SECRET` added
- [ ] `ADMIN_EMAIL` added
- [ ] `ADMIN_PASSWORD` added
- [ ] `PORT` = `4000`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = (will add after frontend deployment)
- [ ] All variables saved
- [ ] Project redeployed after adding variables

### Backend Testing

- [ ] Visit backend URL (should show "HomeCare Pro backend is running")
- [ ] Test health endpoint: `https://your-backend.vercel.app/`
- [ ] Check function logs in Vercel dashboard
- [ ] No errors in logs

## 🎨 Frontend Deployment Checklist

### Frontend Deployment

- [ ] Navigate to `frontend/vite-project` directory
- [ ] Run `npm run build` locally (test build)
- [ ] Build succeeds with no errors
- [ ] Run `vercel --prod`
- [ ] Frontend URL copied (e.g., `homecarepro.vercel.app`)
- [ ] Deployment successful (no errors)

### Frontend Environment Variables

Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables

- [ ] `VITE_API_URL` = your backend URL
- [ ] Variable saved
- [ ] Project redeployed after adding variable

### Frontend Testing

- [ ] Visit frontend URL
- [ ] Page loads correctly
- [ ] No console errors (check browser DevTools)
- [ ] CSS styles loading correctly
- [ ] Navigation works

## 🔗 Connection & Integration

### Backend ↔ Frontend Connection

- [ ] Add `FRONTEND_URL` to backend environment variables
- [ ] Value = your frontend URL
- [ ] Redeploy backend
- [ ] Test API calls from frontend
- [ ] No CORS errors

### API Testing

- [ ] Can access login page
- [ ] Can login as admin (use credentials from env vars)
- [ ] Can view bookings page
- [ ] Can create a test booking
- [ ] Booking appears in admin dashboard
- [ ] Can submit cleaner application
- [ ] Application appears in admin cleaners list

## 📱 Mobile App Update (Optional)

If you're using the mobile app:

- [ ] Navigate to `frontend/mobile-app/src/api/client.ts`
- [ ] Update `API_URL` to production backend URL
- [ ] Test mobile app with production API
- [ ] Mobile app connects successfully
- [ ] All features work

## 🔐 Security Checklist

- [ ] `.env` files NOT committed to Git
- [ ] Strong `JWT_SECRET` (32+ random characters)
- [ ] Strong `ADMIN_PASSWORD`
- [ ] MongoDB authentication enabled
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS configured correctly
- [ ] No API keys in frontend code
- [ ] No sensitive data in logs

## 📊 Post-Deployment Verification

### Functional Testing

- [ ] Visit frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test booking form submission
- [ ] Test admin login
- [ ] Test admin booking management
- [ ] Test cleaner application form
- [ ] Test cleaner approval workflow

### Performance Testing

- [ ] Page load speed < 3 seconds
- [ ] API response time < 1 second
- [ ] No JavaScript errors
- [ ] No broken images or links
- [ ] Mobile responsive design works

### Monitoring Setup

- [ ] Check Vercel Analytics dashboard
- [ ] Enable email notifications for failures
- [ ] Monitor function logs regularly
- [ ] Set up error tracking (optional: Sentry)

## 🎯 Production Readiness

- [ ] Custom domain configured (optional)
- [ ] Email notifications set up (optional)
- [ ] Backup strategy for MongoDB
- [ ] Team access configured (if applicable)
- [ ] Documentation updated
- [ ] User guide created (if needed)

## 🐛 Troubleshooting

### If Backend Fails

- [ ] Check MongoDB connection string
- [ ] Verify all environment variables are set
- [ ] Check function logs in Vercel dashboard
- [ ] Ensure MongoDB allows Vercel IPs

### If Frontend Fails

- [ ] Check build logs
- [ ] Verify `VITE_API_URL` is correct
- [ ] Check browser console for errors
- [ ] Ensure API endpoints are accessible

### If API Calls Fail

- [ ] Check CORS configuration
- [ ] Verify `FRONTEND_URL` in backend env vars
- [ ] Check network tab in browser DevTools
- [ ] Verify JWT token is being sent

## 📞 Need Help?

- [ ] Read [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- [ ] Check [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Review Vercel documentation
- [ ] Check MongoDB Atlas documentation
- [ ] Join Vercel Discord community

## 🎉 Success Indicators

Your deployment is successful when:

✅ Backend URL returns success message  
✅ Frontend loads without errors  
✅ Can login as admin  
✅ Can create and view bookings  
✅ Can submit cleaner applications  
✅ No errors in Vercel function logs  
✅ MongoDB connections are stable  
✅ CORS working correctly  
✅ All features functional

---

**Congratulations! Your app is now live! 🎉**

Share your deployed URL:

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.vercel.app

Don't forget to:

- [ ] Test all features one more time
- [ ] Announce your launch! 🚀
- [ ] Gather user feedback
- [ ] Monitor logs regularly
- [ ] Keep dependencies updated

**Pro Tip**: Save this checklist and use it for future deployments or updates!
