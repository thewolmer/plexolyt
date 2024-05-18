import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log(params);
    if (!params.id) {
      return NextResponse.json({ message: 'Could not find product id in request' }, { status: 400 });
    }
    const product = await db.product.findUnique({
      where: {
        id: params.id,
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
      return;
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (e) {
    console.log('[GET /api/v1/products/[id]]', e);
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}
