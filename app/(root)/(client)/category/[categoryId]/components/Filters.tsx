import React from 'react';

import { getAllColors } from '@/actions/colors.client';
import { getAllGauges } from '@/actions/gauges.client';
import { getAllLengths } from '@/actions/lengths.client';
import { getAllSubCategories } from '@/actions/subcategories.client';
import { getAllWidths } from '@/actions/widths.client';

import { FiltersClient } from './FiltersClient';

export const Filters = async () => {
  const [subCategories, colors, lengths, widths, gauges] = await Promise.all([
    getAllSubCategories(),
    getAllColors(),
    getAllLengths(),
    getAllWidths(),
    getAllGauges(),
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
