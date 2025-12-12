import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AlertEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rule_id: string;

    @Column()
    tenant_id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    current_value: number;

    @Column()
    message: string; // e.g., "CPU usage is 85%, exceeding threshold of 80%"

    @Column({ default: 'ACTIVE' }) // ACTIVE, ACKNOWLEDGED, RESOLVED
    status: string;

    @Column({ nullable: true })
    acknowledged_by: string;

    @CreateDateColumn()
    triggered_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
