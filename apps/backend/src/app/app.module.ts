import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestHttpClientModule } from '@sapient-fc/nest-http-client';
import { CountryModule } from './modules/country';
import { LeagueModule } from './modules/league/league.module';
import { TeamModule } from './modules/team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    NestHttpClientModule,
    CountryModule,
    LeagueModule,
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
