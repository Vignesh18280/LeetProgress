import { NextResponse } from "next/server"
import connectDB from "../../../lib/db";
import {User} from "../../../models/user"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();
await connectDB();

export async function POST(request) {
    const body = await request.json();
    const {email, password} = body;
    console.log(email, password);
    try {
        if(!email || !password){
            return NextResponse.json({
                message:"something is missing",
                success:false
            },{status:400})
        }
        let user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                message:"Incorrect Email",
                success:false
            },{status:400})
        }
        const isPasswordmatch =  await bcrypt.compare(password, user.password);
        if(!isPasswordmatch){
            return NextResponse.json({
                message:"Incorrect Email or password",
                success:false
            },{status:400})
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.token_key, {expiresIn:'1d'});
        user = {
            _id: user._id,
            name: user.name,
            email:user.email,
            profileUrl:user.profileUrl
        }
        
        const response =  NextResponse.json(
            { message: `Welcome Back ${user.name}`, user: user, success: true },
            { status: 201 }
        );
        response.cookies.set("authToken", token, {expiresIn:'1d', httpsOnly:true});
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error.message,
            success:false
        },{status:500})
    }
}