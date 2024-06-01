import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 3600;

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  const id = params.productId;
  if (!id) {
    return NextResponse.json({ status: 400, message: 'Product ID (id) is required!' }, { status: 400 });
  }
  try {
    const product = await db.product.findUnique({
      where: {
        id: id,
        isArchived: false,
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
    });
    if (!product) {
      return NextResponse.json({ status: 404, message: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: product }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/product/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
