import React from 'react';

import { getGaugeByID } from '@/actions/gauges';

import { GaugeForm } from './components/GaugeForm';

const GaugePage = async ({ params }: { params: { gaugeID: string } }) => {
  const gauge = await getGaugeByID(params.gaugeID);
  return (
    <main>
      <GaugeForm initialValues={gauge.data} />
    </main>
  );
};

export default GaugePage;
