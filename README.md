<p align="center">
  <img src="public/assets/jokisure.jpg" alt="JokiSure Logo" width="400">
</p>

<p align="center">
  <strong>The Ultimate Gaming Boost Platform</strong>
</p>

<p align="center">
  A secure platform that connects gamers with verified boosters for reliable game boosting services.
</p>

<p align="center">
  <em>Level up your gaming experience with trusted professionals!</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/Cloud-GCP%20Cloud%20Run-4285F4?style=flat&logo=googlecloud&logoColor=white" alt="GCP Cloud Run">
  <img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Testing-Cypress-69D3A7?style=flat&logo=cypress&logoColor=white" alt="Cypress">
  <img src="https://img.shields.io/badge/Container-Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Framework-Laravel%2012-FF2D20?style=flat&logo=laravel&logoColor=white" alt="Laravel">
</p>

---

## Why Choose JokiSure?

**Tired of getting scammed by unreliable boosting services?** JokiSure is here to change the game!

JokiSure addresses the growing problem of fraud and lack of trust in the game boosting industry. Many gamers use "joki" (boosting) services to improve their game rankings but often face serious issues including scams, unverified service providers, lack of transparency, and difficulty trusting boosters with their gaming accounts.

**Our solution?** A secure, transparent platform where gamers can connect with verified boosters. We ensure your safety through an escrow payment system, real-time progress tracking, and a comprehensive rating and review system.

### What Makes Us Different
- **100% Secure Payments** — Your money is protected until service completion
- **Verified Professionals Only** — All boosters pass our strict verification process
- **Real-Time Updates** — Watch your progress happen live
- **Transparent Reviews** — Real feedback from real customers
- **Dark Mode Support** — Comfortable viewing experience day and night

---

## CI/CD Pipeline

This project is deployed using a fully automated CI/CD pipeline powered by GitHub Actions. Every push to the `main` branch triggers the full pipeline automatically — from testing to live deployment on GCP Cloud Run.

### Pipeline Architecture

```
Code Push (main)
      │
      ▼
GitHub Actions Triggered
      │
      ├── Install Dependencies (Composer + npm)
      │
      ├── Inject Environment Variables (from GitHub Secrets)
      │
      ├── Run Cypress E2E Tests (25 tests — auth, homepage, payment, orders)
      │        └── Pipeline stops here if any test fails
      │
      ├── Authenticate to GCP
      │
      ├── Build Docker Image
      │        └── PHP 8.2-FPM + Nginx + Node.js on Alpine
      │
      ├── Push Image to GCP Artifact Registry
      │
      └── Deploy to GCP Cloud Run
               └── APP_URL, ASSET_URL, DB credentials injected at runtime
```

### Tools & Services

| Category | Tool | Purpose |
|---|---|---|
| CI/CD Automation | GitHub Actions | Trigger pipeline on every push to main |
| Containerization | Docker | Package Laravel app into a portable container |
| Image Registry | GCP Artifact Registry | Store and version Docker images |
| Deployment | GCP Cloud Run | Serverless hosting with auto-scaling |
| Database | Supabase (PostgreSQL) | Cloud database for production |
| E2E Testing | Cypress | Automated end-to-end testing (25 tests) |
| Uptime Monitoring | UptimeRobot | Monitor app availability every 5 minutes |
| Error Logging | GCP Cloud Logging | Centralized structured error logging |
| Alerts | Discord | Real-time downtime and error notifications |
| Secrets Management | GitHub Secrets | Secure storage for credentials and API keys |

### GitHub Secrets Required

To run this pipeline, the following secrets must be configured in your GitHub repository settings:

| Secret | Description |
|---|---|
| `GCP_CREDENTIALS` | GCP Service Account JSON key |
| `APP_KEY` | Laravel application encryption key |
| `DB_HOST` | Supabase PostgreSQL connection host |
| `DB_DATABASE` | Production database name |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |

### Live Deployment

The application is live at:

