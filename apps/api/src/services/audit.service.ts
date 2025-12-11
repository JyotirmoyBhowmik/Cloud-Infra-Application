import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEvent } from '../entities/audit-event.entity';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(AuditEvent)
        private auditRepository: Repository<AuditEvent>,
    ) { }

    async log(tenantId: string, actor: string, action: string, target: string, details?: any) {
        const event = this.auditRepository.create({
            tenant_id: tenantId,
            actor,
            action,
            target_resource: target,
            details,
            source_ip: '127.0.0.1' // Mock IP
        });
        return this.auditRepository.save(event);
    }

    async findAll(tenantId: string) {
        return this.auditRepository.find({
            where: { tenant_id: tenantId },
            order: { timestamp: 'DESC' },
            take: 100
        });
    }
}
