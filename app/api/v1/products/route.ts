import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category') || undefined;
    const colorSlug = searchParams.get('color') || undefined;
    const lengthSlug = searchParams.get('length') || undefined;
    const widthSlug = searchParams.get('width') || undefined;
    const isFeatured = searchParams.get('featured') === 'true';

    const products = await db.product.findMany({
      where: {
        categorySlug,
        colorSlug,
        lengthSlug,
        widthSlug,
        isFeatured,
      },
      include: {
        category: true,
        color: true,
        length: true,
        width: true,
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e) {
    console.log('[GET /api/v1/products]', e);
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}
