import { Test, TestingModule } from '@nestjs/testing';
import { OptimizationService } from './optimization.service';
import { InventoryEntity } from '../entities/inventory.entity';

describe('OptimizationService', () => {
    let service: OptimizationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OptimizationService],
        }).compile();

        service = module.get<OptimizationService>(OptimizationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('generateRecommendations', () => {
        it('should recommend rightsizing for t3.large in Dev environment', () => {
            const inventory: InventoryEntity[] = [
                {
                    id: '1',
                    tenant_id: 'tenant-1',
                    provider: 'aws',
                    native_id: 'i-123',
                    type: 'ec2_instance',
                    region: 'us-east-1',
                    state: 'running',
                    config_json: { instanceType: 't3.large' },
                    tags: { Environment: 'Dev' },
                    discovered_at: new Date(),
                },
            ];

            const recommendations = service.generateRecommendations(inventory);

            expect(recommendations).toHaveLength(1);
            expect(recommendations[0].action).toBe('Rightsize');
            expect(recommendations[0].resourceId).toBe('i-123');
        });

        it('should recommend terminating stopped resources', () => {
            const inventory: InventoryEntity[] = [
                {
                    id: '2',
                    tenant_id: 'tenant-1',
                    provider: 'aws',
                    native_id: 'i-999',
                    type: 'ec2_instance',
                    region: 'us-east-1',
                    state: 'stopped',
                    config_json: { instanceType: 't3.medium' },
                    tags: {},
                    discovered_at: new Date(),
                },
            ];

            const recommendations = service.generateRecommendations(inventory);
            expect(recommendations).toHaveLength(1);
            expect(recommendations[0].action).toBe('Terminate');
        });
    });
});
