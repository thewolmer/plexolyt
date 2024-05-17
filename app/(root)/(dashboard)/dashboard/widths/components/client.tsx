'use client';

import { usePathname } from 'next/navigation';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { WidthColumn, columns } from './columns';

export const WidthClient = ({ formattedWidths }: { formattedWidths: WidthColumn[] | undefined }) => {
  const pathname = usePathname();

  return (
    <>
      <Header title={`Widths (${formattedWidths?.length})`} description={'Manage your store width'}>
        <Link href={`${pathname}/new`} className={buttonVariants({ variant: 'outline' })}>
          <PlusIcon className="mr-2 text-muted-foreground" /> Add New
        </Link>
      </Header>
      <section className="mx-auto max-w-6xl p-10 md:py-10">
        <DataTable searchKey="label" columns={columns} data={formattedWidths as WidthColumn[]} />
      </section>
    </>
  );
};
