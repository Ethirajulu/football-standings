import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { CountryResponseDto } from './dto/CountryResponseDto'; // Import the DTO
import { ApiFootballService } from '../../common/clients';

describe('CountryService', () => {
  let service: CountryService;
  let apiFootballService: jest.Mocked<ApiFootballService>;

  const mockExpectedCountriesDto: CountryResponseDto[] = [
    {
      id: '1',
      name: 'Country One',
      logo: 'logo-url-1-api', // Assuming logo is passed through
      _links: {
        self: { href: '/api/countries/1' }, // Example link structure
        leagues: { href: '/api/countries/1/leagues' },
      },
    },
    {
      id: '2',
      name: 'Country Two',
      logo: 'logo-url-2-api',
      _links: {
        self: { href: '/api/countries/2' },
        leagues: { href: '/api/countries/2/leagues' },
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
        CountryService,
        { provide: ApiFootballService, useValue: apiFootballService },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should fetch countries from ApiFootballService, transform them to DTOs, and return them', async () => {
      apiFootballService.fetchAllCountries.mockResolvedValue(
        mockExpectedCountriesDto
      );

      const result = await service.getAllCountries();

      expect(apiFootballService.fetchAllCountries).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockExpectedCountriesDto);
    });

    it('should propagate errors from apiFootballService.fetchAllCountries', async () => {
      const error = new Error('API failure');
      apiFootballService.fetchAllCountries.mockRejectedValue(error);

      await expect(service.getAllCountries()).rejects.toThrow('API failure');
      expect(apiFootballService.fetchAllCountries).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if ApiFootballService returns an empty array', async () => {
      apiFootballService.fetchAllCountries.mockResolvedValue([]);

      const result = await service.getAllCountries();

      expect(apiFootballService.fetchAllCountries).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });
});
