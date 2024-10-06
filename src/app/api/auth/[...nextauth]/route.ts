import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../client";

const ADMIN_CODE = "786123"; // You can move this to environment variables in production

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
      async authorize(credentials: any) {
        // Fetch the user from the database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          // Return null if no user was found (invalid credentials)
          return null;
        }

        // Check if the role is "admin" and the correct admin code is provided
        if (credentials.userType === "admin" && credentials.adminCode !== ADMIN_CODE) {
          return null; // Return null if admin code is invalid
        }

        // Validate password (in production, hash and compare passwords)
        if (user.password !== credentials.password) {
          return null; // Return null if password is incorrect
        }

        // Return user object (without password) if everything checks out
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT to store the session
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data (role, email) to the token
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add email and role to the session object for access control in the frontend
      if (token) {
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
