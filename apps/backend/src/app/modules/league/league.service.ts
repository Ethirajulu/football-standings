import { Injectable } from '@nestjs/common';
import { ApiFootballService } from '../../clients';

@Injectable()
export class LeagueService {
  constructor(private readonly apiFootballService: ApiFootballService) {}

  async getAllLeaguesByCountry(countryId: number) {
    return this.apiFootballService.fetchLeaguesByCountry(countryId);
  }
}
