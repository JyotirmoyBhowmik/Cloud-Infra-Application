import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        // In production, integrate with SendGrid, AWS SES, etc.
        this.logger.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
        this.logger.log(`Body: ${body}`);
        // TODO: Actual email service integration
    }

    async sendSlack(webhookUrl: string, message: string): Promise<void> {
        // In production, POST to Slack webhook
        this.logger.log(`[SLACK] Webhook: ${webhookUrl}`);
        this.logger.log(`Message: ${message}`);

        try {
            // Mock Slack webhook call
            // await fetch(webhookUrl, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ text: message }),
            // });
        } catch (error) {
            this.logger.error(`Failed to send Slack notification: ${error.message}`);
        }
    }

    async sendWebhook(url: string, payload: any): Promise<void> {
        this.logger.log(`[WEBHOOK] URL: ${url}`);
        this.logger.log(`Payload: ${JSON.stringify(payload)}`);

        try {
            // Mock webhook call
            // await fetch(url, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(payload),
            // });
        } catch (error) {
            this.logger.error(`Failed to send webhook notification: ${error.message}`);
        }
    }

    async dispatch(channel: { type: string; config: any }, alert: any): Promise<void> {
        switch (channel.type) {
            case 'email':
                await this.sendEmail(
                    channel.config.to,
                    `Alert: ${alert.message}`,
                    `Alert triggered at ${alert.triggered_at}\nCurrent value: ${alert.current_value}`,
                );
                break;
            case 'slack':
                await this.sendSlack(channel.config.webhookUrl, alert.message);
                break;
            case 'webhook':
                await this.sendWebhook(channel.config.url, alert);
                break;
            default:
                this.logger.warn(`Unknown notification channel type: ${channel.type}`);
        }
    }
}
