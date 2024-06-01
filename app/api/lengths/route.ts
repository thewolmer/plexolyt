import { NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 604800;

export async function GET() {
  try {
    const lengths = await db.length.findMany({});
    if (lengths.length === 0) {
      return NextResponse.json({ status: 404, message: 'Lengths not found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: lengths }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/lengths/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
