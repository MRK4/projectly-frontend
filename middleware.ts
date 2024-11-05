import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "./routes";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("sid"); // Vérifie la présence du cookie de session
  const isAuthenticated = !!cookie; // Utilise le cookie comme indicateur d'authentification
  const requestedPath = req.nextUrl.pathname;

  // Redirige si la route est protégée et l'utilisateur n'est pas authentifié
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
