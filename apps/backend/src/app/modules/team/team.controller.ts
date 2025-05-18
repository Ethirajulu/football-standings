import { Controller, Get, HttpException, Logger, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamResponseDto } from './dto/TeamResponseDto';
import { StandingResponseDto } from './dto/StandingResponseDto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all the available teams in a league',
  })
  @ApiResponse({
    status: 200,
    description: 'List of teams',
    type: [TeamResponseDto],
  })
  async getAllTeamsByLeague(@Query('leagueId') leagueId: string) {
    try {
      return await this.teamService.getAllTeamsByLeague(leagueId);
    } catch (error) {
      const httpError = error as HttpException;
      Logger.error(
        `Error fetching teams for leagueId ${leagueId}: ${httpError.message}`,
        httpError.stack,
        'TeamController'
      );
      throw error;
    }
  }

  @Get('position')
  @ApiOperation({
    summary: 'Get the position of a team in a league',
  })
  @ApiResponse({
    status: 200,
    description: 'Position of the team in the league',
    type: StandingResponseDto,
  })
  async getPositionOfTeam(
    @Query('leagueId') leagueId: string,
    @Query('teamId') teamId: string
  ) {
    try {
      return await this.teamService.getPositionOfTeam(leagueId, teamId);
    } catch (error) {
      const httpError = error as HttpException;
      Logger.error(
        `Error fetching position for teamId ${teamId} in leagueId ${leagueId}: ${httpError.message}`,
        httpError.stack,
        'TeamController'
      );
      throw error;
    }
  }
}
