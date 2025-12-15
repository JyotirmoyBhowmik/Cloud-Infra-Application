import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { Role } from '../entities/role.entity';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(Tenant)
        private tenantRepository: Repository<Tenant>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(UserRole)
        private userRoleRepository: Repository<UserRole>,
    ) { }

    findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find({ relations: ['cloud_accounts'] });
    }

    findOne(id: string): Promise<Tenant | null> {
        return this.tenantRepository.findOne({ where: { id }, relations: ['cloud_accounts'] });
    }

    async create(tenant: Partial<Tenant>): Promise<Tenant> {
        const newTenant = this.tenantRepository.create(tenant);
        return this.tenantRepository.save(newTenant);
    }

    async onboardTenant(dto: {
        name: string;
        billing_group?: string;
        data_retention_days?: number;
        userId: string;
    }): Promise<Tenant> {
        // Step 1: Create the tenant
        const tenant = this.tenantRepository.create({
            name: dto.name,
            billing_group: dto.billing_group,
            data_retention_days: dto.data_retention_days || 365,
        });
        const savedTenant = await this.tenantRepository.save(tenant);

        // Step 2: Create default "Admin" role for this tenant
        const adminRole = this.roleRepository.create({
            name: 'Admin',
            tenant_id: savedTenant.id,
            permissions: [
                'read:*',
                'write:*',
                'delete:*',
                'manage:roles',
                'manage:connectors',
                'manage:policies',
            ],
        });
        const savedRole = await this.roleRepository.save(adminRole);

        // Step 3: Assign the requesting user to the Admin role
        const userRole = this.userRoleRepository.create({
            user_id: dto.userId,
            role_id: savedRole.id,
            tenant_id: savedTenant.id,
        });
        await this.userRoleRepository.save(userRole);

        return savedTenant;
    }

    async update(id: string, updates: Partial<Tenant>): Promise<Tenant> {
        const tenant = await this.findOne(id);
        if (!tenant) {
            throw new Error('Tenant not found');
        }

        // Update tenant with provided fields
        await this.tenantRepository.update(id, updates);

        // Return updated tenant
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}
