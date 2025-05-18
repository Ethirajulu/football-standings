import { Test, TestingModule } from '@nestjs/testing';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { LeagueResponseDto } from './dto/LeagueResponseDto';
import { HttpException, Logger } from '@nestjs/common';

describe('LeagueController', () => {
  let controller: LeagueController;
  let service: LeagueService;
  let loggerErrorSpy: jest.SpyInstance;

  const mockLeagues: LeagueResponseDto[] = [
    {
      id: '1',
      name: 'League One',
      logo: 'logo-url-1',
      _links: {
        self: { href: 'logo-url-1/self' },
        teams: { href: 'logo-url-1/teams' },
      },
    },
    {
      id: '2',
      name: 'League Two',
      logo: 'logo-url-2',
      _links: {
        self: { href: 'logo-url-2/self' },
        teams: { href: 'logo-url-2/teams' },
      },
    },
  ];

  const mockLeagueService = {
    getAllLeaguesByCountry: jest.fn(),
  };

  beforeEach(async () => {
    loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeagueController],
      providers: [{ provide: LeagueService, useValue: mockLeagueService }],
    }).compile();

    controller = module.get<LeagueController>(LeagueController);
    service = module.get<LeagueService>(LeagueService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllLeaguesByCountry', () => {
    const countryId = 'test-country-id';
    it('should return an array of leagues on success', async () => {
      mockLeagueService.getAllLeaguesByCountry.mockResolvedValue(mockLeagues);
      const result = await controller.getAllLeaguesByCountry(countryId);
      expect(service.getAllLeaguesByCountry).toHaveBeenCalledWith(countryId);
      expect(service.getAllLeaguesByCountry).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLeagues);
    });

    it('should throw and log error when service throws', async () => {
      const error = new HttpException('Service failure', 500);
      mockLeagueService.getAllLeaguesByCountry.mockRejectedValue(error);

      await expect(
        controller.getAllLeaguesByCountry(countryId)
      ).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Error fetching leagues for countryId ${countryId}: ${error.message}`,
        error.stack,
        'LeagueController'
      );
    });
  });
});
