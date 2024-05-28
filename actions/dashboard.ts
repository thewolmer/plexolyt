'use server';
import db from '@/lib/db';

export const getTotalRevenue = async () => {
  const paidOrders = await db.order.findMany({
    where: {
      payment_status: 'paid',
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const getTotalRevenue = paidOrders.reduce(
    (acc, order) => acc + order.orderItems.reduce((acc, item) => acc + Number(item.product.price), 0),
    0,
  );
  return getTotalRevenue;
};

export const getSalesCount = async () => {
  const paidOrders = await db.order.count({
    where: {
      payment_status: 'paid',
    },
  });

  return paidOrders;
};

export const getProductsCount = async () => {
  const products = await db.product.count({
    where: {
      isArchived: false,
    },
  });
  return products;
};
