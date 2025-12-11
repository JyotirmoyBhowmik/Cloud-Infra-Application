# Project Task List: Enterprise Multicloud Governance Platform

Based on the [Statement of Work](./SOW.md), this task list tracks the implementation phases and detailed activities required to deliver the platform.

## Phase 1: Discovery and Design
- [x] **Requirements Gathering**
    - [x] Conduct workshops with FinOps, Security, and Ops stakeholders.
    - [x] Define detailed functional requirements for all 3 clouds (Azure/AWS/GCP).
    - [x] Finalize Data Retention and Compliance policies.
- [x] **Architecture Design**
    - [x] Create detailed Microservices Architecture Diagram.
    - [x] Design Zero Trust Security Model (Identity flows, Network segmentation).
    - [x] Define API Specifications (OpenAPI/Swagger) for core services (NestJS).
- [x] **Data Modeling**
    - [x] Finalize SQL Schemas (PostgreSQL) for Tenants, RBAC, and Inventory.
    - [x] Finalize Time-Series Schemas (TimescaleDB/ClickHouse) for Metrics and Cost.
- [x] **UI/UX Design**
    - [x] Create High-fidelity Wireframes for Global Dashboard (Implemented).
    - [x] Design Card-based widgets for Cost, Ops, and Alerts views (Implemented).
    - [x] Define Component Library (MUI theme customization).

## Phase 2: Foundations
- [x] **Infrastructure Setup**
    - [x] Initialize Git Repositories (Monorepo via `apps/` structure).
    - [x] Set up CI/CD Pipelines (GitHub Actions) with linting and testing.
    - [x] Provision Core Infrastructure (Docker Compose for TimescaleDB/Redis/Kafka).
- [ ] **Authentication & Authorization**
    - [x] Implement Auth Guard (Basic).
    - [ ] Implement OIDC/SSO Integration (Azure AD, Okta).
    - [x] Implement RBAC Service with fine-grained scopes.
    - [x] Implement Just-In-Time (JIT) Access Request workflow.
- [x] **API Framework**
    - [x] Scaffold NestJS microservices (`apps/api`).
    - [x] Set up API Gateway and Inter-service communication (Modules).
- [ ] **Multi-tenancy**
    - [x] Implement Tenant Service & Controller.
    - [x] Define Tenant Entity.
    - [ ] Implement Tenant Onboarding workflow.
    - [ ] Configure Row-Level Security (RLS) in PostgreSQL.
- [x] **Frontend Framework**
    - [x] Scaffold Next.js Frontend (`apps/web`).
    - [x] Create sidebar and layout structure.

## Phase 3: Cloud Connectors (Hybrid Core)
- [ ] **Azure Connector**
    - [x] Service Stub Implemented.
    - [ ] Implement Resource Graph Ingestion (Inventory).
    - [ ] Implement Azure Monitor Metrics Ingestion.
    - [ ] Implement Cost Management Export Ingestion.
    - [ ] Set up Event Grid integration for real-time alerts.
- [ ] **AWS Connector**
    - [x] Service Stub Implemented.
    - [ ] Implement STS AssumeRole logic.
    - [ ] Implement CloudWatch Metrics Ingestion.
    - [ ] Implement CUR (Cost & Usage Report) Pipeline (S3/Athena).
    - [ ] Set up EventBridge integration.
- [ ] **GCP Connector**
    - [x] Service Stub Implemented.
    - [ ] Implement Workload Identity Federation.
    - [ ] Implement Cloud Asset Inventory Ingestion.
    - [ ] Implement Billing Export (BigQuery) Ingestion.
    - [ ] Set up Pub/Sub integration.
- [ ] **Data Processing**
    - [x] Defined schemas for Inventory, Cost, and Metrics.
    - [x] Created Mock Services for local development (`InventoryService`, `CostService`).
    - [ ] processing pipeline (Kafka Consumers) for normalizing inventory data.
    - [ ] Implement idempotent creation of InventoryEntities and MetricSamples.

## Phase 4: Dashboards and Observability
- [x] **Frontend Development**
    - [x] Build Global Overview Dashboard (Health, Spend, Risk) - `apps/web/app/dashboard`.
    - [x] Build Inventory Explorer (Search, Filter, Tags) - `apps/web/app/inventory`.
    - [x] Build Governance/Compliance View - `apps/web/app/governance`.
    - [x] Build Support/Ticketing View - `apps/web/app/support`.
    - [x] Build IAM/Access Reviews - `apps/web/app/iam-reviews`.
- [ ] **Alerting Engine**
    - [x] Created `AlertController` and Service structure (Mock).
    - [ ] Implement backend logic for threshold evaluation.
    - [ ] Integrate Notification Channels (Email, Slack, PagerDuty).
    - [ ] Create Alert Management UI (Ack, Snooze, Escalate).
- [ ] **Admin Modules**
    - [x] Build Tenant Settings - `apps/web/app/settings`.
    - [ ] Build User Management and Application Audit Log views.

## Phase 5: FinOps and Planning
- [ ] **Cost Analytics**
    - [x] Implement Cost Entity.
    - [x] Build Cost Dashboard (Trends, Allocation, Forecasts) - `apps/web/app/finops`.
    - [x] Implement Mock Forecasting Service with confidence intervals.
    - [ ] Implement Daily/Monthly Spend aggregation logic.
    - [ ] Implement Forecasting Engine (Prophet/ARIMA integration - Real).
- [ ] **Optimization**
    - [x] Created `OptimizationService`.
    - [x] Develop Rightsizing Heuristics (Logic in Service).
    - [ ] Implement Reservation Recommendations (RI/Savings Plans).
- [ ] **Budgets**
    - [ ] Implement Budget creation and tracking logic.
    - [ ] Implement Budget Alert triggers.

## Phase 6: Hardening and Compliance
- [ ] **Security & Compliance**
    - [x] Build Compliance Dashboard UI Mockups.
    - [x] Define Audit Event entities and Service (`audit.service.ts`).
    - [ ] Implement Compliance Scanners (CIS, SOC2, policies).
    - [ ] Implement Immutable Audit Logging (Tamper-proof storage).
- [ ] **Resilience Testing**
    - [ ] Perform Chaos Engineering tests (Service failures, Latency injection).
    - [ ] Verify Disaster Recovery (Backup/Restore, Region failover).
- [ ] **Security Testing**
    - [ ] Conduct Logic Penetration Testing.
    - [ ] Perform Static/Dynamic Code Analysis (SAST/DAST).

## Phase 7: Deployment & Handover
- [ ] **Deployability**
    - [x] Create Dockerfiles.
    - [x] Create CI/CD Workflows (`.github/workflows`).
    - [x] Create Terraform Manifests (`infra/`).
    - [x] Implement Unit Tests for Core Services.
- [ ] **UAT**
    - [ ] Deploy to Staging environment.
    - [ ] Conduct User Acceptance Testing with stakeholders.
    - [ ] Fix identified defects.
- [x] **Documentation**
    - [x] SOW Created.
    - [x] README with Setup Instructions Created.
    - [x] Completion Report Created.
    - [ ] Finalize Developer API Documentation.
    - [ ] Write Operational Runbooks (Incident Response, Maintenance).
    - [ ] Create User Guides and Admin Manuals.
- [ ] **Production Launch**
    - [ ] Deploy to Production environment.
    - [ ] Perform Production Verification Testing (PVT).
    - [ ] Handover to Operations/Support team.