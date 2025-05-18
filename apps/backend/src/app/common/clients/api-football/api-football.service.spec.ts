import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NestHttpClientService } from '@sapient-fc/nest-http-client';
import { ApiFootballService } from './api-football.service';
import { CountryResponseDto } from '../../../modules/country/dto/CountryResponseDto';
import { LeagueResponseDto } from '../../../modules/league/dto/LeagueResponseDto';
import { TeamResponseDto } from '../../../modules/team/dto/TeamResponseDto';
import { StandingResponseDto } from '../../../modules/team/dto/StandingResponseDto';

describe('ApiFootballService', () => {
  let service: ApiFootballService;
  let httpService: NestHttpClientService;

  const mockApiHost = 'testhost';
  const mockApiKey = 'testkey';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiFootballService,
        {
          provide: NestHttpClientService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_FOOTBALL_API_HOST') return mockApiHost;
              if (key === 'API_FOOTBALL_API_KEY') return mockApiKey;
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ApiFootballService>(ApiFootballService);
    httpService = module.get<NestHttpClientService>(NestHttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchAllCountries', () => {
    it('should call httpService.get with correct parameters and return countries', async () => {
      const mockCountries: CountryResponseDto[] = [{
        id: '1',
        name: 'England',
        logo: '',
        _links: { self: { href: '/api/countries/1' }, leagues: { href: '/api/leagues?countryId=1' } },
      }];
      (httpService.get as jest.Mock).mockResolvedValue(mockCountries);

      const result = await service.fetchAllCountries();

      expect(httpService.get).toHaveBeenCalledWith(
        mockApiHost,
        CountryResponseDto,
        {
          params: {
            action: 'get_countries',
            APIkey: mockApiKey,
          },
        }
      );
      expect(result).toEqual(mockCountries);
    });
  });

  describe('fetchLeaguesByCountry', () => {
    it('should call httpService.get with correct parameters and return leagues', async () => {
      const countryId = '1';
      const mockLeagues: LeagueResponseDto[] = [{
        id: '10',
        name: 'Premier League',
        logo: '',
        _links: { self: { href: '/api/leagues?countryId=1' }, teams: { href: '/api/teams?leagueId=10' } },
      }];
      (httpService.get as jest.Mock).mockResolvedValue(mockLeagues);

      const result = await service.fetchLeaguesByCountry(countryId);

      expect(httpService.get).toHaveBeenCalledWith(
        mockApiHost,
        LeagueResponseDto,
        {
          params: {
            action: 'get_leagues',
            country_id: countryId,
            APIkey: mockApiKey,
          },
        }
      );
      expect(result).toEqual(mockLeagues);
    });
  });

  describe('fetchTeamsByLeague', () => {
    it('should call httpService.get with correct parameters and return teams', async () => {
      const leagueId = '10';
      const mockTeams: TeamResponseDto[] = [{
        id: '100',
        name: 'Arsenal',
        logo: '',
        _links: { self: { href: '/api/teams?leagueId=10' }, standing: { href: '/api/teams/position?leagueId=10&teamId=100' } },
      }];
      (httpService.get as jest.Mock).mockResolvedValue(mockTeams);

      const result = await service.fetchTeamsByLeague(leagueId);

      expect(httpService.get).toHaveBeenCalledWith(
        mockApiHost,
        TeamResponseDto,
        {
          params: {
            action: 'get_teams',
            league_id: leagueId,
            APIkey: mockApiKey,
          },
        },
        {
          league_id: leagueId,
        }
      );
      expect(result).toEqual(mockTeams);
    });
  });

  describe('fetchLeagueStandings', () => {
    it('should call httpService.get with correct parameters and return standings', async () => {
      const leagueId = '10';
      const mockStandings: StandingResponseDto[] = [{
        teamId: '100',
        position: 1,
        _links: { self: { href: '/api/teams/position?leagueId=10&teamId=100' } },
      }];
      (httpService.get as jest.Mock).mockResolvedValue(mockStandings);

      const result = await service.fetchLeagueStandings(leagueId);

      expect(httpService.get).toHaveBeenCalledWith(
        mockApiHost,
        StandingResponseDto,
        {
          params: {
            action: 'get_standings',
            league_id: leagueId,
            APIkey: mockApiKey,
          },
        }
      );
      expect(result).toEqual(mockStandings);
    });
  });
});
