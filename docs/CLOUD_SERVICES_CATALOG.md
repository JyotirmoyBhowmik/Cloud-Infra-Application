# Cloud Services Catalog

The Cloud Services Catalog is a comprehensive reference system that maps equivalent services across AWS, Azure, and Google Cloud Platform. This catalog helps organizations understand service equivalencies when planning multi-cloud deployments or migrations.

## Overview

The catalog contains **60+ service categories** covering:

- **Compute** - VMs, serverless, containers, Kubernetes
- **Storage** - Object, block, file, archive
- **Database** - Relational, NoSQL, warehouses, caching
- **Networking** - Load balancing, CDN, DNS, security
- **Security & Identity** - IAM, secrets, encryption
- **AI/ML** - Platforms, APIs, feature stores
- **Data & Analytics** - ETL, big data, streaming
- **DevOps** - CI/CD, infrastructure as code
- **Monitoring & Observability** - Metrics, logging, tracing
- **And many more...**

## Service Categories

### Compute Services

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **VMs** | Amazon EC2 | Azure Virtual Machines | Compute Engine |
| **Auto-scaling VMs** | Auto Scaling | Virtual Machine Scale Sets (VMSS) | Instance Groups (Autoscaler) |
| **Serverless functions** | AWS Lambda | Azure Functions | Cloud Functions |
| **Platform (PaaS)** | Elastic Beanstalk | App Service | App Engine |
| **Managed K8s** | Amazon EKS | Azure Kubernetes Service (AKS) | Google Kubernetes Engine (GKE) |
| **Serverless containers** | AWS Fargate / EKS Fargate | Azure Container Instances / Container Apps | Cloud Run |
| **Container registry** | Amazon ECR | Azure Container Registry | Artifact Registry |

### Storage Services

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **Object storage** | Amazon S3 | Azure Blob Storage | Cloud Storage |
| **Block storage** | EBS | Managed Disks | Persistent Disk |
| **File storage** | Amazon EFS / FSx | Azure Files / NetApp Files | Filestore |
| **Archive storage** | S3 Glacier / Deep Archive | Azure Blob Archive | Cloud Storage Coldline / Archive |

### Database Services

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **Relational DB** | Amazon RDS | Azure Database / Azure SQL | Cloud SQL |
| **Cloud-native relational** | Amazon Aurora | Azure PostgreSQL Hyperscale | Cloud Spanner |
| **Data warehouse** | Amazon Redshift | Azure Synapse Analytics | BigQuery |
| **NoSQL** | Amazon DynamoDB | Azure Cosmos DB | Firestore / Bigtable |
| **In-memory cache** | ElastiCache | Azure Cache for Redis | Memorystore |
| **Search** | OpenSearch Service | Azure Cognitive Search | Partner solutions |

### Networking Services

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **Load balancing** | Elastic Load Balancing | Azure Load Balancer / App Gateway | Cloud Load Balancing |
| **CDN** | CloudFront | Azure CDN | Cloud CDN |
| **DNS** | Route 53 | Azure DNS | Cloud DNS |
| **API Gateway** | API Gateway | API Management | Cloud Endpoints / API Gateway |
| **WAF** | AWS WAF | Azure WAF | Cloud Armor |
| **DDoS Protection** | Shield / Shield Advanced | Azure DDoS Protection | Cloud Armor |

### Security & Identity

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **IAM** | AWS IAM | Azure AD + RBAC | Cloud IAM |
| **App Identity** | Amazon Cognito | Azure AD B2C | Identity Platform / Firebase Auth |
| **Key Management** | AWS KMS | Azure Key Vault | Cloud KMS |
| **Secrets Management** | Secrets Manager | Azure Key Vault | Secret Manager |
| **Certificates** | Certificate Manager | Key Vault / App Service Certs | Certificate Manager |
| **Security Posture** | Security Hub / Inspector | Defender for Cloud | Security Command Center |

### AI/ML Services

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **ML Platform** | SageMaker | Azure Machine Learning | Vertex AI |
| **Vision/Speech/NLP APIs** | Rekognition / Polly / Comprehend | Cognitive Services | Vision / Speech / NLP APIs |
| **Feature Store** | SageMaker Feature Store | Azure ML | Vertex AI Feature Store |

### Data & Analytics

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **ETL** | AWS Glue | Data Factory | Dataflow / Data Fusion |
| **Data Catalog** | Glue Data Catalog | Microsoft Purview | Data Catalog |
| **Ad-hoc SQL** | Amazon Athena | Synapse serverless | BigQuery |
| **Big Data** | EMR | HDInsight / Synapse Spark | Dataproc |
| **Streaming** | Kinesis | Event Hubs / Event Grid | Pub/Sub + Dataflow |
| **Message Queue** | SQS | Queue Storage / Service Bus | Pub/Sub / Cloud Tasks |
| **Managed Kafka** | Amazon MSK | Event Hubs (Kafka) | Partner solutions |

### DevOps

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **CI/CD** | CodePipeline / CodeBuild | Azure DevOps / GitHub Actions | Cloud Build |
| **Artifact Repository** | CodeArtifact | Azure Artifacts | Artifact Registry |
| **Infrastructure as Code** | CloudFormation | ARM / Bicep | Deployment Manager |

### Monitoring & Observability

| Category | AWS | Azure | Google Cloud |
|----------|-----|-------|--------------|
| **Monitoring** | CloudWatch | Azure Monitor | Cloud Monitoring |
| **Logging** | CloudWatch Logs | Monitor Logs / Log Analytics | Cloud Logging |
| **Tracing** | X-Ray | Application Insights | Cloud Trace / Profiler |

