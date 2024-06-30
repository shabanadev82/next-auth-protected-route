import dbConnect from "@/lib/mongodb.config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

dbConnect()
export async function GET() {
    try {
        const user = await User.find()
        return NextResponse.json(user,{status:201})
    } catch (error) {
        return NextResponse.json(error,{status:401})
    }
}

export async function POST (request:NextRequest){
    const body = await request.json();
    try {
        const user = await User.findOne({email:body.email})
        if(user){
            return NextResponse.json(
                {
                  errors: "Email is already used.",
                },
                { status: 400 }
              );
        }
        else{
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);
        await User.create(body);
        return NextResponse.json(
          { status: 200, msg: "User Created successfully!" },
          { status: 200 }
        );
        }
        return NextResponse.json({message:"api get working:)",body},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {errors: error },
            { status: 500 }
          );
    }
}