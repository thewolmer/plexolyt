'use client';
import { X } from 'lucide-react';
import React from 'react';

import { CartIcon } from '@/components/Icons';
import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { useMounted } from '@/hooks/useMounted';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/formatter';

export const Cart = () => {
  const cart = useCart();
  const isMounted = useMounted();

  const total = cart.items.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);

  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger className={cn('flex', buttonVariants({ variant: 'outline', size: 'icon' }))}>
        <CartIcon className="size-5" />
        {cart.items.length !== 0 && <div className="">{cart.items.length}</div>}
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          {/* <SheetDescription>hola</SheetDescription> */}
        </SheetHeader>
        <div className="my-6 space-y-4">
          <Separator />

          {cart.items.length === 0 && <div className="flex h-full items-center justify-center">Your cart is empty</div>}
          {cart.items.map((item) => (
            <div key={item.id} className=" relative flex rounded-xl border p-6">
              <div
                role="button"
                onClick={() => cart.removeItem(item)}
                className="shadow-4xl absolute -right-2 top-0 rounded-full border bg-card p-2"
              >
                <X size={'15px'} />
              </div>
              <Link href={`/product/${item.id}`} className="flex items-center justify-center">
                <div className="w-24 rounded-2xl">
                  <Image
                    src={item.images[0].imageUrl as string}
                    alt={item.name as string}
                    width={75}
                    height={75}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                </div>
              </Link>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-xs">
                    {item.category.name} | {item.subCategory.name}
                  </p>
                  <div className="text-muted-foreground">
                    <p className="text-xs">Color: {item.color?.name}</p>
                    <p className="text-xs">Length: {item.length?.name}</p>
                    <p className="text-xs">Width: {item.width?.name}</p>
                    <p className="text-xs">Gauge: {item.gauge?.name}</p>
                    <p className="mt-1 flex flex-col text-xs">
                      <span>
                        {formatCurrency(item.price)} x {item.quantity}
                      </span>
                      <span className="font-bold text-foreground">
                        {formatCurrency(cart.calculateItemTotal(item.id))}
                      </span>
                    </p>
                  </div>
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
