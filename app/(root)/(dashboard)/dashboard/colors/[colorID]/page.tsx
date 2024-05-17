import React from 'react';

import { getColorByID } from '@/actions/colors';

import { ColorForm } from './components/ColorForm';

const ColorPage = async ({ params }: { params: { colorID: string } }) => {
  const color = await getColorByID(params.colorID);
  return (
    <main>
      <ColorForm initialValues={color.data} />
    </main>
  );
};

export default ColorPage;
