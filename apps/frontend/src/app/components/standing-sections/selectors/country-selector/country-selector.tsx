import { getAllCountries } from '@/lib/apis';
import { Country } from '@sapient-fc/shared';
import { Loader, Select } from '@sapient-fc/ui-library';
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
  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
  });

  if (isLoading) return <Loader />;

  if (data)
    return (
      <Select
        options={data}
        value={countryId}
        onChange={(value) =>
          setCountry(data?.find((item: Country) => item.id === value))
        }
        dataTestid="country-selector-select"
      />
    );

  return <div className="mt-4">No countries found</div>;
};
