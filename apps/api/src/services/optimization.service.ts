import { Injectable } from '@nestjs/common';
import { InventoryEntity } from '../entities/inventory.entity';

@Injectable()
export class OptimizationService {

    generateRecommendations(resources: InventoryEntity[]): any[] {
        const recommendations = [];

        for (const res of resources) {
            // Logic: If Mock config shows 't3.large' but specific tag says 'Environment:Dev', suggest downsizing
            if (res.provider === 'aws' && res.type === 'ec2_instance') {
                // Mock heuristic
                recommendations.push({
                    resourceId: res.native_id,
                    action: 'Rightsize',
                    details: 'Downgrade to t3.medium',
                    estimatedSavings: 15.00,
                    confidence: 'High'
                });
            }

            if (res.state === 'stopped') {
                recommendations.push({
                    resourceId: res.native_id,
                    action: 'Terminate',
                    details: 'Resource has been stopped for > 30 days',
                    estimatedSavings: 0.00, // already stopped, but cleanup hygiene
                    confidence: 'Medium'
                });
            }
        }

        return recommendations;
    }
}
