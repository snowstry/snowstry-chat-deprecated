import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
	const { pathname } = req.nextUrl;
	const session = await getToken({
		req: req,
		secret: process.env.secret,
		raw: true,
	});

	if (pathname === "/") {
		if (!session) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	}

	if (pathname === "/friends") {
		if (!session) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	}

	if (pathname === "/profile") {
		if (!session) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	}

	if (pathname === "/login") {
		if (session) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}
	return NextResponse.next();
}
