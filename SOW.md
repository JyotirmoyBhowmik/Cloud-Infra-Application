# Statement of Work (SoW)
**Project:** Enterprise Multicloud Governance, Monitoring & Cost Planning Platform  
**Date:** December 11, 2025  
**Prepared for:** Jyotirmoy Bhowmik (Client)  
**Email:** jyotirmoy.bhowmik@gmail.com | **Contact:** +91-9774135614  
**Prepared by:** Jyotirmoy Bhowmik (Developer)  

---

## 1. Executive Summary

This Statement of Work (SoW) defines the comprehensive scope, architecture, implementation phases, and deliverables for a **single-pane-of-glass enterprise application**. This platform transforms standard monitoring into a comprehensive ecosystem for **Azure, AWS, and GCP**, incorporating **Zero Trust security**, **FinOps**, **Governance**, and **Hyper-scale observability**.

The solution provides:
*   **Security:** Zero Trust architecture with End-to-End Encryption, Just-In-Time (JIT) access, and Immutable Audit Logs.
*   **Governance:** Automated compliance (ISO 27001, SOC 2), Tag Governance, and auto-remediation.
*   **FinOps:** Real-time spend tracking, ML-based forecasting, and automated Optimization.
*   **Operations:** Chaos Engineering-tested resilience, extended Observability, and Incident Management.

---

## 2. Objectives

1.  **Zero Trust Security:** Enforce least privilege, continuous verification, and conditional access across all cloud connectors.
2.  **Enterprise Scalability:** Deliver a microservices-based, multi-region architecture capable of elastic scaling via Kubernetes HPA.
3.  **Unified Observability:** Centralize logs, metrics, and traces (ELK/Datadog integration) with RTO/RPO-backed Disaster Recovery.
4.  **Intelligent FinOps:** Utilize Machine Learning for spend prediction, capacity planning, and rightsizing.
5.  **Extensibility:** Provide an API-first design with a plugin framework for custom enterprise integrations (ITSM, SIEM).

---

## 3. Architecture & Technology Stack

### 3.1 Architecture Overview
*   **Microservices:** Independent services for Monitoring, Cost, Reporting, and Auth to ensure fault isolation.
*   **Integration Model:** **Hybrid Approach** combining **Event-Driven (Push)** for low-latency alerts and **API Polling (Pull)** for comprehensive metadata/cost sync.
*   **Multi-region Deployment:** High availability with geo-redundancy.
*   **Elastic Scaling:** Auto-scaling based on workload metrics (Kubernetes HPA).
*   **Data Partitioning:** Tenant-wise isolation using Row-Level Security (RLS) or Schema Separation.

### 3.2 Technology Stack
*   **Frontend (Dashboard):** React + Next.js (TypeScript), MUI (Material UI), ECharts/ECharts GL for visualization.
*   **Backend APIs:** Node.js (NestJS) or Python (FastAPI) microservices exposing REST/GraphQL.
*   **Data Layer:**
    *   **Relational:** PostgreSQL (Config, Tenants, RBAC, Catalog).
    *   **Time-Series:** TimescaleDB or ClickHouse (Metrics, Cost).
    *   **Object Storage:** S3/Blob/GCS (Reports, Exports, Tamper-proof Logs).
    *   **Caching:** Redis.
*   **Messaging:** Kafka or NATS (Real-time Event Streaming).
*   **Jobs:** Celery/RQ or BullMQ for ingestion pipelines and scheduled tasks.
*   **Infrastructure:** Kubernetes (AKS/EKS/GKE), Helm, Terraform (IaC).
*   **CI/CD:** GitHub Actions/Azure DevOps.

---

## 4. Feature Design & Dashboard Modules

### 4.1 UI Experience
*   **Card-Based Layout:** 4-6 widgets per screen (Overview cards top-row, Detailed cards lower-row).
*   **Visualizations:** Responsive charts, Heatmaps (Events), Sunburst (Cost), Topology maps.
*   **Customization:** Drag-and-drop widgets, Light/Dark themes, Localization.

