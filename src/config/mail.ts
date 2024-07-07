import nodemailer from "nodemailer";
import Env from "./env";

export const transporter = nodemailer.createTransport({
    host: Env.SMPT_HOST,
    port: Number(Env.SMPT_PORT),
    secure: false,
    auth: {
        user: Env.SMPT_USER,
        pass: Env.SMPT_PASSWORD,
    },
});

// send email
export const sendEmail = async (
    to: string,
    subject: string,
    html: string
  ): Promise<string | null> => {
    const info = await transporter.sendMail({
        from: Env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    })
    return info?.messageId;
}