import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define route types
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  
  // If it's neither auth nor private route, continue normally
  if (!isAuthRoute && !isPrivateRoute) {
    return NextResponse.next();
  }
  
  // Check session using the provided serverApi function
  let sessionValid = false;
  try {
    const sessionResponse = await checkSession();
    sessionValid = sessionResponse.data.success; // Access .data from full response
  } catch (error) {
    console.error('Session check failed:', error);
    sessionValid = false;
  }
  
  // Handle auth routes (sign-in, sign-up)
  if (isAuthRoute) {
    if (sessionValid) {
      // If user is authenticated and trying to access auth routes, redirect to profile
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    // If not authenticated, allow access to auth routes
    return NextResponse.next();
  }
  
  // Handle private routes (profile, notes)
  if (isPrivateRoute) {
    if (!sessionValid) {
      // If user is not authenticated and trying to access private routes, redirect to sign-in
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    // If authenticated, allow access to private routes
    return NextResponse.next();
  }
  
  // Fallback - should not reach here due to the early return above
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};