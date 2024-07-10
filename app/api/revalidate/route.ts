import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { sendRevalidationLog } from '@/lib/Webhooks/RevalidateLog';

/* eslint-disable @typescript-eslint/no-unused-vars */

export const POST = (req: NextRequest) => {
  const authorization = req.headers.get('Authorization');
  const reqUrl = req.headers.get('Referer');
  const secret = env.AUTH_SECRET;
  if (!authorization || !reqUrl || !secret) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }
  if (authorization === secret) {
    revalidatePath('/');
    sendRevalidationLog(reqUrl as string);
    return NextResponse.json({ status: 200, message: 'Revalidated', now: new Date() }, { status: 200 });
  } else {
    return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }
};
