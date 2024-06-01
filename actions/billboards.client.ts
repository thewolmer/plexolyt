'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllBillboards = cache(
  async () => {
    try {
      const billboard = await db.billboard.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { status: 200, data: billboard };
    } catch (e) {
      console.log('[action:getAllBillboards]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },

  ['getAllBillboards'],
  {
    revalidate: 3600,
  },
);
