'use client';

import { usePathname } from 'next/navigation';

import { PlusIcon } from '@/components/Icons';
import { Header } from '@/components/Layout/Header';
import { Link } from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { CategoryColumn, columns } from './columns';

export const CategoriesClient = ({ formattedCategory }: { formattedCategory: CategoryColumn[] | undefined }) => {
  const pathname = usePathname();
  return (
    <>
      <Header title={`Categories (${formattedCategory?.length})`} description={'Manage your store categories'}>
        <Link href={`${pathname}/new`} className={buttonVariants({ variant: 'outline' })}>
          <PlusIcon className="mr-2 text-muted-foreground" /> Add New
        </Link>
      </Header>
      <section className="mx-auto max-w-6xl p-10 md:py-10">
        <DataTable searchKey="name" columns={columns} data={formattedCategory as CategoryColumn[]} />
      </section>
    </>
  );
};
