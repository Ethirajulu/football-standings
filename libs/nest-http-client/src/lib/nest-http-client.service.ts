import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { mergeData } from '@sapient-fc/shared';
import { AxiosRequestConfig } from 'axios';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NestHttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T, R = unknown>(
    url: string,
    dto: new () => T,
    config?: AxiosRequestConfig,
    customData?: Record<string, unknown>
  ): Promise<T | T[]> {
    const response = await firstValueFrom(
      this.httpService.get<R>(url, config).pipe()
    );

    if ((response.data as { error: number }).error) {
      const errorResponse = response.data as { error: number; message: string };
      throw new HttpException(
        {
          status: errorResponse.error,
          error: errorResponse.message,
        },
        errorResponse.error,
        {
          cause: new Error(errorResponse.message),
        }
      );
    }

    if (customData) {
      response.data = mergeData(response.data, customData);
    }

    return plainToInstance(dto, response.data, {
      excludeExtraneousValues: true,
    }) as T | T[];
  }
}
