import { NextResponse } from 'next/server';

import db from '@/lib/db';

export const revalidate = 604800;

export async function GET() {
  try {
    const gauge = await db.gauge.findMany({});
    if (gauge.length === 0) {
      return NextResponse.json({ status: 404, message: 'Gauges not found.' }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: gauge }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('[/api/gauge/]', e);
    return NextResponse.json({ status: 500, message: e.message }, { status: 500 });
  }
}
