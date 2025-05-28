import { NextResponse } from 'next/server'

export function middleware(request) {
//   console.log("middleware executed");

  const authToken = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;


  if (pathname === '/api/users/login') { 
    return NextResponse.next();
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup';

 
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL('/problems', request.url));
  }

  if (!authToken && pathname === '/problems') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/problems'],
}
