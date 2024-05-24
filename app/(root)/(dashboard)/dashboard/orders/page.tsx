import { format } from 'date-fns/format';
import React from 'react';

import db from '@/lib/db';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';

const OrdersPage = async () => {
  const data = await db.order.findMany({
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
    amount: order.amount,
    stripeId: order.stripeId,
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
