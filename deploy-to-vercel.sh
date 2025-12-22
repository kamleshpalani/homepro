#!/bin/bash

# HomeCare Pro - Vercel Deployment Script
# This script helps you deploy both backend and frontend to Vercel

echo "🚀 HomeCare Pro - Vercel Deployment"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

# Login to Vercel
echo ""
echo "📝 Step 1: Login to Vercel"
vercel login

# Deploy Backend
echo ""
echo "🔧 Step 2: Deploying Backend..."
cd backend
echo "📍 Current directory: $(pwd)"
echo ""
echo "⚠️  IMPORTANT: You'll need to add these environment variables in Vercel dashboard:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - ADMIN_EMAIL"
echo "   - ADMIN_PASSWORD"
echo "   - FRONTEND_URL (add after frontend is deployed)"
echo ""
read -p "Press Enter to continue with backend deployment..."
vercel --prod
BACKEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*')
echo "✅ Backend deployed!"
echo "📝 Backend URL: $BACKEND_URL"

# Deploy Frontend
cd ../frontend/vite-project
echo ""
echo "🎨 Step 3: Deploying Frontend..."
echo "📍 Current directory: $(pwd)"
echo ""
echo "⚠️  IMPORTANT: Add this environment variable in Vercel dashboard:"
echo "   - VITE_API_URL=$BACKEND_URL"
echo ""
read -p "Press Enter to continue with frontend deployment..."
vercel --prod
FRONTEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*')
echo "✅ Frontend deployed!"
echo "📝 Frontend URL: $FRONTEND_URL"

# Summary
cd ../..
echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "📝 Next Steps:"
echo "1. Add backend environment variables in Vercel dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "2. Add FRONTEND_URL=$FRONTEND_URL to backend env vars"
echo ""
echo "3. Add VITE_API_URL=$BACKEND_URL to frontend env vars"
echo ""
echo "4. Redeploy both projects after adding environment variables"
echo ""
echo "🌐 Your URLs:"
echo "   Backend:  $BACKEND_URL"
echo "   Frontend: $FRONTEND_URL"
echo ""
echo "📚 Read VERCEL_DEPLOYMENT.md for detailed instructions"
