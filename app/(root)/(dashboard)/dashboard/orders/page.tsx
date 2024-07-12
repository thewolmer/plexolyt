import { OrderStatus } from '@prisma/client';
import { format } from 'date-fns/format';
import React from 'react';

import db from '@/lib/db';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';

interface searchParams {
  pending: string;
  delivered: string;
  cancelled: string;
}

const OrdersPage = async ({ searchParams }: { searchParams: searchParams }) => {
  const excludedStatuses = ['PENDING', 'DELIVERED', 'CANCELLED'].filter(
    (status) => searchParams[status.toLowerCase() as keyof searchParams] === 'hidden',
  );
  const data = await db.order.findMany({
    where: {
      NOT: {
        order_status: {
          in: excludedStatuses as OrderStatus[],
        },
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] | undefined = data?.map((order) => ({
    id: order.id,
    name: order.name,
    postal_code: order.postal_code,
    orderItemNames: order.orderItems.map((item) => item.product.name).join(', '),
    payment_status: order.payment_status,
    order_status: order.order_status,
    amount: order.amount,
    stripeId: order.payment_id,
    updatedAt: format(order.updatedAt, 'PPpp'),
    createdAt: format(order.createdAt, 'PPpp'),
  }));

  return (
    <main>
      <OrderClient formattedOrders={formattedOrders} />
    </main>
  );
};

export default OrdersPage;
