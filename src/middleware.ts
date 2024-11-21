import { SESSION_COOKIE_NAME } from "@config/auth";
import { decodeSession } from "@lib/session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/images|.*\\..*).*)"],
};

const AUTH_PATH = /^\/(?<namespace>forgot-password|registration|login).*$/;
const PUBLIC_PATH =
  /^\/(?<namespace>forgot-password|registration|login|notifications|bonus|customer|activity|about).*|\/$/;

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.has("ref")) {
    const ref = request.nextUrl.searchParams.get("ref")!;

    const response = NextResponse.redirect(new URL("/registration", request.url));

    response.cookies.set("ref", ref, {
      maxAge: 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });

    return response;
  }

  if (request.nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  }

  if (["/lotteries", "/games"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url), {
      status: 308,
    });
  }

  const session = await decodeSession(request.cookies.get(SESSION_COOKIE_NAME)?.value ?? "");

  if (session === null && !PUBLIC_PATH.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session !== null && AUTH_PATH.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
