import { Test, TestingModule } from '@nestjs/testing';
import { LeagueService } from './league.service';
import { ApiFootballService } from '../../common/clients';
import { LeagueResponseDto } from './dto/LeagueResponseDto';

describe('LeagueService', () => {
  let service: LeagueService;
  let apiFootballService: jest.Mocked<ApiFootballService>;

  const mockExpectedLeaguesDto: LeagueResponseDto[] = [
    {
      id: '1',
      name: 'League One',
      logo: 'logo-url-1-api',
      _links: {
        self: { href: '/api/leagues/1' },
        teams: { href: '/api/leagues/1/teams' },
      },
    },
    {
      id: '2',
      name: 'League Two',
      logo: 'logo-url-2-api',
      _links: {
        self: { href: '/api/leagues/2' },
        teams: { href: '/api/leagues/2/teams' },
      },
    },
  ];

  beforeEach(async () => {
    apiFootballService = {
      fetchAllCountries: jest.fn(),
      fetchLeaguesByCountry: jest.fn(),
      fetchTeamsByLeague: jest.fn(),
      fetchLeagueStandings: jest.fn(),
    } as unknown as jest.Mocked<ApiFootballService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeagueService,
        { provide: ApiFootballService, useValue: apiFootballService },
      ],
    }).compile();

    service = module.get<LeagueService>(LeagueService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllLeaguesByCountry', () => {
    const countryId = 'test-country-id';
    it('should fetch leagues from ApiFootballService, transform them to DTOs, and return them', async () => {
      apiFootballService.fetchLeaguesByCountry.mockResolvedValue(
        mockExpectedLeaguesDto
      );

      const result = await service.getAllLeaguesByCountry(countryId);

      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledWith(
        countryId
      );
      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockExpectedLeaguesDto);
    });

    it('should propagate errors from apiFootballService.fetchLeaguesByCountry', async () => {
      const error = new Error('API failure');
      apiFootballService.fetchLeaguesByCountry.mockRejectedValue(error);

      await expect(service.getAllLeaguesByCountry(countryId)).rejects.toThrow(
        'API failure'
      );
      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledWith(
        countryId
      );
      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if ApiFootballService returns an empty array', async () => {
      apiFootballService.fetchLeaguesByCountry.mockResolvedValue([]);

      const result = await service.getAllLeaguesByCountry(countryId);

      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledWith(
        countryId
      );
      expect(apiFootballService.fetchLeaguesByCountry).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });
});
