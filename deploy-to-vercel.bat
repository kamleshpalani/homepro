@echo off
REM HomeCare Pro - Vercel Deployment Script (Windows)
REM This script helps you deploy both backend and frontend to Vercel

echo ========================================
echo    HomeCare Pro - Vercel Deployment
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
    echo Vercel CLI installed
)

REM Login to Vercel
echo.
echo Step 1: Login to Vercel
call vercel login

REM Deploy Backend
echo.
echo Step 2: Deploying Backend...
cd backend
echo Current directory: %CD%
echo.
echo IMPORTANT: You'll need to add these environment variables in Vercel dashboard:
echo    - MONGODB_URI
echo    - JWT_SECRET
echo    - ADMIN_EMAIL
echo    - ADMIN_PASSWORD
echo    - FRONTEND_URL (add after frontend is deployed)
echo.
pause
call vercel --prod
echo Backend deployed!

REM Deploy Frontend
cd ..\frontend\vite-project
echo.
echo Step 3: Deploying Frontend...
echo Current directory: %CD%
echo.
echo IMPORTANT: Add this environment variable in Vercel dashboard:
echo    - VITE_API_URL=(your backend URL from previous step)
echo.
pause
call vercel --prod
echo Frontend deployed!

REM Summary
cd ..\..
echo.
echo ========================================
echo        Deployment Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to https://vercel.com/dashboard
echo 2. Add backend environment variables
echo 3. Add frontend environment variables
echo 4. Redeploy both projects
echo.
echo Read VERCEL_DEPLOYMENT.md for detailed instructions
echo.
pause
