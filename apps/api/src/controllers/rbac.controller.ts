import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { RbacService } from '../services/rbac.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('rbac')
@UseGuards(AuthGuard)
export class RbacController {
    constructor(private readonly rbacService: RbacService) { }

    @Post('roles')
    createRole(@Body() body: { tenantId: string; name: string; permissions: string[] }) {
        return this.rbacService.createRole(body.tenantId, body.name, body.permissions);
    }

    @Post('assign')
    assignRole(@Body() body: { tenantId: string; userId: string; roleId: string }) {
        return this.rbacService.assignRole(body.tenantId, body.userId, body.roleId);
    }

    @Get('permissions')
    getMyPermissions(@Query('userId') userId: string, @Query('tenantId') tenantId: string) {
        return this.rbacService.getMyPermissions(userId, tenantId);
    }

    // --- JIT ---
    @Post('jit/request')
    requestJit(@Body() body: { tenantId: string; userId: string; roleId: string; justification: string; durationMinutes: number }) {
        return this.rbacService.requestJitAccess(body.tenantId, body.userId, body.roleId, body.justification, body.durationMinutes);
    }

    @Post('jit/approve')
    approveJit(@Body() body: { requestId: string; approverId: string }) {
        return this.rbacService.approveJitRequest(body.requestId, body.approverId);
    }
}
