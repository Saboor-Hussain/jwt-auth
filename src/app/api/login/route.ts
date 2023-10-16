import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    let body  = await request.json();
    let secret = new TextEncoder().encode('secret');    // We have to store Secret env file. Secret can be any thing, for e.g: ab31ms23hj
    if(body.email === "abc@gmail.com" && body.password === "admin"){
        const jwt = await new SignJWT(
            {
                email: "abc@gmail.com"
            }
        )
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret)

        let response = NextResponse.json({success: true})
        response.cookies.set({
            name: "token",
            value: jwt,
            httpOnly: true
        })
        return response
    }
    else{
        return NextResponse.json({success: false})
    }
}