'use server';
import Stripe from 'stripe';
import { z } from 'zod';

import { CartItem } from '@/hooks/use-cart';
import db from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { CheckOutFormSchema } from '@/prisma/form-schema.client';

export const Checkout = async (cartItems: CartItem[], values: z.infer<typeof CheckOutFormSchema>) => {
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
        quantity: cartItem?.quantity,
      };
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    checkoutProducts.forEach((checkoutProducts) => {
      line_items.push({
        price_data: {
          currency: 'INR',
          product_data: {
            name: checkoutProducts.name,
          },
          unit_amount: Number(checkoutProducts.price) * 100,
        },
        quantity: checkoutProducts.quantity || 1,
      });
    });

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
        amount: 0,
        orderItems: {
          create: cartItems.map((item) => ({
            product: {
              connect: {
                id: item.id,
              },
            },
            quantity: item.quantity!,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${process.env.AUTH_TRUST_HOST}/success`,
      cancel_url: `${process.env.AUTH_TRUST_HOST}`,
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        orderId: order.id,
      },
    });

    console.log(session);
    return session;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error?.message || 'Something went wrong';
  }
};
