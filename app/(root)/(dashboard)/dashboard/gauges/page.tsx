import { format } from 'date-fns/format';
import React from 'react';

import { getAllGauges } from '@/actions/gauges';

import { GaugeClient } from './components/client';
import { GaugeColumn } from './components/columns';

const GaugesPage = async () => {
  const { data } = await getAllGauges();
  const formattedGauges: GaugeColumn[] | undefined = data?.map((gauge) => ({
    id: gauge.id,
    name: gauge.name,
    createdAt: format(gauge.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <main>
      <GaugeClient formattedGauges={formattedGauges} />
    </main>
  );
};

export default GaugesPage;
