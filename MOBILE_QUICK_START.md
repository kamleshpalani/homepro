# 🚀 HomePro Mobile - Quick Start Commands

## ✅ What's Already Done:

- ✅ Production backend URL configured (`https://homeprobackend.vercel.app`)
- ✅ `eas.json` build configuration created
- ✅ `app.json` updated with iOS/Android settings
- ✅ Asset requirements documented

---

## 📋 Next Steps (In Order):

### 1️⃣ Install EAS CLI (One-time)

```bash
npm install -g eas-cli
```

### 2️⃣ Login to Expo

```bash
eas login
```

_Create account at https://expo.dev/signup if needed_

### 3️⃣ Initialize Project

```bash
cd c:\Users\LENOVO\homecarepro\homepro\frontend\mobile-app
eas init
```

### 4️⃣ Add App Icons

- See: `frontend/mobile-app/assets/README.md`
- Required files:
  - `icon.png` (1024x1024)
  - `splash.png` (1284x2778)
  - `adaptive-icon.png` (1024x1024)
  - `favicon.png` (48x48)

**Quick Option**: Use AI to generate:

```
Prompt: "Professional app icon for HomePro home cleaning service.
Emerald green (#10b981) with house and sparkle elements.
Minimalist flat design, 1024x1024px, transparent background"
```

### 5️⃣ Build Preview (Test Build)

```bash
eas build --profile preview --platform android
```

_Builds APK for testing (~20 minutes)_

### 6️⃣ Test on Device

- Download APK from EAS dashboard
- Install on Android device
- Test all features

### 7️⃣ Build Production

```bash
eas build --profile production --platform all
```

_Builds for both iOS (.ipa) and Android (.aab)_

---

## 📱 Platform-Specific Setup

### iOS (Before Production Build):

1. Apple Developer Account: https://developer.apple.com ($99/year)
2. Create app in App Store Connect
3. Get these values:
   - App Store Connect App ID
   - Apple Team ID
4. Update `eas.json` with IDs

### Android (Before Production Build):

1. Google Play Console: https://play.google.com/console ($25 one-time)
2. Create app listing
3. Generate service account key
4. Save as `google-service-account.json`

---

## 🔧 Useful Commands

### Check Build Status

```bash
eas build:list
```

### View Project Info

```bash
eas project:info
```

### Manage Credentials

```bash
eas credentials
```

### Submit to Stores

```bash
# iOS (after build)
eas submit --platform ios --latest

# Android (after build)
eas submit --platform android --latest
```

### Over-the-Air Updates (Minor changes)

```bash
eas update --branch production --message "Bug fixes"
```

---

## 📊 Cost Breakdown

| Service               | Cost     | When                        |
| --------------------- | -------- | --------------------------- |
| Expo EAS (Free tier)  | $0       | 15 builds/month             |
| Expo EAS (Production) | $29/mo   | Unlimited builds (optional) |
| Apple Developer       | $99/year | Before iOS build            |
| Google Play           | $25 once | Before Android submission   |

**Total to start**: $0 (can test with free tier)

---

## ⚡ Quick Test Flow

### For Immediate Testing (No store accounts needed):

```bash
# 1. Login
eas login

# 2. Initialize
cd frontend/mobile-app
eas init

# 3. Build Android APK
eas build --profile preview --platform android

# 4. Wait ~20 minutes

# 5. Download and install on Android device
```

---

## 📖 Full Documentation

Detailed guide: [MOBILE_DEPLOYMENT_GUIDE.md](MOBILE_DEPLOYMENT_GUIDE.md)

---

## 🆘 Troubleshooting

### Build fails?

```bash
eas build:inspect --profile preview --platform android
```

### Credentials issues?

```bash
eas credentials --platform ios
```

### Need help?

- Expo Forums: https://forums.expo.dev
- Discord: https://chat.expo.dev
- Docs: https://docs.expo.dev

---

## ✅ Pre-Build Checklist

- [ ] EAS CLI installed globally
- [ ] Expo account created and logged in
- [ ] Project initialized with `eas init`
- [ ] App icons added to `assets/` folder
- [ ] Backend API tested at https://homeprobackend.vercel.app
- [ ] `.env` has production URL

**Ready to build?**

```bash
eas build --profile preview --platform android
```

🎉 **You're all set! Start with the preview build to test everything.**
