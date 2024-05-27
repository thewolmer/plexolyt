import { NextResponse } from 'next/server';

import { QueryProducts } from '@/actions/products.client';

export async function POST(req, res) {
  const { colors, lengths, widths, featured } = req.body;
  const { categoryId } = req.params;

  try {
    const { data, status, message } = await QueryProducts({ category: categoryId, colors, lengths, widths, featured });
    NextResponse.json({ status, message, data });
  } catch (error) {
    console.error('[API: QueryProducts]', error);
    NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}
