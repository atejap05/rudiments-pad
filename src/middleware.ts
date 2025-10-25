import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/modules/:path*",
    "/practice/:path*",
    "/profile/:path*",
    "/onboarding/:path*",
  ],
};
