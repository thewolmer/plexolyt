'use client';

import { Orders } from 'razorpay/dist/types/orders';
import { z } from 'zod';

import { siteConfig } from '@/config/site';
import { CheckOutFormSchema } from '@/prisma/form-schema.client';

type CheckoutValues = z.infer<typeof CheckOutFormSchema>;

export const Checkout = async (session: Orders.RazorpayOrder, values: CheckoutValues) => {
  try {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_API_ID,
      amount: session.amount,
      currency: 'INR',
      name: siteConfig.name,
      description: 'Payment for your order',
      order_id: session.id,
      prefill: {
        name: values.name,
        email: values.email,
        contact: values.phone,
      },
      notes: {
        address: siteConfig.location.address,
      },
      theme: {
        color: '#303030',
      },
      callback_url: '/api/order',
    };

    // Ensure the Razorpay script is loaded
    if (typeof window.Razorpay === 'function') {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay is not available');
    }
  } catch (error) {
    console.error('Error in payment process', error);
  }
};
