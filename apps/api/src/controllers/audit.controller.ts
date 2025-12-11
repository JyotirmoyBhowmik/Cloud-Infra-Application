import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AuditService } from '../services/audit.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('audit')
@UseGuards(AuthGuard)
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get()
    getLogs(@Query('tenantId') tenantId: string) {
        return this.auditService.findAll(tenantId);
    }

    @Post()
    createLog(@Body() body: any) {
        return this.auditService.log(body.tenantId, body.actor, body.action, body.target, body.details);
    }
}
