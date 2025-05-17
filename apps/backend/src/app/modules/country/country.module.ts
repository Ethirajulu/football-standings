import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { ApiFootballModule } from '../../common/clients';

@Module({
  imports: [ApiFootballModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
