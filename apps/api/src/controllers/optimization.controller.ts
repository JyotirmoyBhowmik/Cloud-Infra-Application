import { Controller, Get, Query } from '@nestjs/common';
import { OptimizationService } from '../services/optimization.service';
import { InventoryService } from '../services/inventory.service';

@Controller('optimization')
export class OptimizationController {
    constructor(
        private readonly optimizationService: OptimizationService,
        private readonly inventoryService: InventoryService
    ) { }

    @Get('recommendations')
    async getRecommendations(@Query('tenantId') tenantId: string) {
        // Fetch inventory
        const inventory = await this.inventoryService.findAll(tenantId);
        // Generate recommendations based on inventory
        return this.optimizationService.generateRecommendations(inventory);
    }
}
