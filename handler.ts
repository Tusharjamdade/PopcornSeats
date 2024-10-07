
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./client";
const ADMIN_CODE = "786123";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";  // Import the JWT type
// import User  from "./next-auth";     // Import the User type
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
import { User } from "next-auth";  // After extending, this includes the role field

export const NEXT_AUTH_HANDLER: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        userType: { label: "User Type", type: "text", placeholder: "User or Admin" },
        adminCode: { label: "Admin Code", type: "text", placeholder: "Admin Code", optional: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (!user) return null;

        if (credentials.userType === "admin" && credentials.adminCode !== ADMIN_CODE) {
          return null;
        }

        if (user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,  // role is now part of User
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {  // user now has role
      if (user) {
        token.role = user.role;  // No more type error
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.role = token.role;  // No more type error
      }
      return session;
    },
  },
};
