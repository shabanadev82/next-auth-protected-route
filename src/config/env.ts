 class Env {
    static SMPT_HOST:string =process.env.SMPT_HOST!;
    static SMPT_PORT:string =process.env.SMPT_PORT!;
    static SMPT_USER:string =process.env.SMPT_USER!;
    static SMPT_PASSWORD:string =process.env.SMPT_PASSWORD!;
    static SMPT_SECURE:string =process.env.SMPT_SECURE!;
    static EMAIL_FROM:string =process.env.EMAIL_FROM!;
    static SECRET_KEY:string =process.env.NEXTAUTH_SECRET!;
    static APP_URL:string =process.env.APP_URL!;
}
export default Env;