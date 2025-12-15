# Admin User Setup & Windows Deployment

This directory contains comprehensive documentation for deploying and managing the Enterprise Multicloud Governance Platform on Windows.

## 📚 Documentation Index

### Getting Started

- **[QUICK_START.md](./QUICK_START.md)** - Fast-track setup guide (15 minutes)
  - For developers who need to get running quickly
  - Step-by-step local development setup
  - Common commands and troubleshooting

### Deployment

- **[WINDOWS_DEPLOYMENT.md](./WINDOWS_DEPLOYMENT.md)** - Complete Windows deployment guide
  - Prerequisites and system requirements
  - Development to production deployment
  - Admin user initialization
  - Tenant configuration
  - Production deployment options (Windows Service, PM2, Docker)
  - Go-live checklist
  - Comprehensive troubleshooting

### Architecture & APIs

- **[MULTICLOUD_ARCHITECTURE.md](./MULTICLOUD_ARCHITECTURE.md)** - System architecture
- **[API.md](./API.md)** - API endpoint documentation
- **[RUNBOOK.md](./RUNBOOK.md)** - Operational procedures

### Deployment Guide

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Kubernetes deployment guide

---

## 🚀 Quick Links

### For First-Time Setup

1. Read [QUICK_START.md](./QUICK_START.md)
2. Run initialization script: `.\scripts\initialize-platform.ps1`
3. Access the application: http://localhost:3000

### For Production Deployment

1. Review [WINDOWS_DEPLOYMENT.md](./WINDOWS_DEPLOYMENT.md)
2. Complete the go-live checklist
3. Follow production deployment procedures
4. Configure monitoring and backups

---

## 🔧 Admin User Setup

### Understanding the System

The application uses a **tenant-based user model**:

- **No dedicated User table** - Users are tracked by `user_id` strings (typically email)
- **Multi-tenant RBAC** - Users have roles within specific tenants
- **Admin created via onboarding** - First admin user is created when onboarding a tenant

### Creating the First Admin User

**Option 1: Using PowerShell Script (Recommended)**

```powershell
# Run from project root
.\scripts\initialize-platform.ps1
```

**Option 2: Manual API Call**

```powershell
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

This will:
1. Create the tenant
2. Create an "Admin" role with full permissions
3. Assign `admin@company.com` to the Admin role

### Verifying Admin Setup

```powershell
# Get tenant ID from previous response
$tenantId = "your-tenant-id"

# Check admin permissions
curl "http://localhost:3001/rbac/permissions?userId=admin@company.com&tenantId=$tenantId"

# Expected output:
# ["read:*", "write:*", "delete:*", "manage:roles", "manage:connectors", "manage:policies"]
```

---

## 🔒 Authentication Status

> **⚠️ IMPORTANT:** The application currently has authentication **bypassed** for demo purposes.

**Current State:**
- All API requests are allowed (no token validation)
- AuthGuard at `apps/api/src/guards/auth.guard.ts` returns `true` for all requests
- No login page or session management

**Production Recommendations:**
1. Implement proper JWT authentication
2. Add OIDC/OAuth2 integration
3. Create User entity with credentials
4. Add login page and session management

See the implementation plan in the artifacts directory for detailed steps.

---

## 📋 Common Tasks

### Create Additional Tenants

```powershell
$body = @{
    name = "Engineering Team"
    billing_group = "Engineering"
    data_retention_days = 180
    userId = "eng-admin@company.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/tenants/onboard" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Update Tenant Configuration

```powershell
$tenantId = "your-tenant-id"
$updates = @{
    name = "Updated Organization Name"
    billing_group = "New Billing Group"
    data_retention_days = 730
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/tenants/$tenantId" `
    -Method PUT `
    -Body $updates `
    -ContentType "application/json"
```

### Assign User to Role

```powershell
$body = @{
    tenantId = "tenant-uuid"
    userId = "user@company.com"
    roleId = "role-uuid"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/rbac/assign" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Create Custom Role

```powershell
$body = @{
    tenantId = "tenant-uuid"
    name = "FinOps Manager"
    permissions = @(
        "read:*",
        "write:budgets",
        "write:cost",
        "manage:optimization"
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/rbac/roles" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

---

## 🐛 Troubleshooting

### Admin User Not Working

**Symptoms:** Cannot access admin features or manage tenants

**Solutions:**

1. **Verify tenant was created:**
   ```powershell
   curl http://localhost:3001/tenants
   ```

2. **Check admin role exists:**
   ```sql
   docker exec -it governance_db psql -U admin -d governance_platform
   SELECT * FROM role WHERE name = 'Admin';
   ```

3. **Verify user-role assignment:**
   ```sql
   SELECT * FROM user_role WHERE user_id = 'admin@company.com';
   ```

4. **Re-run tenant onboarding** if setup was incomplete

### Cannot Edit Tenant

**Symptom:** No way to update tenant configuration

**Solution:** This has been fixed! Use the new `PUT /tenants/:id` endpoint:

```powershell
$updates = @{ name = "New Name" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3001/tenants/$tenantId" `
    -Method PUT -Body $updates -ContentType "application/json"
```

### Database Connection Issues

**Symptoms:** API fails to start, connection refused errors

**Solutions:**

1. **Start Docker services:**
   ```powershell
   docker-compose up -d
   ```

2. **Verify PostgreSQL is running:**
   ```powershell
   docker-compose ps
   docker exec -it governance_db pg_isready -U admin
   ```

3. **Check logs:**
   ```powershell
   docker-compose logs timescaledb
   ```

For more troubleshooting, see [WINDOWS_DEPLOYMENT.md](./WINDOWS_DEPLOYMENT.md#troubleshooting).

---

## 📞 Support

For additional help:

- **Quick Start Issues:** See [QUICK_START.md](./QUICK_START.md)
- **Deployment Issues:** See [WINDOWS_DEPLOYMENT.md](./WINDOWS_DEPLOYMENT.md#troubleshooting)
- **API Questions:** See [API.md](./API.md)
- **Operations:** See [RUNBOOK.md](./RUNBOOK.md)

---

## 📝 Recent Updates

### 2025-12-12
- ✅ Added comprehensive Windows deployment documentation
- ✅ Created PowerShell initialization script
- ✅ Implemented tenant UPDATE endpoint (`PUT /tenants/:id`)
- ✅ Added quick start guide for developers
- ✅ Documented admin user setup process
- ✅ Created troubleshooting guides

---

**Documentation Version:** 1.0  
**Last Updated:** 2025-12-12
