import { Country, League, Team } from '@sapient-fc/shared';
import { useState } from 'react';
import { PositionDisplay } from './position-display';
import { CountrySelector } from './selectors';
import { LeagueSelector } from './selectors/league-selector/league-selector';
import TeamSelector from './selectors/team-selector/team-selector';

export const StandingSections = () => {
  const [country, setCountry] = useState<Country>();
  const [league, setLeague] = useState<League>();
  const [team, setTeam] = useState<Team>();

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      data-testid="standing-sections-container"
    >
      <div
        className="mt-10 w-full flex justify-evenly flex-shrink-0"
        data-testid="selectors-container"
      >
        <CountrySelector countryId={country?.id} setCountry={setCountry} />
        {country && (
          <>
            <LeagueSelector
              country={country}
              leagueId={league?.id}
              setLeague={setLeague}
            />
            {league && (
              <TeamSelector
                league={league}
                teamId={team?.id}
                setTeam={setTeam}
              />
            )}
          </>
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
