'use server';

import { client } from '@/lib/graphql-client';
import {
  GET_COUNTRIES_QUERY,
  GET_CUBE_DATA_QUERY,
  Country,
  CountriesResponse,
  CubeDataPoint,
  CubeDataResponse,
  Measure,
} from '@/graphql/queries';

export interface DashboardState {
  countries: Country[];
  selectedCountry: string | null;
  selectedMeasure: Measure;
  cubeData: CubeDataPoint[];
  loading: boolean;
  error: string | null;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const data = await client.request<CountriesResponse>(GET_COUNTRIES_QUERY);
    return data.item;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
}

export async function getCubeData(
  country: string,
  measure: Measure
): Promise<CubeDataPoint[]> {
  if (!country) return [];

  try {
    const data = await client.request<CubeDataResponse>(GET_CUBE_DATA_QUERY, {
      country,
      measure,
    });
    return data.cube_cube_M6Lh5is0FtqUhZ;
  } catch (error) {
    console.error('Error fetching cube data:', error);
    throw new Error('Failed to fetch cube data');
  }
}

export async function updateDashboard(
  prevState: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const selectedCountry = (formData.get('country') as string) || null;
  const selectedMeasure =
    (formData.get('measure') as Measure) || prevState.selectedMeasure;

  try {
    let cubeData: CubeDataPoint[] = [];

    if (selectedCountry && selectedMeasure) {
      cubeData = await getCubeData(selectedCountry, selectedMeasure);
    }

    return {
      ...prevState,
      selectedCountry,
      selectedMeasure,
      cubeData,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error('Error updating dashboard:', error);
    return {
      ...prevState,
      selectedCountry,
      selectedMeasure,
      cubeData: [],
      loading: false,
      error: 'Failed to fetch data',
    };
  }
}
