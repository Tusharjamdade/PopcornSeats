import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./client"; // Adjust your path to Prisma client
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";  // Extended User model with role

const ADMIN_CODE = "786123";

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
          role: user.role,  // User role
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",  // Custom sign-in page path
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,  // 30 days
    updateAge: 24 * 60 * 60,    // Update after 1 day
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;  // Set role in token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.role = token.role;  // Set role in session
      }
      return session;
    },
  },
};
