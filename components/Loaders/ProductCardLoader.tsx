import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardLoader = () => (
  <div className="relative rounded-2xl border shadow-xl">
    <div className="aspect-1 w-full overflow-hidden rounded-t-xl ">
      <Skeleton className="h-48 w-80 md:h-80"></Skeleton>
    </div>
    <div className="mt-1 flex flex-col gap-2 p-3">
      <div>
        <div className="space-y-2 text-sm">
          <Skeleton className="h-3 w-[90%]"></Skeleton>
          <Skeleton className="h-3 w-[80%]"></Skeleton>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-3 w-1/3"></Skeleton>
          </div>

          <div>
            <div className="flex items-center justify-center text-muted-foreground">
              {/* {product.productColors.map((item) => (
                <div
                  key={item.id}
                  className={`h-2 w-2 rounded-full text-muted-foreground`}
                  style={{ backgroundColor: item.color.hex }}
                ></div>
              ))} */}
            </div>
          </div>
        </div>
        {/* <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>
            <div className="flex items-center justify-center text-muted-foreground">
              {product.productLengths.map((item) => (
                <span key={item.id}>{item.length.name}</span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <Skeleton className="px-11 py-2 text-start text-sm font-medium"></Skeleton>
    </div>
  </div>
);
