# Frontend - Zurich Apartment Search

React + Vite frontend for the apartment search application.

## 🚀 Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Components

### Pages
- `Home.jsx` - Landing page
- `SearchResults.jsx` - Property search results
- `PropertyDetail.jsx` - Single property details
- `Dashboard.jsx` - User dashboard

### Components
- `SearchForm.jsx` - Search criteria form
- `PropertyCard.jsx` - Property listing card
- `PropertyMap.jsx` - Map view with properties
- `ContactForm.jsx` - Contact property manager form
- `Navbar.jsx` - Navigation bar

### Services
- `api.js` - API client
- `config.js` - Configuration

## 🌍 Localization

All text is in German. Update `src/i18n.js` to change strings.

## 🎨 Styling

Tailwind CSS for styling. Customize in `tailwind.config.js`.

## 📦 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) in root directory.
