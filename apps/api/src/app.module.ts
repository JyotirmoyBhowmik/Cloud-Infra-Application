import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { TenantController } from './controllers/tenant.controller';
import { InventoryController } from './controllers/inventory.controller';
import { CostController } from './controllers/cost.controller';
import { AlertController } from './controllers/alert.controller';
import { AuditController } from './controllers/audit.controller';
import { PlaybookController } from './controllers/playbook.controller';
import { OptimizationController } from './controllers/optimization.controller';
import { RbacController } from './controllers/rbac.controller';
import { BudgetController } from './controllers/budget.controller';

import { TenantService } from './services/tenant.service';
import { InventoryService } from './services/inventory.service';
import { CostService } from './services/cost.service';
import { OptimizationService } from './services/optimization.service';
import { AuditService } from './services/audit.service';
import { PlaybookService } from './services/playbook.service';
import { RbacService } from './services/rbac.service';
import { BudgetService } from './services/budget.service';

import { AwsConnectorService } from './connectors/aws-connector.service';
import { AzureConnectorService } from './connectors/azure-connector.service';
import { GcpConnectorService } from './connectors/gcp-connector.service';

import { AuthGuard } from './guards/auth.guard';

import { Tenant } from './entities/tenant.entity';
import { CloudAccount } from './entities/cloud-account.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { CostRecord } from './entities/cost-record.entity';
import { AuditEvent } from './entities/audit-event.entity';
import { Playbook } from './entities/playbook.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { JitRequest } from './entities/jit-request.entity';
import { Budget } from './entities/budget.entity';
import { BudgetAlert } from './entities/budget-alert.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
            username: process.env.DB_USER || 'admin',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'governance_platform',
            entities: [Tenant, CloudAccount, InventoryEntity, CostRecord, AuditEvent, Playbook, Role, UserRole, JitRequest, Budget, BudgetAlert],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([
            Tenant,
            CloudAccount,
            InventoryEntity,
            CostRecord,
            AuditEvent,
            Playbook,
            Role,
            UserRole,
            JitRequest,
            Budget,
            BudgetAlert
        ]),
    ],
    controllers: [
        TenantController,
        InventoryController,
        CostController,
        AlertController,
        AuditController,
        PlaybookController,
        OptimizationController,
        RbacController,
        BudgetController
    ],
    providers: [
        TenantService,
        InventoryService,
        CostService,
        OptimizationService,
        AuditService,
        PlaybookService,
        RbacService,
        BudgetService,
        AwsConnectorService,
        AzureConnectorService,
        GcpConnectorService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ],
})
export class AppModule { }
