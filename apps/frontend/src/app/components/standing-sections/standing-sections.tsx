import { Country, League, Team } from '@sapient-fc/shared';
import { useEffect, useState } from 'react';
import { PositionDisplay } from './position-display';
import { CountrySelector } from './selectors';
import { LeagueSelector } from './selectors/league-selector/league-selector';
import TeamSelector from './selectors/team-selector/team-selector';

export const StandingSections = () => {
  const [country, setCountry] = useState<Country>();
  const [league, setLeague] = useState<League>();
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    setLeague(undefined);
    setTeam(undefined);
  }, [country]);

  useEffect(() => {
    setTeam(undefined);
  }, [league]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      data-testid="standing-sections-container"
    >
      <div
        className="mt-16 w-full grid grid-cols-3 gap-4 flex-shrink-0"
        data-testid="selectors-container"
      >
        <div className="flex justify-center">
          <CountrySelector countryId={country?.id} setCountry={setCountry} />
        </div>

        {country ? (
          <div className="flex justify-center">
            <LeagueSelector
              country={country}
              leagueId={league?.id}
              setLeague={setLeague}
            />
          </div>
        ) : (
          <div data-testid="league-selector-placeholder" />
        )}

        {country && league ? (
          <div className="flex justify-center">
            <TeamSelector league={league} teamId={team?.id} setTeam={setTeam} />
          </div>
        ) : (
          <div data-testid="team-selector-placeholder" />
        )}
      </div>
      <div
        className="flex-1 w-full h-full p-4 flex justify-center mt-10"
        data-testid="position-display-container"
      >
        {country && league && team && (
          <PositionDisplay country={country} league={league} team={team} />
        )}
      </div>
    </div>
  );
};
