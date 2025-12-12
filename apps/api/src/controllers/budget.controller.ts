import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BudgetService } from '../services/budget.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('budgets')
@UseGuards(AuthGuard)
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) { }

    @Get()
    findAll(@Query('tenantId') tenantId: string) {
        return this.budgetService.findAll(tenantId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.budgetService.findOne(id);
    }

    @Get(':id/status')
    getBudgetStatus(@Param('id') id: string) {
        return this.budgetService.getBudgetStatus(id);
    }

    @Post()
    create(@Body() budget: any) {
        return this.budgetService.create(budget);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updates: any) {
        return this.budgetService.update(id, updates);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.budgetService.remove(id);
    }

    @Post('evaluate')
    evaluateBudgets(@Body() body: { tenantId: string }) {
        return this.budgetService.evaluateBudgets(body.tenantId);
    }

    @Get('alerts/list')
    getAlerts(@Query('tenantId') tenantId: string) {
        return this.budgetService.getAlerts(tenantId);
    }
}
