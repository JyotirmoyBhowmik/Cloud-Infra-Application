import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertRule } from '../entities/alert-rule.entity';
import { AlertEvent } from '../entities/alert-event.entity';
import { NotificationService } from './notification.service';

@Injectable()
export class AlertService {
    constructor(
        @InjectRepository(AlertRule)
        private ruleRepo: Repository<AlertRule>,
        @InjectRepository(AlertEvent)
        private eventRepo: Repository<AlertEvent>,
        private notificationService: NotificationService,
    ) { }

    // CRUD for Alert Rules
    async createRule(rule: Partial<AlertRule>): Promise<AlertRule> {
        const newRule = this.ruleRepo.create(rule);
        return this.ruleRepo.save(newRule);
    }

    async getRules(tenantId: string): Promise<AlertRule[]> {
        return this.ruleRepo.find({ where: { tenant_id: tenantId } });
    }

    async deleteRule(id: string): Promise<void> {
        await this.ruleRepo.delete(id);
    }

    // Alert Events
    async getEvents(tenantId: string): Promise<AlertEvent[]> {
        return this.eventRepo.find({
            where: { tenant_id: tenantId },
            order: { triggered_at: 'DESC' },
            take: 100,
        });
    }

    async acknowledgeEvent(eventId: string, userId: string): Promise<AlertEvent> {
        const event = await this.eventRepo.findOne({ where: { id: eventId } });
        if (!event) throw new Error('Alert event not found');

        event.status = 'ACKNOWLEDGED';
        event.acknowledged_by = userId;
        return this.eventRepo.save(event);
    }

    // Core evaluation logic
    async evaluateRules(tenantId: string): Promise<AlertEvent[]> {
        const rules = await this.getRules(tenantId);
        const triggeredEvents: AlertEvent[] = [];

        for (const rule of rules) {
            if (!rule.enabled) continue;

            // Get current metric value (mock implementation)
            const currentValue = await this.getCurrentMetricValue(rule);

            // Evaluate threshold
            const breached = this.evaluateThreshold(currentValue, rule.threshold, rule.operator);

            if (breached) {
                // Check if there's already an active alert for this rule
                const existingAlert = await this.eventRepo.findOne({
                    where: { rule_id: rule.id, status: 'ACTIVE' },
                });

                if (!existingAlert) {
                    // Create new alert event
                    const message = `${rule.name}: ${rule.metric_type} is ${currentValue}, exceeding threshold of ${rule.threshold}`;
                    const event = this.eventRepo.create({
                        rule_id: rule.id,
                        tenant_id: tenantId,
                        current_value: currentValue,
                        message,
                        status: 'ACTIVE',
                    });

                    const savedEvent = await this.eventRepo.save(event);
                    triggeredEvents.push(savedEvent);

                    // Send notifications
                    for (const channel of rule.notification_channels) {
                        await this.notificationService.dispatch(channel, savedEvent);
                    }
                }
            }
        }

        return triggeredEvents;
    }

    private async getCurrentMetricValue(rule: AlertRule): Promise<number> {
        // Mock implementation - returns random values
        // In production, query actual metrics from TimescaleDB or fetch from connectors
        switch (rule.metric_type) {
            case 'COST':
                return Math.random() * 10000; // Random cost value
            case 'CPU':
                return Math.random() * 100; // Random CPU percentage
            case 'MEMORY':
                return Math.random() * 100; // Random memory percentage
            default:
                return 0;
        }
    }

    private evaluateThreshold(current: number, threshold: number, operator: string): boolean {
        switch (operator) {
            case 'GT':
                return current > threshold;
            case 'LT':
                return current < threshold;
            case 'EQ':
                return Math.abs(current - threshold) < 0.01;
            default:
                return false;
        }
    }
}
