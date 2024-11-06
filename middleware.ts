import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "./routes";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("sid"); // Check for the session cookie
  const isAuthenticated = !!cookie; // Use the cookie as an authentication indicator
  const requestedPath = req.nextUrl.pathname;

  // Redirect if the route is protected and the user is not authenticated
  if (protectedRoutes.includes(requestedPath) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
