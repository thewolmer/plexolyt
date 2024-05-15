import { format } from 'date-fns/format';
import React from 'react';

import { getAllBillboards } from '@/actions/billboards';

import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

const BillboardsPage = async () => {
  const { data } = await getAllBillboards();
  const formattedBillboards: BillboardColumn[] | undefined = data?.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <BillboardClient formattedBillboards={formattedBillboards} />
    </main>
  );
};

export default BillboardsPage;
