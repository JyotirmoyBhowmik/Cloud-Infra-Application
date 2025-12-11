import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { UserRole } from '../entities/user-role.entity';
import { JitRequest } from '../entities/jit-request.entity';

@Injectable()
export class RbacService {
    constructor(
        @InjectRepository(Role)
        private roleRepo: Repository<Role>,
        @InjectRepository(UserRole)
        private userRoleRepo: Repository<UserRole>,
        @InjectRepository(JitRequest)
        private jitRequestRepo: Repository<JitRequest>,
    ) { }

    // --- Roles ---
    async createRole(tenantId: string, name: string, permissions: string[]) {
        const role = this.roleRepo.create({ tenant_id: tenantId, name, permissions });
        return this.roleRepo.save(role);
    }

    async assignRole(tenantId: string, userId: string, roleId: string) {
        const assignment = this.userRoleRepo.create({ tenant_id: tenantId, user_id: userId, role_id: roleId });
        return this.userRoleRepo.save(assignment);
    }

    async getMyPermissions(userId: string, tenantId: string): Promise<string[]> {
        const userRoles = await this.userRoleRepo.find({ where: { user_id: userId, tenant_id: tenantId } });
        let permissions = new Set<string>();

        for (const ur of userRoles) {
            const role = await this.roleRepo.findOne({ where: { id: ur.role_id } });
            if (role && role.permissions) {
                role.permissions.forEach(p => permissions.add(p));
            }
        }
        return Array.from(permissions);
    }

    // --- JIT Access ---
    async requestJitAccess(tenantId: string, userId: string, roleId: string, justification: string, durationMinutes: number) {
        const request = this.jitRequestRepo.create({
            tenant_id: tenantId,
            user_id: userId,
            requested_role_id: roleId,
            justification,
            duration_minutes: durationMinutes,
            status: 'PENDING'
        });
        return this.jitRequestRepo.save(request);
    }

    async approveJitRequest(requestId: string, approverId: string) {
        const request = await this.jitRequestRepo.findOne({ where: { id: requestId } });
        if (!request) throw new Error('Request not found');

        request.status = 'APPROVED';
        request.approver_id = approverId;
        request.expires_at = new Date(Date.now() + request.duration_minutes * 60000);

        await this.jitRequestRepo.save(request);

        // Grant the role temporarily (In real system, might run a cron cleanup or middleware check)
        await this.assignRole(request.tenant_id, request.user_id, request.requested_role_id);

        return request;
    }
}
