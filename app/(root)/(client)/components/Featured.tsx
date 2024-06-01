import React from 'react';

import { ProductCard } from '@/components/ProductCard';
import { GetFeaturedProducts } from '@/lib/PlexolytAPI/products';

export const Featured = async () => {
  const data = await GetFeaturedProducts();
  if (data.status !== 200 || !data.data) {
    return (
      <section id="featured">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight ">Featured Products </h2>
          <div className="mt-6   flex items-center  justify-center gap-x-6 gap-y-10 xl:gap-x-8">
            <p>Error fetching Featured Products</p>
          </div>
        </div>
      </section>
    );
  }

  const products = data.data;
  return (
    <section id="featured">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">Featured Products </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
