import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestHttpClientService } from '@sapient-fc/nest-http-client';
import { CountryResponseDto } from '../../../modules/country/dto/CountryResponseDto';
import { LeagueResponseDto } from '../../../modules/league/dto/LeagueResponseDto';
import { TeamResponseDto } from '../../../modules/team/dto/TeamResponseDto';
import { StandingResponseDto } from '../../../modules/team/dto/StandingResponseDto';

@Injectable()
export class ApiFootballService {
  private readonly apiHost: string;
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: NestHttpClientService,
    private configService: ConfigService<{
      API_FOOTBALL_API_KEY: string;
      API_FOOTBALL_API_HOST: string;
    }>
  ) {
    this.apiHost =
      this.configService.get<string>('API_FOOTBALL_API_HOST') || '';
    this.apiKey = this.configService.get<string>('API_FOOTBALL_API_KEY');
  }

  async fetchAllCountries() {
    const countries = (await this.httpService.get(
      this.apiHost,
      CountryResponseDto,
      {
        params: {
          action: 'get_countries',
          APIkey: this.apiKey,
        },
      }
    )) as CountryResponseDto[];

    return countries;
  }

  async fetchLeaguesByCountry(countryId: string) {
    const leagues = (await this.httpService.get(
      this.apiHost,
      LeagueResponseDto,
      {
        params: {
          action: 'get_leagues',
          country_id: countryId,
          APIkey: this.apiKey,
        },
      }
    )) as LeagueResponseDto[];

    return leagues;
  }

  async fetchTeamsByLeague(leagueId: string) {
    const teams = (await this.httpService.get(
      this.apiHost,
      TeamResponseDto,
      {
        params: {
          action: 'get_teams',
          league_id: leagueId,
          APIkey: this.apiKey,
        },
      },
      {
        league_id: leagueId,
      }
    )) as TeamResponseDto[];

    return teams;
  }

  async fetchLeagueStandings(leagueId: string): Promise<StandingResponseDto[]> {
    const standings = (await this.httpService.get(
      this.apiHost,
      StandingResponseDto,
      {
        params: {
          action: 'get_standings',
          league_id: leagueId,
          APIkey: this.apiKey,
        },
      }
    )) as StandingResponseDto[];

    return standings;
  }
}
