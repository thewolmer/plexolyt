import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 604800;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') || undefined;
  if (id) {
    try {
      const subCategory = await db.subCategory.findUnique({
        where: {
          id,
        },
      });
      if (!subCategory) {
        return NextResponse.json({ status: 404, message: 'Sub Category not found.' }, { status: 404 });
      }
      return NextResponse.json({ status: 200, data: subCategory }, { status: 200 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('[/api/subcategories/?id]', e);
      return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
    }
  } else {
    try {
      const subCategory = await db.subCategory.findMany({
        where: {
          id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (subCategory.length === 0 && !id) {
        return NextResponse.json({ status: 404, message: 'Sub Categories not found.' }, { status: 404 });
      }
      return NextResponse.json({ status: 200, data: subCategory }, { status: 200 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('[/api/subcategories/]', e);
      return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
    }
  }
}
