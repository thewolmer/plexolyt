import React from 'react';

import { QueryProducts } from '@/actions/products.client';
import { ProductCard } from '@/components/ProductCard';

export const Featured = async () => {
  const featuredProducts = await QueryProducts({ featured: 'true' });
  if (!featuredProducts || featuredProducts.data?.length === 0) return null;
  return (
    <section id="featured">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">Featured Products </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.data?.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </div>
    </section>
  );
};
