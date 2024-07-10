import React, { Suspense } from 'react';

import { ProductListLoader } from '@/components/Loaders';
import { FiltersLoader } from '@/components/Loaders/FiltersLoader';
import { GetCategoryById } from '@/lib/PlexolytAPI/categories';
import { generateSeo } from '@/utils/generateSeo';

import { Billboard } from './components/Billboard';
import { Filters } from './components/Filters';
import ProductList from './components/ProductList';

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = async ({ params }: Props) => {
  const { data } = await GetCategoryById(params);

  if (data) {
    generateSeo({
      title: `${data.name} - Plexolyt`,
      description: data.description,
      url: `/category/${params.categoryId}`,
      image: {
        url: data.billboard.imageUrl,
        width: 1200,
        height: 675,
      },
    });
  }
};

const CategoryPage = async ({ params, searchParams }: Props) => (
  <div className="min-h-screen w-full">
    <Billboard id={params.categoryId} />
    <div className="flex flex-col md:flex-row">
      <Suspense fallback={<FiltersLoader />}>
        <Filters />
      </Suspense>
      <Suspense fallback={<ProductListLoader />}>
        <ProductList id={params.categoryId} searchParams={searchParams} />
      </Suspense>
    </div>
  </div>
);

export default CategoryPage;
