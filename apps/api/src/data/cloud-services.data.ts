export interface CloudServiceMapping {
    category: string;
    subcategory: string;
    aws_service: string | null;
    azure_service: string | null;
    gcp_service: string | null;
    description?: string;
    service_type: string;
}

export const CLOUD_SERVICES_DATA: CloudServiceMapping[] = [
    // ========== COMPUTE ==========
    {
        category: 'Compute',
        subcategory: 'VMs',
        aws_service: 'Amazon EC2',
        azure_service: 'Azure Virtual Machines',
        gcp_service: 'Compute Engine',
        description: 'Virtual machine instances for general-purpose computing',
        service_type: 'compute-vm'
    },
    {
        category: 'Compute',
        subcategory: 'Auto-scaling VMs',
        aws_service: 'Auto Scaling',
        azure_service: 'Virtual Machine Scale Sets (VMSS)',
        gcp_service: 'Instance Groups (Autoscaler)',
        description: 'Automatically scale VM instances based on demand',
        service_type: 'compute-autoscaling'
    },
    {
        category: 'Compute',
        subcategory: 'Serverless functions',
        aws_service: 'AWS Lambda',
        azure_service: 'Azure Functions',
        gcp_service: 'Cloud Functions',
        description: 'Event-driven serverless compute functions',
        service_type: 'compute-serverless'
    },
    {
        category: 'Compute',
        subcategory: 'Platform (app PaaS)',
        aws_service: 'Elastic Beanstalk',
        azure_service: 'App Service',
        gcp_service: 'App Engine',
        description: 'Platform as a Service for application deployment',
        service_type: 'compute-paas'
    },
    {
        category: 'Compute',
        subcategory: 'Containers — managed K8s',
        aws_service: 'Amazon EKS',
        azure_service: 'Azure Kubernetes Service (AKS)',
        gcp_service: 'Google Kubernetes Engine (GKE)',
        description: 'Managed Kubernetes container orchestration',
        service_type: 'compute-kubernetes'
    },
    {
        category: 'Compute',
        subcategory: 'Containers — serverless / managed containers',
        aws_service: 'AWS Fargate / EKS Fargate',
        azure_service: 'Azure Container Instances / Container Apps',
        gcp_service: 'Cloud Run',
        description: 'Serverless container execution without managing infrastructure',
        service_type: 'compute-container-serverless'
    },
    {
        category: 'Compute',
        subcategory: 'Container registry',
        aws_service: 'Amazon ECR',
        azure_service: 'Azure Container Registry',
        gcp_service: 'Artifact Registry (formerly Container Registry)',
        description: 'Private container image registry',
        service_type: 'compute-container-registry'
    },

    // ========== STORAGE ==========
    {
        category: 'Storage',
        subcategory: 'Object storage',
        aws_service: 'Amazon S3',
        azure_service: 'Azure Blob Storage',
        gcp_service: 'Cloud Storage',
        description: 'Highly scalable object storage for unstructured data',
        service_type: 'storage-object'
    },
    {
        category: 'Storage',
        subcategory: 'Block storage',
        aws_service: 'EBS (Elastic Block Store)',
        azure_service: 'Managed Disks',
        gcp_service: 'Persistent Disk',
        description: 'Block-level storage volumes for virtual machines',
        service_type: 'storage-block'
    },
    {
        category: 'Storage',
        subcategory: 'File / shared storage',
        aws_service: 'Amazon EFS / FSx',
        azure_service: 'Azure Files / Azure NetApp Files / Azure Files NFS',
        gcp_service: 'Filestore',
        description: 'Shared file storage for multiple instances',
        service_type: 'storage-file'
    },
    {
        category: 'Storage',
        subcategory: 'Archive / cold storage',
        aws_service: 'S3 Glacier / Glacier Deep Archive',
        azure_service: 'Azure Blob Archive',
        gcp_service: 'Cloud Storage Coldline / Archive',
        description: 'Low-cost archive storage for long-term data retention',
        service_type: 'storage-archive'
    },

    // ========== DATABASE ==========
    {
        category: 'Database',
        subcategory: 'Relational managed DB (general)',
        aws_service: 'Amazon RDS (MySQL/Postgres/SQL Server/Oracle)',
        azure_service: 'Azure Database (for MySQL/PostgreSQL/MariaDB) & Azure SQL',
        gcp_service: 'Cloud SQL (MySQL/Postgres/SQL Server)',
        description: 'Managed relational database services',
        service_type: 'database-relational'
    },
    {
        category: 'Database',
        subcategory: 'Cloud-native relational (proprietary)',
        aws_service: 'Amazon Aurora',
        azure_service: 'Azure Database for PostgreSQL Hyperscale (or Azure SQL)',
        gcp_service: 'Cloud Spanner (horizontal, strongly consistent SQL)',
        description: 'Cloud-native, highly scalable relational databases',
        service_type: 'database-cloud-native'
    },
    {
        category: 'Database',
        subcategory: 'Data warehouse',
        aws_service: 'Amazon Redshift',
        azure_service: 'Azure Synapse Analytics',
        gcp_service: 'BigQuery',
        description: 'Petabyte-scale data warehouse for analytics',
        service_type: 'database-warehouse'
    },
    {
        category: 'Database',
        subcategory: 'NoSQL — key/value & document',
        aws_service: 'Amazon DynamoDB',
        azure_service: 'Azure Cosmos DB',
        gcp_service: 'Firestore (document) / Bigtable (wide-column)',
        description: 'NoSQL databases for key-value and document storage',
        service_type: 'database-nosql'
    },
    {
        category: 'Database',
        subcategory: 'In-memory caching',
        aws_service: 'Amazon ElastiCache (Redis / Memcached)',
        azure_service: 'Azure Cache for Redis',
        gcp_service: 'Memorystore (Redis / Memcached)',
        description: 'In-memory data caching for low-latency access',
        service_type: 'database-cache'
    },
    {
        category: 'Database',
        subcategory: 'Search',
        aws_service: 'Amazon OpenSearch Service (formerly Elasticsearch Service)',
        azure_service: 'Azure Cognitive Search',
        gcp_service: 'Cloud Search (3rd party) / Elastic on GCP (partner)',
        description: 'Full-text search and analytics engine',
        service_type: 'database-search'
    },

    // ========== MESSAGING & INTEGRATION ==========
    {
        category: 'Messaging',
        subcategory: 'Message queue',
        aws_service: 'Amazon SQS',
        azure_service: 'Azure Queue Storage / Service Bus (for advanced pub/sub)',
        gcp_service: 'Pub/Sub (primary), Cloud Tasks (task queue)',
        description: 'Message queuing for decoupled application communication',
        service_type: 'messaging-queue'
    },
    {
        category: 'Messaging',
        subcategory: 'Event streaming',
        aws_service: 'Amazon Kinesis (Data Streams/Firehose)',
        azure_service: 'Azure Event Hubs / Event Grid',
        gcp_service: 'Pub/Sub + Dataflow (stream processing)',
        description: 'Real-time event streaming and data ingestion',
        service_type: 'messaging-streaming'
    },
    {
        category: 'Messaging',
        subcategory: 'Managed Kafka / streaming',
        aws_service: 'Amazon MSK',
        azure_service: 'Azure Event Hubs (Kafka compatible)',
        gcp_service: 'Pub/Sub / Dataflow or Confluent on Marketplace',
        description: 'Managed Apache Kafka for event streaming',
        service_type: 'messaging-kafka'
    },

    // ========== DATA & ANALYTICS ==========
    {
        category: 'Data & Analytics',
        subcategory: 'Serverless data integration / ETL',
        aws_service: 'AWS Glue',
        azure_service: 'Azure Data Factory',
        gcp_service: 'Dataflow / Dataproc / Data Fusion',
        description: 'Extract, transform, and load (ETL) data pipelines',
        service_type: 'data-etl'
    },
    {
        category: 'Data & Analytics',
        subcategory: 'Data catalog / metadata',
        aws_service: 'AWS Glue Data Catalog',
        azure_service: 'Azure Purview (Microsoft Purview)',
        gcp_service: 'Data Catalog (and Data Cataloger tools)',
        description: 'Metadata management and data discovery',
        service_type: 'data-catalog'
    },
    {
        category: 'Data & Analytics',
        subcategory: 'Analytics (ad-hoc SQL on S3)',
        aws_service: 'Amazon Athena',
        azure_service: 'Synapse serverless / Azure Data Lake Analytics',
        gcp_service: 'BigQuery',
        description: 'Serverless SQL queries on object storage',
        service_type: 'data-analytics-adhoc'
    },
    {
        category: 'Data & Analytics',
        subcategory: 'Big Data (Hadoop / Spark)',
        aws_service: 'EMR',
        azure_service: 'HDInsight / Synapse Spark',
        gcp_service: 'Dataproc / Dataproc Metastore',
        description: 'Managed Hadoop and Spark clusters',
        service_type: 'data-bigdata'
    },
    {
        category: 'Data & Analytics',
        subcategory: 'Batch processing',
        aws_service: 'AWS Batch',
        azure_service: 'Azure Batch',
        gcp_service: 'Cloud Batch / Dataproc',
        description: 'Batch computing for large-scale workloads',
        service_type: 'data-batch'
    },

    // ========== WORKFLOW & ORCHESTRATION ==========
    {
        category: 'Workflow',
        subcategory: 'Workflow / orchestration',
        aws_service: 'Step Functions',
        azure_service: 'Logic Apps / Durable Functions',
        gcp_service: 'Workflows / Composer (Airflow managed)',
        description: 'Orchestrate distributed applications and workflows',
        service_type: 'workflow-orchestration'
    },

    // ========== NETWORKING ==========
    {
        category: 'Networking',
        subcategory: 'API gateway',
        aws_service: 'Amazon API Gateway',
        azure_service: 'Azure API Management',
        gcp_service: 'Cloud Endpoints / API Gateway',
        description: 'Manage, secure, and scale APIs',
        service_type: 'networking-api-gateway'
    },
    {
        category: 'Networking',
        subcategory: 'Load balancing',
        aws_service: 'Elastic Load Balancing (ALB/NLB/CLB)',
        azure_service: 'Azure Load Balancer / Application Gateway',
        gcp_service: 'Cloud Load Balancing',
        description: 'Distribute traffic across multiple instances',
        service_type: 'networking-load-balancer'
    },
    {
        category: 'Networking',
        subcategory: 'DNS',
        aws_service: 'Amazon Route 53',
        azure_service: 'Azure DNS',
        gcp_service: 'Cloud DNS',
        description: 'Domain name system (DNS) service',
        service_type: 'networking-dns'
    },
    {
        category: 'Networking',
        subcategory: 'Content delivery network (CDN)',
        aws_service: 'Amazon CloudFront',
        azure_service: 'Azure CDN',
        gcp_service: 'Cloud CDN',
        description: 'Content delivery network for global distribution',
        service_type: 'networking-cdn'
    },
    {
        category: 'Networking',
        subcategory: 'Web application firewall (WAF)',
        aws_service: 'AWS WAF',
        azure_service: 'Azure Web Application Firewall (on Application Gateway / Front Door)',
        gcp_service: 'Cloud Armor (WAF & DDoS protections)',
        description: 'Web application firewall to protect against attacks',
        service_type: 'networking-waf'
    },
    {
        category: 'Networking',
        subcategory: 'DDoS protection',
        aws_service: 'AWS Shield / Shield Advanced',
        azure_service: 'Azure DDoS Protection',
        gcp_service: 'Cloud Armor (DDoS + WAF)',
        description: 'DDoS attack protection',
        service_type: 'networking-ddos'
    },

    // ========== SECURITY & IDENTITY ==========
    {
        category: 'Security & Identity',
        subcategory: 'Identity & Access Management (cloud-level)',
        aws_service: 'AWS IAM',
        azure_service: 'Azure Active Directory (Azure AD) + RBAC',
        gcp_service: 'Cloud IAM (and Identity Platform)',
        description: 'Identity and access management for cloud resources',
        service_type: 'security-iam'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Identity for apps / B2C',
        aws_service: 'Amazon Cognito',
        azure_service: 'Azure AD B2C / Microsoft Entra ID',
        gcp_service: 'Identity Platform (Firebase Auth / Identity Platform)',
        description: 'User authentication and authorization for applications',
        service_type: 'security-app-identity'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Key management / CMK',
        aws_service: 'AWS KMS',
        azure_service: 'Azure Key Vault',
        gcp_service: 'Cloud KMS',
        description: 'Encryption key management service',
        service_type: 'security-kms'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Secrets management',
        aws_service: 'AWS Secrets Manager / Parameter Store',
        azure_service: 'Azure Key Vault',
        gcp_service: 'Secret Manager',
        description: 'Securely store and manage application secrets',
        service_type: 'security-secrets'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Certificate manager',
        aws_service: 'AWS Certificate Manager',
        azure_service: 'App Service Managed Certificates / Key Vault integration',
        gcp_service: 'Managed SSL certificates (Load Balancer) / Certificate Manager',
        description: 'SSL/TLS certificate provisioning and management',
        service_type: 'security-certificates'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Security posture / compliance',
        aws_service: 'AWS Security Hub / Inspector / Macie',
        azure_service: 'Microsoft Defender for Cloud / Azure Security Center',
        gcp_service: 'Security Command Center / Forseti / Cloud Armor',
        description: 'Security posture management and compliance monitoring',
        service_type: 'security-posture'
    },
    {
        category: 'Security & Identity',
        subcategory: 'Secret scanning / data loss protection',
        aws_service: 'Macie / GuardDuty integrations',
        azure_service: 'Microsoft Defender / Purview DLP',
        gcp_service: 'DLP API / Security Command Center',
        description: 'Data loss prevention and sensitive data discovery',
        service_type: 'security-dlp'
    },

    // ========== HYBRID & MULTI-CLOUD ==========
    {
        category: 'Hybrid & Multi-Cloud',
        subcategory: 'Hybrid & on-prem orchestration',
        aws_service: 'AWS Outposts / Local Zones',
        azure_service: 'Azure Stack / Arc',
        gcp_service: 'Anthos / GKE On-Prem / Bare Metal tools',
        description: 'Extend cloud services to on-premises infrastructure',
        service_type: 'hybrid-orchestration'
    },
    {
        category: 'Hybrid & Multi-Cloud',
        subcategory: 'Multi-cloud / hybrid management',
        aws_service: 'AWS Systems Manager / Outposts',
        azure_service: 'Azure Arc',
        gcp_service: 'Anthos / Migrate for Anthos',
        description: 'Unified management across cloud and on-premises',
        service_type: 'hybrid-management'
    },

    // ========== MONITORING & OBSERVABILITY ==========
    {
        category: 'Monitoring & Observability',
        subcategory: 'Monitoring / metrics',
        aws_service: 'Amazon CloudWatch',
        azure_service: 'Azure Monitor (Metrics + Logs)',
        gcp_service: 'Cloud Monitoring (formerly Stackdriver)',
        description: 'Infrastructure and application monitoring',
        service_type: 'monitoring-metrics'
    },
    {
        category: 'Monitoring & Observability',
        subcategory: 'Logging / observability',
        aws_service: 'CloudWatch Logs / X-Ray (tracing)',
        azure_service: 'Azure Monitor Logs (Log Analytics) / Application Insights',
        gcp_service: 'Cloud Logging / Trace / Profiler / Monitoring',
        description: 'Centralized logging and distributed tracing',
        service_type: 'monitoring-logging'
    },

    // ========== DEVOPS & CI/CD ==========
    {
        category: 'DevOps',
        subcategory: 'CI / CD / build',
        aws_service: 'CodeBuild / CodePipeline / CodeCommit',
        azure_service: 'Azure DevOps Pipelines / Repos / Artifacts / GitHub Actions',
        gcp_service: 'Cloud Build / Cloud Source Repositories / Artifact Registry',
        description: 'Continuous integration and deployment pipelines',
        service_type: 'devops-cicd'
    },
    {
        category: 'DevOps',
        subcategory: 'Artifact repository (packages)',
        aws_service: 'CodeArtifact',
        azure_service: 'Azure Artifacts',
        gcp_service: 'Artifact Registry',
        description: 'Package repository for software artifacts',
        service_type: 'devops-artifacts'
    },
    {
        category: 'DevOps',
        subcategory: 'Infrastructure as Code',
        aws_service: 'AWS CloudFormation',
        azure_service: 'Azure Resource Manager (ARM) / Bicep',
        gcp_service: 'Deployment Manager / Terraform (first class support)',
        description: 'Infrastructure provisioning through code',
        service_type: 'devops-iac'
    },

    // ========== MACHINE LEARNING & AI ==========
    {
        category: 'Machine Learning & AI',
        subcategory: 'Machine Learning platform',
        aws_service: 'Amazon SageMaker',
        azure_service: 'Azure Machine Learning',
        gcp_service: 'Vertex AI',
        description: 'End-to-end machine learning platform',
        service_type: 'ml-platform'
    },
    {
        category: 'Machine Learning & AI',
        subcategory: 'AI APIs (vision/speech/nlp)',
        aws_service: 'Amazon Rekognition / Polly / Comprehend',
        azure_service: 'Azure Cognitive Services',
        gcp_service: 'Vision / Speech / Natural Language APIs (Cloud AI)',
        description: 'Pre-trained AI models for common tasks',
        service_type: 'ml-apis'
    },
    {
        category: 'Machine Learning & AI',
        subcategory: 'Feature store / ML metadata',
        aws_service: 'SageMaker Feature Store / Model Monitor',
        azure_service: 'MLflow integrations / Azure Machine Learning',
        gcp_service: 'Vertex AI Feature Store / Vertex Pipelines',
        description: 'Feature engineering and ML metadata management',
        service_type: 'ml-feature-store'
    },

    // ========== MIGRATION & TRANSFER ==========
    {
        category: 'Migration & Transfer',
        subcategory: 'Data transfer services (offline)',
        aws_service: 'Snowball / Snowmobile',
        azure_service: 'Azure Data Box',
        gcp_service: 'Transfer Appliance',
        description: 'Physical data transfer devices for large-scale migration',
        service_type: 'migration-offline'
    },
    {
        category: 'Migration & Transfer',
        subcategory: 'Migration services',
        aws_service: 'AWS Migration Hub / Server Migration Service (SMS)',
        azure_service: 'Azure Migrate',
        gcp_service: 'Migrate for Compute Engine / Database Migration Service',
        description: 'Cloud migration planning and execution tools',
        service_type: 'migration-services'
    },
    {
        category: 'Migration & Transfer',
        subcategory: 'Database migration',
        aws_service: 'AWS DMS',
        azure_service: 'Azure Database Migration Service',
        gcp_service: 'Database Migration Service',
        description: 'Database migration with minimal downtime',
        service_type: 'migration-database'
    },

    // ========== BACKUP & RECOVERY ==========
    {
        category: 'Backup & Recovery',
        subcategory: 'Backup & recovery',
        aws_service: 'AWS Backup / Snapshot features',
        azure_service: 'Azure Backup / Recovery Services vault',
        gcp_service: 'Backup and DR solutions (Google Backup and DR / snapshot & partner tools)',
        description: 'Centralized backup and disaster recovery',
        service_type: 'backup-recovery'
    },

    // ========== COST MANAGEMENT ==========
    {
        category: 'Cost Management',
        subcategory: 'Cost management & billing',
        aws_service: 'AWS Cost Explorer / Budgets',
        azure_service: 'Azure Cost Management + Billing',
        gcp_service: 'Cloud Billing reports / Cost Management',
        description: 'Cost tracking, analysis, and optimization',
        service_type: 'cost-management'
    },

    // ========== GOVERNANCE & COMPLIANCE ==========
    {
        category: 'Governance',
        subcategory: 'Governance / policy',
        aws_service: 'AWS Organizations + Service Control Policies (SCP)',
        azure_service: 'Azure Policy + Management Groups',
        gcp_service: 'Organization policy + Resource Manager',
        description: 'Centralized governance and policy enforcement',
        service_type: 'governance-policy'
    },
    {
        category: 'Governance',
        subcategory: 'Tagging & resource inventory',
        aws_service: 'Resource Tags + Resource Groups',
        azure_service: 'Tags + Resource Graph',
        gcp_service: 'Labels + Resource Manager / Asset Inventory',
        description: 'Resource tagging and inventory management',
        service_type: 'governance-tagging'
    },

    // ========== MARKETPLACE ==========
    {
        category: 'Marketplace',
        subcategory: 'Marketplace',
        aws_service: 'AWS Marketplace',
        azure_service: 'Azure Marketplace',
        gcp_service: 'Google Cloud Marketplace',
        description: 'Third-party software and services marketplace',
        service_type: 'marketplace'
    },

    // ========== SERVERLESS CONTAINERS ==========
    {
        category: 'Serverless',
        subcategory: 'Serverless containers / app platform',
        aws_service: 'AWS App Runner',
        azure_service: 'Azure App Service / Container Apps',
        gcp_service: 'Cloud Run',
        description: 'Serverless container deployment platform',
        service_type: 'serverless-containers'
    },

    // ========== IoT ==========
    {
        category: 'IoT',
        subcategory: 'IoT core',
        aws_service: 'AWS IoT Core',
        azure_service: 'Azure IoT Hub',
        gcp_service: '(Cloud IoT Core was retired; GCP recommends partner solutions / alternative architectures)',
        description: 'IoT device connectivity and management',
        service_type: 'iot-core'
    },

    // ========== EDGE & CDN ==========
    {
        category: 'Edge Computing',
        subcategory: 'Edge / CDN + compute',
        aws_service: 'AWS CloudFront + Lambda@Edge / Wavelength',
        azure_service: 'Azure Front Door + Azure Edge Zones / IoT Edge',
        gcp_service: 'Cloud CDN + Cloud Functions / Cloud Run for Anthos at edge / Edge TPU products',
        description: 'Edge computing and content delivery',
        service_type: 'edge-compute'
    },

    // ========== MOBILE ==========
    {
        category: 'Mobile',
        subcategory: 'Mobile backend / developer tools',
        aws_service: 'AWS Amplify',
        azure_service: 'Azure Mobile Apps / App Center',
        gcp_service: 'Firebase / App Engine / Mobile SDKs',
        description: 'Mobile application backend and development tools',
        service_type: 'mobile-backend'
    },

    // ========== MEDIA ==========
    {
        category: 'Media Services',
        subcategory: 'Video / media services',
        aws_service: 'AWS Elemental Media Services',
        azure_service: 'Azure Media Services',
        gcp_service: 'Transcoder/Media partner solutions; Media APIs via partners',
        description: 'Video processing and streaming services',
        service_type: 'media-video'
    }
];
