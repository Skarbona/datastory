'use client';
import { Measure } from '@/graphql/queries';
import { measures } from '@/utils/Dashboard.constants';
import { Select, Box, createListCollection } from '@chakra-ui/react';

interface MeasureSelectorProps {
  selectedMeasure: Measure;
  onMeasureChange: (measure: Measure) => void;
}

export const MeasureSelector = ({
  selectedMeasure,
  onMeasureChange,
}: MeasureSelectorProps) => {
  const measureCollection = createListCollection({
    items: measures,
  });

  return (
    <Box>
      <Select.Root
        collection={measureCollection}
        value={[selectedMeasure]}
        onValueChange={details => {
          if (details.value.length > 0) {
            onMeasureChange(details.value[0] as Measure);
          }
        }}
        size="md"
      >
        <Select.Label mb={2} fontWeight="semibold" color="gray.700">
          Select Measure
        </Select.Label>
        <Select.Trigger
          bg="white"
          borderColor="gray.300"
          _hover={{ borderColor: 'brand.400' }}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
        >
          <Select.ValueText placeholder="Select a measure" />
        </Select.Trigger>
        <Select.Positioner>
          <Select.Content>
            {measures.map(measure => (
              <Select.Item key={measure.value} item={measure}>
                {measure.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  );
};
