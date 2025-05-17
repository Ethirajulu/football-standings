import { Controller, Get, HttpException, Logger, Query } from '@nestjs/common';
import { LeagueService } from './league.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeagueResponseDto } from './dto/LeagueResponseDto';

@Controller('leagues')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get()
  @ApiOperation({ summary: 'Get all the available leagues in a country' })
  @ApiResponse({
    status: 200,
    description: 'List of leagues',
    type: [LeagueResponseDto],
  })
  async getAllLeaguesByCountry(@Query('countryId') countryId: number) {
    try {
      return await this.leagueService.getAllLeaguesByCountry(countryId);
    } catch (error) {
      const httpError = error as HttpException;
      Logger.error(
        `Error fetching leagues for countryId ${countryId}: ${httpError.message}`,
        httpError.stack,
        'LeagueController'
      );
      throw error;
    }
  }
}
