import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user";
import connectDB from "../../lib/db";
import dotenv from "dotenv";
dotenv.config();
export async function GET(request) {
  try {
    await connectDB();

    const authToken = request.cookies.get("authToken")?.value;
    // console.log(authToken);
    if (!authToken) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    let data;
    try {
      data = jwt.verify(authToken, process.env.token_key); 
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 401 }
      );
    }

    // console.log("userId from token:", data.userId);
    const user = await User.findById(data.userId).select('-password');
    // console.log("User fetched:", user);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
