# Operational Runbooks

## Table of Contents
1. [Incident Response](#incident-response)
2. [Maintenance Procedures](#maintenance-procedures)
3. [Monitoring & Alerting](#monitoring--alerting)
4. [Backup & Recovery](#backup--recovery)

---

## Incident Response

### High CPU/Memory Alert
**Severity:** P2

**Steps:**
1. Check `/alerts/events` API for triggered alerts
2. Identify affected resources via `/inventory`
3. Determine if rightsizing needed via `/optimization/recommendations`
4. Apply remediation or scale resources
5. Acknowledge alert via `PUT /alerts/events/:id/acknowledge`

### Budget Exceeded
**Severity:** P1

**Steps:**
1. Check `/budgets/:id/status` for current spend
2. Review `/cost/forecast` for projections
3. Identify top cost drivers in inventory
4. Execute cost optimization playbooks
5. Update budget thresholds if needed

### Compliance Violation Detected
**Severity:** P2 - P1 (depends on severity)

**Steps:**
1. Run `/compliance/scan` to get latest violations
2. Review failed checks and affected resources
3. Execute remediation playbooks
4. Re-scan to verify fixes
5. Document in audit log

---

## Maintenance Procedures

### Database Backup
**Frequency:** Daily

```bash
# Backup PostgreSQL
pg_dump governance_platform > backup_$(date +%Y%m%d).sql

# Upload to S3
aws s3 cp backup_$(date +%Y%m%d).sql s3://backup-bucket/db/
```

### Log Rotation
**Frequency:** Weekly

```bash
# Rotate application logs
find /var/log/cloudgov -name "*.log" -mtime +7 -delete
```

### Certificate Renewal
**Frequency:** Every 90 days

```bash
# Renew Let's Encrypt certificates
certbot renew --nginx
systemctl reload nginx
```

---

## Monitoring & Alerting

### Key Metrics to Monitor
- **API Response Time:** < 500ms (p95)
- **Database Connections:** < 80% of max
- **Budget Alert Coverage:** 100% of active budgets
- **Compliance Score:** > 85%

### Dashboard URLs
- **Grafana:** http://monitoring.internal/d/cloudgov
- **Application Logs:** http://logs.internal

### Alert Channels
- **Email:** ops-team@company.com
- **Slack:** #cloudgov-alerts
- **PagerDuty:** cloudgov-oncall

---

## Backup & Recovery

### RTO/RPO
- **RTO (Recovery Time Objective):** 4 hours
- **RPO (Recovery Point Objective):** 1 hour

### Disaster Recovery Procedure
1. **Assess Impact:** Determine affected services
2. **Restore Database:** 
   ```bash
   psql governance_platform < backup_latest.sql
   ```
3. **Restart Services:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```
4. **Verify Health:**
   - Check `/health` endpoint
   - Run smoke tests
   - Verify budget alerts triggering

### Rollback Procedure
```bash
# Rollback to previous Docker image
docker-compose down
docker tag cloudgov-api:previous cloudgov-api:latest
docker-compose up -d
```

---

## Contact Information

**On-Call Engineer:** ops-oncall@company.com  
**Platform Owner:** platform-team@company.com  
**Escalation:** Director of Engineering
