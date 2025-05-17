import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Country } from '@sapient-fc/shared';

export class CountryResponseDto implements Country {
  @Expose({ name: 'country_id' })
  @ApiProperty({ example: '1', description: 'Id of the country' })
  id!: string;

  @Expose({ name: 'country_name' })
  @ApiProperty({ example: 'India', description: 'Name of the country' })
  name!: string;

  @Expose({ name: 'country_logo' })
  @ApiProperty({
    example: 'https://logo.com/sample.png',
    description: 'Logo of the country',
  })
  logo!: string;

  @Expose()
  @Transform(({ obj }) => ({
    self: {
      href: `/api/countries/${obj.country_id}`,
    },
    leagues: {
      href: `/api/leagues?countryId=${obj.country_id}`,
    },
  }))
  _links!: {
    self: {
      href: string;
    };
    leagues: {
      href: string;
    };
  };
}
