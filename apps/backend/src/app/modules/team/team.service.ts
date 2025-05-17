import { Injectable } from '@nestjs/common';
import { ApiFootballService } from '../../common/clients';

@Injectable()
export class TeamService {
  constructor(private readonly apiFootballService: ApiFootballService) {}

  async getAllTeamsByLeague(leagueId: string) {
    return this.apiFootballService.fetchTeamsByLeague(leagueId);
  }

  async getPositionOfTeam(leagueId: string, teamId: string) {
    const standings = await this.apiFootballService.fetchLeagueStandings(
      leagueId
    );
    return standings.find((standing) => standing.teamId === teamId);
  }
}
