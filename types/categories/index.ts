import { Prisma } from '@prisma/client';

export interface AllCategoriesResponse {
  status: number;
  data?: Prisma.CategoryGetPayload<{
    include: {
      billboard: true;
    };
  }>[];
  message?: string;
}

export interface CategoryById {
  status: number;
  data?: Prisma.CategoryGetPayload<{
    include: {
      billboard: true;
    };
  }>;
  message?: string;
}
