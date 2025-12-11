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
1.  **Configure Connectors:** Go to the Settings page in the UI to add AWS/Azure/GCP credentials.
2.  **Define Policies:** Set up RBAC roles and Governance policies in the backend.
3.  **Deployment:** Use the provided Terraform modules (in `infra` - to be populated) for production deployment.
