/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CountrySelector } from './country-selector';
import { Country } from '@sapient-fc/shared';
import '@testing-library/jest-dom';

const { mockUseQueryFn } = vi.hoisted(() => {
  return { mockUseQueryFn: vi.fn() };
});
const { mockGetAllCountriesFn } = vi.hoisted(() => {
  return { mockGetAllCountriesFn: vi.fn() };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: mockUseQueryFn,
  };
});

vi.mock('@/lib/apis', async () => {
  const actual = await vi.importActual('@/lib/apis');
  return {
    ...actual,
    getAllCountries: mockGetAllCountriesFn,
  };
});

const mockCountries: Country[] = [
  {
    id: '1',
    name: 'Wonderland',
    logo: 'country1.png',
    _links: {
      self: { href: '/countries/1' },
      leagues: { href: '/countries/1/leagues' },
    },
  },
  {
    id: '2',
    name: 'Oz',
    logo: 'country2.png',
    _links: {
      self: { href: '/countries/2' },
      leagues: { href: '/countries/2/leagues' },
    },
  },
];

describe('CountrySelector', () => {
  beforeEach(() => {
    mockUseQueryFn.mockReset();
    mockGetAllCountriesFn.mockReset();
  });

  it('should render a select with countries', async () => {
    mockGetAllCountriesFn.mockResolvedValue(mockCountries);
    mockUseQueryFn.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    });

    render(<CountrySelector countryId={undefined} setCountry={vi.fn()} />);

    const selectButton = screen.getByTestId('country-selector-select');
    expect(selectButton).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('should call onSelectCountry when a country is selected', async () => {
    mockGetAllCountriesFn.mockResolvedValue(mockCountries);
    mockUseQueryFn.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    });
    const handleSelectCountry = vi.fn();
    render(
      <CountrySelector countryId={undefined} setCountry={handleSelectCountry} />
    );

    const selectButton = screen.getByTestId('country-selector-select');
    fireEvent.click(selectButton);

    const optionToSelect = await screen.findByText(mockCountries[0].name);
    fireEvent.click(optionToSelect);

    await waitFor(() => {
      expect(handleSelectCountry).toHaveBeenCalledWith(mockCountries[0]);
    });

    expect(selectButton).toHaveTextContent(mockCountries[0].name);
  });

  it('should reflect the currently selected countryId', () => {
    mockGetAllCountriesFn.mockResolvedValue(mockCountries);
    mockUseQueryFn.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    });

    render(<CountrySelector countryId={'2'} setCountry={vi.fn()} />);

    const selectButton = screen.getByTestId('country-selector-select');
    expect(selectButton).toHaveTextContent(mockCountries[1].name);
  });
});
