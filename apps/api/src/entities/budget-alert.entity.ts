import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class BudgetAlert {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    budget_id: string;

    @Column()
    tenant_id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    current_spend: number;

    @Column()
    threshold_percentage: number; // e.g., 80 for 80%

    @Column({ default: 'ACTIVE' }) // ACTIVE, ACKNOWLEDGED, RESOLVED
    status: string;

    @CreateDateColumn()
    triggered_at: Date;
}
