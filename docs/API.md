# API Documentation

## Overview
The Cloud Governance Platform API provides comprehensive multicloud management capabilities including inventory, cost analytics, compliance, and automation.

**Base URL:** `http://localhost:3001`  
**Authentication:** Bearer token (JWT)

---

## Tenants

### Create Tenant (Onboarding)
```
POST /tenants/onboard
```
**Body:**
```json
{
  "name": "Acme Corp",
  "billing_group": "enterprise",
  "data_retention_days": 365,
  "userId": "user-123"
}
```

---

## RBAC & Access

### Create Role
```
POST /rbac/roles
```

### Assign Role to User
```
POST /rbac/assign
```

### Request JIT Access
```
POST /rbac/jit/request
```

### Approve JIT Request
```
POST /rbac/jit/approve
```

---

## Budgets

### Create Budget
```
POST /budgets
```
**Body:**
```json
{
  "name": "AWS Monthly",
  "amount": 10000,
  "period": "MONTHLY",
  "scope": "provider:aws",
  "alert_thresholds": [80, 100],
  "tenant_id": "tenant-123"
}
```

### Get Budget Status
```
GET /budgets/:id/status
```

### Evaluate Budgets (Trigger Alerts)
```
POST /budgets/evaluate
```

---

## Alerts

### Create Alert Rule
```
POST /alerts/rules
```
**Body:**
```json
{
  "name": "High CPU Alert",
  "metric_type": "CPU",
  "threshold": 80,
  "operator": "GT",
  "notification_channels": [
    {
      "type": "email",
      "config": { "to": "admin@example.com" }
    }
  ],
  "tenant_id": "tenant-123"
}
```

### Get Alert Events
```
GET /alerts/events?tenantId=tenant-123
```

### Acknowledge Alert
```
PUT /alerts/events/:id/acknowledge
```

---

## Compliance

### Get Compliance Rules
```
GET /compliance/rules
```

### Scan Resources
```
POST /compliance/scan?tenantId=tenant-123
```

### Get Compliance Score
```
GET /compliance/score?tenantId=tenant-123
```

---

## Inventory

### Get All Resources
```
GET /inventory?tenantId=tenant-123
```

---

## Cost & FinOps

### Get Cost Forecast
```
GET /cost/forecast?tenantId=tenant-123
```

### Get Optimization Recommendations
```
GET /optimization/recommendations?tenantId=tenant-123
```
