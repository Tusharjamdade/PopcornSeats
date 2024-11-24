// // import NextAuth from "next-auth"
// // import { NEXT_AUTH_CONFIG } from "../../../../../auth"

// // const handler = NextAuth(NEXT_AUTH_CONFIG)

// // export { handler as GET, handler as POST }


// import NextAuth, { Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// // import { prisma } from "../../../client"; // Adjust your path to Prisma client
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { User } from "next-auth"; // Extended User model with role
// import { prisma } from "../../../../../client";

// const ADMIN_CODE = "786123";

// export const NEXT_AUTH_HANDLER: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//         userType: { label: "User Type", type: "text", placeholder: "User or Admin" },
//         adminCode: { label: "Admin Code", type: "text", placeholder: "Admin Code", optional: true },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;

//         const user = await prisma.user.findFirst({ where: { email: credentials.email } });
//         if (!user) {
//           throw new Error("No user found with the given email.");
//         }

//         if (credentials.userType === "admin" && credentials.adminCode !== ADMIN_CODE) {
//           throw new Error("Invalid admin code.");
//         }

//         // const isPasswordValid = await bcrypt.compare(credentials.password, user.password); // Use bcrypt to compare passwords
//         // if (!isPasswordValid) {
//         //   throw new Error("Incorrect password.");
//         // }

//         return {
//           id: user.id.toString(),
//           email: user.email,
//           role: user.role,  // User role
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/signin",  // Custom sign-in page path
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,  // 30 days
//     updateAge: 24 * 60 * 60,    // Update after 1 day
//   },
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       if (user) {
//         token.role = user.role;  // Set role in token
//         token.email = user.email;
//       }
//       return token;
//     },
    
//     async session({ session, token }: { session:Session; token: JWT }) {
      
//       if (session.user) {
//         session.user.email = token.email;
//         session.user.role = token.role;  // Set role in session
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(NEXT_AUTH_HANDLER);
// export { handler as GET, handler as POST };




import NextAuth from "next-auth"; // Adjust the import path for your NextAuth options
import { NEXT_AUTH_HANDLER } from "../../../../../auth";

// Export the handler explicitly for GET and POST
const handler = NextAuth(NEXT_AUTH_HANDLER);

export { handler as GET, handler as POST };
