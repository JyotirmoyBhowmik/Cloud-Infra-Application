import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AlertService } from '../services/alert.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('alerts')
@UseGuards(AuthGuard)
export class AlertController {
    constructor(private readonly alertService: AlertService) { }

    // Alert Rules
    @Post('rules')
    createRule(@Body() rule: any) {
        return this.alertService.createRule(rule);
    }

    @Get('rules')
    getRules(@Query('tenantId') tenantId: string) {
        return this.alertService.getRules(tenantId);
    }

    @Delete('rules/:id')
    deleteRule(@Param('id') id: string) {
        return this.alertService.deleteRule(id);
    }

    // Alert Events
    @Get('events')
    getEvents(@Query('tenantId') tenantId: string) {
        return this.alertService.getEvents(tenantId);
    }

    @Put('events/:id/acknowledge')
    acknowledgeEvent(@Param('id') id: string, @Body() body: { userId: string }) {
        return this.alertService.acknowledgeEvent(id, body.userId);
    }

    // Trigger evaluation (typically called by a scheduled job)
    @Post('evaluate')
    evaluateRules(@Body() body: { tenantId: string }) {
        return this.alertService.evaluateRules(body.tenantId);
    }
}
