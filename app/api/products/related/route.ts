import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 3600;
export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('category') || undefined;
  const product = request.nextUrl.searchParams.get('product') || undefined;
  if (!categoryId || !product) {
    return NextResponse.json(
      { status: 400, message: 'Category Id (category) and Product Id (product) is required!' },
      { status: 400 },
    );
  }
  try {
    const relatedProducts = await db.product.findMany({
      where: {
        categoryId,
        isArchived: false,
        id: {
          not: product,
        },
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

    if (relatedProducts.length === 0) {
      return NextResponse.json({ status: 404, message: 'No related products found.' }, { status: 404 });
    }

    return NextResponse.json({ status: 200, data: relatedProducts }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/products/related/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
