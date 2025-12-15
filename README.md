# Enterprise Multicloud Governance Platform

## Overview
This is a single-pane-of-glass application for governing, monitoring, and planning costs across Azure, AWS, and GCP. It is built using a modern microservices architecture with a React (Next.js) frontend and NestJS backend.

## Architecture
- **Frontend:** Next.js 14, React 18, Material UI, Tailwind CSS. Located in `apps/web`.
- **Backend:** NestJS 10, TypeORM, Postgres. Located in `apps/api`.
- **Database:** PostgreSQL (Metadata) + TimescaleDB (Metrics/Cost).
- **Messaging:** Kafka (Event bus) - *configuration provided in docker-compose*.


## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn

## Getting Started

### 1. Infrastructure Setup
Start the local databases (Postgres/TimescaleDB) and message broker (Kafka/Redis).
```bash
docker-compose up -d
```

### 2. Backend (API)
The backend services run on port 3001.
```bash
cd apps/api
npm install
# Start in development mode
npm run start:dev
```
*The API will auto-synchronize the database schema on start.*

### 3. Frontend (Web Dashboard)
The web dashboard runs on port 3000.
```bash
cd apps/web
npm install
# Start in development mode
npm run dev
```
Access the dashboard at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
.
├── apps
│   ├── api          # NestJS Backend Microservices
│   │   ├── src
│   │   │   ├── controllers  # API Endpoints
│   │   │   ├── entities     # DB Models (Tenant, Cost, Inventory)
│   │   │   └── services     # Business Logic
│   └── web          # Next.js Frontend
│       ├── app
│       │   ├── dashboard    # Global Overview
│       │   ├── inventory    # Asset Browser
│       │   ├── finops       # Cost & Forecasting
│       │   └── governance   # Compliance & Risk
├── infra            # Infrastructure Configuration (Terraform/Helm - placeholders)
├── packages         # Shared libraries (optional)
├── docker-compose.yml
├── SOW.md           # Statement of Work
└── tasks.md         # Implementation Task Tracker
```

## Testing
The application includes unit tests for core backend services.
```bash
cd apps/api
npm run test
```

## Deployment
### Docker
Build and run the containerized application:
```bash
docker-compose up --build
```

### Kubernetes
Detailed deployment manifests are available in `infra/k8s-deployment.yaml`.
```bash
kubectl apply -f infra/deploy.yaml
```

## Next Steps

### For First-Time Users
1. **Quick Setup:** Follow [docs/QUICK_START.md](./docs/QUICK_START.md) for a 15-minute setup
2. **Initialize Admin:** Run `.\scripts\initialize-platform.ps1` to create your first tenant and admin user
3. **Configure Connectors:** Go to Settings → Cloud Connectors to add AWS/Azure/GCP credentials

### For Production Deployment
1. **Read Deployment Guide:** See [docs/WINDOWS_DEPLOYMENT.md](./docs/WINDOWS_DEPLOYMENT.md) for comprehensive Windows deployment instructions
2. **Review Checklist:** Complete the go-live checklist before deploying to production
3. **Setup Authentication:** Follow the implementation plan to add proper JWT/OIDC authentication

### Additional Resources
- **API Documentation:** [docs/API.md](./docs/API.md)
- **Architecture:** [docs/MULTICLOUD_ARCHITECTURE.md](./docs/MULTICLOUD_ARCHITECTURE.md)
- **Operations Runbook:** [docs/RUNBOOK.md](./docs/RUNBOOK.md)
- **All Documentation:** See [docs/README.md](./docs/README.md) for complete index
