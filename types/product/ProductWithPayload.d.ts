import { Prisma } from '@prisma/client';

export type ProductWithPayLoad = Prisma.ProductGetPayload<{
  include: {
    category: true;
    color: true;
    length: true;
    width: true;
    images: true;
  };
}>;
