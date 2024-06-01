'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllCategories = cache(
  async () => {
    try {
      const category = await db.category.findMany({
        include: {
          billboard: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { status: 200, data: category };
    } catch (e) {
      console.log('[action-client:getAllCategories]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },
  ['getAllCategories'],
  {
    revalidate: 3600,
  },
);