## API Usage

### List All Services

```bash
GET /cloud-services
```

**Response:**
```json
[
  {
    "id": "uuid",
    "category": "Compute",
    "subcategory": "VMs",
    "aws_service": "Amazon EC2",
    "azure_service": "Azure Virtual Machines",
    "gcp_service": "Compute Engine",
    "description": "Virtual machine instances for general-purpose computing",
    "service_type": "compute-vm"
  }
]
```

### Get All Categories

```bash
GET /cloud-services/categories
```

**Response:**
```json
[
  "Compute",
  "Storage",
  "Database",
  "Networking",
  "Security & Identity",
  "AI/ML",
  "Data & Analytics",
  "DevOps"
]
```

### Get Services by Category

```bash
GET /cloud-services/category/Compute
```

### Find Equivalent Services

```bash
GET /cloud-services/equivalent?provider=aws&service=EC2
```

**Response:**
```json
{
  "query": {
    "provider": "aws",
    "service": "EC2"
  },
  "result": {
    "category": "Compute",
    "subcategory": "VMs",
    "aws": "Amazon EC2",
    "azure": "Azure Virtual Machines",
    "gcp": "Compute Engine",
    "description": "Virtual machine instances for general-purpose computing"
  }
}
```

### Search Services

```bash
GET /cloud-services/search?q=kubernetes
```

**Response:**
```json
[
  {
    "id": "uuid",
    "category": "Compute",
    "subcategory": "Containers — managed K8s",
    "aws_service": "Amazon EKS",
    "azure_service": "Azure Kubernetes Service (AKS)",
    "gcp_service": "Google Kubernetes Engine (GKE)",
    "description": "Managed Kubernetes container orchestration"
  }
]
```

### Get Service Matrix

```bash
GET /cloud-services/matrix
GET /cloud-services/matrix?category=Compute
```

**Response:**
```json
[
  {
    "category": "Compute",
    "services": [
      {
        "subcategory": "VMs",
        "aws": "Amazon EC2",
        "azure": "Azure Virtual Machines",
        "gcp": "Compute Engine",
        "description": "Virtual machine instances...",
        "type": "compute-vm"
      }
    ]
  }
]
```

### Get Statistics

```bash
GET /cloud-services/stats
```

**Response:**
```json
{
  "totalServices": 60,
  "categoriesCount": 15,
  "servicesPerProvider": {
    "aws": 60,
    "azure": 60,
    "gcp": 59
  }
}
```

### Seed Database

```bash
POST /cloud-services/seed
```

**Response:**
```json
{
  "success": true,
  "count": 60,
  "message": "Successfully seeded 60 cloud services"
}
```

## Integration with Inventory System

The cloud services catalog can be integrated with the inventory discovery system to automatically categorize discovered resources:

```typescript
// Example: Auto-categorize discovered EC2 instances
const service = await cloudServicesService.findEquivalent('aws', 'EC2');
// Use service metadata to tag the inventory item
```

## Use Cases

### 1. Multi-Cloud Planning
When planning a multi-cloud strategy, use the catalog to identify equivalent services:
- "We use Lambda on AWS, what's the equivalent on GCP?" → Cloud Functions

### 2. Cloud Migration
During cloud migration, map your current services to the target cloud:
- Migrating from Azure to AWS? Map Azure VM Scale Sets to AWS Auto Scaling

### 3. Cost Optimization
Compare equivalent services across providers to find cost savings opportunities

### 4. Skills Transfer
Help teams understand service equivalencies when working across multiple clouds

### 5. Documentation
Generate documentation showing your multi-cloud architecture with equivalent services

## Database Schema

```sql
CREATE TABLE cloud_services (
    id UUID PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    subcategory VARCHAR(255),
    aws_service VARCHAR(255),
    azure_service VARCHAR(255),
    gcp_service VARCHAR(255),
    description TEXT,
    service_type VARCHAR(255),
    metadata JSON
);

CREATE INDEX idx_cloud_services_category ON cloud_services(category);
CREATE INDEX idx_cloud_services_type ON cloud_services(service_type);
```

## Extending the Catalog

To add new services to the catalog:

1. Update `src/data/cloud-services.data.ts`
2. Add the new service mapping to the `CLOUD_SERVICES_DATA` array
3. Run the seed endpoint: `POST /cloud-services/seed`

Example:
```typescript
{
    category: 'New Category',
    subcategory: 'New Service Type',
    aws_service: 'AWS Service Name',
    azure_service: 'Azure Service Name',
    gcp_service: 'GCP Service Name',
    description: 'Service description',
    service_type: 'category-type'
}
```

## Best Practices

1. **Keep data current** - Cloud services evolve rapidly, update the catalog regularly
2. **Use service_type** - Leverage the service_type field for programmatic categorization
3. **Search wisely** - Use the search endpoint to find services quickly
4. **Cache responses** - Consider caching frequently accessed service mappings
5. **Document custom services** - If you use custom service names internally, maintain a mapping

## Related Documentation

- [Multi-Cloud Architecture](./MULTICLOUD_ARCHITECTURE.md)
- [Inventory Service](../apps/api/src/services/inventory.service.ts)
- [Cloud Connectors](../apps/api/src/connectors/)

---

**Last Updated:** December 2025  
**Total Services:** 60+  
**Providers Covered:** AWS, Azure, Google Cloud
