import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@sapient-fc/shared';
import { Expose, Transform } from 'class-transformer';

export class TeamResponseDto implements Team {
  @Expose({ name: 'team_key' })
  @ApiProperty({
    example: '1',
    description: 'Id of the team',
  })
  id!: string;

  @Expose({ name: 'team_name' })
  @ApiProperty({
    example: 'Chennaiyin FC',
    description: 'Name of the team',
  })
  name!: string;

  @Expose({ name: 'team_badge' })
  @ApiProperty({
    example: 'https://badge.com/sample.png',
    description: 'Badge of the team',
  })
  logo!: string;

  @Expose()
  @Transform(({ obj }) => ({
    self: {
      href: `/api/teams?leagueId=${obj.league_id}`,
    },
    standing: {
      href: `/api/teams/position?leagueId=${obj.league_id}&teamId=${obj.team_key}`,
    },
  }))
  _links!: {
    self: {
      href: string;
    };
    standing: {
      href: string;
    };
  };
}
