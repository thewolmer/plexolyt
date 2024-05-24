'use client';

import { usePathname } from 'next/navigation';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { OrderColumn, columns } from './columns';

export const OrderClient = ({ formattedOrders }: { formattedOrders: OrderColumn[] | undefined }) => {
  const pathname = usePathname();

  return (
    <>
      <Header title={`Orders `} description={'Manage your store order'}></Header>
      <section className="mx-auto max-w-6xl p-10 md:py-10">
        <DataTable searchKey="name" columns={columns} data={formattedOrders as OrderColumn[]} />
      </section>
    </>
  );
};
