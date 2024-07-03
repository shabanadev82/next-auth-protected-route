// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: "/login",
//   },

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       dbConnect();
//       try {
//         const findUser = await User.findOne({ email: user.email });
//         if (findUser) {
//           return true;
//         }
//         await User.create({
//           email: user.email,
//           name: user.name,
//           role: "User",
//         });
//         return true;
//       } catch (error) {
//         console.log("The error is ", error);
//         return false;
//       }
//     },

//     async jwt({ token, user }: { token: JWT; user: CustomUser }) {
//       if (user) {
//         user.role = user?.role == null ? "User" : user?.role;
//         token.user = user;
//       }
//       return token;
//     },
//     async session({
//       session,
//       token,
//       user,
//     }: {
//       session: CustomSession;
//       token: JWT;
//       user: authUsers;
//     }) {
//       session.user = token.user as CustomUser;
//       return session;
//     },
//   },
//   providers: [
//     Credentials({
//       name: "Welcome Back",
//       type: "credentials",

//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // * Connect to the MongoDb
//         dbConnect();
//         const user = await User.findOne({ email: credentials?.email });
//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// }
