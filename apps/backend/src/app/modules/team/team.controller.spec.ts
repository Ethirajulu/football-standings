import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamResponseDto } from './dto/TeamResponseDto';
import { StandingResponseDto } from './dto/StandingResponseDto';
import { HttpException, Logger } from '@nestjs/common';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;
  let loggerErrorSpy: jest.SpyInstance;

  const mockTeams: TeamResponseDto[] = [
    {
      id: '1',
      name: 'Team One',
      logo: 'logo-url-1',
      _links: {
        self: { href: 'logo-url-1/self' },
        standing: { href: 'logo-url-1/standing' },
      },
    },
  ];

  const mockStandingResponse: StandingResponseDto = {
    teamId: 'test-team-id',
    position: 1,
    _links: {
      self: {
        href: '/api/teams/position?leagueId=test-league-id&teamId=test-team-id',
      },
    },
  };

  const mockTeamService = {
    getAllTeamsByLeague: jest.fn(),
    getPositionOfTeam: jest.fn(),
  };

  beforeEach(async () => {
    loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [{ provide: TeamService, useValue: mockTeamService }],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTeamsByLeague', () => {
    const leagueId = 'test-league-id';
    it('should return an array of teams on success', async () => {
      mockTeamService.getAllTeamsByLeague.mockResolvedValue(mockTeams);
      const result = await controller.getAllTeamsByLeague(leagueId);
      expect(service.getAllTeamsByLeague).toHaveBeenCalledWith(leagueId);
      expect(service.getAllTeamsByLeague).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTeams);
    });

    it('should throw and log error when service throws', async () => {
      const error = new HttpException('Service failure', 500);
      mockTeamService.getAllTeamsByLeague.mockRejectedValue(error);

      await expect(controller.getAllTeamsByLeague(leagueId)).rejects.toThrow(
        error
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Error fetching teams for leagueId ${leagueId}: ${error.message}`,
        error.stack,
        'TeamController'
      );
    });
  });

  describe('getPositionOfTeam', () => {
    const leagueId = 'test-league-id';
    const teamId = 'test-team-id';
    it('should return team standing on success', async () => {
      mockTeamService.getPositionOfTeam.mockResolvedValue(mockStandingResponse);
      const result = await controller.getPositionOfTeam(leagueId, teamId);
      expect(service.getPositionOfTeam).toHaveBeenCalledWith(leagueId, teamId);
      expect(service.getPositionOfTeam).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStandingResponse);
    });

    it('should throw and log error when service throws', async () => {
      const error = new HttpException('Service failure', 500);
      mockTeamService.getPositionOfTeam.mockRejectedValue(error);

      await expect(
        controller.getPositionOfTeam(leagueId, teamId)
      ).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Error fetching position for teamId ${teamId} in leagueId ${leagueId}: ${error.message}`,
        error.stack,
        'TeamController'
      );
    });
  });
});
