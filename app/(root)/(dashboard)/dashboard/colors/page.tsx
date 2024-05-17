import { format } from 'date-fns/format';
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
    createdAt: format(color.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <ColorClient formattedColors={formattedColors} />
    </main>
  );
};

export default ColorsPage;
