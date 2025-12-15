# Windows Production Deployment Guide
## Enterprise Multicloud Governance Platform

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Database Configuration](#database-configuration)
5. [Application Installation](#application-installation)
6. [Admin User Initialization](#admin-user-initialization)
7. [Tenant Configuration](#tenant-configuration)
8. [Production Deployment](#production-deployment)
9. [Go-Live Checklist](#go-live-checklist)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides detailed steps to deploy the **Enterprise Multicloud Governance Platform** on Windows Server from development to production go-live.

### Architecture Overview
- **Frontend:** Next.js 14 (Port 3000)
- **Backend API:** NestJS 10 with Fastify (Port 3001)
- **Database:** PostgreSQL/TimescaleDB (Port 5432)
- **Cache:** Redis (Port 6379)
- **Message Broker:** Kafka + Zookeeper (Port 9092)

---

## Prerequisites

### Required Software

#### 1. Node.js (v18 or higher)
```powershell
# Download from https://nodejs.org/
# Verify installation
node --version  # Should be v18.x or higher
npm --version
```

#### 2. Docker Desktop for Windows
```powershell
# Download from https://www.docker.com/products/docker-desktop
# After installation, verify:
docker --version
docker-compose --version

# Ensure Docker is running in Windows containers or WSL2 mode
docker ps
```

#### 3. Git for Windows
```powershell
# Download from https://git-scm.com/download/win
# Verify installation
git --version
```

#### 4. PostgreSQL Client (Optional but recommended)
```powershell
# Download from https://www.postgresql.org/download/windows/
# Or use pgAdmin 4 for GUI management
```

### System Requirements
- **OS:** Windows Server 2019/2022 or Windows 10/11 Pro
- **RAM:** Minimum 8GB (16GB recommended for production)
- **Disk Space:** Minimum 50GB free
- **Network:** Ports 3000, 3001, 5432, 6379, 9092 available

---

## Environment Setup

### Step 1: Clone the Repository

```powershell
# Navigate to your workspace
cd C:\
mkdir Projects
cd Projects

# Clone repository (replace with your actual repo URL)
git clone <your-repo-url> Cloud-Infra-Application
cd Cloud-Infra-Application
```

### Step 2: Create Environment Configuration

> **IMPORTANT:** The application currently does NOT use `.env` files. Configuration is hardcoded in the source code. For production, you should create proper environment files.

Create `.env` file in the root directory:

```powershell
# Create environment file
New-Item -Path ".env" -ItemType File

# Open in notepad
notepad .env
```

**Recommended `.env` content:**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=SecurePassword123!
DB_NAME=governance_platform

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka Configuration
KAFKA_BROKERS=localhost:9092

# API Configuration
API_PORT=3001
API_HOST=0.0.0.0
NODE_ENV=production

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Authentication (for future implementation)
JWT_SECRET=CHANGE_THIS_TO_SECURE_RANDOM_STRING
OIDC_ISSUER=https://your-auth-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret

# Logging
LOG_LEVEL=info
```

> **Note:** Update `DB_PASSWORD` and `JWT_SECRET` with secure values!

---

## Database Configuration

### Step 1: Start Database Services

```powershell
# Start Docker services (PostgreSQL, Redis, Kafka)
docker-compose up -d

# Verify services are running
docker-compose ps

# Expected output should show:
# - governance_db (PostgreSQL/TimescaleDB)
# - governance_redis
# - governance_kafka
# - governance_zookeeper
```

### Step 2: Verify Database Connectivity

```powershell
# Connect to PostgreSQL using Docker
docker exec -it governance_db psql -U admin -d governance_platform

# Inside PostgreSQL shell, verify:
\l                                    # List databases
\dt                                   # List tables (will be empty initially)
\q                                    # Quit
```

### Step 3: Database Schema Initialization

The application uses **TypeORM** with `synchronize: true`, which auto-creates tables on startup.

**Tables created automatically:**
- `tenant` - Multi-tenant configuration
- `role` - RBAC roles
- `user_role` - User-to-role assignments
- `cloud_account` - Cloud provider accounts
- `inventory` - Resource inventory
- `cost_record` - Cost tracking
- `budget` - Budget management
- `alert_rule` - Alert configurations
- `audit_event` - Audit logs
- `playbook` - Automation playbooks
- `jit_request` - Just-in-Time access requests

> **Production Warning:** In production, set `synchronize: false` and use migrations instead!

---

## Application Installation

### Step 1: Install Backend Dependencies

```powershell
# Navigate to API directory
cd apps\api

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 2: Install Frontend Dependencies

```powershell
# Navigate to Web directory
cd ..\web

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Build Applications (Production)

```powershell
# Build Backend
cd ..\api
npm run build

# Verify build
dir dist

# Build Frontend
cd ..\web
npm run build

# Verify build
dir .next
```

---

## Admin User Initialization

### Understanding the User System

> **CRITICAL:** The application currently does NOT have a dedicated User entity. Instead:
> - Users are identified by `user_id` (typically email or SSO subject)
> - Authentication is **BYPASSED** in the current `AuthGuard` (demo mode)
> - Admin users are created when onboarding a tenant

### Step 1: Start the Backend API

```powershell
# Navigate to API directory
cd C:\Projects\Cloud-Infra-Application\apps\api

# Start in development mode (auto-reload)
npm run start:dev

# Or start in production mode
npm run start:prod

# API will be available at: http://localhost:3001
```

### Step 2: Verify API is Running

```powershell
# Open new PowerShell terminal
# Test API endpoint
curl http://localhost:3001/tenants

# Expected: Empty array [] (no tenants yet)
```

### Step 3: Create First Tenant with Admin User

The admin user is created during tenant onboarding via the `/tenants/onboard` endpoint.

```powershell
# Create tenant and admin user
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

**Expected Response:**
```json
{
  "id": "uuid-tenant-id",
  "name": "Default Organization",
  "billing_group": "Enterprise",
  "data_retention_days": 365,
  "created_at": "2025-12-12T..."
}
```

This will automatically:
1. Create the tenant
2. Create an "Admin" role with full permissions
3. Assign `admin@company.com` to the Admin role

### Step 4: Verify Admin User Creation

```powershell
# Check roles
curl http://localhost:3001/rbac/permissions?userId=admin@company.com&tenantId=<tenant-id>

# Expected: Array of admin permissions
# ["read:*", "write:*", "delete:*", "manage:roles", "manage:connectors", "manage:policies"]
```

---

## Tenant Configuration

### Step 1: Understanding Multi-Tenancy

Each tenant is an isolated organization with:
- Separate cloud accounts
- Independent RBAC roles
- Isolated budgets and alerts
- Dedicated audit logs

### Step 2: Create Additional Tenants (Optional)

```powershell
# Create additional tenant
$body = @{
    name = "Development Team"
    billing_group = "Engineering"
    data_retention_days = 180
    userId = "dev-admin@company.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/tenants/onboard" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Step 3: View All Tenants

```powershell
# List all tenants
curl http://localhost:3001/tenants
```

### Step 4: Configure Tenant Settings

Currently, tenant configuration includes:
- `name` - Organization name
- `billing_group` - Cost allocation group
- `data_retention_days` - How long to keep audit/cost data
- `auth_provider_config` - OIDC configuration (JSON string)

To update tenant settings, you'll need to add an UPDATE endpoint or modify directly in database.

---

## Production Deployment

### Option 1: Windows Service (Recommended for Windows Server)

#### Install Node.js as Windows Service using nssm

```powershell
# Download NSSM (Non-Sucking Service Manager)
# https://nssm.cc/download

# Install API as service
nssm install CloudGovAPI "C:\Program Files\nodejs\node.exe"
nssm set CloudGovAPI AppDirectory "C:\Projects\Cloud-Infra-Application\apps\api"
nssm set CloudGovAPI AppParameters "dist\main.js"
nssm set CloudGovAPI DisplayName "Cloud Governance API"
nssm set CloudGovAPI Description "Enterprise Multicloud Governance Platform API"
nssm set CloudGovAPI Start SERVICE_AUTO_START

# Start service
nssm start CloudGovAPI

# Verify service status
nssm status CloudGovAPI
```

#### Install Frontend as Service

```powershell
# Install Web as service
nssm install CloudGovWeb "C:\Program Files\nodejs\node.exe"
nssm set CloudGovWeb AppDirectory "C:\Projects\Cloud-Infra-Application\apps\web"
nssm set CloudGovWeb AppParameters "node_modules\next\dist\bin\next start"
nssm set CloudGovWeb DisplayName "Cloud Governance Web"
nssm set CloudGovWeb Description "Enterprise Multicloud Governance Platform Web UI"
nssm set CloudGovWeb Start SERVICE_AUTO_START

# Start service
nssm start CloudGovWeb
```

### Option 2: PM2 Process Manager

```powershell
# Install PM2 globally
npm install -g pm2

# Start API with PM2
cd C:\Projects\Cloud-Infra-Application\apps\api
pm2 start dist\main.js --name cloudgov-api

# Start Web with PM2
cd ..\web
pm2 start "npm run start" --name cloudgov-web

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot (Windows)
pm2 startup
# Follow the instructions provided by the command

# View process status
pm2 status
pm2 logs
```

### Option 3: Docker (Production)

```powershell
# Build production Docker images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start all services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f
```

### Configure Reverse Proxy (IIS or Nginx)

#### Using IIS with URL Rewrite and Application Request Routing

1. **Install URL Rewrite and ARR:**
   - Download from: https://www.iis.net/downloads/microsoft/url-rewrite
   - Download ARR: https://www.iis.net/downloads/microsoft/application-request-routing

2. **Configure URL Rewrite:**

Create `web.config` in IIS root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <!-- API Proxy -->
                <rule name="API Proxy" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://localhost:3001/{R:1}" />
                </rule>
                
                <!-- Web Proxy -->
                <rule name="Web Proxy" stopProcessing="true">
                    <match url="(.*)" />
                    <action type="Rewrite" url="http://localhost:3000/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

#### Using Nginx on Windows

```nginx
# nginx.conf
http {
    upstream api {
        server localhost:3001;
    }
    
    upstream web {
        server localhost:3000;
    }
    
    server {
        listen 80;
        server_name cloudgov.company.com;
        
        # API endpoints
        location /api/ {
            proxy_pass http://api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
        
        # Web application
        location / {
            proxy_pass http://web;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## Go-Live Checklist

### Pre-Production

- [ ] **Environment Variables Configured**
  - Database credentials updated
  - JWT secrets generated and configured
  - OIDC/SSO configured (if applicable)
  
- [ ] **Database Setup**
  - [ ] PostgreSQL installed and running
  - [ ] Database schema synchronized
  - [ ] Backup strategy implemented
  - [ ] Connection pooling configured
  
- [ ] **Application Build**
  - [ ] Backend built successfully (`npm run build` in apps/api)
  - [ ] Frontend built successfully (`npm run build` in apps/web)
  - [ ] No TypeScript compilation errors
  
- [ ] **Security Configuration**
  - [ ] Change default database password
  - [ ] Configure authentication guard (disable demo mode)
  - [ ] Implement proper OIDC/OAuth2 integration
  - [ ] Enable HTTPS/TLS
  - [ ] Configure CORS properly
  - [ ] Set secure JWT secret
  
- [ ] **Tenant Initialization**
  - [ ] First tenant created
  - [ ] Admin user assigned
  - [ ] Roles and permissions verified
  
### Production Deployment

- [ ] **Application Services**
  - [ ] Backend API running and accessible
  - [ ] Frontend web server running
  - [ ] Health endpoints responding
  
- [ ] **Infrastructure Services**
  - [ ] PostgreSQL/TimescaleDB running
  - [ ] Redis running
  - [ ] Kafka + Zookeeper running
  
- [ ] **Networking**
  - [ ] Reverse proxy configured (IIS/Nginx)
  - [ ] Firewall rules configured
  - [ ] SSL certificate installed
  - [ ] DNS records configured
  
- [ ] **Monitoring & Logging**
  - [ ] Application logs being written
  - [ ] Database logs configured
  - [ ] Health check monitoring setup
  - [ ] Alerting configured
  
### Post-Go-Live

- [ ] **Smoke Tests**
  - [ ] Login with admin user
  - [ ] Create/view tenant
  - [ ] View inventory (empty initially)
  - [ ] Create budget
  - [ ] Configure alert rule
  
- [ ] **Integration Tests**
  - [ ] Add cloud account (AWS/Azure/GCP)
  - [ ] Verify inventory sync
  - [ ] Verify cost data collection
  - [ ] Test RBAC permissions
  
- [ ] **Backup Verification**
  - [ ] Database backup working
  - [ ] Backup restore tested
  - [ ] Retention policy configured
  
- [ ] **Documentation**
  - [ ] Admin credentials documented (securely)
  - [ ] Architecture diagram updated
  - [ ] Runbook created for operations team
  - [ ] User training materials prepared

---

## Troubleshooting

### Issue 1: Admin User Cannot Login

**Symptoms:**
- Cannot access admin features
- 401 Unauthorized errors
- User permissions not working

**Root Cause:**
The application currently has authentication BYPASSED in `apps/api/src/guards/auth.guard.ts`.

**Solution:**

1. **Verify tenant was created correctly:**
```powershell
curl http://localhost:3001/tenants
```

2. **Verify admin role was created:**
```sql
-- Connect to database
docker exec -it governance_db psql -U admin -d governance_platform

-- Check roles
SELECT * FROM role WHERE name = 'Admin';

-- Check user-role assignments
SELECT * FROM user_role WHERE user_id = 'admin@company.com';
```

3. **Verify permissions:**
```powershell
curl "http://localhost:3001/rbac/permissions?userId=admin@company.com&tenantId=<TENANT_ID>"
```

4. **Implement proper authentication** (Production):

Edit `apps/api/src/guards/auth.guard.ts`:

```typescript
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];
        
        // TODO: Implement proper JWT/OIDC validation
        // Example with JWT:
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // request.user = decoded;
        
        return true;
    }
}
```

### Issue 2: Cannot Connect to Database

**Symptoms:**
- API fails to start
- Error: `ECONNREFUSED 127.0.0.1:5432`

**Solution:**

1. **Verify Docker is running:**
```powershell
docker ps
```

2. **Check if PostgreSQL container is running:**
```powershell
docker-compose ps
# If not running:
docker-compose up -d timescaledb
```

3. **Check PostgreSQL logs:**
```powershell
docker-compose logs timescaledb
```

4. **Verify connection settings** in `apps/api/src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'governance_platform',
    // ...
}),
```

### Issue 3: Frontend Cannot Connect to Backend

**Symptoms:**
- API calls failing in browser console
- CORS errors
- Network errors

**Solution:**

1. **Verify API is running:**
```powershell
curl http://localhost:3001/tenants
```

2. **Check CORS configuration** in `apps/api/src/main.ts`:
```typescript
app.enableCors({
    origin: ['http://localhost:3000', 'https://your-domain.com'],
    credentials: true
});
```

3. **Update frontend API URL** in `apps/web`:

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Verify API URL in frontend code:**
```typescript
// Should be using process.env.NEXT_PUBLIC_API_URL
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants`);
```

### Issue 4: Tables Not Created in Database

**Symptoms:**
- API starts but queries fail
- Error: `relation "tenant" does not exist`

**Solution:**

1. **Verify synchronize is enabled** in `apps/api/src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
    // ...
    synchronize: true,  // Must be true for auto-creation
}),
```

2. **Check entities are registered:**
```typescript
entities: [
    Tenant, 
    CloudAccount, 
    InventoryEntity, 
    CostRecord, 
    AuditEvent, 
    Playbook, 
    Role, 
    UserRole, 
    JitRequest, 
    Budget, 
    BudgetAlert, 
    AlertRule, 
    AlertEvent
],
```

3. **Restart API to trigger table creation:**
```powershell
# Stop and start
npm run start:dev
```

4. **Manually verify tables:**
```sql
docker exec -it governance_db psql -U admin -d governance_platform
\dt
```

### Issue 5: Port Already in Use

**Symptoms:**
- Error: `EADDRINUSE: address already in use :::3001`

**Solution:**

1. **Find process using the port:**
```powershell
netstat -ano | findstr :3001
# Note the PID (last column)
```

2. **Kill the process:**
```powershell
taskkill /PID <PID> /F
```

3. **Or use a different port:**

Edit `apps/api/src/main.ts`:
```typescript
await app.listen(3002, '0.0.0.0');  // Use port 3002 instead
```

### Issue 6: Tenant Configuration Not Working

**Symptoms:**
- Cannot edit tenant settings
- Changes don't persist

**Root Cause:**
There's no UPDATE endpoint in `TenantController`.

**Solution:**

Add update endpoint to `apps/api/src/controllers/tenant.controller.ts`:

```typescript
@Put(':id')
async update(@Param('id') id: string, @Body() updateDto: any) {
    const tenant = await this.tenantService.findOne(id);
    if (!tenant) throw new Error('Tenant not found');
    
    Object.assign(tenant, updateDto);
    return this.tenantService.create(tenant);
}
```

Add update method to `apps/api/src/services/tenant.service.ts`:

```typescript
async update(id: string, updates: Partial<Tenant>): Promise<Tenant> {
    await this.tenantRepository.update(id, updates);
    return this.findOne(id);
}
```

---

## Additional Resources

### Useful Commands

```powershell
# View all running services
pm2 status

# View API logs
pm2 logs cloudgov-api

# Restart services
pm2 restart all

# View database tables
docker exec -it governance_db psql -U admin -d governance_platform -c "\dt"

# Backup database
docker exec governance_db pg_dump -U admin governance_platform > backup.sql

# Restore database
docker exec -i governance_db psql -U admin governance_platform < backup.sql

# Check Docker services
docker-compose ps
docker-compose logs -f

# Rebuild and restart
npm run build
pm2 restart cloudgov-api
```

### Database Queries

```sql
-- View all tenants
SELECT * FROM tenant;

-- View all roles
SELECT * FROM role;

-- View user-role assignments
SELECT ur.*, r.name as role_name, t.name as tenant_name
FROM user_role ur
JOIN role r ON ur.role_id = r.id
JOIN tenant t ON ur.tenant_id = t.id;

-- View all permissions for a user
SELECT DISTINCT unnest(r.permissions) as permission
FROM user_role ur
JOIN role r ON ur.role_id = r.id
WHERE ur.user_id = 'admin@company.com';
```

### Support Contacts

**Technical Issues:** platform-team@company.com  
**DevOps Support:** devops@company.com  
**Documentation:** [Internal Wiki Link]

---

## Next Steps After Deployment

1. **Configure Cloud Connectors:**
   - Add AWS credentials
   - Add Azure service principals
   - Add GCP service accounts

2. **Setup RBAC:**
   - Define additional roles (Viewer, FinOps Manager, etc.)
   - Assign users to appropriate roles
   - Test permission boundaries

3. **Configure Alerting:**
   - Setup budget alerts
   - Configure compliance scanning
   - Setup notification channels

4. **Enable Monitoring:**
   - Install Prometheus/Grafana
   - Configure application metrics
   - Setup health checks

5. **Implement Authentication:**
   - Configure OIDC provider
   - Update AuthGuard with token validation
   - Test SSO integration

6. **Production Hardening:**
   - Disable synchronize (use migrations)
   - Enable rate limiting
   - Configure WAF rules
   - Setup DDoS protection

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-12  
**Author:** Platform Engineering Team
