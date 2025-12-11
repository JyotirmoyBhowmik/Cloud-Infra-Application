import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(Tenant)
        private tenantRepository: Repository<Tenant>,
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

    async remove(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}
