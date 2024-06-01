'use server';
import { z } from 'zod';

import { auth } from '@/auth';
import db from '@/lib/db';
import { UpdateOrderStatusFormSchema } from '@/prisma/form-schema.client';

export const getOrderByID = async ({ orderID }: { orderID: string }) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const order = await db.order.findFirst({
      where: {
        id: orderID,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return { status: 200, data: order };
  } catch (e) {
    console.log('[action:getAllProductByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};

interface updateOrderStatusProps {
  orderID: string;
  order_status: z.infer<typeof UpdateOrderStatusFormSchema>['order_status'];
}

export const updateOrderStatus = async ({ orderID, order_status }: updateOrderStatusProps) => {
  const session = await auth();
  if (!session) {
    return { message: 'Unauthorized!', status: 401 };
  }
  try {
    const order = await db.order.update({
      where: {
        id: orderID,
      },
      data: {
        order_status,
      },
    });
    return { status: 200, data: order };
  } catch (e) {
    console.log('[action:updateOrderStatus]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
