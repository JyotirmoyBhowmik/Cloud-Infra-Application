import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get()
    findAll(@Query('tenantId') tenantId: string) {
        return this.inventoryService.findAll(tenantId);
    }

    @Post('sync')
    triggerSync(@Body('tenantId') tenantId: string) {
        return this.inventoryService.syncMockData(tenantId);
    }
}