### 4.2 Functional Dashboards
1.  **Overview:** Global health, top spenders, recent alerts, risk score.
2.  **Inventory:** Global asset catalog, Search/Filter, Bulk actions, Tag compliance.
3.  **Monitoring:** Real-time metrics, Health checks, SLA tracking, Topology views.
4.  **Cost / FinOps:** Spend trends, Budgets, ML Forecasts, Cost Allocation (Team/Project), Anomalies.
5.  **Governance & Policy:** Compliance scores (CIS, SOC2), Violated policies, Auto-remediation status.
6.  **Audit:** Unified immutable timeline of user actions and cloud events.

### 4.3 Extended Admin Modules
1.  **Incident Response:** Aggregated security/ops incidents, Integration with PagerDuty/Opsgenie, Link to Runbooks.
2.  **Playbooks / Automation:** Automation console (Scale-out, Rotate Creds), Approval workflows, Auto-trigger from alerts.
3.  **Backup & DR Monitoring:** Backup success rates, RTO/RPO tracking, DR readiness scores.
4.  **Support / Ticketing:** Integration with ServiceNow/Jira, Widget for open tickets.
5.  **IAM & Access Review:** Identity metrics, Risk highlights (Over-privileged), Entitlement review campaigns (JIT).
6.  **Lifecycle Management:** Self-service provisioning (Service Catalog), Decommissioning stale assets.

---

## 5. Implementation Phases (Project Plan)

*Note: Timelines are estimates for planning purposes.*

### Phase 1: Discovery and Design
*   **Deliverables:** Requirements specification, Detailed Data Model, Security Design (Zero Trust), UI Wireframes, Architecture Diagrams.

### Phase 2: Foundations
*   **Deliverables:** Auth/RBAC implementation (SSO/MFA), Multitenant Scaffolding (Schema/RLS), Base API setup, CI/CD Pipelines setup.

### Phase 3: Connectors v1 (Hybrid Core)
*   **Deliverables:** Read-only Inventory + Metrics ingestion for Azure/AWS/GCP. High-throughput Event Bus setup (Kafka/NATS). Basic Cost ingestion.

### Phase 4: Dashboards and Alerts
*   **Deliverables:** Monitoring views (Card-based UI), Alert Engine (Thresholds/Anomalies), Notifications (Slack/Email/PagerDuty).

### Phase 5: FinOps and Planning
*   **Deliverables:** Budgets, ML Forecasting Engine (Prophet/ARIMA), Rightsizing recommendations, Reservation modeling.

### Phase 6: Hardening and Compliance
*   **Deliverables:** Immutable Audit Logs, Compliance Framework Dashboards (CIS/SOC2), Security Tests (Chaos Engineering/Pen-test).

### Phase 7: UAT and Rollout
*   **Deliverables:** Test Plans, User/Admin Documentation, Operational Runbooks, Admin Training, Final Handover.

---

## 6. Data Model Specification

### 6.1 Core Entities
*   **Tenant:** `id`, `name`, `billing_group`, `data_retention`, `auth_provider` (OIDC config).
*   **CloudAccount:** `provider`, `account_id`, `credential_ref`, `tags`, `region_scope`, `owner_tenant_id`.
*   **InventoryEntity:** `provider`, `native_id`, `type`, `region`, `state`, `config_json`, `tags`.
*   **MetricSample:** `entity_id`, `metric_name`, `value`, `unit`, `timestamp`.
*   **CostRecord:** `provider`, `account_id`, `tenant_id`, `service`, `usage_amount`, `cost`, `currency`, `timestamp`, `tags`.
*   **AuditEvent:** `actor`, `action`, `target`, `details`, `timestamp`, `tenant_id`, `source`, `hash`.

---

## 7. Security, Compliance & Governance

### 7.1 Zero Trust Security
*   **Authentication:** OIDC/OAuth2 (Azure AD, Okta), Enforced MFA.
*   **Authorization:** Fine-grained RBAC (Viewer, Operator, FinOps, Security, Admin).
*   **Access:** Just-in-Time (JIT) access requests with auto-expiry.
*   **Encryption:** End-to-End (TLS in transit, KMS/Vault at rest).

