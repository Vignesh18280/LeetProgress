import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { User } from "../../models/user";

await connectDB();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if(!userId){
        return NextResponse.json(
            {message : "missing UserID", success: false},
            { status: 400}
        );
    }
    const user = await User.findById(userId);
    return NextResponse.json(
        { checkboxHistory: user.checkboxHistory, success: true },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        { message: "Internal Server Error", success: false },
        { status: 500 }
    );
  }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, checkboxValue } = body;
        if(!userId || !checkboxValue){
            return NextResponse.json(
                { message: "Missing userId or checkboxValue", success: false },
                { status: 400 }
            );
        }
        const user = await User.findByIdAndUpdate(userId,
            { checkboxHistory: checkboxValue },
            { new: true }
        )
        return NextResponse.json(
            { checkboxHistory: user?.checkboxHistory || [], success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}
