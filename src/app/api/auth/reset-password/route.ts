import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import Env from "@/config/env";
import bcrypt from "bcryptjs";
import { ResetPasswordPayload } from "@/data";
import dbConnect from "@/lib/mongodb.config";
import User from "@/models/User";
import Cryptr from "cryptr";
import { decryptEmail } from "@/config/action";

export async function POST(request: NextRequest) {
  await dbConnect();
  const payload = await request.json();

  // Validation: Check if both passwords are the same
  if (payload.password !== payload.password_confirmation) {
    return NextResponse.json({
      status: 400,
      message: "Passwords do not match.",
    });
  }
  // const email = crypt.decrypt(payload.email!);

  
  // Decrypting the email
  try {
    const crypt = new Cryptr(Env.SECRET_KEY);
    // const email = crypt.decrypt(payload.email!);
    // console.log('decrypted: ', email);
    // console.log('ENV: ',Env.SECRET_KEY)
    
  const decrypted = await decryptEmail(payload.email)
  // Find user with decrypted email and reset token
    
    const user = await User.findOne({
      email:decrypted,
      password_reset_token: payload.signature,
    });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "Invalid reset URL.",
      });
    }

    // Updating the password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(payload.password, salt);
    user.password_reset_token = null;
    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Password changed successfully. Please login with your new password.",
    });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ status: 500, message: "Invalid reset URL or corrupted data." });
  }
}
