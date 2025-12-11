import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string; // From Auth Provider (e.g. email or sub)

    @Column()
    role_id: string; // FK to Role

    @Column()
    tenant_id: string;

    @CreateDateColumn()
    assigned_at: Date;
}
