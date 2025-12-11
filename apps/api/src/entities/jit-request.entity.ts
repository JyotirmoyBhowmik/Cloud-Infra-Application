import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class JitRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    requested_role_id: string;

    @Column()
    tenant_id: string;

    @Column()
    justification: string;

    @Column()
    duration_minutes: number;

    @Column({ default: 'PENDING' }) // PENDING, APPROVED, REJECTED, EXPIRED
    status: string;

    @Column({ nullable: true })
    approver_id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    expires_at: Date;
}
