'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllGauges = cache(
  async () => {
    try {
      const gauge = await db.gauge.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { status: 200, data: gauge };
    } catch (e) {
      console.log('[action-client:getAllGauges]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },

  ['getAllGauges'],
  {
    revalidate: 3600,
  },
);
