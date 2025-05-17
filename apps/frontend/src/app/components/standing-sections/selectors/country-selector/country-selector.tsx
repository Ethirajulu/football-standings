import { getAllCountries } from '@/apis';
import { Country } from '@sapient-fc/shared';
import { Select } from '@sapient-fc/ui-library';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface CountrySelectorProps {
  countryId: string | undefined;
  setCountry: Dispatch<SetStateAction<Country | undefined>>;
}

export const CountrySelector = ({
  countryId,
  setCountry,
}: CountrySelectorProps) => {
  const { data } = useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
  });

  return (
    <Select
      options={data}
      value={countryId}
      onChange={(value) =>
        setCountry(data?.find((item: Country) => item.id === value))
      }
    />
  );
};
