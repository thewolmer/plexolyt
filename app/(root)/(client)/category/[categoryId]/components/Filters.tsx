import React from 'react';

import { getAllColors } from '@/actions/colors';
import { getAllGauges } from '@/actions/gauges';
import { getAllLengths } from '@/actions/lengths';
import { getAllWidths } from '@/actions/widths';

import { FiltersClient } from './FiltersClient';

export const Filters = async () => {
  const [colors, lengths, widths, gauges] = await Promise.all([
    getAllColors(),
    getAllLengths(),
    getAllWidths(),
    getAllGauges(),
  ]);

  return <FiltersClient colors={colors.data} lengths={lengths.data} widths={widths.data} gauges={gauges.data} />;
};
