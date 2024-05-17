import { format } from 'date-fns/format';
import React from 'react';

import { getAllLengths } from '@/actions/lengths';

import { LengthClient } from './components/client';
import { LengthColumn } from './components/columns';

const LengthsPage = async () => {
  const { data } = await getAllLengths();
  const formattedLengths: LengthColumn[] | undefined = data?.map((length) => ({
    id: length.id,
    name: length.name,
    createdAt: format(length.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <LengthClient formattedLengths={formattedLengths} />
    </main>
  );
};

export default LengthsPage;
