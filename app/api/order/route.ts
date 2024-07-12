import crypto from 'crypto';

import { NextResponse } from 'next/server';

import { env } from '@/env';
import db from '@/lib/db';
import { razorpay } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const razorpay_payment_id = params.get('razorpay_payment_id');
    const razorpay_order_id = params.get('razorpay_order_id');
    const razorpay_signature = params.get('razorpay_signature');

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return new NextResponse(null, { status: 400, statusText: 'Missing required fields' });
    }

    const payment = await razorpay.orders.fetchPayments(razorpay_order_id);
    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_API_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return new NextResponse(null, { status: 400, statusText: 'Invalid signature' });
    }

    if (payment.items.length === 0) {
      return new NextResponse(null, { status: 400, statusText: 'No payments found for this order' });
    }

    const lastPayment = payment.items[payment.items.length - 1];
    const id = lastPayment.notes.order;

    await db.order.update({
      where: { id },
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
        payment_status: lastPayment.status,
        payment_id: razorpay_payment_id,
        payment_method: lastPayment.method,
        payment_signature: razorpay_signature,
        transaction_id:
          lastPayment.acquirer_data.upi_transaction_id || lastPayment.acquirer_data.bank_transaction_id || 'Unknown',
        vpa: lastPayment.vpa || 'Unknown',
        amount: Number(lastPayment.amount) / 100,
        bank: lastPayment.bank || 'Unknown',
        order_status: 'CONFIRMED',
      },
    });

    // TODO: FIX EMAIL CONFIRMATION
    // await OrderConfirmationEmail({ orderId: updatedOrder.id });

    // TODO: LOGIC TO UPDATE PRODUCT QUANTITY
    // const productIds = updatedOrder.orderItems.map((item) => item.product.id);

    return NextResponse.redirect(new URL(`/checkout?success=true&order=${id}`, env.NEXT_PUBLIC_APP_URL.toString()));
  } catch (error) {
    return NextResponse.redirect(new URL(`/checkout?success=false&order=false`, env.NEXT_PUBLIC_APP_URL.toString()));
  }
}
