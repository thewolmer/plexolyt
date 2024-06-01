import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET() {
  try {
    const widths = await db.width.findMany({});
    if (widths.length === 0) {
      return NextResponse.json({ status: 404, message: 'Widths not found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: widths }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/widths/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
