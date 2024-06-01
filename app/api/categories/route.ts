import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 604800;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') || undefined;
  if (id) {
    try {
      const category = await db.category.findUnique({
        where: {
          id,
        },
        include: {
          billboard: true,
        },
      });
      if (!category) {
        return NextResponse.json({ status: 404, message: 'Category not found.' }, { status: 404 });
      }
      return NextResponse.json({ status: 200, data: category }, { status: 200 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('[/api/categories/?id]', e);
      return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
    }
  } else {
    try {
      const categories = await db.category.findMany({
        where: {
          id,
        },
        include: {
          billboard: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (categories.length === 0 && !id) {
        return NextResponse.json({ status: 404, message: 'Categories not found.' }, { status: 404 });
      }
      return NextResponse.json({ status: 200, data: categories }, { status: 200 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('[/api/categories/]', e);
      return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
    }
  }
}
