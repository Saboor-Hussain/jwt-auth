import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');     // Token Name
    if( token?.value && request.nextUrl.pathname === 'login'){
        return NextResponse.json({ message: "Already logged in"})
    }

    if (!token?.value && request.nextUrl.pathname == '/api/dashboard') {
        // NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.json({ message: "Unautherized"});
    }

    let secret = new TextEncoder().encode('secret');    // We have to store Secret env file. Secret can be any thing, for e.g: ab31ms23hj
    try {
        let verifiedToken = await jwtVerify(token?.value!, secret);
        NextResponse.next();
        // return NextResponse.json({ data: verifiedToken });
    }
    catch {
        // NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.json({ message: "Unautherized"});

    }
    NextResponse.next();
}


export const config = { matcher : ""}
