# ApiHour ESG Management Platform

ApiHour is a minimal full-stack scaffold for an ESG management platform aimed at fund managers. It’s designed for interviews: simple enough to get running quickly, but realistic enough to extend during the exercise.

What you can do:

- Create funds (name, size in million euros).
- Add portfolio companies to a fund (name, optional sector, optional employee count, investment amount in M€).
- Create campaigns (name, year, subject).

That’s it—no auth, no pagination, no Docker. Candidates build on top.

## Prerequisites

- Python 3.8+
- Node.js 18+
- pip
- npm or yarn

## Quickstart

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo   # creates demo data
python manage.py runserver 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE=http://localhost:8000/api npm run dev
```

[Open http://localhost:3000](http://localhost:3000)
