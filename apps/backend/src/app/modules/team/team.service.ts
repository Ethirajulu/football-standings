import { Injectable } from '@nestjs/common';
import { ApiFootballService } from '../../clients';

@Injectable()
export class TeamService {
  constructor(private readonly apiFootballService: ApiFootballService) {}

  async getAllTeamsByLeague(leagueId: number) {
    return this.apiFootballService.fetchTeamsByLeague(leagueId);
  }

  async getPositionOfTeam(leagueId: number, teamId: number) {
    const standings = await this.apiFootballService.fetchLeagueStandings(
      leagueId
    );
    return standings.find((standing) => standing.teamId === teamId);
  }
}
