'use server';
import { auth } from '@/auth';
import db from '@/lib/db';

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
    });
    return { status: 200, data: order };
  } catch (e) {
    console.log('[action:getAllProductByID]', e);
    return { message: 'Something went wrong!', status: 500 };
  }
};
