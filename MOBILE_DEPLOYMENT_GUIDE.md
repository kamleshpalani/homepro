# 📱 HomePro Mobile App - Production Deployment Guide

## 🎯 Overview

This guide will walk you through deploying the HomePro mobile app to the Apple App Store and Google Play Store using Expo Application Services (EAS).

---

## ✅ Completed Setup

- ✅ Production backend URL configured: `https://homeprobackend.vercel.app`
- ✅ EAS build configuration created (`eas.json`)
- ✅ App metadata updated (`app.json`)
- ✅ iOS and Android configurations set

---

## 📋 Prerequisites

### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

### 2. Create Expo Account

```bash
eas login
```

Or sign up at: https://expo.dev/signup

### 3. Apple Developer Account (for iOS)

- **Cost**: $99/year
- **Sign up**: https://developer.apple.com/programs/
- **Requirements**: Valid payment method, Apple ID

### 4. Google Play Console Account (for Android)

- **Cost**: $25 one-time fee
- **Sign up**: https://play.google.com/console/signup
- **Requirements**: Valid payment method, Google account

---

## 🚀 Step-by-Step Deployment

### Phase 1: App Icons & Splash Screens

#### Required Assets:

Create the following images in `frontend/mobile-app/assets/`:

**1. App Icon** (`icon.png`)

- Size: **1024x1024 px**
- Format: PNG with transparency
- No rounded corners (handled automatically)
- Download template: Use Figma/Canva or hire designer

**2. Adaptive Icon** (Android) (`adaptive-icon.png`)

- Size: **1024x1024 px**
- Format: PNG
- Keep important content in center 512x512px area

**3. Splash Screen** (`splash.png`)

- Size: **1284x2778 px** (iPhone 13 Pro Max resolution)
- Format: PNG
- Background color: `#10b981` (emerald green)

**4. Favicon** (Web) (`favicon.png`)

- Size: **48x48 px**
- Format: PNG

#### Quick Asset Creation:

**Option A - Use Expo's Icon Generator:**

```bash
cd frontend/mobile-app
npx expo-icon-generator generate-icons
```

**Option B - DIY with Online Tools:**

1. Create logo at https://www.canva.com
2. Resize at https://www.iloveimg.com/resize-image
3. Generate all sizes at https://www.appicon.co/

**Option C - Use AI:**
Prompt for DALL-E/Midjourney:

```
"Professional app icon for home cleaning service app called HomePro.
Modern, clean design with house and sparkle elements.
Emerald green (#10b981) and white colors.
Minimalist, flat design, 1024x1024px"
```

---

### Phase 2: EAS Project Setup

#### 1. Initialize EAS Project

```bash
cd frontend/mobile-app
eas init
```

This will:

- Create an Expo project in your account
- Add `projectId` to `app.json`
- Link your local project to EAS

#### 2. Configure EAS Project

```bash
eas project:info
```

Verify project details are correct.

---

### Phase 3: Build Configuration

#### 1. Review Build Profiles

Your `eas.json` has three profiles:

**Development**: For testing with Expo Go

```bash
eas build --profile development --platform ios
```

**Preview**: Internal testing (TestFlight/Internal Testing)

```bash
eas build --profile preview --platform all
```

**Production**: App store release

```bash
eas build --profile production --platform all
```

#### 2. Update iOS Bundle Identifier (if needed)

In `app.json`, the bundle ID is set to: `com.homepro.mobile`

To change it:

1. Open `app.json`
2. Update `ios.bundleIdentifier`
3. Update `android.package` to match

---

### Phase 4: iOS Setup

#### 1. Create App Store Connect App

1. Go to https://appstoreconnect.apple.com
2. Click **My Apps** → **+** → **New App**
3. Fill in details:
   - **Platform**: iOS
   - **Name**: HomePro
   - **Primary Language**: English
   - **Bundle ID**: com.homepro.mobile (must match app.json)
   - **SKU**: homepro-mobile-001

#### 2. Update EAS Configuration

Edit `eas.json` submit section:

```json
"ios": {
  "appleId": "your-apple-id@example.com",
  "ascAppId": "1234567890",
  "appleTeamId": "ABCD123456"
}
```

Get these values:

- **ascAppId**: From App Store Connect URL (after creating app)
- **appleTeamId**: https://developer.apple.com/account → Membership

#### 3. Generate iOS Credentials

```bash
eas credentials
```

Select:

- **iOS** → **Production** → **Generate new credentials**

EAS will create:

- Distribution certificate
- Provisioning profile
- Push notification key

---

### Phase 5: Android Setup

#### 1. Create Google Play Console App

1. Go to https://play.google.com/console
2. Click **Create app**
3. Fill in details:
   - **App name**: HomePro
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free

#### 2. Generate Service Account Key

**In Google Cloud Console:**

1. Go to https://console.cloud.google.com
2. Select your project (or create new)
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **Service Account**
5. Name: `homepro-play-console`
6. Grant role: **Service Account User**
7. Click on created account → **Keys** → **Add Key** → **JSON**
8. Save as `google-service-account.json` in `frontend/mobile-app/`

**Grant Play Console Access:**

1. Back in Play Console
2. **Setup** → **API access**
3. Link project
4. Grant **Admin** access to service account

#### 3. Update .gitignore

Add to `.gitignore`:

```
google-service-account.json
```

