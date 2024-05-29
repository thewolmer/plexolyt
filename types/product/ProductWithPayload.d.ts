import { Prisma } from '@prisma/client';

export type ProductWithPayLoad = Prisma.ProductGetPayload<{
  include: {
    category: true;
    productColors: {
      include: {
        color: true;
      };
    };
    productLengths: {
      include: {
        length: true;
      };
    };
    productWidths: {
      include: {
        width: true;
      };
    };
    productGauges: {
      include: {
        gauge: true;
      };
    };
    subCategory: true;
    images: true;
  };
}>;
