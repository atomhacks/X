import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (process.env.HACKATHON_TIME != "true") {
    const url = request.nextUrl.clone();
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/submission/:path*", "/api/team/:path*", "/dashboard/submissions/:path*", "/dashboard/team/:path*"],
};
