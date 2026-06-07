# Contributing to Zurich Apartment Search

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/zurich-apartment-search.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -am 'Add your feature'`
6. Push: `git push origin feature/your-feature-name`
7. Open a pull request

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Code Style

- **Python**: PEP 8 (use `black` and `flake8`)
- **JavaScript**: Prettier for formatting, ESLint for linting
- Use meaningful commit messages

## Testing

- Write tests for new features
- Run `pytest` for backend tests
- Run `npm test` for frontend tests

## Reporting Issues

Use GitHub Issues for:
- Bug reports
- Feature requests
- Documentation improvements

Include:
- Clear description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details

## Areas for Contribution

- [ ] Improve web scraper for more websites
- [ ] Add more languages (French, Italian)
- [ ] Implement advanced filtering
- [ ] Add mobile app
- [ ] Improve UI/UX
- [ ] Write tests
- [ ] Improve documentation

## Questions?

Feel free to open an issue or discussion if you have questions!
