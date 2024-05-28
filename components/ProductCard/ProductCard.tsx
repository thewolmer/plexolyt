import { Category, Color, Length, Product, ProductImage, Width } from '@prisma/client';
import React from 'react';

import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { formatCurrency } from '@/utils/formatter';

interface Props extends Product {
  color: Color;
  images: ProductImage[];
  width: Width;
  length: Length;
  category: Category;
}

export const ProductCard = ({ product }: { product: Props }) => (
  <div className="group relative rounded-2xl border shadow-xl ring-primary transition-all duration-150 hover:ring-2">
    <div className="aspect-1 w-full overflow-hidden rounded-t-xl group-hover:opacity-75 ">
      <Image
        src={product.images[0].imageUrl as string}
        alt={product.id as string}
        className="  h-48 w-80 object-cover md:h-80"
        width={300}
        height={300}
      />
    </div>
    <div className="mt-1 flex flex-col gap-2 p-3">
      <div>
        <h3 className="text-sm ">
          <Link href={`/product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs">
          <div className="flex items-center justify-center text-muted-foreground">
            {product.category.name} <span className="mx-1 text-border">|</span>
          </div>

          <div
            className={`h-2 w-2 rounded-full text-muted-foreground`}
            style={{ backgroundColor: product.color.hex }}
          ></div>
          <div className="flex items-center justify-center text-muted-foreground">{product.color.name}</div>
        </div>
        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center md:justify-center">
            Length: {product.length.name} <span className="mx-1 text-border">|</span>
          </div>
          <div className="flex items-center md:justify-center">Width: {product.width.name}</div>
        </div>
      </div>
      <div className="text-start text-sm font-medium">{formatCurrency(product.price)}</div>
    </div>
  </div>
);
