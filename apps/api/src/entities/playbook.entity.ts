import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Playbook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    trigger_type: string; // 'MANUAL', 'ALERT'

    @Column({ type: 'text' })
    script_content: string; // or reference to script

    @Column({ default: false })
    requires_approval: boolean;
}
