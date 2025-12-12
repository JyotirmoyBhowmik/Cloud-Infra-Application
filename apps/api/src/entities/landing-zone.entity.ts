/**
 * LandingZone Entity - Represents cloud landing zone configurations
 * 
 * Landing Zones provide baseline infrastructure including:
 * - Network architecture (VPCs, VNets, VPCs)
 * - Security baselines (IAM, Security Hub, Defender, SCC)
 * - Logging and monitoring
 * - Compliance frameworks
 * 
 * Supports:
 * - AWS Control Tower / Landing Zone
 * - Azure Landing Zones
 * - GCP Organization Policy / Landing Zones
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LandingZone {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    provider: string; // 'aws', 'azure', 'gcp'

    @Column()
    name: string; // e.g., "Enterprise Production Landing Zone"

    @Column()
    version: string; // Landing zone version/template version

    @Column({ default: 'ACTIVE' })
    status: string; // ACTIVE, DEPLOYING, FAILED, UPDATING

    // Network Configuration
    @Column({ type: 'simple-json', nullable: true })
    network_config: {
        hub_vpc_id?: string; // Central hub VPC/VNet
        transit_gateway_id?: string; // AWS TGW, Azure Virtual WAN, GCP Cloud Router
        cidr_blocks?: string[]; // Allocated CIDR ranges
        dns_config?: any;
    };

    // Security Configuration
    @Column({ type: 'simple-json', nullable: true })
    security_config: {
        guardduty_enabled?: boolean; // AWS
        security_hub_enabled?: boolean; // AWS
        defender_enabled?: boolean; // Azure
        security_center_enabled?: boolean; // GCP
        encryption_at_rest?: boolean;
        kms_key_ids?: string[];
    };

    // Logging & Monitoring
    @Column({ type: 'simple-json', nullable: true })
    logging_config: {
        cloudtrail_enabled?: boolean; // AWS
        activity_log_enabled?: boolean; // Azure
        audit_log_enabled?: boolean; // GCP
        log_retention_days?: number;
        s3_bucket_name?: string; // AWS
        storage_account_name?: string; // Azure
        log_bucket_name?: string; // GCP
    };

    // Compliance & Governance
    @Column({ type: 'simple-json', nullable: true })
    compliance_frameworks: string[]; // CIS, PCI-DSS, HIPAA, SOC2, etc.

    @Column({ type: 'simple-json', nullable: true })
    organizational_units: string[]; // Associated OU IDs

    @Column({ type: 'simple-json', nullable: true })
    baseline_policies: {
        policy_id: string;
        policy_name: string;
        scope: string; // 'root', 'ou', 'account'
    }[];

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    deployed_at: Date;
}
