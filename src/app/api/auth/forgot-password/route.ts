import { NextRequest, NextResponse } from "next/server";
import { ForgotPasswordType } from "@/data";
import User from "@/models/User";
import Env from "@/config/env";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { render } from "@react-email/components";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";
import dbConnect from "@/lib/mongodb.config";
import CryptoJS from "crypto-js";

const crypt = new Cryptr(Env.SECRET_KEY);

export async function POST(request: NextRequest) {
    await dbConnect();
    const payload: ForgotPasswordType = await request.json();

    // user exist
    const user = await User.findOne({ email: payload.email });
    if (user == null) {
        return NextResponse.json({
            status: 400,
            errors: {
                email: "No user found with this email"
            }
        }, { status: 400 });
    }

    // generate random string 
    const randomStr = cryptoRandomString({
        length: 64,
        type: "alphanumeric"
    });
    user.password_reset_token = randomStr;
    await user.save();
    
    // encrypt user email 
    const encryptedEmail = crypt.encrypt(user.email);
    // console.log("Encrypted Email:", encryptedEmail);
    // console.log('ENV: ',Env.SECRET_KEY)
    const encrypted = CryptoJS.AES.encrypt(user.email,Env.SECRET_KEY).toString();
    
    const url = `${Env.APP_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`;
    try {
        const html = render(ForgotPasswordEmail({
            params: {
                name: user.name,
                url: url
            }
        }));
        // send email to user 
        await sendEmail(payload.email, "Reset Password", html);
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ status: 500, message: "Something went wrong. Please try again." });
    }
}
