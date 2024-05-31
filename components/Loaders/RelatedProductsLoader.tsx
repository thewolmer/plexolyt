import React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import { ProductCardLoader } from './ProductCardLoader';

export const RelatedProductsLoader = () => (
  <Carousel
    opts={{
      align: 'start',
    }}
    className="w-full max-w-sm md:mx-auto md:max-w-6xl"
  >
    <CarouselContent className="">
      {Array.from({ length: 4 }).map((_, index) => (
        <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
          <div className="flex items-center justify-center p-1">
            <ProductCardLoader />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
