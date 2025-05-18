import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestHttpClientModule } from '@sapient-fc/nest-http-client';
import { CountryModule } from './modules/country';
import { LeagueModule } from './modules/league/league.module';
import { TeamModule } from './modules/team/team.module';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: isProduction,
      envFilePath: isProduction ? undefined : '.env.local',
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
