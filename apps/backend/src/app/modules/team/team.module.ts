import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { ApiFootballModule } from '../../clients';

@Module({
  imports: [ApiFootballModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
