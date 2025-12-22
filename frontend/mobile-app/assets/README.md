# App Assets Required

This directory needs the following image assets for mobile app deployment:

## Required Files:

### 1. icon.png

- **Size**: 1024x1024 px
- **Format**: PNG with transparency
- **Purpose**: Main app icon for iOS and Android
- **Design**: HomePro logo with emerald green (#10b981) theme

### 2. adaptive-icon.png

- **Size**: 1024x1024 px
- **Format**: PNG with transparency
- **Purpose**: Android adaptive icon
- **Note**: Keep important content within center 512x512px safe zone

### 3. splash.png

- **Size**: 1284x2778 px (or 1242x2688 px minimum)
- **Format**: PNG
- **Purpose**: Splash screen shown during app launch
- **Background**: Emerald green (#10b981)
- **Design**: HomePro logo centered

### 4. favicon.png

- **Size**: 48x48 px
- **Format**: PNG
- **Purpose**: Web favicon

## How to Create:

### Option 1: Use AI Image Generator

```
Prompt for ChatGPT/DALL-E/Midjourney:
"Create a professional app icon for a home cleaning service called HomePro.
Modern minimalist design with a house icon and sparkle/shine elements.
Use emerald green (#10b981) as primary color with white accents.
Clean, flat design style. 1024x1024 pixels, transparent background."
```

### Option 2: Use Online Tools

1. **Canva**: https://www.canva.com/create/app-icons/
2. **Figma**: Use free templates
3. **Icon Generator**: https://www.appicon.co/

### Option 3: Hire a Designer

- **Fiverr**: $5-50
- **Upwork**: $50-200
- **99designs**: Logo + icons package

## Quick Start (Temporary):

For testing purposes, you can use Expo's default icon temporarily:

1. Keep the existing `icon.png` from Expo template
2. Build and test the app
3. Replace with professional icons before App Store submission

## Verification:

Once files are created, verify with:

```bash
cd frontend/mobile-app
ls -la assets/
# Should show: icon.png, splash.png, adaptive-icon.png, favicon.png
```

## Next Steps:

After adding assets:

1. Run `npx expo start` to verify locally
2. Build preview: `eas build --profile preview --platform all`
3. Test on real devices
4. If satisfied, proceed with production build

## Design Guidelines:

**iOS:**

- No rounded corners (iOS adds them automatically)
- No text/words (icons should be symbolic)
- High contrast for visibility

**Android:**

- Follow Material Design guidelines
- Consider adaptive icon safe zones
- Test on different launcher themes

**Both:**

- Keep it simple and recognizable
- Ensure visibility at small sizes (29x29px for iOS)
- Use consistent branding colors

## Resources:

- iOS Guidelines: https://developer.apple.com/design/human-interface-guidelines/app-icons
- Android Guidelines: https://developer.android.com/develop/ui/views/launch/icon_design_adaptive
- Expo Documentation: https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/
