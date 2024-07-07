import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, ISODateString, User as authUsers } from "next-auth";
import User from "@/models/User";
import { JWT } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb.config";
import bcrypt from 'bcryptjs';

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  image?: string | null;
};

export const authOptions: AuthOptions = {
  
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      dbConnect();
      try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await User.create({
          email: user.email,
          name: user.name,
          role: "User",
        });
        return true;
      } catch (error) {
        console.log("The error is ", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user?.role == null ? "User" : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: authUsers;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        // Validate the credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Find the user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          return null;
        }        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
};
