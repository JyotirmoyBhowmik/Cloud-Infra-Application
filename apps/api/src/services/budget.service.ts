import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../entities/budget.entity';
import { BudgetAlert } from '../entities/budget-alert.entity';
import { CostRecord } from '../entities/cost-record.entity';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(Budget)
        private budgetRepo: Repository<Budget>,
        @InjectRepository(BudgetAlert)
        private alertRepo: Repository<BudgetAlert>,
        @InjectRepository(CostRecord)
        private costRepo: Repository<CostRecord>,
    ) { }

    // CRUD operations
    async findAll(tenantId: string): Promise<Budget[]> {
        return this.budgetRepo.find({ where: { tenant_id: tenantId } });
    }

    async findOne(id: string): Promise<Budget | null> {
        return this.budgetRepo.findOne({ where: { id } });
    }

    async create(budget: Partial<Budget>): Promise<Budget> {
        const newBudget = this.budgetRepo.create(budget);
        return this.budgetRepo.save(newBudget);
    }

    async update(id: string, updates: Partial<Budget>): Promise<Budget> {
        await this.budgetRepo.update(id, updates);
        return this.budgetRepo.findOne({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.budgetRepo.delete(id);
    }

    // Budget evaluation logic
    async evaluateBudgets(tenantId: string): Promise<BudgetAlert[]> {
        const budgets = await this.findAll(tenantId);
        const alerts: BudgetAlert[] = [];

        for (const budget of budgets) {
            // Calculate current spend for this budget's period
            const currentSpend = await this.calculateCurrentSpend(budget);
            const percentageUsed = (currentSpend / Number(budget.amount)) * 100;

            // Check each threshold
            if (budget.alert_thresholds) {
                for (const threshold of budget.alert_thresholds) {
                    if (percentageUsed >= threshold) {
                        // Check if we already have an active alert for this threshold
                        const existingAlert = await this.alertRepo.findOne({
                            where: {
                                budget_id: budget.id,
                                threshold_percentage: threshold,
                                status: 'ACTIVE',
                            },
                        });

                        if (!existingAlert) {
                            // Create new alert
                            const alert = this.alertRepo.create({
                                budget_id: budget.id,
                                tenant_id: tenantId,
                                current_spend: currentSpend,
                                threshold_percentage: threshold,
                                status: 'ACTIVE',
                            });
                            const savedAlert = await this.alertRepo.save(alert);
                            alerts.push(savedAlert);
                        }
                    }
                }
            }
        }

        return alerts;
    }

    async getAlerts(tenantId: string): Promise<BudgetAlert[]> {
        return this.alertRepo.find({ where: { tenant_id: tenantId } });
    }

    async getBudgetStatus(budgetId: string) {
        const budget = await this.findOne(budgetId);
        if (!budget) throw new Error('Budget not found');

        const currentSpend = await this.calculateCurrentSpend(budget);
        const percentageUsed = (currentSpend / Number(budget.amount)) * 100;

        return {
            budget,
            currentSpend,
            percentageUsed,
            remaining: Number(budget.amount) - currentSpend,
        };
    }

    private async calculateCurrentSpend(budget: Budget): Promise<number> {
        // For simplicity, calculate spend for current month
        // In production, this would respect the budget's period (MONTHLY/QUARTERLY/ANNUAL)
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // If scope is defined, filter by it (e.g., provider:aws)
        let query = this.costRepo
            .createQueryBuilder('cost')
            .where('cost.tenant_id = :tenantId', { tenantId: budget.tenant_id })
            .andWhere('cost.date >= :startDate', { startDate: firstDayOfMonth });

        if (budget.scope) {
            // Parse scope like "provider:aws" or "service:ec2"
            const [scopeType, scopeValue] = budget.scope.split(':');
            if (scopeType === 'provider') {
                query = query.andWhere('cost.provider = :provider', { provider: scopeValue });
            }
            // Add more scope types as needed
        }

        const costs = await query.getMany();
        return costs.reduce((sum, cost) => sum + Number(cost.amount), 0);
    }
}
