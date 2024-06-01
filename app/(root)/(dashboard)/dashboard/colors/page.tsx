import React from 'react';

import { getAllColors } from '@/actions/colors';

import { ColorClient } from './components/client';
import { ColorColumn } from './components/columns';

const ColorsPage = async () => {
  const { data } = await getAllColors();
  const formattedColors: ColorColumn[] | undefined = data?.map((color) => ({
    id: color.id,
    name: color.name,
    hex: color.hex,
    updatedAt: color.updatedAt,
  }));

  return (
    <main>
      <ColorClient formattedColors={formattedColors} />
    </main>
  );
};

export default ColorsPage;
