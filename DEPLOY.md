# 🚀 Quick Deploy Guide

## Your CV Website is Ready!

### GitHub Repository ✅
Your code is live at: **https://github.com/amratef503092/amr-cv**

---

## Step 1: Set Up Supabase (Database)

1. **Go to [supabase.com](https://supabase.com)** and sign up/login

2. **Create New Project:**
   - Name: `amr-cv`
   - Database Password: `Amr1482` (or choose a new one - **save it!**)
   - Region: Choose closest to Egypt/Saudi Arabia
   - Wait ~2 minutes for setup

3. **Create Database Tables:**
   - In Supabase Dashboard, click **SQL Editor** (left sidebar)
   - Click **"New Query"**
   - Open the file `supabase-schema.sql` from your project
   - Copy **ALL** the content
   - Paste into Supabase SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)
   - ✅ You should see "Success. No rows returned"

4. **Get API Keys:**
   - Go to **Settings** (gear icon) → **API**
   - Copy these two values:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbG...` (long string)

---

## Step 2: Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **"Add User"** → **"Create new user"**
3. Fill in:
   - **Email**: `eng.amr.atef.goda@gmail.com` (or your email)
   - **Password**: Choose a strong password
   - ✅ Check **"Auto Confirm User"**
4. Click **"Create User"**

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Website (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. Click **"Add New Project"**
4. **Import** your `amr-cv` repository
5. **Configure Project:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (already set)
   - Output Directory: `dist` (already set)
6. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add `VITE_SUPABASE_URL` = paste your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` = paste your Supabase anon key
7. Click **"Deploy"**
8. Wait ~1-2 minutes... 🎉 **Done!**

Your CV will be live at: `https://amr-cv-[random].vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/amratefflutterdeveloper/amr-cv
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? amr-cv
# - Directory? ./
# - Override settings? N

# Add environment variables when prompted
# VITE_SUPABASE_URL: your-url-here
# VITE_SUPABASE_ANON_KEY: your-key-here
```

---

## Step 4: Access Your Admin Dashboard

Once deployed:

1. **Go to:** `https://your-domain.vercel.app/admin/login`
2. **Sign in** with the email/password from Step 2
3. **Edit your CV:**
   - ✅ Add/Edit/Delete Work Experience
   - ✅ Manage Projects
   - ✅ Update Education
   - ✅ Modify Skills
   - ✅ Update Profile Info

---

## Step 5: Custom Domain (Optional)

1. Buy a domain (e.g., `amratef.dev`)
2. In Vercel Dashboard → Your Project → **Settings** → **Domains**
3. Add your domain
4. Update DNS records as instructed
5. Your CV will be at: `https://amratef.dev`

---

## Test Locally (Optional)

Want to test before deploying?

```bash
cd /Users/amratefflutterdeveloper/amr-cv

# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials:
# VITE_SUPABASE_URL=your-url
# VITE_SUPABASE_ANON_KEY=your-key

# Run locally
npm run dev
```

Open: http://localhost:5173

---

## What You Get

### Public CV Website
- 🎨 Beautiful animated design
- 📱 Fully responsive
- ⚡ Fast loading
- 🔍 SEO optimized
- 💼 Showcases your experience & projects

### Admin Dashboard
- 🔐 Secure login (Supabase Auth)
- ✏️ Edit all content visually
- 🎨 No coding required
- 📊 Real-time updates
- 🛡️ Row-level security

---

## Troubleshooting

### "Supabase credentials not configured"
→ Make sure you added environment variables in Vercel
→ Check `.env` file exists locally

### Can't login to dashboard
→ Verify you created the user in Supabase Auth
→ Ensure "Auto Confirm User" was checked

### Data not showing
→ Run the SQL schema in Supabase SQL Editor
→ Check browser console for errors

### Build fails on Vercel
→ Check Vercel deployment logs
→ Ensure all files are committed to Git

---

## Next Steps

1. ✅ Complete Supabase setup
2. ✅ Deploy to Vercel
3. ✅ Test admin dashboard
4. ✅ Share your CV link!

---

**Need Help?**

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev

**Built with ❤️ using React, Framer Motion, and Supabase**
