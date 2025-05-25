import { NextResponse } from "next/server"
import connectDB from "../../../lib/db";
import {User} from "../../../models/user"
await connectDB();

export const GET = async (request, {params}) => {
    try {
        const {userId} = await params;
        const user = await User.findById(userId);
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message:"user not found",
            success: false
        })
    }
}

export const PUT = async (request, {params}) => {
    try {
        const {userId} = params;
        const {name, email, password} = await request.json();
        const user = await User.findById(userId);
        user.name = name;
        user.email = email;
        user.password = password;
        const updatedUser = await user.save();
        return NextResponse.json({
            updatedUser,
            message:"details updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"user not found",
            success: false
        })
    }
}


export async function DELETE(request, {params}) {
    const {userId} = params;
    try {
        await User.deleteOne({
            _id:userId
        })
        return NextResponse.json({
            message:"user deleted",
            success:true
        })
    } catch (error) {
        return NextResponse.json({
            message:"error in deleting user",
            success:false
        })
    }
}