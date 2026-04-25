# 🚀 CV Website with Admin Dashboard - Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - **Name**: `amr-cv`
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to you
4. Wait for project to setup (~2 minutes)

## Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter`

This will create all tables and insert your current CV data!

## Step 3: Get API Credentials

1. In Supabase dashboard, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (looks like: `eyJhbG...`)

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root:
```bash
cd /Users/amratefflutterdeveloper/amr-cv
cp .env.example .env
```

2. Edit `.env` and paste your credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add User"** → **"Create new user"**
3. Fill in:
   - **Email**: your admin email
   - **Password**: secure password
   - **Auto Confirm User**: ✅ (check this)
4. Click **"Create User"**

## Step 6: Run Locally

```bash
cd /Users/amratefflutterdeveloper/amr-cv
npm run dev
```

Open: http://localhost:5173

## Step 7: Access Admin Dashboard

1. Go to: http://localhost:5173/admin/login
2. Sign in with the email/password you created in Step 5
3. You can now edit:
   - ✅ Work Experience
   - ✅ Projects
   - ✅ Education
   - ✅ Skills
   - ✅ Profile

## Step 8: Deploy to Vercel

### Push to GitHub (already done! ✅)
Your code is at: https://github.com/amratef503092/amr-cv

### Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `amr-cv` repository
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **"Deploy"**

That's it! Your CV will be live at: `https://amr-cv.vercel.app`

## Admin Dashboard Features

### ✅ Experience Management
- Add new job positions
- Edit existing roles
- Delete old experiences
- Choose color themes

### ✅ Projects Portfolio
- Add new projects
- Update app store links
- Mark as featured
- Custom colors

### ✅ Education & Certificates
- Update degrees
- Add new certifications
- Edit achievements

### ✅ Skills
- Add/remove skills
- Update proficiency levels
- Reorder skills

## Security Notes

- **Row Level Security (RLS)** is enabled
- Public can only **VIEW** data
- Only authenticated users can **EDIT**
- Admin credentials are stored securely by Supabase

## Troubleshooting

### "Supabase credentials not configured"
→ Make sure `.env` file exists with correct values

### Can't login to dashboard
→ Check that you created the user in Supabase Auth dashboard
→ Ensure "Auto Confirm User" was checked

### Data not showing
→ Verify you ran the SQL schema in Supabase
→ Check browser console for errors

## Customization

### Change Colors
Edit `src/index.css` - update the CSS variables

### Add New Sections
1. Create table in `supabase-schema.sql`
2. Add API functions in `src/lib/api.js`
3. Create admin page component
4. Update dashboard navigation

### Add Image Upload
1. Enable Supabase Storage
2. Create `avatars` bucket
3. Add upload component to dashboard

## Support

Need help? Check:
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)

---

**Built with ❤️ using React, Framer Motion, and Supabase**
