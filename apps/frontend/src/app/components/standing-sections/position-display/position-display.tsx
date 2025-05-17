import { getFootballData } from '@/lib/apis';
import { Country, League, Team } from '@sapient-fc/shared';
import { Card } from '@sapient-fc/ui-library';
import { useQuery } from '@tanstack/react-query';

interface PositionDisplayProps {
  country: Country;
  league: League;
  team: Team;
}

export const PositionDisplay = ({
  country,
  league,
  team,
}: PositionDisplayProps) => {
  const { data } = useQuery({
    queryKey: ['position', team._links.standing.href],
    queryFn: getFootballData,
  });

  return (
    <Card className="w-11/12 h-5/6">
      <div className="flex flex-col gap-10">
        <div className="flex items-baseline gap-5 flex-shrink-0">
          <div className="flex items-center justify-center gap-4">
            {country.logo && (
              <img
                src={country.logo}
                alt={`${country.name} Logo`}
                height={100}
                width={150}
              />
            )}
            <h1 className="font-extrabold text-8xl">{country.name}</h1>
          </div>
          <div className="flex items-center justify-center gap-4 border-l-2 border-gray-300 pl-4">
            {league.logo && (
              <img
                src={league.logo}
                alt={`${league.name} Logo`}
                height={30}
                width={50}
              />
            )}
            <h1 className="font-extrabold text-3xl">{league.name}</h1>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center gap-10">
            {team.logo && (
              <img
                src={team.logo}
                alt={`${team.name} Logo`}
                height={250}
                width={400}
              />
            )}
            <div className="flex flex-col items-center mt-24 gap-5">
              <h3 className="font-extrabold text-5xl">{team.name}</h3>
              <h3 className="text-5xl">League Position: {data?.position}</h3>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
