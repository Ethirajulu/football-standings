import { ApiProperty } from '@nestjs/swagger';
import { League } from '@sapient-fc/shared';
import { Expose, Transform } from 'class-transformer';

export class LeagueResponseDto implements League {
  @Expose({ name: 'league_id' })
  @ApiProperty({ example: '1', description: 'Id of the league' })
  id!: string;

  @Expose({ name: 'league_name' })
  @ApiProperty({ example: 'ISL', description: 'Name of the league' })
  name!: string;

  @Expose({ name: 'league_logo' })
  @ApiProperty({
    example: 'https://logo.com/sample.png',
    description: 'Logo of the league',
  })
  logo!: string;

  @Expose()
  @Transform(({ obj }) => ({
    self: {
      href: `/api/leagues?countryId=${obj.country_id}`,
    },
    teams: {
      href: `/api/teams?leagueId=${obj.league_id}`,
    },
  }))
  _links!: {
    self: {
      href: string;
    };
    teams: {
      href: string;
    };
  };
}
