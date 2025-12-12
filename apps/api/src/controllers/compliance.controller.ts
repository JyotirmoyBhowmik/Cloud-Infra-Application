import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ComplianceService } from '../services/compliance.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('compliance')
@UseGuards(AuthGuard)
export class ComplianceController {
    constructor(private readonly complianceService: ComplianceService) { }

    @Get('rules')
    getRules() {
        return this.complianceService.getRules();
    }

    @Post('scan')
    scanResources(@Query('tenantId') tenantId: string) {
        return this.complianceService.scanResources(tenantId);
    }

    @Get('score')
    getScore(@Query('tenantId') tenantId: string) {
        return this.complianceService.getComplianceScore(tenantId);
    }
}
