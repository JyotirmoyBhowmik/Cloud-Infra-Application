import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostRecord } from '../entities/cost-record.entity';

@Injectable()
export class CostService {
    constructor(
        @InjectRepository(CostRecord)
        private costRepository: Repository<CostRecord>,
    ) { }

    async getMonthlySpend(tenantId: string): Promise<any[]> {
        // Mock aggregation
        return [
            { month: '2025-01', cost: 1250.00, provider: 'aws' },
            { month: '2025-01', cost: 980.50, provider: 'azure' },
            { month: '2025-02', cost: 1300.00, provider: 'aws' },
            { month: '2025-02', cost: 1050.00, provider: 'azure' },
            { month: '2025-02', cost: 200.00, provider: 'gcp' },
        ];
    }

    async getForecast(tenantId: string): Promise<any> {
        return {
            forecast_next_month: 2800.00,
            confidence: 0.95,
            model: 'ARIMA'
        };
    }
}
