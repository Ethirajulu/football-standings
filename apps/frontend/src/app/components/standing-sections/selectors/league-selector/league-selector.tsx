import { getFootballData } from '@/lib/apis';
import { Country, League } from '@sapient-fc/shared';
import { Select, Loader } from '@sapient-fc/ui-library';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface LeagueSelectorProps {
  country: Country;
  leagueId: string | undefined;
  setLeague: Dispatch<SetStateAction<League | undefined>>;
}

export const LeagueSelector = ({
  country,
  leagueId,
  setLeague,
}: LeagueSelectorProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['leagues', country._links.leagues.href],
    queryFn: getFootballData,
    retry: false,
  });

  if (isLoading) return <Loader />;

  if (data)
    return (
      <Select
        options={data}
        value={leagueId}
        onChange={(value) =>
          setLeague(data?.find((item: League) => item.id === value))
        }
        dataTestid="league-selector-select"
      />
    );

  return <div className="mt-4">No leagues found</div>;
};
