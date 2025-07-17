'use client';
import { Box, Text } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CubeDataPoint, Measure } from '@/graphql/queries';
import { getMeasureLabel, formatValue } from '@/utils/DataVisualization.utils';

interface DataVisualizationProps {
  data: CubeDataPoint[];
  error: string | null;
  selectedMeasure: Measure;
  countryName?: string;
}

export const DataVisualization = ({
  data,
  error,
  selectedMeasure,
  countryName,
}: DataVisualizationProps) => {
  if (error) {
    return (
      <Box
        bg="red.50"
        border="1px solid"
        borderColor="red.200"
        borderRadius="lg"
        p={4}
        color="red.600"
      >
        <Text fontWeight="semibold">Error</Text>
        <Text>{error}</Text>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text color="gray.500" fontSize="lg">
          {countryName
            ? `No data available for ${countryName}`
            : 'Select a country to view data'}
        </Text>
      </Box>
    );
  }

  // Sort data by year
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">
        {getMeasureLabel(selectedMeasure)}
        {countryName && (
          <Text
            as="span"
            fontSize="md"
            fontWeight="normal"
            color="gray.600"
            ml={2}
          >
            - {countryName}
          </Text>
        )}
      </Text>

      <Box height="400px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sortedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#666" fontSize={12} />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={value => formatValue(value, selectedMeasure)}
            />
            <Tooltip
              formatter={(value: number) => [
                formatValue(value, selectedMeasure),
                getMeasureLabel(selectedMeasure),
              ]}
              labelFormatter={year => `Year: ${year}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0073e6"
              strokeWidth={3}
              dot={{ fill: '#0073e6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#0073e6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
