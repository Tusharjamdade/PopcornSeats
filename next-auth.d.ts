import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string;  // Add role to User type
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;  // Add role to Session type
    };
  }

  interface JWT {
    role: string;  // Add role to JWT
  }
}
