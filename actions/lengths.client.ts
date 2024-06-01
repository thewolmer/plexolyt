'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllLengths = cache(
  async () => {
    try {
      const length = await db.length.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { status: 200, data: length };
    } catch (e) {
      console.log('[action-client:getAllLengths]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },
  ['getAll Lengths'],
  {
    revalidate: 3600,
  },
);
