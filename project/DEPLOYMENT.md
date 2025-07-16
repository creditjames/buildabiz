# 🚀 Deployment Guide for BuildABizz

This guide covers the best deployment options for your React + Vite application with Supabase integration.

## 📋 Prerequisites

- ✅ Dependencies installed (`npm install`)
- ✅ Supabase project configured
- ✅ Environment variables ready
- ✅ Git repository set up

## 🎯 **Recommended: Vercel Deployment**

### Why Vercel?
- **Zero configuration** for React/Vite apps
- **Automatic deployments** from Git
- **Built-in environment variables** management
- **Global CDN** for fast loading
- **Free tier** is generous

### Setup Steps:

1. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will auto-detect it's a Vite app
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

### Environment Variables in Vercel:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🌐 **Alternative: Netlify Deployment**

### Setup Steps:

1. **Build your app**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your Git repository

3. **Configure environment variables** in Netlify dashboard

## 🔥 **Supabase Hosting (Native Integration)**

### Setup Steps:

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Deploy**:
   ```bash
   supabase hosting deploy
   ```

## ⚙️ **Environment Variables**

Make sure these are set in your deployment platform:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🔧 **Build Configuration**

Your `vite.config.ts` is already optimized for production. The build command:

```bash
npm run build
```

Creates a `dist` folder ready for deployment.

## 📁 **Supabase Edge Functions**

Your Edge Functions are in `supabase/functions/`. To deploy them:

```bash
supabase functions deploy
```

## 🚨 **Important Notes**

1. **CORS Configuration**: Supabase handles CORS automatically
2. **File Storage**: Supabase Storage works seamlessly with any deployment
3. **Authentication**: Supabase Auth works across all platforms
4. **Database**: Your Supabase database is already hosted and accessible

## 🎉 **Post-Deployment**

1. **Test authentication** flows
2. **Verify file uploads** work
3. **Check Edge Functions** are accessible
4. **Monitor performance** in your deployment platform

## 🔗 **Useful Links**

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html) 