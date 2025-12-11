import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playbook } from '../entities/playbook.entity';

@Injectable()
export class PlaybookService {
    constructor(
        @InjectRepository(Playbook)
        private playbookRepository: Repository<Playbook>,
    ) { }

    async findAll() {
        // Return mock if empty
        const count = await this.playbookRepository.count();
        if (count === 0) {
            return [
                { id: '1', name: 'Restart VM', description: 'Restarts a stuck VM', trigger_type: 'MANUAL', requires_approval: true },
                { id: '2', name: 'Scale ASG', description: 'Increases ASG capacity', trigger_type: 'ALERT', requires_approval: false },
            ];
        }
        return this.playbookRepository.find();
    }

    async execute(id: string, resourceId: string) {
        // Mock execution
        return { status: 'Executed', playbookId: id, resource: resourceId, timestamp: new Date() };
    }
}
