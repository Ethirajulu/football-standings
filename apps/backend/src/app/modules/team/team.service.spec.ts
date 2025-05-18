import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { ApiFootballService } from '../../common/clients';
import { TeamResponseDto } from './dto/TeamResponseDto';
import { StandingResponseDto } from './dto/StandingResponseDto';

describe('TeamService', () => {
  let service: TeamService;
  let apiFootballService: jest.Mocked<ApiFootballService>;

  const mockTeamsDto: TeamResponseDto[] = [
    {
      id: 'T1',
      name: 'Team One',
      logo: 'logo-t1',
      _links: {
        self: { href: '/teams/T1' },
        standing: { href: '/standings/T1' },
      },
    },
    {
      id: 'T2',
      name: 'Team Two',
      logo: 'logo-t2',
      _links: {
        self: { href: '/teams/T2' },
        standing: { href: '/standings/T2' },
      },
    },
  ];

  const mockStandingsResponseDto: StandingResponseDto[] = [
    {
      teamId: 'T1',
      position: 1,
      _links: { self: { href: '/api/teams/position?leagueId=L1&teamId=T1' } },
    },
    {
      teamId: 'T2',
      position: 2,
      _links: { self: { href: '/api/teams/position?leagueId=L1&teamId=T2' } },
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
        TeamService,
        { provide: ApiFootballService, useValue: apiFootballService },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTeamsByLeague', () => {
    const leagueId = 'L1';
    it('should fetch teams from ApiFootballService and return them', async () => {
      apiFootballService.fetchTeamsByLeague.mockResolvedValue(mockTeamsDto);
      const result = await service.getAllTeamsByLeague(leagueId);
      expect(apiFootballService.fetchTeamsByLeague).toHaveBeenCalledWith(
        leagueId
      );
      expect(apiFootballService.fetchTeamsByLeague).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTeamsDto);
    });

    it('should propagate errors from apiFootballService.fetchTeamsByLeague', async () => {
      const error = new Error('API failure');
      apiFootballService.fetchTeamsByLeague.mockRejectedValue(error);
      await expect(service.getAllTeamsByLeague(leagueId)).rejects.toThrow(
        'API failure'
      );
      expect(apiFootballService.fetchTeamsByLeague).toHaveBeenCalledWith(
        leagueId
      );
      expect(apiFootballService.fetchTeamsByLeague).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if ApiFootballService returns an empty array', async () => {
      apiFootballService.fetchTeamsByLeague.mockResolvedValue([]);
      const result = await service.getAllTeamsByLeague(leagueId);
      expect(apiFootballService.fetchTeamsByLeague).toHaveBeenCalledWith(
        leagueId
      );
      expect(result).toEqual([]);
    });
  });

  describe('getPositionOfTeam', () => {
    const leagueId = 'L1';
    const teamId = 'T1';
    it('should fetch standings and find the correct team', async () => {
      apiFootballService.fetchLeagueStandings.mockResolvedValue(
        mockStandingsResponseDto
      );
      const result = await service.getPositionOfTeam(leagueId, teamId);
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledWith(
        leagueId
      );
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStandingsResponseDto[0]);
    });

    it('should return undefined if team is not in standings', async () => {
      apiFootballService.fetchLeagueStandings.mockResolvedValue(
        mockStandingsResponseDto
      );
      const result = await service.getPositionOfTeam(leagueId, 'T3'); // Team not in mock
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledWith(
        leagueId
      );
      expect(result).toBeUndefined();
    });

    it('should propagate errors from apiFootballService.fetchLeagueStandings', async () => {
      const error = new Error('API failure');
      apiFootballService.fetchLeagueStandings.mockRejectedValue(error);
      await expect(service.getPositionOfTeam(leagueId, teamId)).rejects.toThrow(
        'API failure'
      );
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledWith(
        leagueId
      );
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledTimes(1);
    });

    it('should return undefined if ApiFootballService returns empty standings array', async () => {
      apiFootballService.fetchLeagueStandings.mockResolvedValue([]);
      const result = await service.getPositionOfTeam(leagueId, teamId);
      expect(apiFootballService.fetchLeagueStandings).toHaveBeenCalledWith(
        leagueId
      );
      expect(result).toBeUndefined();
    });
  });
});
