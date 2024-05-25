'use client';
import { X } from 'lucide-react';
import React from 'react';

import { CartIcon } from '@/components/Icons';
import { Image } from '@/components/Image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { useMounted } from '@/hooks/useMounted';
import { formatCurrency } from '@/utils/formatter';

export const Cart = () => {
  const cart = useCart();
  const isMounted = useMounted();

  const total = cart.items.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);

  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex rounded-2xl border bg-card p-2 ">
          <CartIcon />
          <div className="p-0.5">{cart.items.length}</div>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>hola</SheetDescription>
        </SheetHeader>
        <div className="my-6 space-y-4">
          <Separator />

          {cart.items.length === 0 && <div className="flex h-full items-center justify-center">Your cart is empty</div>}
          {cart.items.map((item) => (
            <div key={item.id} className=" relative flex rounded-xl border p-6">
              <div
                role="button"
                onClick={() => cart.removeItem(item.id)}
                className="shadow-4xl absolute -right-2 top-0 rounded-full border bg-card p-2"
              >
                <X size={'15px'} />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-24 rounded-2xl">
                  <Image
                    src={item.images[0].imageUrl as string}
                    alt={item.name as string}
                    width={75}
                    height={75}
                    className="rounded-2xl object-center"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-xs ">{item.color.name}</p>
                  <p className="text-xs">
                    Color: {item.color.name} | Length: {item.length.name} | Width: {item.width.name}
                  </p>
                  <p className="mt-1 text-xs">
                    {formatCurrency(item.price)} x {item.quantity} =
                    <span className="font-bold">{formatCurrency(cart.calculateItemTotal(item.id))}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.items.length > 0 && (
          <SheetFooter className="absolute bottom-0 left-0 w-full border p-5">
            <div className="flex w-full justify-between">
              <div>
                <p className="text-sm">Total</p>
                <p className="text-sm font-extrabold">{formatCurrency(total)}</p>
              </div>
              <Button
                onClick={() => {
                  window.location.href = '/checkout';
                }}
              >
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
