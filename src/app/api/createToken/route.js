// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function POST(request) {
//   const { email, name } = await request.json();

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });
//   }

//   const tokenData = { email };
//   const token = jwt.sign(tokenData, "edcfvdewrefv", { expiresIn: "1d" });

//   const response = NextResponse.json({
//     message: `Welcome Back ${name}`,
//     success: true,
//   });

//   response.cookies.set("authToken", token, {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24, 
//     path: "/",
//     sameSite: "lax",
//   });

//   return response;
// }
