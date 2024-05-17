import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(req: Request, { params }: { params: { productSlug: string } }) {
  try {
    if (!params.productSlug) {
      return NextResponse.json({ message: 'Could not find product slug in request' }, { status: 400 });
    }
    const product = await db.product.findUnique({
      where: {
        slug: params.productSlug,
      },
      include: {
        category: true,
        color: true,
        length: true,
        width: true,
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (e) {
    console.log('[GET /api/v1/products/[productSlug]]', e);
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}
