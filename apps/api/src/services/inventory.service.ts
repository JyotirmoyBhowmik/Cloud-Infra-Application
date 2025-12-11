import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private inventoryRepository: Repository<InventoryEntity>,
    ) { }

    async findAll(tenantId?: string): Promise<InventoryEntity[]> {
        if (tenantId) {
            return this.inventoryRepository.find({ where: { tenant_id: tenantId } });
        }
        return this.inventoryRepository.find();
    }

    async syncMockData(tenantId: string): Promise<InventoryEntity[]> {
        // Simulate fetching from AWS/Azure APIs
        const mockData = [
            {
                tenant_id: tenantId,
                provider: 'aws',
                native_id: 'i-0123456789abcdef0',
                type: 'ec2_instance',
                region: 'us-east-1',
                state: 'running',
                config_json: { instanceType: 't3.micro' },
                tags: { Project: 'Demo', Env: 'Dev' },
            },
            {
                tenant_id: tenantId,
                provider: 'azure',
                native_id: '/subscriptions/123/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1',
                type: 'azure_vm',
                region: 'eastus',
                state: 'running',
                config_json: { vmSize: 'Standard_D2s_v3' },
                tags: { Project: 'Demo' },
            },
            {
                tenant_id: tenantId,
                provider: 'gcp',
                native_id: 'projects/my-project/zones/us-central1-a/instances/instance-1',
                type: 'gce_instance',
                region: 'us-central1',
                state: 'stopped',
                config_json: { machineType: 'e2-medium' },
                tags: { Env: 'Prod' },
            },
        ];

        const entities: InventoryEntity[] = [];
        for (const data of mockData) {
            // In real implementation, this would update existing or insert new
            // Here we just save new for demo purposes
            // NOTE: Using 'save' on an existing ID would update it
            const ent = this.inventoryRepository.create(data);
            entities.push(await this.inventoryRepository.save(ent));
        }
        return entities;
    }
}
