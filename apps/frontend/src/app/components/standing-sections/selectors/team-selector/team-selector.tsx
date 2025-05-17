import { getFootballData } from '@/lib/apis';
import { League, Team } from '@sapient-fc/shared';
import { Select } from '@sapient-fc/ui-library';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface TeamSelectorProps {
  league: League;
  teamId: string | undefined;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
}

export const TeamSelector = ({
  league,
  teamId,
  setTeam,
}: TeamSelectorProps) => {
  const { data } = useQuery({
    queryKey: ['teams', league._links.teams.href],
    queryFn: getFootballData,
  });

  return (
    <Select
      options={data}
      value={teamId}
      onChange={(value) =>
        setTeam(data?.find((item: Team) => item.id === value))
      }
    />
  );
};

export default TeamSelector;
