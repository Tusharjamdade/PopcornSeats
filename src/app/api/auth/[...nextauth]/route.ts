import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../client";

const ADMIN_CODE = "786123"; // Move this to environment variables in production

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        userType: { label: "User Type", type: "text", placeholder: "User or Admin" },
        adminCode: { label: "Admin Code", type: "text", placeholder: "Admin Code", optional: true }, // optional for non-admins
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        // Check if admin role is requested and admin code is correct
        if (credentials.userType === "admin" && credentials.adminCode !== ADMIN_CODE) {
          return null;
        }

        // Validate the password (replace with hash comparison in production)
        if (user.password !== credentials.password) {
          return null;
        }

        // Return user data with id as a string
        return {
          id: user.id.toString(), // Convert id to string to match NextAuth type expectations
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Session updated every 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Match JWT maxAge with session maxAge (30 days)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Explicitly typecast user to handle the 'role' field
        const customUser = user as { id: string; email: string; role: string };
        token.role = customUser.role;
        token.email = customUser.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.role = token.role; // No error now
      }
      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
