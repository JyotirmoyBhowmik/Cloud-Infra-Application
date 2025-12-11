import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('alerts')
export class AlertController {

    private alerts = [
        { id: 1, severity: 'Critical', message: 'Budget exceeded for Tenant Acme', timestamp: new Date() },
        { id: 2, severity: 'Warning', message: 'Unencrypted S3 Bucket detected', timestamp: new Date() }
    ];

    @Get()
    getInternalAlerts() {
        return this.alerts;
    }

    @Post()
    createAlert(@Body() alert: any) {
        this.alerts.push({ ...alert, id: this.alerts.length + 1, timestamp: new Date() });
        return { status: 'Alert Received' };
    }
}
