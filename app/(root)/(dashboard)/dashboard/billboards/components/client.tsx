'use client';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { BillboardColumn, columns } from './columns';

export const BillboardClient = ({ formattedBillboards }: { formattedBillboards: BillboardColumn[] | undefined }) => (
  <>
    <Header title={`Billboards (${formattedBillboards?.length})`} description={'Manage your store billboards'}>
      <Link href="/dashboard/billboards/new" className={buttonVariants({ variant: 'outline' })}>
        <PlusIcon className="mr-2 text-muted-foreground" /> Add New
      </Link>
    </Header>
    <section className="mx-auto max-w-6xl p-10 md:py-10">
      <DataTable searchKey="label" columns={columns} data={formattedBillboards as BillboardColumn[]} />
    </section>
  </>
);
