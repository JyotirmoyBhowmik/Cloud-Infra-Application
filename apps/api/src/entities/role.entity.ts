import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // e.g., 'Admin', 'Viewer', 'FinOps_Manager'

    @Column()
    tenant_id: string;

    @Column({ type: 'simple-json', nullable: true })
    permissions: string[]; // e.g. ['read:inventory', 'write:policy']

    @CreateDateColumn()
    created_at: Date;
}
