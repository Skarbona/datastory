import { Measure } from '@/graphql/queries';

export const measures: { value: Measure; label: string }[] = [
  { value: 'life_expectancy', label: 'Life Expectancy' },
  { value: 'population', label: 'Population' },
  { value: 'net_migration_rate', label: 'Net Migration Rate' },
];
