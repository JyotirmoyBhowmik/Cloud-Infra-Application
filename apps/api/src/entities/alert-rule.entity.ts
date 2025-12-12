import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AlertRule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    name: string; // e.g., "High CPU Alert"

    @Column()
    metric_type: string; // COST, CPU, MEMORY, DISK

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    threshold: number;

    @Column()
    operator: string; // GT (>), LT (<), EQ (=)

    @Column({ type: 'simple-json' })
    notification_channels: { type: string; config: any }[]; // [{type: 'email', config: {to: 'admin@example.com'}}]

    @Column({ default: true })
    enabled: boolean;

    @CreateDateColumn()
    created_at: Date;
}
