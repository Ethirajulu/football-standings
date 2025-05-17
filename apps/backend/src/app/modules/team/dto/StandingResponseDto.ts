import { ApiProperty } from '@nestjs/swagger';
import { Standing } from '@sapient-fc/shared';
import { Expose, Transform } from 'class-transformer';

export class StandingResponseDto implements Standing {
  @Expose({ name: 'team_id' })
  @ApiProperty({
    example: '1',
    description: 'Id of the team',
  })
  teamId!: string;

  @Expose({ name: 'overall_league_position' })
  @ApiProperty({
    example: 1,
    description: 'Position of the team in the league',
  })
  position!: number;

  @Expose()
  @Transform(({ obj }) => ({
    self: {
      href: `/api/teams/position?leagueId=${obj.league_id}&teamId=${obj.team_id}`,
    },
  }))
  _links!: {
    self: {
      href: string;
    };
  };
}
