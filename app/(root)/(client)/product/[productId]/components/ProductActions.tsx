import Link from 'next/link';

import { AddToCartButton } from '@/components/Cart';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';

interface ProductActionsProps {
  product: ProductWithPayLoad;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const ProductActions = ({ product, searchParams }: ProductActionsProps) => {
  const selectedColor = searchParams.color || product.productColors[0].color.id;

  const selectedLength = searchParams.length || product.productLengths[0].length.id;

  const selectedWidth = searchParams.width || product.productWidths[0].width.id;

  const selectedGauge = searchParams.gauge || product.productGauges[0].gauge.id;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span>Color:</span>
        {product.productColors.map((item) => (
          <Link
            key={item.id}
            href={`?color=${item.color.id}&length=${selectedLength}&width=${selectedWidth}&gauge=${selectedGauge}`}
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
          </Link>
        ))}
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <span>Length:</span>
        {product.productLengths.map((item) => (
          <Link
            key={item.id}
            href={`?color=${selectedColor}&length=${item.length.id}&width=${selectedWidth}&gauge=${selectedGauge}`}
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
          </Link>
        ))}
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <span>Width:</span>
        {product.productWidths.map((item) => (
          <Link
            key={item.id}
            href={`?color=${selectedColor}&length=${selectedLength}&width=${item.width.id}&gauge=${selectedGauge}`}
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
          </Link>
        ))}
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <span>Gauge:</span>
        {product.productGauges.map((item) => (
          <Link
            key={item.id}
            href={`?color=${selectedColor}&length=${selectedLength}&width=${selectedWidth}&gauge=${item.gauge.id}`}
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
          </Link>
        ))}
      </div>
      <Separator />
      <div>
        <AddToCartButton data={product} />
      </div>
    </div>
  );
};
