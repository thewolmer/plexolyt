import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// import { OrderConfirmationEmail } from '@/actions/emails';
import db from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new NextResponse(null, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const id = session?.metadata?.orderId;
  const paymentStatus = session.payment_status!;
  const stripeId = session.id;
  const total = session.amount_total! / 100;
  const line_items = session.line_items?.data;
  console.log('line_items', line_items);

  await db.order.update({
    where: {
      id,
    },
    include: {
      orderItems: {
        select: {
          product: {
            select: {
              id: true,
            },
          },
        },
      },
    },
    data: {
      payment_status: paymentStatus,
      stripeId,
      amount: total,
      order_status: 'CONFIRMED',
    },
  });

  // TODO: FIX EMAIL CONFIRMATION
  // await OrderConfirmationEmail({ orderId: order.id });

  // TODO: LOGIC TO UPDATE PRODUCT QUANTITY
  // const productIds = order.orderItems.map((item) => item.product.id);

  return new NextResponse(null, { status: 200 });
}
