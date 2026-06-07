# Backend - Zurich Apartment Search API

Python Flask REST API for the apartment search application.

## 🚀 Setup

### Prerequisites
- Python 3.9+
- PostgreSQL (or SQLite for development)
- pip

### Installation

1. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Initialize database**
```bash
flask db upgrade
```

5. **Run development server**
```bash
flask run
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users/<id>` - Get user details
- `PUT /api/users/<id>` - Update user

### Searches
- `POST /api/users/<id>/searches` - Create saved search
- `GET /api/users/<id>/searches` - Get user's searches
- `PUT /api/searches/<id>` - Update search
- `DELETE /api/searches/<id>` - Delete search

### Properties
- `POST /api/properties/search` - Search for properties
- `GET /api/properties/<id>` - Get property details

### Saved Properties
- `POST /api/users/<id>/saved-properties` - Save property
- `GET /api/users/<id>/saved-properties` - Get saved properties
- `DELETE /api/saved-properties/<id>` - Remove saved property

### Inquiries
- `POST /api/users/<id>/inquiries` - Send inquiry
- `GET /api/users/<id>/inquiries` - Get sent inquiries

### Statistics
- `GET /api/stats` - Get app statistics
- `GET /health` - Health check

## 🕷️ Web Scraper

The scraper module (`app/scrapers.py`) contains classes for scraping Swiss property websites.

## 📧 Email Service

Emails are sent via Resend API.

## 🗄️ Database Models

Includes User, Search, Property, SavedProperty, Inquiry, and Alert models.

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) in root directory.
