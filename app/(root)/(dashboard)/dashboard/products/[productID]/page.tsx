import React from 'react';

import { getBillboardByID } from '@/actions/billboards';

import { BillboardForm } from './components/BillboardForm';

const BillboardPage = async ({ params }: { params: { billboardID: string } }) => {
  const billboard = await getBillboardByID(params.billboardID);
  return (
    <main>
      <BillboardForm initialValues={billboard.data} />
    </main>
  );
};

export default BillboardPage;
