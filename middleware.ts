import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('auth');
    
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const auth = JSON.parse(authCookie.value);
      if (!auth.isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  if (pathname === '/login') {
    const authCookie = request.cookies.get('auth');
    
    if (authCookie) {
      try {
        const auth = JSON.parse(authCookie.value);
        if (auth.isAuthenticated) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error) {
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}; 