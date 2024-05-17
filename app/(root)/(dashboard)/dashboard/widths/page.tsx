import { format } from 'date-fns/format';
import React from 'react';

import { getAllWidths } from '@/actions/widths';

import { WidthClient } from './components/client';
import { WidthColumn } from './components/columns';

const WidthsPage = async () => {
  const { data } = await getAllWidths();
  const formattedWidths: WidthColumn[] | undefined = data?.map((width) => ({
    id: width.id,
    name: width.name,
    createdAt: format(width.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <WidthClient formattedWidths={formattedWidths} />
    </main>
  );
};

export default WidthsPage;
