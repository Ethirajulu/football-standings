import { Injectable } from '@nestjs/common';
import { ApiFootballService } from '../../common/clients';

@Injectable()
export class LeagueService {
  constructor(private readonly apiFootballService: ApiFootballService) {}

  async getAllLeaguesByCountry(countryId: string) {
    return this.apiFootballService.fetchLeaguesByCountry(countryId);
  }
}
