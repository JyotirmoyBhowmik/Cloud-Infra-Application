/**
 * OrganizationalUnit Entity - Represents hierarchical cloud organization structures
 * 
 * This entity supports:
 * - AWS Organizations (OUs, Accounts)
 * - Azure Management Groups (Subscriptions)
 * - GCP Folders (Projects)
 * 
 * Enables multi-account/subscription governance and policy inheritance
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class OrganizationalUnit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    provider: string; // 'aws', 'azure', 'gcp'

    @Column()
    external_id: string; // OU ID, Management Group ID, Folder ID

    @Column()
    name: string; // e.g., "Production", "Development", "Workloads"

    @Column({ nullable: true })
    parent_id: string; // For hierarchical structure

    @Column()
    ou_type: string; // 'root', 'ou', 'account', 'management_group', 'subscription', 'folder', 'project'

    @Column({ type: 'simple-json', nullable: true })
    metadata: {
        arn?: string; // AWS ARN
        path?: string; // Full hierarchical path
        email?: string; // Root account email
        status?: string; // Active, Suspended, etc.
    };

    @Column({ type: 'simple-json', nullable: true })
    policies: string[]; // Attached policy IDs

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_synced_at: Date;
}
