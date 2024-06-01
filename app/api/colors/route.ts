import { NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 604800;

export async function GET() {
  try {
    const colors = await db.color.findMany({});
    if (colors.length === 0) {
      return NextResponse.json({ status: 404, message: 'Colors not found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: colors }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/colors/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
