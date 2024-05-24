'use client';

import { Minus, Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { CartItem, useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/utils/formatter';

export const AddToCartButton = ({ data }: { data: CartItem }) => {
  const [quantity, setQuantity] = React.useState(1);
  const cart = useCart();
  const handleAddToCart = () => {
    cart.addItem({ ...data, quantity: quantity });
  };

  const onQuantityRemove = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const onQuantityAdd = () => {
    if (quantity === Number(data.stock)) {
      return;
    }
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div className="flex items-end justify-end px-10 pt-5">
        <p className="ml-2 text-2xl font-extrabold text-gray-600">{formatCurrency(Number(data?.price) * quantity)}</p>
      </div>
      <div className="my-8 flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant={'outline'} size={'icon'} onClick={onQuantityRemove}>
            <Minus />
          </Button>
          <Button variant={'secondary'}>{quantity}</Button>
          <Button variant={'outline'} size={'icon'} onClick={onQuantityAdd}>
            <Plus />
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="w-1/2 rounded-full">
          Add to Cart
        </Button>
      </div>
    </>
  );
};
