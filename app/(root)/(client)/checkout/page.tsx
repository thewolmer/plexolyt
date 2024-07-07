'use client';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import React from 'react';

import { Image } from '@/components/Image';
import { Separator } from '@/components/ui/separator';
import { SVGSkeleton, Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useMounted } from '@/hooks/useMounted';
import { formatCurrency } from '@/utils/formatter';

import { CheckoutForm } from './components/CheckoutForm';

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  const cart = useCart();
  const total = cart.items.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);
  const isMounted = useMounted();
  const success = searchParams.get('success');
  const failed = searchParams.get('failed');

  if (success === '1') {
    if (isMounted) {
      cart.clearCart();
    }
    return (
      <main className="flex h-[90vh] flex-col items-center justify-center p-10">
        <h1 className="text-center text-4xl font-bold">Thank you for your order.</h1>
        <p className="text-center">
          Your order has been placed successfully, You will receive a confirmation email shortly.
        </p>
      </main>
    );
  }

  if (failed === '1') {
    return (
      <main className="flex h-[90vh] flex-col items-center justify-center p-10">
        <h1 className="text-center text-4xl font-bold text-destructive">Order failed.</h1>
        <p className="text-center">Something went wrong while placing the order, Please try again.</p>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      <main>
        <h1 className="px-10 py-5 text-4xl font-extrabold">Checkout</h1>
        <Separator />
        <section className="flex w-full flex-col gap-5 md:flex-row md:justify-between">
          <div className="space-y-4 p-10 md:w-1/2">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <Separator />
            {isMounted ? (
              <div className="flex flex-col gap-5">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex gap-5">
                      <Image
                        src={item.images[0].imageUrl}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl border object-cover shadow-xl"
                        height={250}
                        width={250}
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <div>
                          <p className="text-sm">
                            Color: {item.color?.name} | Length: {item.length?.name} | Width: {item.length?.name} |
                            Gauge:
                            {item.gauge?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className=" text-lg font-bold">{formatCurrency(item.price)}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}

                <Separator />
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Total</h3>
                  <p className="text-lg font-bold">{formatCurrency(total)}</p>
                </div>
              </div>
            ) : (
              [1, 2].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="flex gap-5">
                    <SVGSkeleton className="h-20 w-20 rounded-2xl border object-cover shadow-xl" />
                    <div className="flex flex-col gap-2">
                      <h3>
                        <Skeleton className="w-[416px] max-w-full" />
                      </h3>
                      <div>
                        <div>
                          <Skeleton className="w-[400px] max-w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <Skeleton className="w-[72px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[48px] max-w-full" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-10 md:w-1/2">
            <CheckoutForm items={cart.items} />
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckoutPage;
