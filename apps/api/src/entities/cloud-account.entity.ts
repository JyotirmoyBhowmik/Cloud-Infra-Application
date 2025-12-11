import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity()
export class CloudAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string; // 'aws', 'azure', 'gcp'

    @Column()
    account_id: string; // Subscription ID or Account ID

    @Column({ select: false }) // Don't return credentials by default
    credential_ref: string; // Vault path or encrypted string

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @ManyToOne(() => Tenant, (tenant) => tenant.cloud_accounts)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;
}
