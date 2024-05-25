import { Prisma } from '@prisma/client';

export type OrderWithPayLoad = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: {
          include: {
            images: true;
            category: true;
            color: true;
            length: true;
            width: true;
          };
        };
      };
    };
  };
}>;
