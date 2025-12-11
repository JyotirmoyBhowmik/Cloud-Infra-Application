import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { PlaybookService } from '../services/playbook.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('playbooks')
@UseGuards(AuthGuard)
export class PlaybookController {
    constructor(private readonly playbookService: PlaybookService) { }

    @Get()
    findAll() {
        return this.playbookService.findAll();
    }

    @Post(':id/execute')
    execute(@Param('id') id: string, @Body('resourceId') resourceId: string) {
        return this.playbookService.execute(id, resourceId);
    }
}
