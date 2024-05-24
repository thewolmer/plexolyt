'use client';

import { usePathname } from 'next/navigation';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { LengthColumn, columns } from './columns';

export const LengthClient = ({ formattedLengths }: { formattedLengths: LengthColumn[] | undefined }) => {
  const pathname = usePathname();

  return (
    <>
      <Header title={`Lengths (${formattedLengths?.length})`} description={'Manage your store length'}>
        <Link href={`${pathname}/new`} className={buttonVariants({ variant: 'outline' })}>
          <PlusIcon className="mr-2 text-muted-foreground" /> Add New
        </Link>
      </Header>
      <section className="mx-auto max-w-6xl p-10 md:py-10">
        <DataTable searchKey="name" columns={columns} data={formattedLengths as LengthColumn[]} />
      </section>
    </>
  );
};
