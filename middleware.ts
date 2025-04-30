import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const isAuthorizedRoute = request.nextUrl.pathname.startsWith('/registered');

  if (isAuthorizedRoute && !authCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};