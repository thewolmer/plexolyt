import React from 'react';

import { getWidthByID } from '@/actions/widths';

import { WidthForm } from './components/WidthForm';

const WidthPage = async ({ params }: { params: { widthID: string } }) => {
  const width = await getWidthByID(params.widthID);
  return (
    <main>
      <WidthForm initialValues={width.data} />
    </main>
  );
};

export default WidthPage;
