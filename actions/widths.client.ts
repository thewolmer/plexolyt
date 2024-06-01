'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllWidths = cache(
  async () => {
    try {
      const width = await db.width.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { status: 200, data: width };
    } catch (e) {
      console.log('[action-client:getAllWidths]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },

  ['getAllWidths'],
  {
    revalidate: 3600,
  },
);
