'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AddToCartButton } from '@/components/Cart';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';

interface ProductActionsProps {
  product: ProductWithPayLoad;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedColor = searchParams.get('color') || product.productColors[0].color.id;
  const selectedLength = searchParams.get('length') || product.productLengths[0].length.id;
  const selectedWidth = searchParams.get('width') || product.productWidths[0].width.id;
  const selectedGauge = searchParams.get('gauge') || product.productGauges[0].gauge.id;

  const updateUrlParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);

    const newUrl = `${pathname}?${params.toString()}`;

    // // Update the URL without reloading the page or fetching data
    // window.history.pushState({}, '', newUrl);

    // Update the router state without causing a reload
    router.push(newUrl, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span>Color:</span>
        {product.productColors.map((item) => (
          <button
            key={item.id}
            onClick={() => updateUrlParams('color', item.color.id)}
            className={cn(
              buttonVariants({
                variant: selectedColor === item.color.id ? 'default' : 'outline',
                size: 'sm',
              }),
              'flex items-center gap-1 rounded-full',
              selectedColor === item.color.id && 'border-1 border border-primary',
            )}
          >
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: item.color.hex }}></div>
            <span>{item.color.name}</span>
            <span className="sr-only">{item.color.name}</span>
          </button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Length:</span>
        {product.productLengths.map((item) => (
          <button
            key={item.id}
            onClick={() => updateUrlParams('length', item.length.id)}
            className={cn(
              buttonVariants({
                variant: selectedLength === item.length.id ? 'default' : 'outline',
                size: 'sm',
              }),
              'flex items-center gap-1 rounded-full',
              selectedLength === item.length.id && 'border-1 border border-primary',
            )}
          >
            <span>{item.length.name}</span>
          </button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Width:</span>
        {product.productWidths.map((item) => (
          <button
            key={item.id}
            onClick={() => updateUrlParams('width', item.width.id)}
            className={cn(
              buttonVariants({
                variant: selectedWidth === item.width.id ? 'default' : 'outline',
                size: 'sm',
              }),
              'flex items-center gap-1 rounded-full',
              selectedWidth === item.width.id && 'border-1 border border-primary',
            )}
          >
            <span>{item.width.name}</span>
          </button>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-2">
        <span>Gauge:</span>
        {product.productGauges.map((item) => (
          <button
            key={item.id}
            onClick={() => updateUrlParams('gauge', item.gauge.id)}
            className={cn(
              buttonVariants({
                variant: selectedGauge === item.gauge.id ? 'default' : 'outline',
                size: 'sm',
              }),
              'flex items-center gap-1 rounded-full',
              selectedGauge === item.gauge.id && 'border-1 border border-primary',
            )}
          >
            <span>{item.gauge.name}</span>
          </button>
        ))}
      </div>
      <Separator />
      <div>
        <AddToCartButton data={product} />
      </div>
    </div>
  );
};
