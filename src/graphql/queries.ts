import { gql } from 'graphql-request';

// Types
export type Measure = 'life_expectancy' | 'population' | 'net_migration_rate';
export interface Country {
  id: string;
  name: string;
  iso2: { value: string }[];
}

export interface CountriesResponse {
  item: Country[];
}

export interface CubeDataPoint {
  value: number;
  year: number;
}

export interface CubeDataResponse {
  cube_cube_M6Lh5is0FtqUhZ: CubeDataPoint[];
}

// Queries
export const GET_COUNTRIES_QUERY = gql`
  query Countries {
    item(where: { class_id: { _eq: "Country" } }) {
      id
      name: name(path: "en")
      iso2: statements(where: { property_id: { _eq: "iso2" } }) {
        value: postgres_varchar
      }
    }
  }
`;

export const GET_CUBE_DATA_QUERY = gql`
  query CubeData($country: String!, $measure: String!) {
    cube_cube_M6Lh5is0FtqUhZ(
      where: { country: { _eq: $country }, measure: { _eq: $measure } }
    ) {
      value
      year
    }
  }
`;
