# Cloud Services Catalog - Quick Reference

This directory contains the reference data for cloud service mappings across AWS, Azure, and Google Cloud.

## Files

- `cloud-services.data.ts` - TypeScript file containing all service mappings

## Data Structure

Each service mapping contains:
- `category` - High-level category (e.g., "Compute", "Storage")
- `subcategory` - Specific service type (e.g., "VMs", "Object storage")
- `aws_service` - AWS service name
- `azure_service` - Azure service name
- `gcp_service` - GCP service name
- `description` - Service description
- `service_type` - Programmatic identifier

## Usage

### Importing the Data

```typescript
import { CLOUD_SERVICES_DATA, CloudServiceMapping } from './cloud-services.data';
```

### Seeding the Database

The data is automatically imported by the CloudServicesService and can be seeded via:

```typescript
await cloudServicesService.seedDatabase();
```

Or via API:

```bash
POST http://localhost:3000/cloud-services/seed
```

## Service Count

- **Total Services:** 60+
- **Categories:** 22
- **Providers:** AWS, Azure, Google Cloud

## Categories Included

1. Compute (7 services)
2. Storage (4 services)
3. Database (6 services)
4. Messaging (3 services)
5. Data & Analytics (5 services)
6. Workflow (1 service)
7. Networking (6 services)
8. Security & Identity (7 services)
9. Hybrid & Multi-Cloud (2 services)
10. Monitoring & Observability (2 services)
11. DevOps (3 services)
12. Machine Learning & AI (3 services)
13. Migration & Transfer (3 services)
14. Backup & Recovery (1 service)
15. Cost Management (1 service)
16. Governance (2 services)
17. Marketplace (1 service)
18. Serverless (1 service)
19. IoT (1 service)
20. Edge Computing (1 service)
21. Mobile (1 service)
22. Media Services (1 service)

## Maintenance

To add new services:

1. Add the service mapping to `CLOUD_SERVICES_DATA` array
2. Follow the existing format
3. Run the seed endpoint to update the database

## Related Documentation

- [Cloud Services Catalog Documentation](../../docs/CLOUD_SERVICES_CATALOG.md)
- [Multi-Cloud Architecture](../../docs/MULTICLOUD_ARCHITECTURE.md)
