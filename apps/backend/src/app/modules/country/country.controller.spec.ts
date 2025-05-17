import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryResponseDto } from './dto/CountryResponseDto';
import { HttpException, Logger } from '@nestjs/common';

describe('CountryController', () => {
  let controller: CountryController;
  let service: CountryService;
  let loggerErrorSpy: jest.SpyInstance;

  const mockCountries: CountryResponseDto[] = [
    {
      id: '1',
      name: 'Country One',
      logo: 'logo-url-1',
      _links: {
        self: { href: 'logo-url-1/self' },
        leagues: { href: 'logo-url-1/leagues' },
      },
    },
    {
      id: '2',
      name: 'Country Two',
      logo: 'logo-url-2',
      _links: {
        self: { href: 'logo-url-2/self' },
        leagues: { href: 'logo-url-2/leagues' },
      },
    },
  ];

  const mockCountryService = {
    getAllCountries: jest.fn(),
  };

  beforeEach(async () => {
    loggerErrorSpy = jest
      .spyOn(Logger, 'error')
      .mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{ provide: CountryService, useValue: mockCountryService }],
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should return an array of countries on success', async () => {
      mockCountryService.getAllCountries.mockResolvedValue(mockCountries);
      const result = await controller.getAllCountries();
      expect(service.getAllCountries).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCountries);
    });

    it('should throw and log error when service throws', async () => {
      const error = new HttpException('Service failure', 500);
      mockCountryService.getAllCountries.mockRejectedValue(error);

      await expect(controller.getAllCountries()).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Error fetching countries: ${error.message}`,
        error.stack,
        'CountryController'
      );
    });
  });
});
