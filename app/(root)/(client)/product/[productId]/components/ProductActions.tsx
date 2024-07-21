'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AddToCartButton } from '@/components/Cart';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';
import { useState } from 'react';

interface ProductActionsProps {
  product: ProductWithPayLoad;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const ProductActions = ({ product, searchParams }: ProductActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const selectedColor = searchParams?.color|| product.productColors[0].color.id;
  const selectedLength = searchParams?.length || product.productLengths[0].length.id;
  const selectedWidth = searchParams?.width || product.productWidths[0].width.id;
  const selectedGauge = searchParams?.gauge || product.productGauges[0].gauge.id;

  const updateUrlParams = async (param: string, value: string) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl, {
      scroll: false,
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span>Color:</span>
        {product.productColors.map((item) => (
          <Button
          variant={selectedColor === item.color.id ? 'default' : 'outline'}
          size={'sm'}
          disabled={loading}
            key={item.id}
            onClick={() => updateUrlParams('color', item.color.id)}
            className={cn(
              'flex items-center gap-1 rounded-full',
              selectedColor === item.color.id && 'border-1 border border-primary',
            )}
          >
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: item.color.hex }}></div>
            <span>{item.color.name}</span>
            <span className="sr-only">{item.color.name}</span>
          </Button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Length:</span>
        {product.productLengths.map((item) => (
          <Button
            key={item.id}
            onClick={() => updateUrlParams('length', item.length.id)}
            variant={selectedLength === item.length.id ? 'default' : 'outline'}
            size={'sm'}
            disabled={loading}
            className={cn(
              'flex items-center gap-1 rounded-full',
              selectedLength === item.length.id && 'border-1 border border-primary',
            )}
          >
            <span>{item.length.name}</span>
          </Button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Width:</span>
        {product.productWidths.map((item) => (
          <Button
            key={item.id}
            onClick={() => updateUrlParams('width', item.width.id)}
            variant={selectedWidth === item.width.id ? 'default' : 'outline'}
            size={'sm'}
            disabled={loading}
            className={cn(
              'flex items-center gap-1 rounded-full',
              selectedWidth === item.width.id && 'border-1 border border-primary',
            )}
          >
            <span>{item.width.name}</span>
          </Button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Gauge:</span>
        {product.productGauges.map((item) => (
          <Button
            key={item.id}
            onClick={() => updateUrlParams('gauge', item.gauge.id)}
            size={'sm'}
            disabled={loading}
            variant={selectedGauge === item.gauge.id ? 'default' : 'outline'}
            className={cn(
              'flex items-center gap-1 rounded-full',
              selectedGauge === item.gauge.id && 'border-1 border border-primary',

            )}
          >
            <span>{item.gauge.name}</span>
          </Button>
        ))}
      </div>
      <Separator />
      <div>
        <AddToCartButton data={product} />
      </div>
    </div>
  );
};
