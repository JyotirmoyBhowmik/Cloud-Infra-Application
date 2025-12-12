# Production Deployment Guide

## Prerequisites
- Kubernetes cluster (EKS, AKS, or GKE)
- PostgreSQL database
- Redis instance
- Kafka cluster
- Domain with SSL certificate

---

## Step 1: Prepare Infrastructure

### Database Setup
```bash
# Create PostgreSQL database
createdb governance_platform

# Run migrations (if using TypeORM migrations)
npm run migration:run
```

### Environment Variables
Create `.env.production`:
```bash
# Database
DB_HOST=postgres.production.internal
DB_USER=cloudgov_app
DB_PASSWORD=<secure-password>
DB_NAME=governance_platform

# Redis
REDIS_URL=redis://redis.production.internal:6379

# Kafka
KAFKA_BROKERS=kafka1.production.internal:9092,kafka2.production.internal:9092

# Auth
JWT_SECRET=<generate-secure-secret>
OIDC_ISSUER=https://auth.company.com
OIDC_CLIENT_ID=cloudgov-prod
OIDC_CLIENT_SECRET=<secret>

# Application
NODE_ENV=production
API_URL=https://api.cloudgov.company.com
WEB_URL=https://cloudgov.company.com
```

---

## Step 2: Build Docker Images

```bash
# Build API
cd apps/api
docker build -t cloudgov-api:v1.0.0 .

# Build Web
cd apps/web
docker build -t cloudgov-web:v1.0.0 .

# Push to registry
docker tag cloudgov-api:v1.0.0 registry.company.com/cloudgov-api:v1.0.0
docker push registry.company.com/cloudgov-api:v1.0.0

docker tag cloudgov-web:v1.0.0 registry.company.com/cloudgov-web:v1.0.0
docker push registry.company.com/cloudgov-web:v1.0.0
```

---

## Step 3: Deploy to Kubernetes

### Update Kubernetes Manifests
Edit `infra/k8s-deployment.yaml`:
```yaml
# Update image references
image: registry.company.com/cloudgov-api:v1.0.0
image: registry.company.com/cloudgov-web:v1.0.0

# Add resource limits
resources:
  limits:
    cpu: "2"
    memory: "4Gi"
  requests:
    cpu: "1"
    memory: "2Gi"
```

### Deploy
```bash
# Create namespace
kubectl create namespace cloudgov

# Create secrets
kubectl create secret generic cloudgov-secrets \
  --from-env-file=.env.production \
  -n cloudgov

# Apply manifests
kubectl apply -f infra/k8s-deployment.yaml -n cloudgov

# Wait for rollout
kubectl rollout status deployment/cloudgov-api -n cloudgov
kubectl rollout status deployment/cloudgov-web -n cloudgov
```

---

## Step 4: Configure Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cloudgov-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - cloudgov.company.com
    - api.cloudgov.company.com
    secretName: cloudgov-tls
  rules:
  - host: cloudgov.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudgov-web
            port:
              number: 3000
  - host: api.cloudgov.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudgov-api
            port:
              number: 3001
```

---

## Step 5: Post-Deployment Verification

### Health Checks
```bash
# API health
curl https://api.cloudgov.company.com/health

# Web health
curl https://cloudgov.company.com/

# Database connectivity
kubectl exec -it deployment/cloudgov-api -n cloudgov -- \
  npm run db:check
```

### Create Initial Tenant
```bash
curl -X POST https://api.cloudgov.company.com/tenants/onboard \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Tenant",
    "userId": "admin@company.com"
  }'
```

---

## Monitoring

### Prometheus Metrics
Expose metrics endpoint:
```typescript
// In main.ts
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### Grafana Dashboard
Import dashboard from `infra/grafana-dashboard.json`

---

## Rollback Procedure

```bash
# Rollback to previous version
kubectl rollout undo deployment/cloudgov-api -n cloudgov
kubectl rollout undo deployment/cloudgov-web -n cloudgov

# Verify
kubectl rollout status deployment/cloudgov-api -n cloudgov
```

---

## Security Checklist
- [ ] All secrets stored in Kubernetes secrets (not env files)
- [ ] SSL/TLS certificates configured
- [ ] Database credentials rotated from defaults
- [ ] Network policies applied
- [ ] RBAC policies configured
- [  ] Pod security policies enabled
- [ ] Ingress rate limiting configured

---

## Support Contacts
**Engineering:** platform-team@company.com  
**DevOps:** devops@company.com  
**On-Call:** Use PagerDuty escalation policy
