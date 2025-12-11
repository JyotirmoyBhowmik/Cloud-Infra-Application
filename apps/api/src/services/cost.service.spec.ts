import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CostService } from './cost.service';
import { CostRecord } from '../entities/cost-record.entity';

describe('CostService', () => {
    let service: CostService;

    const mockRepository = {
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CostService,
                {
                    provide: getRepositoryToken(CostRecord),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CostService>(CostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getForecast', () => {
        it('should return a forecast with high confidence', async () => {
            const forecast = await service.getForecast('tenant-1');
            expect(forecast).toHaveProperty('forecast_next_month');
            expect(forecast.confidence).toBeGreaterThan(0.9);
            expect(forecast.model).toBe('ARIMA');
        });
    });
});
