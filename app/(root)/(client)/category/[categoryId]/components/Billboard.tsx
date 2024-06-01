import { notFound } from 'next/navigation';
import React from 'react';

import { Image } from '@/components/Image';
import { GetCategoryById } from '@/lib/PlexolytAPI/categories';

export const Billboard = async ({ id }: { id: string }) => {
  const data = await GetCategoryById({ categoryId: id });
  if (data.status !== 200) return notFound();
  const category = data.data;
  const { billboard } = data.data;

  return (
    <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
      <div className="aspect-square relative h-[25vh] w-full overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1] md:h-[40vh]">
        <Image
          src={billboard.imageUrl}
          alt="billboard"
          style={{ objectFit: 'cover' }}
          fill
          className="absolute"
        ></Image>
        <div className="relative z-0 flex h-full w-full flex-col items-center justify-center gap-y-8 text-center ">
          <div
            className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl"
            style={{ color: category.textColor }}
          >
            {category.description}
          </div>
        </div>
      </div>
    </div>
  );
};
