import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`, req.url),
    );
  }
});
