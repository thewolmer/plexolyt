import React from 'react';

import { getLengthByID } from '@/actions/lengths';

import { LengthForm } from './components/LengthForm';

const LengthPage = async ({ params }: { params: { lengthID: string } }) => {
  const length = await getLengthByID(params.lengthID);
  return (
    <main>
      <LengthForm initialValues={length.data} />
    </main>
  );
};

export default LengthPage;
