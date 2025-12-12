/**
 * BudgetService - Manages budget creation, tracking, and automated alerting
 * 
 * This service handles all budget-related operations including:
 * - CRUD operations for budgets
 * - Spend calculation and tracking
 * - Threshold evaluation and alert generation
 * - Budget status reporting with percentage calculations
 * 
 * @author Cloud Governance Platform Team
 * @version 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../entities/budget.entity';
import { BudgetAlert } from '../entities/budget-alert.entity';
import { CostRecord } from '../entities/cost-record.entity';

@Injectable()
export class BudgetService {
    /**
     * Constructor - Injects required repositories
     * @param budgetRepo - Repository for Budget entities
     * @param alertRepo - Repository for BudgetAlert entities
     * @param costRepo - Repository for CostRecord entities
     */
    constructor(
        @InjectRepository(Budget)
        private budgetRepo: Repository<Budget>,
        @InjectRepository(BudgetAlert)
        private alertRepo: Repository<BudgetAlert>,
        @InjectRepository(CostRecord)
        private costRepo: Repository<CostRecord>,
    ) { }

    /* ========================================================================
     * CRUD Operations
     * ======================================================================== */

    /**
     * Retrieves all budgets for a specific tenant
     * @param tenantId - The ID of the tenant
     * @returns Promise resolving to array of Budget entities
     */
    async findAll(tenantId: string): Promise<Budget[]> {
        return this.budgetRepo.find({ where: { tenant_id: tenantId } });
    }

    /**
     * Retrieves a single budget by ID
     * @param id - The budget ID
     * @returns Promise resolving to Budget entity or null
     */
    async findOne(id: string): Promise<Budget | null> {
        return this.budgetRepo.findOne({ where: { id } });
    }

    /**
     * Creates a new budget
     * @param budget - Partial budget object with required fields
     * @returns Promise resolving to created Budget entity
     */
    async create(budget: Partial<Budget>): Promise<Budget> {
        const newBudget = this.budgetRepo.create(budget);
        return this.budgetRepo.save(newBudget);
    }

    /**
     * Updates an existing budget
     * @param id - The budget ID to update
     * @param updates - Partial budget object with fields to update
     * @returns Promise resolving to updated Budget entity
     */
    async update(id: string, updates: Partial<Budget>): Promise<Budget> {
        await this.budgetRepo.update(id, updates);
        return this.budgetRepo.findOne({ where: { id } });
    }

    /**
     * Deletes a budget
     * @param id - The budget ID to delete
     * @returns Promise resolving when deletion is complete
     */
    async remove(id: string): Promise<void> {
        await this.budgetRepo.delete(id);
    }

    /* ========================================================================
     * Budget Evaluation & Alerting Logic
     * ======================================================================== */

    /**
     * Evaluates all budgets for a tenant and creates alerts for threshold breaches
     * 
     * This method:
     * 1. Retrieves all budgets for the tenant
     * 2. Calculates current spend for each budget
     * 3. Compares spend against defined thresholds
     * 4. Creates alerts for any breached thresholds (if not already alerted)
     * 
     * @param tenantId - The ID of the tenant
     * @returns Promise resolving to array of newly created BudgetAlert entities
     */
    async evaluateBudgets(tenantId: string): Promise<BudgetAlert[]> {
        const budgets = await this.findAll(tenantId);
        const alerts: BudgetAlert[] = [];

        for (const budget of budgets) {
            // Calculate current spend for this budget's period
            const currentSpend = await this.calculateCurrentSpend(budget);
            const percentageUsed = (currentSpend / Number(budget.amount)) * 100;

            // Check each threshold defined in the budget
            if (budget.alert_thresholds) {
                for (const threshold of budget.alert_thresholds) {
                    // If spend percentage exceeds or equals threshold
                    if (percentageUsed >= threshold) {
                        // Check if we already have an active alert for this threshold
                        // This prevents duplicate alerts
                        const existingAlert = await this.alertRepo.findOne({
                            where: {
                                budget_id: budget.id,
                                threshold_percentage: threshold,
                                status: 'ACTIVE',
                            },
                        });

                        // Create new alert only if one doesn't exist
                        if (!existingAlert) {
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

    /**
     * Retrieves all budget alerts for a tenant
     * @param tenantId - The ID of the tenant
     * @returns Promise resolving to array of BudgetAlert entities
     */
    async getAlerts(tenantId: string): Promise<BudgetAlert[]> {
        return this.alertRepo.find({ where: { tenant_id: tenantId } });
    }

    /**
     * Gets detailed status for a specific budget including spend and percentage used
     * 
     * @param budgetId - The budget ID
     * @returns Promise resolving to object containing:
     *   - budget: The Budget entity
     *   - currentSpend: Total spend for the period
     *   - percentageUsed: Percentage of budget consumed
     *   - remaining: Amount remaining in budget
     * @throws Error if budget not found
     */
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

    /* ========================================================================
     * Private Helper Methods
     * ======================================================================== */

    /**
     * Calculates the current spend for a budget based on its period and scope
     * 
     * This method:
     * 1. Determines the date range based on budget period (currently simplified to current month)
     * 2. Queries cost records within that range
     * 3. Filters by scope if defined (e.g., specific cloud provider or service)
     * 4. Sums the costs
     * 
     * TODO: Implement full support for QUARTERLY and ANNUAL periods
     * TODO: Add more scope type support (service-level, tags, etc.)
     * 
     * @param budget - The Budget entity
     * @returns Promise resolving to total spend amount
     * @private
     */
    private async calculateCurrentSpend(budget: Budget): Promise<number> {
        // For simplicity, calculate spend for current month
        // In production, this would respect the budget's period (MONTHLY/QUARTERLY/ANNUAL)
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Build base query filtered by tenant and date range
        let query = this.costRepo
            .createQueryBuilder('cost')
            .where('cost.tenant_id = :tenantId', { tenantId: budget.tenant_id })
            .andWhere('cost.date >= :startDate', { startDate: firstDayOfMonth });

        // If budget has a scope defined, apply additional filters
        if (budget.scope) {
            // Parse scope like "provider:aws" or "service:ec2"
            const [scopeType, scopeValue] = budget.scope.split(':');

            if (scopeType === 'provider') {
                // Filter by cloud provider (AWS, Azure, GCP)
                query = query.andWhere('cost.provider = :provider', { provider: scopeValue });
            }
            // Add more scope types as needed (service, region, tags, etc.)
        }

        // Execute query and sum the costs
        const costs = await query.getMany();
        return costs.reduce((sum, cost) => sum + Number(cost.amount), 0);
    }
}
