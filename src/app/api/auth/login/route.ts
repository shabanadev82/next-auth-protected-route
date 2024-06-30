import dbConnect from "@/lib/mongodb.config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

dbConnect()
 export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        console.log('login', body);
        const user = await User.findOne({email:body.email})
        if(!user){
            return NextResponse.json({msg:"Account not found"},{status:401})
        }
        
        return NextResponse.json({msg:"Account Login successfully"},{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:401})
    }
 }