import React from 'react';

import {
  GetAllColors,
  GetAllGauges,
  GetAllLengths,
  GetAllSubCategories,
  GetAllWidths,
} from '@/lib/PlexolytAPI/entities';

import { FiltersClient } from './FiltersClient';

export const Filters = async () => {
  const [subCategories, colors, lengths, widths, gauges] = await Promise.all([
    GetAllSubCategories(),
    GetAllColors(),
    GetAllLengths(),
    GetAllWidths(),
    GetAllGauges(),
  ]);

  return (
    <FiltersClient
      subCategories={subCategories.data}
      colors={colors.data}
      lengths={lengths.data}
      widths={widths.data}
      gauges={gauges.data}
    />
  );
};