---

### Phase 6: Build & Submit

#### 1. Build for Production

**Both platforms:**

```bash
cd frontend/mobile-app
eas build --profile production --platform all
```

**iOS only:**

```bash
eas build --profile production --platform ios
```

**Android only:**

```bash
eas build --profile production --platform android
```

Build time: **15-30 minutes** per platform

#### 2. Download Builds

Builds will be available at: https://expo.dev/accounts/[your-username]/projects/homepro-mobile/builds

Or download via CLI:

```bash
eas build:list
eas build:download [build-id]
```

#### 3. Test Builds

**iOS (TestFlight):**

```bash
eas submit --platform ios --latest
```

Then invite testers in App Store Connect → TestFlight

**Android (Internal Testing):**

```bash
eas submit --platform android --latest
```

---

### Phase 7: App Store Submission

#### iOS - App Store Connect

1. **App Information:**

   - Subtitle: "Professional Home Cleaning Services"
   - Category: Lifestyle
   - Content Rights: You own or have permission

2. **Pricing & Availability:**

   - Price: Free
   - Availability: All countries

3. **App Privacy:**

   - Data collection: Yes (email, name, phone, address)
   - Data usage: App functionality, customer support
   - Privacy Policy URL: Create and host privacy policy

4. **Screenshots** (Required):

   - 6.5" Display (iPhone 14 Pro Max): 1290 x 2796 px - 3 images minimum
   - 5.5" Display (iPhone 8 Plus): 1242 x 2208 px - 3 images minimum

5. **App Review Information:**

   - Demo account credentials (for app review team)
   - Notes: "This is a home cleaning service booking platform"

6. **Submit for Review**

**Review time**: 1-3 days typically

#### Android - Google Play Console

1. **Store Listing:**

   - Short description (80 chars): "Book professional home cleaning services easily"
   - Full description (4000 chars): Write detailed description
   - Screenshots:
     - Phone: 16:9 or 9:16 ratio, min 320px
     - Tablet (optional): 7" and 10"
     - Feature graphic: 1024 x 500 px

2. **Content Rating:**

   - Fill out questionnaire (expect "Everyone" rating)

3. **App Content:**

   - Privacy policy URL
   - Target audience: All ages
   - Ads: No (if you don't have ads)

4. **Release:**
   - Countries: Select all or specific
   - Production release

**Review time**: 1-7 days typically

---

## 🔄 Updates & Maintenance

### OTA (Over-The-Air) Updates

For minor updates (JS code changes), use Expo Updates:

```bash
eas update --branch production --message "Bug fixes"
```

No app store review needed for:

- Bug fixes
- Content updates
- UI tweaks

### New Builds

For native changes (dependencies, permissions):

```bash
eas build --profile production --platform all --auto-submit
```

This requires app store review.

---

## 📊 Monitoring & Analytics

### 1. Expo Dashboard

View:

- Build status
- Crash reports
- Update downloads

URL: https://expo.dev/accounts/[username]/projects/homepro-mobile

### 2. App Store Analytics

- Downloads
- Ratings & reviews
- Revenue (if applicable)

### 3. Google Play Console Analytics

- Installs
- User ratings
- Crash reports

---

## 💰 Cost Summary

| Item                    | Cost          | Frequency          |
| ----------------------- | ------------- | ------------------ |
| Apple Developer Account | $99           | Annual             |
| Google Play Console     | $25           | One-time           |
| Expo EAS (Free tier)    | $0            | -                  |
| Expo EAS (Production)   | $29-$99/month | Monthly (optional) |

**Free tier limits:**

- 15 builds/month (Development)
- 15 builds/month (Preview/Production combined)

---

## 🐛 Troubleshooting

### Build Fails

**iOS:**

```bash
eas build:inspect --profile production --platform ios
```

**Android:**

```bash
eas build:inspect --profile production --platform android
```

### Common Issues:

**1. Bundle ID already exists:**

- Change `ios.bundleIdentifier` in `app.json`

**2. Missing credentials:**

```bash
eas credentials --platform ios
```

**3. Build timeout:**

- Check package.json scripts
- Remove unused dependencies

### Get Help:

- Expo Forums: https://forums.expo.dev
- Discord: https://chat.expo.dev
- Docs: https://docs.expo.dev/build/introduction/

---

## ✅ Pre-Launch Checklist

- [ ] All assets created (icon, splash, screenshots)
- [ ] Privacy policy written and hosted
- [ ] Demo account created for app review
- [ ] Terms of service written (if applicable)
- [ ] Backend API tested and stable
- [ ] App tested on real devices
- [ ] Crash reporting configured
- [ ] Analytics set up
- [ ] Customer support email configured
- [ ] App Store listings written
- [ ] Keywords researched (ASO)
- [ ] Launch marketing planned

---

## 📞 Support

**Technical Issues:**

- Email: kamleshpalani@github (update with real email)
- GitHub Issues: https://github.com/kamleshpalani/homepro/issues

**App Store Rejections:**

- Review rejection reasons carefully
- Fix issues and resubmit
- Common rejections: Missing privacy policy, incomplete functionality

---

## 🎉 Launch Day

Once approved:

1. Monitor crash reports closely
2. Respond to user reviews
3. Track analytics
4. Plan first update based on feedback

**Congratulations on launching HomePro Mobile! 🚀**
