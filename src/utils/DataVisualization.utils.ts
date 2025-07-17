import { Measure } from '@/graphql/queries';
import { measures } from './Dashboard.constants';

export const formatValue = (value: number, measure: Measure) => {
  switch (measure) {
    case 'population':
      // Population data appears to be in thousands, so divide by 1000 to get millions
      return (value / 1000).toFixed(1) + 'M';
    case 'life_expectancy':
      // Life expectancy in years
      return value.toFixed(1) + 'Y';
    case 'net_migration_rate':
      // Net migration rate per 1000 population
      return value.toFixed(1) + '‰';
    default:
      return value.toLocaleString();
  }
};

export const getMeasureLabel = (measure: Measure) => {
  const found = measures.find(m => m.value === measure);
  return found ? found.label : measure;
};
