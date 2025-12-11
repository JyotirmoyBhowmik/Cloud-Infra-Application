import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['provider', 'native_id'], { unique: true })
@Index(['tenant_id'])
export class InventoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    provider: string;

    @Column()
    native_id: string; // e.g. AWS ARN or Azure Resource ID

    @Column()
    type: string; // e.g. 'ec2_instance', 's3_bucket'

    @Column()
    region: string;

    @Column()
    state: string; // 'running', 'stopped'

    @Column({ type: 'simple-json', nullable: true })
    config_json: any;

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @CreateDateColumn()
    discovered_at: Date;
}
