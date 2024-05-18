import React from 'react';

import db from '@/lib/db';

export const Billboard = async ({ id }: { id: string }) => {
  const data = await db.category.findUnique({
    where: {
      id: id,
    },
    include: {
      billboard: true,
    },
  });
  if (!data)
    return (
      <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="aspect-square relative animate-pulse overflow-hidden rounded-xl bg-muted bg-cover md:aspect-[2.4/1]">
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
            <div className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl"></div>
          </div>
        </div>
      </div>
    );
  const billboard = data?.billboard;

  return (
    <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
      <div
        className="aspect-square relative w-full overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1] md:h-[40vh]"
        style={{ backgroundImage: `url(${billboard?.imageUrl})` }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl">{data?.description}</div>
        </div>
      </div>
    </div>
  );
};
