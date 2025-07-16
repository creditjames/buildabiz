# Build-A-Biz - Business Formation Platform

A React + Vite application for business formation services with Supabase backend.

## 🚀 Deployment

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Install Command:** `npm install`

### Environment Variables

Set these in your Vercel dashboard:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Supabase Environment Variables

Set these in your Supabase dashboard:

```
OPENAI_API_KEY=your-openai-api-key
```

## 🛠️ Development

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🏗️ Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Authentication:** Supabase Auth
- **Database:** PostgreSQL (Supabase)
- **File Storage:** Supabase Storage
- **Deployment:** Vercel 