**[https://jokisure-34050340438.asia-southeast2.run.app](https://jokisure-34050340438.asia-southeast2.run.app)**

> Deployed on GCP Cloud Run — Region: `asia-southeast2` (Singapore)

---

## Local Development Setup

### Requirements

- PHP 8.2+
- Composer
- Node.js & npm
- PostgreSQL

### Steps

```bash
# Clone the repository
git clone https://github.com/Zeldano118/jokisure-final.git
cd jokisure-final

# Install PHP dependencies
composer install

# Install Node dependencies and build assets
npm install && npm run build

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Configure your database in .env, then run migrations
php artisan migrate

# Start the development server
php artisan serve
```

---

## Docker Setup

```bash
# Build the Docker image
docker build -t jokisure .

# Run the container
docker run -p 8080:8080 jokisure
```

The container runs PHP-FPM and Nginx together via `docker/start.sh`, serving the app on port `8080`.

---

## Platform Workflow

The JokiSure platform operates through a streamlined process designed to ensure security and transparency:

1. **Account Registration** — Users create accounts with verified phone authentication
2. **Service Discovery** — Browse comprehensive game catalog and verified service providers
3. **Provider Selection** — Review detailed booster profiles with performance metrics
4. **Service Configuration** — Add selected services to cart with customizable options
5. **Secure Transaction** — Complete payment through integrated escrow system
6. **Service Monitoring** — Track real-time progress with milestone notifications
7. **Direct Communication** — Maintain contact with service providers via integrated messaging
8. **Service Completion** — Submit feedback and ratings upon service fulfillment

---

## Core Features

### User Account Management
- User Registration — Streamlined account creation process
- Phone Verification — Two-factor authentication via OTP system
- Secure Authentication — Protected login with session management
- Profile Management — Comprehensive user profile customization

### Platform Navigation
- Game Catalog — Comprehensive database of supported games
- Booster Directory — Detailed profiles with credentials and ratings
- Service Listings — Complete service descriptions with transparent pricing
- Advanced Search — Filtering and search functionality for efficient browsing

### Transaction Management
- Cart System — Multi-service selection and management
- Dynamic Pricing — Automated calculations with discount integration
- Secure Checkout — Protected payment processing workflow
- Promotional System — Discount code application and validation
- Escrow Integration — Secure payment holding until service completion

### Service Delivery
- Progress Monitoring — Real-time status tracking and updates
- Communication Channel — Direct messaging between users and service providers
- Feedback System — Comprehensive review and rating mechanism
- Quality Assurance — Service verification and quality control measures

### UI/UX
- Dark Mode / Light Mode — Toggle between themes across all pages, preference saved via localStorage

---

## Key Differentiators

### Escrow Payment System
Our platform implements a secure escrow mechanism that holds payments until service completion, ensuring transaction security and protecting both parties from fraudulent activities.

### Verified Booster Profiles
All service providers undergo comprehensive verification processes including skill assessment and background checks to ensure professional service delivery standards.

### Real-Time Progress Tracking
The platform provides live status monitoring with milestone tracking and progress notifications, offering complete transparency throughout the service delivery process.

### Reputation and Review System
A comprehensive feedback mechanism enables users to make informed decisions based on authenticated reviews and performance ratings from verified transactions.

---

## Meet The Team

### PSO — CI/CD Pipeline Team

| Name | Student ID | Role |
|---|---|---|
| Zeldano Shan Oeffie | 5026231118 | Containerization, CI/CD Pipeline, Dark Mode |
| Khayel Josh S. | 5026231222 | Automated Testing, Monitoring & Alerts |
| Emriqurrizal Yahya Nurramadhan | 5026231001 | Repository Setup, CI Pipeline, GCP Logging |
| Alexander Allan | 5026231050 | Deployment, Database Migration, Cypress Testing |

### PPPL — CRUD Features Team

| Name | Student ID |
|---|---|
| Aisya Candra Kirana Dewi | 5026231002 |
| Kanayya Shafa Amelia | 5026231003 |
| Siti Qalimatus Zahra | 5026231057 |
| Zeldano Shan Oeffie | 5026231118 |
| Razza Ibrahmwibowo Muktiadi | 5026231224 |

---

<p align="center">
  Built with Laravel 12 — Deployed on GCP Cloud Run — Powered by GitHub Actions
</p>