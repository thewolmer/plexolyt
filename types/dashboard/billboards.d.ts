import { Billboard } from '@prisma/client';

export type BillboardType = {
  status: number;
  message: string;
  data: Billboard;
};
