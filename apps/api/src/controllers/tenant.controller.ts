import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';

@Controller('tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    findAll() {
        return this.tenantService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tenantService.findOne(id);
    }

    @Post()
    create(@Body() createTenantDto: any) {
        return this.tenantService.create(createTenantDto);
    }

    @Post('onboard')
    async onboard(@Body() dto: {
        name: string;
        billing_group?: string;
        data_retention_days?: number;
        userId: string;
    }) {
        return this.tenantService.onboardTenant(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: {
        name?: string;
        billing_group?: string;
        data_retention_days?: number;
        auth_provider_config?: string;
    }) {
        return this.tenantService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tenantService.remove(id);
    }
}
