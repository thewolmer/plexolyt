import React from 'react';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const FiltersLoader = () => (
  <div className="mx-auto my-16 hidden min-h-[50vh] w-1/5 max-w-2xl p-4  sm:mx-6 sm:my-24 md:block  lg:px-8">
    <h3 className="mb-2 text-xl font-bold">Filters</h3>
    <Separator />
    <div className="space-y-4 py-5">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);
