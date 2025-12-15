import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('cloud_services')
@Index(['category'])
@Index(['service_type'])
export class CloudServiceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: string; // e.g., 'Compute', 'Storage', 'Database'

    @Column({ nullable: true })
    subcategory: string; // e.g., 'VMs', 'Serverless', 'Object Storage'

    @Column({ nullable: true })
    aws_service: string; // e.g., 'Amazon EC2'

    @Column({ nullable: true })
    azure_service: string; // e.g., 'Azure Virtual Machines'

    @Column({ nullable: true })
    gcp_service: string; // e.g., 'Compute Engine'

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    service_type: string; // e.g., 'compute-vm', 'storage-object', 'database-relational'

    @Column({ type: 'simple-json', nullable: true })
    metadata: Record<string, any>; // Additional info like pricing tier, features, etc.
}
