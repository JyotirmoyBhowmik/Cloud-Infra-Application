import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    name: string; // e.g., "AWS Monthly Budget"

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column()
    period: string; // MONTHLY, QUARTERLY, ANNUAL

    @Column({ nullable: true })
    scope: string; // e.g., "provider:aws" or "service:ec2"

    @Column({ type: 'simple-json', nullable: true })
    alert_thresholds: number[]; // e.g., [50, 80, 100]

    @CreateDateColumn()
    created_at: Date;
}
