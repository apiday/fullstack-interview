# ApiHour ESG Management Platform

ApiHour is a minimal full-stack scaffold for an ESG management platform aimed at fund managers. It’s designed for interviews: simple enough to get running quickly, but realistic enough to extend during the exercise.

It mimics some core concepts from Apiday:
- our users are fund managers, they create funds (financial structure to invest in other things) which then invest in
  companies called "portfolio companies"
- fund managers want to gather some data from their portfolio companies to know if everything is OK, and especially ESG
  data (related to environment, social and governance) and they do this by sending "campaigns"

What you can do:

- Create funds (name, size in million euros).
- Add portfolio companies to a fund (name, optional sector, optional employee count, investment amount in M€).
- Create campaigns (name, year, subject).

That’s it—no auth, no pagination, no Docker. Candidates build on top.

## Prerequisites

- Python 3.9+
- Node.js 20+
- pip
- npm

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
npm run dev
```

[Open http://localhost:3000](http://localhost:3000)
