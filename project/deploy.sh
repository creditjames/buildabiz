#!/bin/bash

# 🚀 BuildABizz Deployment Script
# This script helps you deploy your React + Vite app with Supabase

echo "🚀 Starting BuildABizz deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed. Check for errors above."
    exit 1
fi

echo "✅ Build successful! Your app is ready for deployment."
echo ""
echo "🎯 Next steps:"
echo "1. For Vercel: Run 'vercel' or connect your repo to vercel.com"
echo "2. For Netlify: Upload the 'dist' folder to netlify.com"
echo "3. For Supabase: Run 'supabase hosting deploy'"
echo ""
echo "📁 Your built files are in the 'dist' directory" 