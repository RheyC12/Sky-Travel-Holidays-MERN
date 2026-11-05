# Sky Travel Holidays

A travel agency web application with destination browsing, applicant accounts, visa application tracking, and an administrative review workflow.

**Original project: June 2024** | **First web development project** | **MongoDB, Express, React, Node.js**

June 2024 is the original project date supplied by the author. This repository presents the current MERN implementation and later portfolio documentation; it does not establish that every current feature or dependency existed in June 2024.

## Overview

Applicants can choose a destination, enter traveler information, attach documents, and track their application. Administrators can review submissions, update statuses, and manage contact messages. The original documentation describes a rebuild from a static Bootstrap/jQuery template; the supplied source contains the MERN version.

## Features

| Area | Functionality |
| --- | --- |
| Public website | Home, about, services, destinations, testimonials, contact |
| Accounts | Registration, login, JWT authentication, applicant/admin roles |
| Applicant workflow | Multi-step application form, document uploads, dashboard, status history, cancellation |
| Administration | Summary statistics, searchable/filterable application queue, status updates, contact messages |
| API content management | Admin endpoints for countries, testimonials, and users |
| Notifications | Email hooks for submissions and status changes when SMTP is configured |

Visa decisions are managed manually within this application. No government submission API or payment provider is integrated. Payment status is a data-model field only.

## Stack and structure

- **Frontend:** React 18, React Router, Context API, Axios, Tailwind CSS, Vite.
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs, express-validator, Multer, Nodemailer.
- **Database:** MongoDB, with users, destinations, applications, documents/status history, testimonials, offices, and enquiries.

```text
docs/                       Portfolio, architecture, quality notes
sky-travel-mern/
  client/src/
    api/                    Shared Axios client
    components/             Layout, navigation, protected routes, UI helpers
    context/                Authentication state
    pages/                  Public, applicant, and admin pages
  server/
    config/                 Database connection
    controllers/            Request handlers
    middleware/             Auth, validation, uploads, error handling
    models/                 Mongoose schemas
    routes/                 API routes
    seed/                   Development sample data
    utils/                  Token and email helpers
```

See the [portfolio case study](docs/PORTFOLIO.md), [architecture and API reference](docs/ARCHITECTURE.md), and [quality notes](docs/QUALITY.md).

## Local setup

Requirements: Node.js 18 or later as declared by the backend, npm, and local MongoDB or MongoDB Atlas. Review dependency compatibility before deployment.

From the repository root:

```powershell
cd sky-travel-mern/server
npm ci
Copy-Item .env.example .env
# Edit .env: set MONGO_URI and a long random JWT_SECRET.
npm run seed
npm run dev
```

Use a dedicated development database. Seeding replaces countries, testimonials, and offices and creates a demo admin if absent; it does not clear existing users or applications.

In a second terminal:

```powershell
cd sky-travel-mern/client
npm ci
npm run dev
```

Open `http://localhost:5173`. The API listens on port 5000; Vite proxies `/api` and `/uploads` during development.

Local demo administrator: `admin@skytravelholidaysfz.com` / `ChangeMe123!`. These are public sample credentials. Do not expose a seeded instance online. There is no password-change screen; change the seed configuration before creating an administrator for a nonlocal environment.

SMTP is optional locally. Without SMTP settings, emails are skipped. Configured SMTP failures currently propagate to API responses after database writes.

## Verification and project status

```powershell
cd sky-travel-mern/client
npm run build
```

The frontend production build passed in the November 2026 review. Lint fails because ESLint is not installed/configured. No automated test suite is configured. Database-backed workflows and the rendered interface were not verified in that review.

This is a learning and portfolio project. Before accepting real applicant information, fix public document access, applicant control of internal application fields, upload authorization order, and partial submission failures. See [known limitations](docs/QUALITY.md).

Production hosting requires HTTPS, secrets management, private durable file storage, database backups, API routing, and SPA fallback. Vite's development proxy does not configure production hosting.

## Attribution

Existing template, branding, and image assets are included. Their provenance and redistribution rights have not been verified; no new license is assigned. Seeded testimonials, fees, office details, and homepage statistics are sample/display content, not verified business outcomes.
