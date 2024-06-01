import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('category') || undefined;
  const featured = request.nextUrl.searchParams.get('featured') || undefined;

  try {
    const products = await db.product.findMany({
      where: {
        categoryId,
        isArchived: false,
        isFeatured: featured === 'true' ? true : undefined,
      },
      include: {
        category: true,
        subCategory: true,
        productColors: {
          include: {
            color: true,
          },
        },
        productLengths: {
          include: {
            length: true,
          },
        },
        productWidths: {
          include: {
            width: true,
          },
        },
        productGauges: {
          include: {
            gauge: true,
          },
        },
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!products) {
      return NextResponse.json({ status: 404, message: 'No products found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: products });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/products/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
