import { Injectable } from '@nestjs/common';
import { ApiFootballService } from '../../common/clients';

@Injectable()
export class CountryService {
  constructor(private readonly apiFootballService: ApiFootballService) {}

  async getAllCountries() {
    return this.apiFootballService.fetchAllCountries();
  }
}
