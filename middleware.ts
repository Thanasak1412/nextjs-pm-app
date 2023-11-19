import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
// config
import { COOKIE_NAME, JWT_SECRET } from "./config";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - signIn
     * - register
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin|register|/public/).*)",
  ],
};

async function verifyJWT(jwt: string) {
  if (!jwt) {
    return;
  }

  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(JWT_SECRET)
  );

  return payload;
}

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get(COOKIE_NAME)?.value;

  if (!jwt) {
    req.nextUrl.pathname = "/signin";

    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    req.nextUrl.pathname = "/signin";

    return NextResponse.redirect(req.nextUrl);
  }
}
