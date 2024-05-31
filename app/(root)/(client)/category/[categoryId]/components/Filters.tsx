import React from 'react';

import { getAllColors } from '@/actions/colors';
import { getAllGauges } from '@/actions/gauges';
import { getAllLengths } from '@/actions/lengths';
import { getAllSubCategories } from '@/actions/subcategories';
import { getAllWidths } from '@/actions/widths';

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
