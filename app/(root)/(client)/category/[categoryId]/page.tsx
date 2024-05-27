import React, { Suspense } from 'react';

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
      <Suspense fallback={<p> Loading...</p>}>
        <Filters />
      </Suspense>
      <ProductList id={params.categoryId} searchParams={searchParams} />
    </div>
  </div>
);

export default CategoryPage;
