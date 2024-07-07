'use server';
import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { z } from 'zod';

import { env } from '@/env';
import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';
import { CheckOutFormSchema } from '@/prisma/form-schema.client';

export const OrderCreate = async (cartItems: CartItem[], values: z.infer<typeof CheckOutFormSchema>) => {
  const razorpay = new Razorpay({
    key_id: env.RAZORPAY_API_ID,
    key_secret: env.RAZORPAY_API_SECRET,
  });

  try {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('No Item found in cart');
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: cartItems.map((item) => item.id),
        },
      },
    });

    const checkoutProducts = products.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });

    const amount = checkoutProducts.reduce((total, product) => total + (product.price * product.quantity || 1), 0);

    const order = await db.order.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        country: values.country,
        amount: amount,
        order_status: 'PENDING',
        orderItems: {
          create: cartItems.map((item) => ({
            product: {
              connect: {
                id: item.id,
              },
            },
            quantity: item.quantity!,
            color: {
              connect: {
                id: item.color?.id,
              },
            },
            length: {
              connect: {
                id: item.length?.id,
              },
            },
            width: {
              connect: {
                id: item.width?.id,
              },
            },
            gauge: {
              connect: {
                id: item.gauge?.id,
              },
            },
          })),
        },
      },
    });

    const options = {
      amount: order.amount * 100,
      currency: 'INR',
      receipt: order.id.toString(),
      payment_capture: 1,
      notes: {
        orderId: order.id,
      },
    };

    const paymentResponse = await razorpay.orders.create(options);
    return paymentResponse as Orders.RazorpayOrder;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error?.message || 'Something went wrong';
  }
};
