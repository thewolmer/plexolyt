'use server';
import { unstable_cache as cache } from 'next/cache';

import db from '@/lib/db';

export const getAllColors = cache(
  async () => {
    try {
      const color = await db.color.findMany({});
      return { status: 200, data: color };
    } catch (e) {
      console.log('[action-client:getAllColors]', e);
      return { message: 'Something went wrong!', status: 500 };
    }
  },

  ['getAllColors'],
  {
    revalidate: 3600,
  },
);
