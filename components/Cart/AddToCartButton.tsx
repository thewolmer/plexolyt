'use client';

import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CartItem, useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/utils/formatter';

export const AddToCartButton = ({ data }: { data: CartItem }) => {
  const searchparams = useSearchParams();
  const selectedColor = searchparams.get('color') || data.productColors[0].color.id;
  const selectedLength = searchparams.get('length') || data.productLengths[0].length.id;
  const selectedWidth = searchparams.get('width') || data.productWidths[0].width.id;
  const selectedGauge = searchparams.get('gauge') || data.productGauges[0].gauge.id;

  const [quantity, setQuantity] = React.useState(1);
  const cart = useCart();
  const handleAddToCart = () => {
    if (!selectedColor || !selectedLength || !selectedWidth || !selectedGauge) {
      toast.error('Please select color, length, width and gauge');
      return;
    }

    try {
      const productColor = data.productColors.find((item) => item.color.id === selectedColor);
      const productLength = data.productLengths.find((item) => item.length.id === selectedLength);
      const productWidth = data.productWidths.find((item) => item.width.id === selectedWidth);
      const productGauge = data.productGauges.find((item) => item.gauge.id === selectedGauge);
      cart.addItem({
        ...data,
        quantity: quantity,
        color: productColor?.color,
        length: productLength?.length,
        width: productWidth?.width,
        gauge: productGauge?.gauge,
      });
    } catch (e) {
      console.log(e);
    }
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
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="flex justify-center px-10 pt-5 tabular-nums md:items-end md:justify-end">
        <p className="ml-2 text-2xl font-extrabold ">{formatCurrency(Number(data?.price) * quantity)}</p>
      </div>
      <div className="mx-auto my-8 flex flex-col-reverse gap-2 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant={'outline'} size={'icon'} onClick={onQuantityRemove}>
            <Minus />
          </Button>
          <Button variant={'secondary'} className="tabular-nums">
            {quantity}
          </Button>
          <Button variant={'outline'} size={'icon'} onClick={onQuantityAdd}>
            <Plus />
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="rounded-full md:w-1/2">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
