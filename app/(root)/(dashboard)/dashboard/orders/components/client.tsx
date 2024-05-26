'use client';

import { Header } from '@/components/Layout';

import { OrderColumn, columns } from './columns';
import { OrdersDataTable } from './OrdersDataTable';

export const OrderClient = ({ formattedOrders }: { formattedOrders: OrderColumn[] | undefined }) => (
  <>
    <Header title={`Orders `} description={'Manage your store order'}></Header>
    <section className="mx-auto max-w-6xl p-10 md:py-10">
      <OrdersDataTable searchKey="name" columns={columns} data={formattedOrders as OrderColumn[]} />
    </section>
  </>
);
