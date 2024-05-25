'use server';
import React from 'react';
import { Resend } from 'resend';

import OrderConfirmation from '@/emails/OrderConfirmation';
import db from '@/lib/db';

const resend = new Resend(process.env.RESEND_KEY);

export const OrderConfirmationEmail = async ({ orderId }: { orderId: string }) => {
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
              category: true,
              color: true,
              length: true,
              width: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    return;
  }

  const { data, error } = await resend.emails.send({
    from: 'Plexolyt <onboarding@resend.dev>',
    to: [order.email],
    subject: 'Your order has been placed.',
    react: React.createElement(OrderConfirmation, { order }),
  });
  if (error) {
    console.error(['[resend:OrderConfirmationEmail]:', error]);
  }
  return { data };
};
