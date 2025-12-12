/**
 * Enhanced CloudAccount Entity - Supports multi-cloud organizational structures
 * 
 * Updated to include:
 * - Organizational unit relationships
 * - Landing zone associations
 * - Provider-specific metadata
 * - Account/Subscription/Project hierarchy
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity()
export class CloudAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string; // 'aws', 'azure', 'gcp'

    @Column()
    account_id: string; // AWS Account ID, Azure Subscription ID, GCP Project ID

    @Column({ nullable: true })
    account_name: string; // Human-readable name

    @Column({ nullable: true })
    organizational_unit_id: string; // Reference to OrganizationalUnit entity

    @Column({ nullable: true })
    landing_zone_id: string; // Reference to LandingZone entity

    // Provider-specific identifiers
    @Column({ type: 'simple-json', nullable: true })
    provider_metadata: {
        // AWS
        account_email?: string;
        organization_id?: string;
        master_account_id?: string;

        // Azure
        subscription_name?: string;
        management_group_id?: string;
        tenant_id?: string; // Azure AD Tenant

        // GCP
        project_name?: string;
        project_number?: string;
        folder_id?: string;
        organization?: string;
    };

    // Account status and configuration
    @Column({ default: 'ACTIVE' })
    status: string; // ACTIVE, SUSPENDED, CLOSED

    @Column({ nullable: true })
    environment: string; // production, staging, development, sandbox

    @Column({ select: false }) // Don't return credentials by default
    credential_ref: string; // Vault path or encrypted string reference

    // Role/Service Principal configuration
    @Column({ type: 'simple-json', nullable: true })
    access_config: {
        // AWS
        role_arn?: string;
        external_id?: string;

        // Azure
        service_principal_id?: string;
        client_id?: string;

        // GCP
        service_account_email?: string;
        key_file_path?: string;
    };

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @Column({ type: 'timestamp', nullable: true })
    last_synced_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Tenant, (tenant) => tenant.cloud_accounts)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;
}
