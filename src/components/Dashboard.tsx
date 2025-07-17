'use client';
import { Box, Heading, Grid, VStack } from '@chakra-ui/react';
import { startTransition, useActionState } from 'react';
import { CountrySelector } from '@/components/CountrySelector';
import { MeasureSelector } from '@/components/MeasureSelector';
import { DataVisualization } from '@/components/DataVisualization';
import { StatisticsSummary } from '@/components/StatisticsSummary';
import { updateDashboard, DashboardState } from '@/lib/actions';
import { Country, Measure } from '@/graphql/queries';

interface DashboardWithActionsProps {
  initialCountries: Country[];
}

export const Dashboard = ({ initialCountries }: DashboardWithActionsProps) => {
  const initialState: DashboardState = {
    countries: initialCountries,
    selectedCountry: null,
    selectedMeasure: 'life_expectancy',
    cubeData: [],
    loading: false,
    error: null,
  };

  const [state, formAction, isPending] = useActionState(
    updateDashboard,
    initialState
  );

  const selectedCountryData = state.countries.find(
    c => c.id === state.selectedCountry
  );

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading fontSize="lg" color="brand.500">
            DataStory Dashboard
          </Heading>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          <CountrySelector
            countries={state.countries}
            selectedCountry={state.selectedCountry}
            onCountryChange={countryId => {
              const formData = new FormData();
              formData.set('country', countryId);
              formData.set('measure', state.selectedMeasure);
              startTransition(() => {
                formAction(formData);
              });
            }}
            loading={isPending}
          />
          <MeasureSelector
            selectedMeasure={state.selectedMeasure}
            onMeasureChange={(measure: Measure) => {
              const formData = new FormData();
              formData.set('country', state.selectedCountry || '');
              formData.set('measure', measure);
              startTransition(() => {
                formAction(formData);
              });
            }}
          />
        </Grid>

        <DataVisualization
          data={state.cubeData}
          error={state.error}
          selectedMeasure={state.selectedMeasure}
          countryName={selectedCountryData?.name}
        />

        <StatisticsSummary data={state.cubeData} />
      </VStack>
    </Box>
  );
};
