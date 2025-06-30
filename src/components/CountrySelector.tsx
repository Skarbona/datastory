'use client';
import { createListCollection, Select, Box } from '@chakra-ui/react';
import { Country } from '@/graphql/queries';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: string | null;
  onCountryChange: (countryId: string) => void;
  loading?: boolean;
}

export const CountrySelector = ({
  countries,
  selectedCountry,
  onCountryChange,
  loading,
}: CountrySelectorProps) => {
  // Transform countries data for Chakra UI collection
  const countryItems = countries.map(country => ({
    value: country.id,
    label: `${country.name} ${country.iso2[0]?.value ? `(${country.iso2[0].value})` : ''}`,
  }));

  const countryCollection = createListCollection({
    items: countryItems,
  });

  return (
    <Box>
      <Select.Root
        collection={countryCollection}
        value={selectedCountry ? [selectedCountry] : []}
        onValueChange={details => {
          if (details.value.length > 0) {
            onCountryChange(details.value[0]);
          }
        }}
        disabled={loading}
        size="md"
      >
        <Select.Label mb={2} fontWeight="semibold" color="gray.700">
          Select Country
        </Select.Label>
        <Select.Trigger
          bg={loading ? 'gray.50' : 'white'}
          borderColor="gray.300"
          _hover={{ borderColor: 'brand.400' }}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
          opacity={loading ? 0.6 : 1}
        >
          <Select.ValueText placeholder="Choose a country..." />
        </Select.Trigger>
        <Select.Positioner>
          <Select.Content>
            {countryItems.map(country => (
              <Select.Item key={country.value} item={country}>
                {country.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  );
};
