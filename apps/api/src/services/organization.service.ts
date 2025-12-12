/**
 * OrganizationService - Manages multi-cloud organizational structures
 * 
 * Supports:
 * - AWS Organizations with OUs and Accounts
 * - Azure Management Groups with Subscriptions
 * - GCP Folders and Projects
 * 
 * Provides unified interface for:
 * - Discovering organizational hierarchy
 * - Syncing OU structures
 * - Managing policies across OUs
 * - Cost allocation by OU
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationalUnit } from '../entities/organizational-unit.entity';
import { CloudAccount } from '../entities/cloud-account.entity';
import { AwsConnectorService } from '../connectors/aws-connector.service';
import { AzureConnectorService } from '../connectors/azure-connector.service';
import { GcpConnectorService } from '../connectors/gcp-connector.service';

@Injectable()
export class OrganizationService {
    private readonly logger = new Logger(OrganizationService.name);

    constructor(
        @InjectRepository(OrganizationalUnit)
        private ouRepo: Repository<OrganizationalUnit>,
        @InjectRepository(CloudAccount)
        private accountRepo: Repository<CloudAccount>,
        private awsConnector: AwsConnectorService,
        private azureConnector: AzureConnectorService,
        private gcpConnector: GcpConnectorService,
    ) { }

    /**
     * Discovers and syncs organizational structure from cloud provider
     * @param tenantId - Tenant ID
     * @param provider - Cloud provider (aws, azure, gcp)
     * @param rootCredentials - Root account/subscription credentials
     */
    async syncOrganizationalStructure(tenantId: string, provider: string, rootCredentials: any) {
        this.logger.log(`Syncing organizational structure for ${provider}`);

        try {
            switch (provider.toLowerCase()) {
                case 'aws':
                    return await this.syncAwsOrganization(tenantId, rootCredentials);
                case 'azure':
                    return await this.syncAzureManagementGroups(tenantId, rootCredentials);
                case 'gcp':
                    return await this.syncGcpFolders(tenantId, rootCredentials);
                default:
                    throw new Error(`Unsupported provider: ${provider}`);
            }
        } catch (error) {
            this.logger.error(`Failed to sync ${provider} organization: ${error.message}`);
            throw error;
        }
    }

    /**
     * Syncs AWS Organizations structure
     * Retrieves OUs and accounts using AWS Organizations API
     */
    private async syncAwsOrganization(tenantId: string, credentials: any) {
        // Mock implementation - in production, use AWS SDK
        const mockOrganization = {
            root: {
                id: 'r-abc123',
                name: 'Root',
                type: 'root',
                arn: 'arn:aws:organizations::123456789012:root/o-abc123/r-abc123',
            },
            ous: [
                {
                    id: 'ou-prod-123',
                    name: 'Production',
                    parentId: 'r-abc123',
                    type: 'ou',
                    policies: ['p-FullAWSAccess', 'p-SCPProduction'],
                },
                {
                    id: 'ou-dev-456',
                    name: 'Development',
                    parentId: 'r-abc123',
                    type: 'ou',
                    policies: ['p-FullAWSAccess'],
                },
            ],
            accounts: [
                {
                    id: '123456789012',
                    name: 'Production Account',
                    parentId: 'ou-prod-123',
                    email: 'prod@company.com',
                    status: 'ACTIVE',
                },
                {
                    id: '234567890123',
                    name: 'Dev Account',
                    parentId: 'ou-dev-456',
                    email: 'dev@company.com',
                    status: 'ACTIVE',
                },
            ],
        };

        // Save organizational structure
        const savedOUs = [];

        // Save root
        const rootOU = await this.saveOrganizationalUnit(tenantId, 'aws', mockOrganization.root);
        savedOUs.push(rootOU);

        // Save OUs
        for (const ou of mockOrganization.ous) {
            const savedOU = await this.saveOrganizationalUnit(tenantId, 'aws', ou);
            savedOUs.push(savedOU);
        }

        // Save accounts
        for (const account of mockOrganization.accounts) {
            await this.saveCloudAccount(tenantId, 'aws', account);
        }

        return { provider: 'aws', ous: savedOUs.length, accounts: mockOrganization.accounts.length };
    }

    /**
     * Syncs Azure Management Groups
     * Retrieves management groups and subscriptions
     */
    private async syncAzureManagementGroups(tenantId: string, credentials: any) {
        // Mock implementation - in production, use Azure SDK
        const mockManagementGroups = {
            root: {
                id: 'mg-root',
                name: 'Tenant Root Group',
                type: 'management_group',
            },
            groups: [
                {
                    id: 'mg-prod',
                    name: 'Production',
                    parentId: 'mg-root',
                    type: 'management_group',
                },
                {
                    id: 'mg-dev',
                    name: 'Development',
                    parentId: 'mg-root',
                    type: 'management_group',
                },
            ],
            subscriptions: [
                {
                    id: 'sub-123',
                    name: 'Production Subscription',
                    parentId: 'mg-prod',
                    status: 'ACTIVE',
                },
                {
                    id: 'sub-456',
                    name: 'Development Subscription',
                    parentId: 'mg-dev',
                    status: 'ACTIVE',
                },
            ],
        };

        const savedOUs = [];

        // Save root management group
        const rootMG = await this.saveOrganizationalUnit(tenantId, 'azure', mockManagementGroups.root);
        savedOUs.push(rootMG);

        // Save management groups
        for (const mg of mockManagementGroups.groups) {
            const savedMG = await this.saveOrganizationalUnit(tenantId, 'azure', mg);
            savedOUs.push(savedMG);
        }

        // Save subscriptions
        for (const sub of mockManagementGroups.subscriptions) {
            await this.saveCloudAccount(tenantId, 'azure', sub);
        }

        return { provider: 'azure', ous: savedOUs.length, subscriptions: mockManagementGroups.subscriptions.length };
    }

    /**
     * Syncs GCP Folders and Projects
     */
    private async syncGcpFolders(tenantId: string, credentials: any) {
        // Mock implementation - in production, use GCP Client Libraries
        const mockGcpOrganization = {
            organization: {
                id: 'org-123',
                name: 'Company Organization',
                type: 'root',
            },
            folders: [
                {
                    id: 'folders/prod-folder',
                    name: 'Production',
                    parentId: 'org-123',
                    type: 'folder',
                },
                {
                    id: 'folders/dev-folder',
                    name: 'Development',
                    parentId: 'org-123',
                    type: 'folder',
                },
            ],
            projects: [
                {
                    id: 'project-prod-123',
                    name: 'production-project',
                    projectNumber: '123456789',
                    parentId: 'folders/prod-folder',
                    status: 'ACTIVE',
                },
                {
                    id: 'project-dev-456',
                    name: 'development-project',
                    projectNumber: '987654321',
                    parentId: 'folders/dev-folder',
                    status: 'ACTIVE',
                },
            ],
        };

        const savedOUs = [];

        // Save organization
        const org = await this.saveOrganizationalUnit(tenantId, 'gcp', mockGcpOrganization.organization);
        savedOUs.push(org);

        // Save folders
        for (const folder of mockGcpOrganization.folders) {
            const savedFolder = await this.saveOrganizationalUnit(tenantId, 'gcp', folder);
            savedOUs.push(savedFolder);
        }

        // Save projects
        for (const project of mockGcpOrganization.projects) {
            await this.saveCloudAccount(tenantId, 'gcp', project);
        }

        return { provider: 'gcp', ous: savedOUs.length, projects: mockGcpOrganization.projects.length };
    }

    /**
     * Helper to save organizational unit
     */
    private async saveOrganizationalUnit(tenantId: string, provider: string, data: any) {
        const existing = await this.ouRepo.findOne({
            where: {
                tenant_id: tenantId,
                provider,
                external_id: data.id,
            },
        });

        if (existing) {
            // Update existing
            existing.name = data.name;
            existing.parent_id = data.parentId;
            existing.ou_type = data.type;
            existing.policies = data.policies || [];
            existing.last_synced_at = new Date();
            return this.ouRepo.save(existing);
        } else {
            // Create new
            const ou = this.ouRepo.create({
                tenant_id: tenantId,
                provider,
                external_id: data.id,
                name: data.name,
                parent_id: data.parentId,
                ou_type: data.type,
                policies: data.policies || [],
                metadata: data,
                last_synced_at: new Date(),
            });
            return this.ouRepo.save(ou);
        }
    }

    /**
     * Helper to save cloud account
     */
    private async saveCloudAccount(tenantId: string, provider: string, data: any) {
        const existing = await this.accountRepo.findOne({
            where: {
                provider,
                account_id: data.id,
            },
        });

        if (existing) {
            existing.account_name = data.name;
            existing.status = data.status;
            existing.last_synced_at = new Date();
            return this.accountRepo.save(existing);
        } else {
            const account = this.accountRepo.create({
                provider,
                account_id: data.id,
                account_name: data.name,
                organizational_unit_id: data.parentId,
                status: data.status || 'ACTIVE',
                provider_metadata: data,
                credential_ref: 'vault://credentials/' + data.id, // Placeholder
                last_synced_at: new Date(),
            });
            return this.accountRepo.save(account);
        }
    }

    /**
     * Get organizational hierarchy for a tenant
     */
    async getOrganizationHierarchy(tenantId: string, provider?: string) {
        const where: any = { tenant_id: tenantId };
        if (provider) where.provider = provider;

        const ous = await this.ouRepo.find({ where });

        // Build tree structure
        const tree = this.buildTree(ous);
        return tree;
    }

    /**
     * Build hierarchical tree from flat OU list
     */
    private buildTree(ous: OrganizationalUnit[]) {
        const map = new Map();
        const roots = [];

        // Create map of all OUs
        ous.forEach((ou) => {
            map.set(ou.external_id, { ...ou, children: [] });
        });

        // Build tree
        ous.forEach((ou) => {
            const node = map.get(ou.external_id);
            if (ou.parent_id && map.has(ou.parent_id)) {
                map.get(ou.parent_id).children.push(node);
            } else {
                roots.push(node);
            }
        });

        return roots;
    }
}
