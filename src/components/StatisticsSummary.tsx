'use client';
import { Box, Grid, Text } from '@chakra-ui/react';
import { CubeDataPoint } from '@/graphql/queries';

interface StatisticsSummaryProps {
  data: CubeDataPoint[];
}

export const StatisticsSummary = ({ data }: StatisticsSummaryProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  const latestDataPoint = data[data.length - 1];
  const yearRange = `${Math.min(...data.map(d => d.year))} - ${Math.max(...data.map(d => d.year))}`;

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
      <Box
        bg="white"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.600" mb={1}>
          Latest Value
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          {latestDataPoint?.value.toLocaleString() || 'N/A'}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {latestDataPoint?.year}
        </Text>
      </Box>

      <Box
        bg="white"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.600" mb={1}>
          Data Points
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          {data.length}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Total records
        </Text>
      </Box>

      <Box
        bg="white"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.600" mb={1}>
          Year Range
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          {yearRange}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Coverage period
        </Text>
      </Box>
    </Grid>
  );
};
