import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken } from "@/lib/access";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/nike" || pathname === "/nike/") {
    return NextResponse.next();
  }

  const expected = await accessToken(process.env.PROTECTED_PASSWORD);
  if (expected && request.cookies.get(ACCESS_COOKIE)?.value === expected) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

// Child Nike projects stay locked. The /nike landing is public and asks for the
// password itself. Keep the prefixes in sync with src/lib/access.ts.
export const config = {
  matcher: ["/nike/:path*"],
};
