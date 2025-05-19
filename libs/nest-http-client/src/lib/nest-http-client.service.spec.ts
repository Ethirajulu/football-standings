import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { of, throwError } from 'rxjs';
import { NestHttpClientService } from './nest-http-client.service';

class TestDto {
  id!: string;
  name!: string;
}

jest.mock('@sapient-fc/shared', () => ({
  ...jest.requireActual('@sapient-fc/shared'),
  mergeData: jest.fn((data, custom) => ({ ...data, ...custom })),
}));

describe('NestHttpClientService', () => {
  let service: NestHttpClientService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NestHttpClientService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NestHttpClientService>(NestHttpClientService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    const url = 'test-url';
    const mockData = { id: '1', name: 'Test Name' };

    const mockInternalAxiosRequestConfig: InternalAxiosRequestConfig = {
      headers: new AxiosHeaders(),
    };

    const mockAxiosResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: mockInternalAxiosRequestConfig,
    };

    it('should fetch data and transform it to DTO', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse));

      const result = await service.get(url, TestDto);

      expect(httpService.get).toHaveBeenCalledWith(url, undefined);
      expect(result).toBeInstanceOf(TestDto);
    });

    it('should fetch data, merge with customData, and transform to DTO', async () => {
      const customData = { extra: 'Extra Info' };
      const responseWithCustomData: AxiosResponse = {
        ...mockAxiosResponse,
        data: mockData,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(responseWithCustomData));

      const result = await service.get(url, TestDto, undefined, customData);

      expect(httpService.get).toHaveBeenCalledWith(url, undefined);
      expect(result).toBeInstanceOf(TestDto);
    });

    it('should handle network or other Axios errors', async () => {
      const errorAxiosResponse: AxiosResponse = {
        data: null,
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: mockInternalAxiosRequestConfig,
      };
      const axiosError = new AxiosError(
        'Network Error',
        'ECONNREFUSED',
        mockInternalAxiosRequestConfig,
        null,
        errorAxiosResponse
      );
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => axiosError));

      await expect(service.get(url, TestDto)).rejects.toThrow(AxiosError);
    });

    it('should transform an array response to an array of DTOs', async () => {
      const mockArrayData = [
        { id: '1', name: 'Test1' },
        { id: '2', name: 'Test2' },
      ];
      const mockArrayAxiosResponse: AxiosResponse = {
        ...mockAxiosResponse,
        data: mockArrayData,
      };
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(mockArrayAxiosResponse));

      const result = await service.get(url, TestDto);

      expect(result).toBeInstanceOf(Array);
      expect((result as TestDto[]).length).toBe(2);
      (result as TestDto[]).forEach((item) =>
        expect(item).toBeInstanceOf(TestDto)
      );
    });
  });
});
