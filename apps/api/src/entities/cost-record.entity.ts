import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['tenant_id', 'timestamp'])
export class CostRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    provider: string;

    @Column()
    account_id: string;

    @Column()
    service: string; // e.g., 'AmazonEC2'

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    cost_amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    usage_amount: number;

    @Column()
    currency: string;

    @Column({ type: 'simple-json', nullable: true })
    tags: Record<string, string>;

    @Column()
    timestamp: Date;
}
