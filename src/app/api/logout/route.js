import { NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({
        message:"Logged out succesfully",
        success: true,
    });
    response.cookies.set("authToken", "", {
        httpOnly: true,        
        path: "/",             
        expires: new Date(0), 
      });
    return response;
}