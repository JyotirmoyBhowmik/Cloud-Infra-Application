# Quick Start Guide - Windows
## Get Up and Running in 15 Minutes

---

## Prerequisites Checklist

Before you begin, ensure you have:

- ✅ **Node.js v18+** installed ([Download](https://nodejs.org/))
- ✅ **Docker Desktop** installed and running ([Download](https://www.docker.com/products/docker-desktop))
- ✅ **Git** installed ([Download](https://git-scm.com/download/win))
- ✅ **PowerShell 5.1+** (comes with Windows)
- ✅ **8GB RAM** minimum (16GB recommended)

---

## Fast Track Setup (5 Minutes)

### Step 1: Clone & Navigate

```powershell
cd C:\
git clone <your-repo-url> CloudInfra
cd CloudInfra
```

### Step 2: Start Infrastructure

```powershell
# Start PostgreSQL, Redis, and Kafka
docker-compose up -d

# Verify all services are running
docker-compose ps
```

**Expected output:**
```
NAME                  STATUS
governance_db         Up (healthy)
governance_redis      Up (healthy)
governance_kafka      Up
governance_zookeeper  Up
```

### Step 3: Install & Start Backend

```powershell
cd apps\api
npm install
npm run start:dev
```

**Wait for:** `Application is running on: http://[::]:3001`

### Step 4: Install & Start Frontend (New Terminal)

```powershell
cd apps\web
npm install
npm run dev
```

**Wait for:** `Ready on http://localhost:3000`

### Step 5: Initialize Admin User (New Terminal)

```powershell
# Navigate to project root
cd C:\CloudInfra

# Download initialization script (if not in repo)
# Or run this API call directly:

$body = @{
    name = "Default Organization"
    billing_group = "Enterprise"
    data_retention_days = 365
    userId = "admin@company.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/tenants/onboard" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Expected output:**
```json
{
  "id": "uuid-here",
  "name": "Default Organization",
  ...
}
```

### Step 6: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/tenants

✅ **You're done!** The platform is now running locally.

---

## Detailed Setup (If Issues Occur)

### Troubleshooting Step 1: Verify Docker Services

```powershell
# Check Docker is running
docker --version

# Start services with logs
docker-compose up

# Look for any error messages
# Common issues:
# - Port 5432 already in use → Stop other PostgreSQL instances
# - Not enough memory → Increase Docker memory in settings
```

### Troubleshooting Step 2: Check Node Version

```powershell
node --version  # Must be v18 or higher

# If wrong version, install from nodejs.org
# Or use nvm-windows to manage versions
```

### Troubleshooting Step 3: Clear npm Cache

```powershell
# If npm install fails
npm cache clean --force
rm -r node_modules
rm package-lock.json
npm install
```

### Troubleshooting Step 4: Database Connection

```powershell
# Test PostgreSQL connection
docker exec -it governance_db psql -U admin -d governance_platform

# Inside psql:
\dt  # Should show tables (or empty if first time)
\q   # Quit
```

### Troubleshooting Step 5: Check Logs

```powershell
# API logs (if running with npm)
# Check the terminal where you ran npm run start:dev

# Docker logs
docker-compose logs timescaledb
docker-compose logs redis
```

---

## Essential Commands

### Managing Docker Services

```powershell
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart timescaledb

# Remove all data (CAUTION: Deletes database!)
docker-compose down -v
```

### Managing Backend API

```powershell
cd apps\api

# Development mode (auto-reload)
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm test

# Check for errors
npm run lint
```

### Managing Frontend

```powershell
cd apps\web

# Development mode
npm run dev

# Production build
npm run build
npm run start

# Lint code
npm run lint
```

### Database Operations

```powershell
# Connect to database
docker exec -it governance_db psql -U admin -d governance_platform

# Backup database
docker exec governance_db pg_dump -U admin governance_platform > backup_$(Get-Date -Format "yyyyMMdd").sql

# Restore database
Get-Content backup_20251212.sql | docker exec -i governance_db psql -U admin governance_platform

# View all tables
docker exec -it governance_db psql -U admin -d governance_platform -c "\dt"

# View tenants
docker exec -it governance_db psql -U admin -d governance_platform -c "SELECT * FROM tenant;"
```

---

## Common Tasks

### Create a New Tenant

```powershell
$body = @{
    name = "Sales Department"
    billing_group = "Sales"
    data_retention_days = 180
    userId = "sales-admin@company.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/tenants/onboard" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Assign User to Role

```powershell
$body = @{
    tenantId = "tenant-uuid-here"
    userId = "user@company.com"
    roleId = "role-uuid-here"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/rbac/assign" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Check User Permissions

```powershell
curl "http://localhost:3001/rbac/permissions?userId=admin@company.com&tenantId=<TENANT_ID>"
```

### View All Tenants

```powershell
# Using PowerShell
Invoke-RestMethod -Uri "http://localhost:3001/tenants"

# Using curl
curl http://localhost:3001/tenants
```

---

## Development Workflow

### Making Code Changes

1. **Backend Changes:**
   - Edit files in `apps/api/src/`
   - Save → Auto-reload happens automatically with `npm run start:dev`
   - Check terminal for compilation errors

2. **Frontend Changes:**
   - Edit files in `apps/web/app/`
   - Save → Browser auto-refreshes
   - Check browser console for errors

3. **Database Schema Changes:**
   - Edit entity files in `apps/api/src/entities/`
   - Restart API → TypeORM auto-syncs schema (only in dev!)
   - **Production:** Use migrations instead

### Testing Your Changes

```powershell
# Run backend tests
cd apps\api
npm test

# Run specific test file
npm test -- tenant.service.spec.ts

# Run with coverage
npm test -- --coverage
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Change database password from default
- [ ] Set `synchronize: false` in TypeORM config
- [ ] Create proper migrations
- [ ] Configure environment variables
- [ ] Disable authentication bypass in AuthGuard
- [ ] Setup OIDC/OAuth2
- [ ] Configure SSL/TLS
- [ ] Setup monitoring and alerts
- [ ] Create backup strategy
- [ ] Document runbook for operations team

**See:** [Full Windows Deployment Guide](./windows_deployment_guide.md) for detailed instructions.

---

## Getting Help

### Check the Logs

```powershell
# API logs (development)
# Check the terminal where you ran: npm run start:dev

# Docker services
docker-compose logs -f timescaledb
docker-compose logs -f redis
docker-compose logs -f kafka

# Browser console
# F12 → Console tab
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 3001 already in use | `netstat -ano \| findstr :3001` then `taskkill /PID <PID> /F` |
| Port 5432 already in use | Stop other PostgreSQL instances or change port in docker-compose.yml |
| Cannot connect to database | Ensure Docker is running: `docker-compose ps` |
| npm install fails | Clear cache: `npm cache clean --force` then reinstall |
| Frontend can't connect to API | Check CORS settings and API URL configuration |
| Admin user not working | Run tenant onboarding script to create admin role |
| Tables not created | Ensure `synchronize: true` in app.module.ts |

### Documentation

- **Full Deployment Guide:** [windows_deployment_guide.md](./windows_deployment_guide.md)
- **Implementation Plan:** [implementation_plan.md](./implementation_plan.md)
- **API Documentation:** [docs/API.md](file:///c:/Users/ZORO/Cloud%20Infra%20Application/docs/API.md)
- **Architecture:** [docs/MULTICLOUD_ARCHITECTURE.md](file:///c:/Users/ZORO/Cloud%20Infra%20Application/docs/MULTICLOUD_ARCHITECTURE.md)

---

## Next Steps

Once you have the application running:

1. **Add Cloud Accounts**
   - Navigate to Settings → Cloud Connectors
   - Add AWS/Azure/GCP credentials
   - Test connection

2. **Configure RBAC**
   - Create roles: Viewer, Editor, FinOps Manager
   - Assign users to roles
   - Test permissions

3. **Setup Budgets**
   - Navigate to FinOps → Budgets
   - Create budget for cloud accounts
   - Configure alerts

4. **Create Compliance Policies**
   - Navigate to Governance → Compliance
   - Define compliance rules
   - Run initial scan

5. **Configure Alerts**
   - Navigate to Operations → Alerts
   - Setup alert rules for cost/compliance/resources
   - Configure notification channels

---

## Quick Reference

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- Kafka: localhost:9092

### Default Credentials
- Database User: `admin`
- Database Password: `password`
- Default Admin: `admin@company.com`

### Useful API Endpoints
- `GET /tenants` - List all tenants
- `POST /tenants/onboard` - Create tenant with admin
- `GET /rbac/permissions` - Get user permissions
- `GET /inventory` - List cloud resources
- `GET /cost/summary` - Get cost summary

---

**Last Updated:** 2025-12-12  
**Version:** 1.0
