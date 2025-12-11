import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['tenant_id', 'timestamp'])
export class AuditEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenant_id: string;

    @Column()
    actor: string; // User ID or Service Principal

    @Column()
    action: string; // 'CREATE_VM', 'DELETE_BUCKET', 'LOGIN'

    @Column()
    target_resource: string;

    @Column({ type: 'simple-json', nullable: true })
    details: any;

    @Column()
    source_ip: string;

    @CreateDateColumn()
    timestamp: Date;
}
