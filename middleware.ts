import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  
  if (!token && (req.nextUrl.pathname == "/users" || req.nextUrl.pathname == "/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/users", "/dashboard"], 
};
