import { NextResponse } from "next/server"
import connectDB from "../../lib/db";
import {User} from "../../models/user"
import bcrypt from "bcrypt"
await connectDB();

//register
export async function POST(request) {
    const body = await request.json();
    const {name, email, password, confirmPassword, profileUrl} = body;
    if(!name || !email || !password || !confirmPassword){
        return NextResponse.json({
            message:"something is missing",
            success:false
        },{status:400})
    }
    if(password !== confirmPassword){
        return NextResponse.json({
            message:"password does not matched",
            success:false
        },{status:400})
    }
    const existedUser = await User.findOne({email});
    if(existedUser){
        return NextResponse.json({
            message:"user already exist with this email",
            success:false
        },{status:400})
    }
    const user = new User({
        name,
        email,
        password,
        profileUrl
    });
    try {
        user.password = await bcrypt.hash(user.password, 10)
        const createdUser = await user.save();
        const response = NextResponse.json(
            { message: "User Registered", user: createdUser, success: true },
            { status: 201 }
        );
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to create user",
            success:false
        },{status:500})
    }
}

export async function GET() {
    let users = [];
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to get users",
            success: false
        })
    }
    return NextResponse.json(users);
}


