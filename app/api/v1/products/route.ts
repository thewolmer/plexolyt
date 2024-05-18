import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const categoryId = searchParams.get('category') || undefined;
    const colorId = searchParams.get('color') || undefined;
    const lengthId = searchParams.get('length') || undefined;
    const widthId = searchParams.get('width') || undefined;
    const isFeatured = searchParams.get('featured');

    const products = await db.product.findMany({
      where: {
        categoryId,
        colorId,
        lengthId,
        widthId,
        isFeatured: isFeatured === 'true' ? true : undefined,
        isArchived: false,
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
