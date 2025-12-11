import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RbacService } from './rbac.service';
import { Role } from '../entities/role.entity';
import { UserRole } from '../entities/user-role.entity';
import { JitRequest } from '../entities/jit-request.entity';

describe('RbacService', () => {
    let service: RbacService;

    const mockRoleRepo = { create: jest.fn(), save: jest.fn(), findOne: jest.fn() };
    const mockUserRoleRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
    const mockJitRepo = { create: jest.fn(), save: jest.fn(), findOne: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RbacService,
                { provide: getRepositoryToken(Role), useValue: mockRoleRepo },
                { provide: getRepositoryToken(UserRole), useValue: mockUserRoleRepo },
                { provide: getRepositoryToken(JitRequest), useValue: mockJitRepo },
            ],
        }).compile();

        service = module.get<RbacService>(RbacService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createRole', () => {
        it('should create a role', async () => {
            const roleData = { name: 'Admin', tenant_id: 't1', permissions: [] };
            mockRoleRepo.create.mockReturnValue(roleData);
            mockRoleRepo.save.mockResolvedValue(roleData);

            const result = await service.createRole('t1', 'Admin', []);
            expect(result).toEqual(roleData);
        });
    });

    describe('JIT Request', () => {
        it('should create a pending request', async () => {
            const jitData = { status: 'PENDING', duration_minutes: 60 };
            mockJitRepo.create.mockReturnValue(jitData);
            mockJitRepo.save.mockResolvedValue(jitData);

            const result = await service.requestJitAccess('t1', 'u1', 'r1', 'test', 60);
            expect(result.status).toBe('PENDING');
        });
    });
});
