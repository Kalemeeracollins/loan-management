# Smart Loan Management System

This repository contains the initial production-ready foundation for a Smart Loan Management System for Uganda, built with a Next.js client and an Express + TypeScript API.

## Monorepo structure

- `client/` – Next.js App Router frontend for applicant and staff portals
- `server/` – Express API, business logic foundation, and environment configuration
- `docs/` – project design specification and architecture documentation

## Quick start

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Production guidance

- Keep secrets in environment variables and deployment secret stores.
- Use MySQL with InnoDB and strict migrations.
- Treat all financial logic as server-authoritative.
- Review the design document before proceeding with full feature implementation.
