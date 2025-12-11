import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { CloudAccount } from './cloud-account.entity';

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    billing_group: string;

    @Column({ default: 365 })
    data_retention_days: number;

    @Column({ nullable: true })
    auth_provider_config: string; // JSON string for OIDC config

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => CloudAccount, (account) => account.tenant)
    cloud_accounts: CloudAccount[];
}
