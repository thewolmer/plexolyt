import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/Icons';

import { Billboard } from './components/Billboard';
import { Filters } from './components/Filters';
import ProductList from './components/ProductList';

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
const CategoryPage = async ({ params, searchParams }: Props) => (
  <div>
    <Billboard id={params.categoryId} />
    <div className="flex flex-col md:flex-row">
      <Suspense
        fallback={
          <div className="h-full w-full">
            <LoadingSpinner />
          </div>
        }
      >
        <Filters />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-full w-full">
            <LoadingSpinner />
          </div>
        }
      >
        <ProductList id={params.categoryId} searchParams={searchParams} />
      </Suspense>
    </div>
  </div>
);

export default CategoryPage;
