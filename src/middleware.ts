import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/_utils/amplifyServerUtil";

export async function middleware(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  // Redirect based on authentication state
  if (!authenticated && request.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  return NextResponse.next(); // Allow request to proceed

}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/calendar/:path*', '/profile/:path*'], // Adjust this to match your protected routes
};