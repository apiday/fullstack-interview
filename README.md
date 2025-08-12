# ApiHour ESG Management Platform

ApiHour is a minimal full-stack scaffold for an ESG management platform aimed at fund managers. It's designed for interviews: simple enough to get running quickly, but realistic enough to extend during the exercise.

It mimics some core concepts from Apiday:
- our users are fund managers, they create funds (financial structure to invest in other things) which then invest in
  companies called "portfolio companies"
- fund managers want to gather some data from their portfolio companies to know if everything is OK, and especially ESG
  data (related to environment, social and governance) and they do this by sending "campaigns"

What you can do:

- Create funds (name, size in million euros).
- Add portfolio companies to a fund (name, optional sector, optional employee count, investment amount in M€).
- Create campaigns (name, year, subject).

That's it—no auth, no pagination, no Docker. Candidates build on top.

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

---

# Technical Test - ESG Management Platform

## Overview

This technical test evaluates your ability to extend an existing full-stack application for ESG (Environmental, Social, Governance) management. You'll be working with a Django REST API backend and Next.js frontend.

The test is designed for different seniority levels, with tasks increasing in complexity.

## Task Levels

### Junior Level (0-2 years experience)

**Time allocation: 1-2 hours**

**Task 1: Enhanced Company Management**

- Add the ability to **edit** existing portfolio companies
- Add the ability to **delete** portfolio companies

**Task 2: Basic Data Validation**

- Add validation rules:
  - Fund size must be positive
  - Sum of investment amount of a fund should not exceed fund size
  - Company names must be unique within a fund
- Add a simple confirmation dialog for delete operations
- Display appropriate error messages to users

---

### Mid Level (3-5 years experience)

**Time allocation: 1-2 hours**

**Task 1: Advanced Portfolio Operations**

- Implement **fund editing** with business logic validation:
  - Cannot reduce fund size below total invested amount
  - Must recalculate available investment capacity
- Add **soft delete** for companies (mark as deleted instead of hard delete)
- Create an "archive" view to see deleted companies with restore functionality

**Task 2: Investment Exit Feature**

- Create an "Exit" model and functionality:
  - Track when a company is exited from a fund
  - Record exit date, exit value, and exit type (IPO, acquisition, etc.)
  - Calculate ROI (Return on Investment) for exited companies
- Update portfolio views to show:
  - Current active investments vs. exited investments
  - Total portfolio performance metrics

## Technical Requirements

### Backend Requirements

- Use Django REST Framework for API endpoints
- Implement proper serializers with validation
- Add appropriate database migrations
- Follow Django best practices for models and views
- Include basic error handling and logging

### Frontend Requirements

- Use Next.js with TypeScript
- Implement proper state management (React hooks or state management library)
- Create reusable components
- Handle loading states and error scenarios

## Questions?

If you have questions about requirements or run into technical issues, please document your assumptions and proceed. This is also part of the evaluation - how you handle ambiguity and make reasonable decisions.

Good luck! 🚀
