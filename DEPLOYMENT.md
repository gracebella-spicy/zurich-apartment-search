# 🚀 Deployment Guide - Zurich Apartment Search

Complete guide to deploy the application to **Render.com** (backend) and **Vercel** (frontend).

## 📋 Prerequisites

- GitHub account and repository pushed
- Render.com account (free)
- Vercel account (free)
- Resend account for email service (free)
- PostgreSQL database (via Render.com)

---

## 🔧 Backend Deployment (Render.com)

### Step 1: Create PostgreSQL Database

1. Go to [Render.com](https://render.com)
2. Sign in or create account
3. Click **New +** → **PostgreSQL**
4. Configure:
   - **Name**: `zurich-apartments-db`
   - **Database**: `zurich_apartments`
   - **User**: `zurich_user`
   - **Region**: Frankfurt (Europe)
   - **Plan**: Free tier
5. Click **Create Database**
6. Copy the **Internal Database URL** (you'll need it later)

### Step 2: Deploy Backend Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `zurich-apartment-api`
   - **Environment**: `Python 3`
   - **Region**: Frankfurt
   - **Branch**: `main`
   - **Build Command**: `pip install -r backend/requirements.txt && cd backend && flask db upgrade`
   - **Start Command**: `cd backend && gunicorn wsgi:app`
   - **Plan**: Free tier

4. **Environment Variables** (add these):
   ```
   DATABASE_URL=<paste-from-step-1>
   FLASK_ENV=production
   SECRET_KEY=<generate-strong-random-key>
   RESEND_API_KEY=<your-resend-api-key>
   SENDER_EMAIL=noreply@yourdomain.com
   SCRAPER_ENABLED=False
   CORS_ORIGINS=https://your-vercel-domain.com
   ```

5. Click **Create Web Service**
6. Wait for deployment (2-3 minutes)
7. Copy your **service URL** (e.g., `https://zurich-apartment-api.onrender.com`)

### Step 3: Generate Strong Secret Key

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Step 4: Set Up Resend Email Service

1. Go to [Resend.com](https://resend.com)
2. Sign up for free account
3. Get your **API Key**
4. Create a sender email (free tier: `onboarding@resend.dev`)
5. Add to Render environment variables

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Deploy with Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **New Project**
4. Select your `zurich-apartment-search` repository
5. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Environment Variables

Add to Vercel project settings:
```
VITE_API_URL=https://zurich-apartment-api.onrender.com/api
```

3. Click **Deploy**
4. Wait for deployment
5. Copy your **Vercel URL** (e.g., `https://zurich-apartment-search.vercel.app`)

### Step 3: Update Backend CORS

Go back to Render backend settings:
- Update `CORS_ORIGINS` environment variable with your Vercel URL
- Click **Manual Deploy** to redeploy

---

## 📧 Set Up GitHub Actions for Scheduled Scraping

### Step 1: Add Secrets to GitHub

1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `DB_PASSWORD`: Your PostgreSQL password
   - `SECRET_KEY`: Generated strong key
   - `RESEND_API_KEY`: Your Resend API key
   - `SENDER_EMAIL`: Your sender email

### Step 2: Verify Workflow

The workflow file is already at `.github/workflows/scraper.yml`

It will:
- Run daily at 2 AM UTC
- Scrape all property websites
- Send email alerts to users
- Can be manually triggered

---

## 🧪 Testing Deployment

### Backend Health Check

```bash
curl https://zurich-apartment-api.onrender.com/health
```

Should return:
```json
{"status": "healthy", "timestamp": "2026-06-07T12:00:00"}
```

### Frontend Access

Visit: `https://zurich-apartment-search.vercel.app`

Should load the home page without errors.

### API Connection Test

In browser console on your Vercel site:
```javascript
fetch('https://zurich-apartment-api.onrender.com/api/stats')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 💾 Database Backups

### On Render.com

1. Go to PostgreSQL database → **Backups**
2. Render automatically backups daily (free tier: 7-day retention)
3. Download backups manually if needed

---

## 🔐 Production Checklist

- [x] Database set up and secured
- [x] Backend deployed on Render.com
- [x] Frontend deployed on Vercel
- [x] Environment variables configured
- [x] CORS properly set
- [x] Email service (Resend) configured
- [x] GitHub Actions scheduled scraping set up
- [x] SSL/TLS enabled (automatic)
- [x] Custom domain set up (optional)

---

## 💰 Cost Summary

| Service | Component | Free Tier | Cost |
|---------|-----------|-----------|------|
| Render | PostgreSQL | Yes | $0 |
| Render | Web Service | Yes (limited) | $0-7/month |
| Vercel | Frontend | Yes | $0 |
| Resend | Email | 100/day free | $0 |
| GitHub | Actions | Free | $0 |
| **TOTAL** | | | **$0-7/month** |

---

## 📱 Custom Domain (Optional)

### For Frontend (Vercel)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed

### For Backend (Render)

1. Go to Render service → **Settings** → **Custom Domain**
2. Add your API domain
3. Update DNS records

---

## 🚨 Troubleshooting

### Backend won't deploy

- Check Python version matches `3.11`
- Verify all dependencies in `requirements.txt`
- Check database connection string is correct
- Review build logs in Render dashboard

### Frontend shows API errors

- Verify `VITE_API_URL` matches your backend URL
- Check CORS settings in backend
- Ensure backend is running (`/health` check)

### Emails not sending

- Verify Resend API key is correct
- Check sender email is configured in Resend
- Review email logs in Resend dashboard
- Check database has user records with email addresses

### Scraping job not running

- Check GitHub Actions workflow is enabled
- Review workflow logs in GitHub
- Verify database credentials in secrets
- Test manually with workflow dispatch button

---

## 📞 Support

- **Render.com Support**: https://render.com/docs
- **Vercel Support**: https://vercel.com/docs
- **Resend Support**: https://resend.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions

---

## 🎉 Next Steps

1. ✅ Deploy backend and frontend
2. ✅ Test all functionality
3. ✅ Configure custom domain (optional)
4. ✅ Monitor logs and performance
5. ✅ Plan Phase 2 features

Congratulations! Your apartment search application is live! 🚀
