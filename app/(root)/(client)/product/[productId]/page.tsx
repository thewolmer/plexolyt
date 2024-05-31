import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { getProductById } from '@/actions/products.client';
import { Image } from '@/components/Image';
import { RelatedProductsLoader } from '@/components/Loaders';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

import { ProductActions } from './components/ProductActions';
import { RelatedProducts } from './components/RelatedCarousel';

interface ProductPageProps {
  params: {
    productId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: ProductPageProps) => {
  const { productId } = params;
  const data = await getProductById(productId);
  if (data?.status !== 200 || !data?.data) {
    return notFound();
  }
  const product = data.data;

  return (
    <div className="flex   w-full flex-col items-center justify-center p-4">
      <div className="flex min-h-[90vh] w-full flex-col items-center justify-center">
        <div className="mx-auto flex  w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row">
          <Carousel className="aspect-1  w-[70vw] md:w-1/2">
            <CarouselContent>
              {product.images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="aspect-1">
                    <Image
                      src={image.imageUrl}
                      alt={product.name}
                      className="h-[35vh] w-full rounded-md object-cover shadow-md md:h-[60vh]"
                      width={720}
                      height={720}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <div className="md:w-1/2">
            <Image
              src={product?.images[0].imageUrl}
              alt={product.name}
              className="w-full rounded-md shadow-md"
              width={720}
              height={720}
            />
          </div> */}
          <div className="flex w-full flex-col gap-4 px-10 md:w-1/2 md:pl-8">
            <div>
              <p className="text-sm text-muted-foreground">{product.category.name}</p>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-pretty text-muted-foreground">{product.description}</p>
            </div>
            <Separator />
            <ProductActions product={product} searchParams={searchParams} />
          </div>
        </div>
      </div>
      <section id="related-product" className="min-h-[20vh] w-full max-w-6xl">
        <h2 className="mb-6 text-start text-2xl font-bold tracking-tight">You may also like </h2>
        <Suspense fallback={<RelatedProductsLoader />}>
          <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
