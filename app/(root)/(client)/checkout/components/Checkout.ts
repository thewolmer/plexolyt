'use client';

import { Orders } from 'razorpay/dist/types/orders';
import { z } from 'zod';

import { siteConfig } from '@/config/site';
import { CheckOutFormSchema } from '@/prisma/form-schema.client';

type CheckoutValues = z.infer<typeof CheckOutFormSchema>;

export const Checkout = async (session: Orders.RazorpayOrder, values: CheckoutValues) => {
  try {
    const options = {
      key: (process.env.NEXT_PUBLIC_RAZORPAY_API_ID as string) || 'rzp_live_xPDB5XsS3njZ06',
      amount: session.amount,
      currency: 'INR',
      name: siteConfig.name,
      description: 'Payment for your order',
      order_id: session.id,
      callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
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
    };

    const rzp = new window.Razorpay(options);
    await rzp.open();
  } catch (error) {
    console.error(error);
  }
};
