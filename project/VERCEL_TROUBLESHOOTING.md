# 🔧 Vercel Deployment Troubleshooting Guide

## 🚨 **Build Failed: "npm run build" exited with 1**

### ✅ **Fixed Issues**

I've made the following changes to fix your deployment:

1. **Updated `src/lib/supabase.ts`** - Now handles missing environment variables gracefully
2. **Added `vercel.json`** - Proper Vercel configuration
3. **Updated `package.json`** - Added Node.js version specification

### 🔧 **Next Steps to Deploy**

#### **1. Set Environment Variables in Vercel**

Go to your Vercel project dashboard and add these environment variables:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to find these values:**
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key

#### **2. Redeploy**

After setting environment variables:
1. Go to your Vercel deployment
2. Click "Redeploy" button
3. Or push a new commit to trigger automatic deployment

### 🐛 **Common Issues & Solutions**

#### **Issue: Environment Variables Not Set**
**Error:** `Missing VITE_SUPABASE_URL environment variable`
**Solution:** Add environment variables in Vercel dashboard

#### **Issue: Node.js Version Mismatch**
**Error:** `Node.js version not supported`
**Solution:** ✅ Fixed - Added `engines` field to package.json

#### **Issue: Build Timeout**
**Error:** `Build timed out`
**Solution:** 
- Check for large dependencies
- Consider code splitting
- Optimize bundle size

#### **Issue: CORS Errors**
**Error:** `CORS policy violation`
**Solution:** ✅ Handled by Supabase - CORS is configured automatically

### 📋 **Deployment Checklist**

- [ ] Environment variables set in Vercel
- [ ] Supabase project is active
- [ ] All dependencies are in package.json
- [ ] No build errors locally (`npm run build` works)
- [ ] Git repository is connected to Vercel

### 🔍 **Debugging Tips**

1. **Check Build Logs** in Vercel dashboard for specific errors
2. **Test Locally** with `npm run build` before deploying
3. **Verify Environment Variables** are correctly set
4. **Check Supabase Project** is active and accessible

### 📞 **Still Having Issues?**

If the build still fails after following these steps:

1. **Check the full build logs** in Vercel dashboard
2. **Verify your Supabase project** is working
3. **Test with a minimal environment** (just the basic app without Supabase)
4. **Contact Vercel support** with the specific error message

### 🎯 **Expected Result**

After fixing the environment variables, your deployment should:
- ✅ Build successfully
- ✅ Deploy to Vercel
- ✅ Show your app at the provided URL
- ✅ Connect to Supabase without issues 