import React from 'react';

import { Image } from '@/components/Image';
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
    return null;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        <div className="md:w-1/2">
          <Image
            src={product?.images[0].imageUrl}
            alt={product.name}
            className="w-full rounded-md shadow-md"
            width={720}
            height={720}
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-xl text-gray-700">${product.category.name}</p>
          <div className="mb-4 flex items-center">
            <div className="flex items-center text-yellow-500">stars</div>
          </div>
          <p className="mb-4 text-gray-600">{product.description}</p>
          {/* <div className="mb-4">
            <p className="text-green-500">{inStock ? 'In stock and ready to ship' : 'Out of stock'}</p>
          </div> */}
          <div className="mb-4">
            <p className="mb-2 font-semibold">Size</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
