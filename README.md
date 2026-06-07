# 🏠 Zurich Apartment Search - AI Enhanced Rental Property Finder

A full-stack web application for searching rental properties in the Zurich greater area with automated alerts and contact management capabilities.

## 🎯 Features

- **Smart Search Form**: Filter by property type, size, rooms, price, availability, and location
- **Web Scraper**: Automatically scrapes major Swiss property websites
- **Email Alerts**: Receives notifications when new properties match your criteria
- **Contact Manager**: Pre-filled contact forms to reach property managers
- **User Dashboard**: Track saved properties, search history, and sent inquiries
- **German Language**: Complete German UI/UX localization
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Hook Form
- Leaflet.js (Mapping)
- Axios (HTTP Client)
- Hosting: Vercel

### Backend
- Python 3.9+
- Flask
- SQLAlchemy (ORM)
- Beautiful Soup 4 (Web Scraping)
- APScheduler (Task Scheduling)
- Resend/SendGrid (Email)
- Hosting: Render.com

### Database
- PostgreSQL
- Hosting: Render.com or Supabase

### CI/CD
- GitHub Actions (Automated Scraping)

## 💰 Cost: $0-5/month

## 📁 Project Structure

```
zurich-apartment-search/
├── backend/                    # Python Flask API
├── frontend/                   # React + Vite
├── .github/workflows/          # GitHub Actions
└── DEPLOYMENT.md              # Deployment guide
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📖 Documentation

- [Backend README](./backend/README.md) - API documentation & setup
- [Frontend README](./frontend/README.md) - Component & feature documentation
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Render.com & Vercel

## 💰 Cost: $0-5/month

---

**Status**: MVP Phase - Development in Progress 🚀
