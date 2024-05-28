import { notFound } from 'next/navigation';
import React from 'react';

import { AddToCartButton } from '@/components/Cart/AddToCartButton';
import { Image } from '@/components/Image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import db from '@/lib/db';

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      color: true,
      length: true,
      width: true,
      images: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row">
        <Carousel className="w-[70vw] md:w-1/2">
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  src={image.imageUrl}
                  alt={product.name}
                  className="h-[50vh] w-full rounded-md object-cover shadow-md md:h-[60vh]"
                  width={720}
                  height={720}
                />
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
          <div className=" space-y-1">
            <Separator />
            <div className="flex items-center">
              <p className="text-muted-foreground">Color:</p>
              <div
                className="ml-2 flex items-center rounded-full p-2"
                style={{ backgroundColor: product.color.hex }}
              ></div>
              <p className="text-md ml-1 ">{product.color.name}</p>
            </div>
            <Separator />

            <div className="flex items-center">
              <p className="text-muted-foreground">Length:</p>
              <p className="text-md ml-2 ">{product.length.name}</p>
            </div>
            <Separator />

            <div className="flex items-center">
              <p className="text-muted-foreground">Width:</p>
              <p className="text-md ml-2 ">{product.width.name}</p>
            </div>
            <Separator />
          </div>
          <AddToCartButton data={product} />
        </div>
      </div>
    </div>
  );
};

export default page;
