import { Controller, Get, HttpException, Logger } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from './dto/CountryResponseDto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all the available countries' })
  @ApiResponse({
    status: 200,
    description: 'List of countries',
    type: [CountryResponseDto],
  })
  async getAllCountries() {
    try {
      return await this.countryService.getAllCountries();
    } catch (error) {
      const httpError = error as HttpException;
      Logger.error(
        `Error fetching countries: ${httpError.message}`,
        httpError.stack,
        'CountryController'
      );
      throw error;
    }
  }
}
