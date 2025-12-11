import { Controller, Get, Query } from '@nestjs/common';
import { CostService } from '../services/cost.service';

@Controller('cost')
export class CostController {
    constructor(private readonly costService: CostService) { }

    @Get('monthly')
    getMonthly(@Query('tenantId') tenantId: string) {
        return this.costService.getMonthlySpend(tenantId);
    }

    @Get('forecast')
    getForecast(@Query('tenantId') tenantId: string) {
        return this.costService.getForecast(tenantId);
    }
}
