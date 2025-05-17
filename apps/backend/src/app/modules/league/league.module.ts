import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { ApiFootballModule } from '../../common/clients';

@Module({
  imports: [ApiFootballModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
