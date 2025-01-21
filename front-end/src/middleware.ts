import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("Token");

    if(!token && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/sign-up", req.nextUrl));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
}