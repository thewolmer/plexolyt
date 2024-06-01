import React from 'react';

import { ProductCard } from '@/components/ProductCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { GetRelatedProducts } from '@/lib/PlexolytAPI/products';

interface Props {
  categoryId: string;
  currentProductId: string;
}

export const RelatedProducts = async ({ categoryId, currentProductId }: Props) => {
  const featuredProducts = await GetRelatedProducts({ categoryId, productId: currentProductId });
  if (!featuredProducts || featuredProducts.data?.length === 0)
    return <div className="text-center">No related products found</div>;
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm md:mx-auto md:max-w-6xl"
    >
      <CarouselContent className="">
        {featuredProducts?.data?.map((data, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
            <div className="flex items-center justify-center p-1">
              <ProductCard product={data} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