### 7.2 Compliance Frameworks
*   Built-in checks and dashboards for: **ISO 27001**, **SOC 2 Type I/II**, **GDPR**, **HIPAA**, **PCI DSS**.
*   **Audit Logging:** Immutable logs with tamper-proof storage for regulatory audits.

### 7.3 Observability & Resilience
*   **Chaos Engineering:** Controlled fault injection testing to verify resilience.
*   **Disaster Recovery:** Automated backups, failover clusters, tracked RTO/RPO.

---

## 8. Integration Specifics

### 8.1 Cloud Connectors
*   **Azure:** Resource Graph (Inventory), Azure Monitor (Metrics), Cost Management (Exports), Event Grid (Real-time).
*   **AWS:** STS AssumeRole (Access), CloudWatch (Metrics), CUR (Cost), Config (Inventory), EventBridge (Real-time).
*   **GCP:** Workload Identity Federation, Cloud Asset Inventory, Cloud Monitoring, BigQuery Billing Export, Pub/Sub.

### 8.2 External Integrations
*   **Plugin Framework:** Allow adding custom connectors/modules.
*   **Hooks:** Connect with **ServiceNow/Jira** (ITSM), **CI/CD Pipelines**, **SIEM** tools.

---

## 9. Example Workflows

### 9.1 Tenant Onboarding
1.  **Create Tenant:** Define metadata & retention.
2.  **Connect Identity:** Configure OIDC/SSO.
3.  **Add Accounts:** Wizard for Azure SP / AWS Role / GCP Service Account.
4.  **Example Role Map:** Map "Finance Group" to "FinOps Role".

### 9.2 FinOps Optimization
1.  **Forecast:** Generate 3-6 month ML-based spend prediction.
2.  **Design Budget:** Set threshold alerts (50/80%).
3.  **Analyze:** Detect anomaly (e.g., Runaway Lambda).
4.  **Remediate:** Trigger Playbook to cap scale.

### 9.3 Incident Response
1.  **Detect:** High Error Rate alert (via Kafka Stream).
2.  **Notify:** PagerDuty alert to on-call engineer.
3.  **Investigate:** Drill down to logs/metrics in Dashboard.
4.  **Act:** Execute "Rollback Deployment" playbook.
5.  **Audit:** Record action in immutable log.

---

## 10. Operational & Non-Functional Requirements

*   **Scalability:** Process >1M resources, Ingest >10k metrics/sec.
*   **Reliability:** Ingestion retries, Idempotent upserts, Backpressure handling.
*   **Performance:** P95 API latency < 300 ms.
*   **Observability:** Centralized Logging (ELK), Distributed Tracing.
*   **Compliance:** Least privilege, Data minimization.

---

## 11. Acceptance Criteria
*   **Coverage:** Full Inventory/Metric/Cost visibility across Azure/AWS/GCP.
*   **Security:** Zero Trust principles verified; Penetration test passed.
*   **Resilience:** System recovers from Chaos tests within RTO.
*   **FinOps:** Recommendations demonstrably identify savings.
*   **Usability:** Dashboards render correctly on Desktop/Mobile with accurate data.

---

## 12. Appendices

### Appendix A: Component Dependency Matrix
| Service | Dependencies |
| :--- | :--- |
| **Ingestion** | Kafka, DBs, Cloud APIs (Pull), Event Streams (Push) |
| **ML Engine** | Cost DB, Historical Data, Pricing APIs |
| **Frontend** | API Gateway, CDN |

### Appendix B: Roles & Responsibilities
*   **Contractor:** Development, Testing (Chaos/Pen-test), Documentation, Deployment.
*   **Client:** Cloud Access (Test Accounts), IdP Configuration, Requirements Sign-off.

---

**Signed:**

_________________________  
**Jyotirmoy Bhowmik**  
*(Developer)*

_________________________  
**[Client Name/Signature]**  
*(Client)*
