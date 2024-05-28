'use client';

import { usePathname } from 'next/navigation';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { GaugeColumn, columns } from './columns';

export const GaugeClient = ({ formattedGauges }: { formattedGauges: GaugeColumn[] | undefined }) => {
  const pathname = usePathname();

  return (
    <>
      <Header title={`Gauges (${formattedGauges?.length})`} description={'Manage your store gauge'}>
        <Link href={`${pathname}/new`} className={buttonVariants({ variant: 'outline' })}>
          <PlusIcon className="mr-2 text-muted-foreground" /> Add New
        </Link>
      </Header>
      <section className="mx-auto max-w-6xl p-10 md:py-10">
        <DataTable searchKey="name" columns={columns} data={formattedGauges as GaugeColumn[]} />
      </section>
    </>
  );
};
